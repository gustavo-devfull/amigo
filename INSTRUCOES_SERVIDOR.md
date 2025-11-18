# Instruções para Reiniciar o Servidor

## ⚠️ IMPORTANTE: O servidor precisa ser reiniciado!

O código foi atualizado para:
1. ✅ Renomear imagens para `Amigo_N.extensão` (ex: `Guto_1.jpg`)
2. ✅ Retornar path correto `/presentes/[amigo]/[arquivo]` (sem `public_html`)

## Como reiniciar o servidor:

1. **Pare o servidor atual**:
   - Vá no terminal onde o servidor está rodando
   - Pressione `Ctrl+C` para parar

2. **Reinicie o servidor**:
   ```bash
   cd server
   npm start
   ```

3. **Verifique os logs**:
   Você deve ver:
   ```
   Servidor backend rodando na porta 3001
   Aguardando uploads FTP em http://localhost:3001/api/upload-ftp
   ```

## Testando:

1. Faça upload de uma nova imagem
2. Verifique os logs do servidor - deve mostrar:
   ```
   === Upload FTP ===
   Arquivo original: [nome original]
   Nome gerado: [Amigo]_[N].[extensão]
   Path público retornado: /presentes/[Amigo]/[Amigo]_[N].[extensão]
   ```

3. Verifique os logs do navegador - deve mostrar:
   ```
   === Upload FTP ===
   Path retornado pelo servidor: /presentes/[Amigo]/[Amigo]_[N].[extensão]
   URL final da imagem: https://ideolog.ia.br/presentes/[Amigo]/[Amigo]_[N].[extensão]
   ```

## Se ainda não funcionar:

1. Verifique se o servidor foi realmente reiniciado
2. Verifique os logs do servidor para ver se há erros
3. Limpe o cache do navegador (Ctrl+Shift+R)
4. Tente fazer upload de uma nova imagem

