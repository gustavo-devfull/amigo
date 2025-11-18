# Guia de Solução de Problemas

## Erro: "imagemUrlForm is not defined"

Este erro geralmente ocorre devido a cache do hot-reload do React. Para resolver:

1. **Pare o servidor** (Ctrl+C)
2. **Limpe o cache**:
   ```bash
   rm -rf node_modules/.cache
   ```
3. **Reinicie o servidor**:
   ```bash
   npm start
   ```

Ou simplesmente faça um hard refresh no navegador:
- **Chrome/Edge**: Ctrl+Shift+R (Windows/Linux) ou Cmd+Shift+R (Mac)
- **Firefox**: Ctrl+F5 (Windows/Linux) ou Cmd+Shift+R (Mac)

## Erro: "ERR_CONNECTION_REFUSED" ou "Failed to fetch"

Este erro significa que o servidor backend FTP não está rodando. Para resolver:

1. **Abra um novo terminal**
2. **Entre na pasta do servidor**:
   ```bash
   cd server
   ```
3. **Instale as dependências** (se ainda não instalou):
   ```bash
   npm install
   ```
4. **Inicie o servidor**:
   ```bash
   npm start
   ```

Você deve ver a mensagem:
```
Servidor backend rodando na porta 3001
Aguardando uploads FTP em http://localhost:3001/api/upload-ftp
```

5. **Mantenha este terminal aberto** enquanto usa o aplicativo

## Erro: CORS do Firebase Storage

Se você ainda está vendo erros relacionados ao Firebase Storage, isso significa que há dados antigos no banco de dados que ainda referenciam URLs do Firebase Storage. Isso não afeta o funcionamento, mas você pode:

1. Deletar os presentes antigos que usam Firebase Storage
2. Ou criar novos presentes que usarão FTP

## Verificando se tudo está funcionando

1. ✅ Servidor backend rodando na porta 3001
2. ✅ Frontend React rodando na porta 3000
3. ✅ Navegador com cache limpo (hard refresh)

## Testando o Upload

1. Abra o aplicativo em `http://localhost:3000`
2. Clique em "Adicionar Presente"
3. Selecione um amigo
4. Vá na aba "Presente e Foto"
5. Preencha nome, descrição e selecione uma imagem
6. Clique em "Adicionar"

Se o servidor backend estiver rodando, o upload deve funcionar!

