// Servidor backend simples para fazer upload de imagens via FTP
// Execute com: node server.js
// Ou instale as dependências: npm install express multer basic-ftp cors
// E execute: npm start

const express = require('express');
const multer = require('multer');
const ftp = require('basic-ftp');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Configuração FTP
const FTP_CONFIG = {
  host: '46.202.90.62',
  user: 'u715606397.ideolog.ia.br',
  password: '27y8rYoDq=Q&aHk:',
  port: 21,
  basePath: '/public_html/presentes'
};

// Middleware
app.use(cors());
app.use(express.json());

// Configuração do multer para upload temporário
const upload = multer({ 
  dest: 'uploads/',
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Criar pasta uploads se não existir
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Função para obter a extensão do arquivo
const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

// Função para gerar nome do arquivo baseado no amigo + contador
const generateFilename = async (client, amigo, originalFilename) => {
  const extension = getFileExtension(originalFilename);
  const amigoPath = `${FTP_CONFIG.basePath}/${amigo}`;
  
  try {
    // Listar arquivos na pasta do amigo
    const files = await client.list(amigoPath);
    
    // Filtrar apenas arquivos de imagem que começam com o nome do amigo seguido de underscore e número
    const imageFiles = files.filter(file => {
      const fileName = file.name.toLowerCase();
      const amigoLower = amigo.toLowerCase();
      // Padrão: amigo_N.extensão
      const pattern = new RegExp(`^${amigoLower}_\\d+\\.(jpg|jpeg|png|gif|webp)$`, 'i');
      return pattern.test(fileName);
    });
    
    // Encontrar o próximo número disponível
    let nextNumber = 1;
    if (imageFiles.length > 0) {
      const amigoEscaped = amigo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapar caracteres especiais do regex
      const existingNumbers = imageFiles.map(file => {
        const match = file.name.match(new RegExp(`^${amigoEscaped}_(\\d+)\\.`, 'i'));
        return match ? parseInt(match[1]) : 0;
      }).filter(num => num > 0);
      
      if (existingNumbers.length > 0) {
        nextNumber = Math.max(...existingNumbers) + 1;
      }
    }
    
    // Gerar nome: Amigo_N.extensão
    const filename = `${amigo}_${nextNumber}.${extension}`;
    console.log(`Nome gerado para ${amigo}: ${filename} (original: ${originalFilename})`);
    return filename;
  } catch (error) {
    // Se não conseguir listar, começa do 1
    console.log('Erro ao listar arquivos, usando número 1:', error.message);
    const filename = `${amigo}_1.${extension}`;
    console.log(`Nome gerado (fallback) para ${amigo}: ${filename}`);
    return filename;
  }
};

// Rota para upload via FTP
app.post('/api/upload-ftp', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  const client = new ftp.Client();
  const localPath = req.file.path;
  let amigo = req.body.amigo || 'geral';
  
  // Capitalizar primeira letra do nome do amigo
  if (amigo && amigo.length > 0) {
    amigo = amigo.charAt(0).toUpperCase() + amigo.slice(1).toLowerCase();
  }
  
  console.log(`=== Recebendo upload ===`);
  console.log(`Amigo recebido: ${req.body.amigo}`);
  console.log(`Amigo processado: ${amigo}`);
  console.log(`Arquivo original: ${req.file.originalname}`);
  
  try {
    // Conectar ao FTP
    await client.access({
      host: FTP_CONFIG.host,
      user: FTP_CONFIG.user,
      password: FTP_CONFIG.password,
      port: FTP_CONFIG.port
    });

    // Criar diretório base se não existir
    try {
      await client.ensureDir(FTP_CONFIG.basePath);
    } catch (err) {
      console.log('Diretório base já existe ou erro ao criar:', err.message);
    }

    // Criar diretório do amigo se não existir
    try {
      await client.ensureDir(`${FTP_CONFIG.basePath}/${amigo}`);
    } catch (err) {
      console.log('Diretório do amigo já existe ou erro ao criar:', err.message);
    }

    // Gerar nome do arquivo baseado no amigo + contador (sem nome do presente)
    const filename = await generateFilename(client, amigo, req.file.originalname);
    const remotePath = `${FTP_CONFIG.basePath}/${amigo}/${filename}`;

    console.log(`=== Upload FTP ===`);
    console.log(`Arquivo original: ${req.file.originalname}`);
    console.log(`Nome gerado: ${filename}`);
    console.log(`Amigo: ${amigo}`);
    console.log(`Caminho remoto: ${remotePath}`);

    // Fazer upload do arquivo
    await client.uploadFrom(localPath, remotePath);

    // Fechar conexão
    client.close();

    // Deletar arquivo temporário
    fs.unlinkSync(localPath);

    // Path público (sem public_html) - IMPORTANTE: não incluir public_html na URL pública
    const publicPath = `/presentes/${amigo}/${filename}`;
    
    console.log(`Path público retornado: ${publicPath}`);
    console.log(`==================`);

    // Garantir que o path não contém public_html
    const finalPath = publicPath.replace('/public_html', '');
    
    console.log(`=== Resposta ===`);
    console.log(`Filename: ${filename}`);
    console.log(`Path público: ${finalPath}`);
    console.log(`==================`);

    res.json({
      success: true,
      filename: filename,
      path: finalPath, // SEM public_html - garantido
      amigo: amigo
    });
  } catch (error) {
    console.error('Erro no upload FTP:', error);
    
    // Deletar arquivo temporário em caso de erro
    if (fs.existsSync(localPath)) {
      fs.unlinkSync(localPath);
    }

    res.status(500).json({ 
      error: 'Erro ao fazer upload da imagem',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
  console.log(`Aguardando uploads FTP em http://localhost:${PORT}/api/upload-ftp`);
});

