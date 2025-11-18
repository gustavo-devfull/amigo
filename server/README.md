# Servidor Backend - Upload FTP

Servidor Node.js simples para fazer upload de imagens via FTP.

## Instalação

1. Entre na pasta do servidor:
```bash
cd server
```

2. Instale as dependências:
```bash
npm install
```

## Configuração

As credenciais FTP estão configuradas no arquivo `server.js`:
- Host: 46.202.90.62
- Usuário: u715606397.ideolog.ia.br
- Porta: 21
- Pasta: /public_html/presentes

## Executando

Para iniciar o servidor:
```bash
npm start
```

Ou em modo desenvolvimento (com auto-reload):
```bash
npm run dev
```

O servidor ficará rodando em `http://localhost:3001`

## Endpoint

- **POST** `/api/upload-ftp`
  - Recebe um arquivo via FormData
  - Faz upload para o servidor FTP
  - Retorna a URL pública da imagem

## Variáveis de Ambiente

Você pode configurar a URL do backend no frontend através da variável de ambiente:
```
REACT_APP_BACKEND_URL=http://localhost:3001
```

