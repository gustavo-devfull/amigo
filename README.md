# Sistema de Gerenciamento de Presentes - Amigo Secreto

Sistema web para gerenciar presentes sugeridos para amigo secreto, desenvolvido com React, React Bootstrap e Firebase.

## Funcionalidades

- ✅ Adicionar presentes de três formas diferentes:
  - **Imagem e Nome**: Informar URL da imagem e nome do presente
  - **Link e Descrição**: Informar link do produto e descrição
  - **Upload de Imagem**: Fazer upload de imagem com nome e descrição
- ✅ Visualizar lista de todos os presentes cadastrados
- ✅ Editar presentes existentes
- ✅ Excluir presentes
- ✅ Interface responsiva com React Bootstrap

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Conta no Firebase (Firestore Database)
- Servidor FTP configurado (para upload de imagens)
- Servidor backend Node.js (para intermediar uploads FTP)

## Instalação

1. Clone ou baixe este repositório

2. Instale as dependências do frontend:
```bash
npm install
```

3. Instale as dependências do servidor backend:
```bash
cd server
npm install
cd ..
```

## Configuração do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/)

2. Crie um novo projeto ou use um existente

3. Ative os seguintes serviços:
   - **Firestore Database**: Crie um banco de dados em modo de teste
   - **Storage**: Ative o Firebase Storage

4. Vá em **Configurações do Projeto** > **Seus apps** > **Web** (ícone `</>`)

5. Copie as credenciais do Firebase

6. Abra o arquivo `src/firebase/config.js` e substitua as configurações:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

### Configuração do Firestore

No console do Firebase, configure as regras do Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /presentes/{document=**} {
      allow read, write: if true; // Em produção, configure regras de segurança adequadas
    }
  }
}
```

### Configuração do Storage

Configure as regras do Storage (as imagens são salvas em `public/presentes/`):

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /public/presentes/{allPaths=**} {
      allow read, write: if true; // Em produção, configure regras de segurança adequadas
    }
  }
}
```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

O aplicativo será aberto automaticamente em `http://localhost:3000`

## Estrutura do Projeto

```
Amigo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ListaPresentes.js    # Componente principal da lista
│   │   ├── PresenteCard.js      # Card de exibição do presente
│   │   └── PresenteForm.js      # Formulário de adicionar/editar
│   ├── firebase/
│   │   └── config.js            # Configuração do Firebase
│   ├── services/
│   │   └── presentesService.js  # Serviços de comunicação com Firebase
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Como Usar

1. **Adicionar Presente**:
   - Clique no botão "Adicionar Presente"
   - Escolha uma das três abas:
     - **Imagem e Nome**: Cole a URL da imagem e digite o nome
     - **Link e Descrição**: Cole o link do produto e escreva uma descrição
     - **Upload de Imagem**: Faça upload de uma imagem, digite nome e descrição
   - Clique em "Adicionar"

2. **Editar Presente**:
   - Clique no botão "Editar" no card do presente
   - Modifique as informações desejadas
   - Clique em "Atualizar"

3. **Excluir Presente**:
   - Clique no botão "Excluir" no card do presente
   - Confirme a exclusão

## Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **React Bootstrap** - Componentes Bootstrap para React
- **Firebase Firestore** - Banco de dados NoSQL
- **Node.js/Express** - Servidor backend para upload FTP
- **FTP** - Upload de imagens para servidor FTP

## Notas de Segurança

⚠️ **Importante**: As regras de segurança do Firebase configuradas neste projeto permitem leitura e escrita públicas. Para uso em produção, configure regras de segurança adequadas com autenticação de usuários.

## Suporte

Em caso de problemas ou dúvidas, verifique:
- Se o Firebase está configurado corretamente
- Se as regras do Firestore e Storage estão ativas
- Se todas as dependências foram instaladas corretamente


