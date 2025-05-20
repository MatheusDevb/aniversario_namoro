# Instruções para Personalização e Publicação

## Visão Geral
Este projeto é uma página comemorativa para celebrar 2 anos de relacionamento e aniversário. A página inclui:
- Tela inicial com presente animado
- Sistema de senha (280975)
- Conteúdo com efeito parallax
- Carrossel de imagens com troca de músicas
- Efeito de fogos de artifício

## Como Personalizar

### Imagens
1. Substitua as imagens em `/img/` por suas próprias fotos:
   - `couple1.jpg`, `couple2.jpg`, `couple3.jpg`, `couple4.jpg` - Imagens para as seções parallax
   - `carousel1.jpg` a `carousel5.jpg` - Imagens para o carrossel
   - `gift.png` - Imagem do presente na tela inicial

### Áudios
1. Substitua os arquivos em `/audio/` por suas próprias músicas:
   - `love_story.mp3` - Música inicial (primeiros 5 segundos)
   - `parabens.mp3` - Música principal

### Textos
1. Edite o arquivo `index.html` para personalizar os textos:
   - Procure pelas tags `<h1>`, `<h2>`, `<p>` para alterar os títulos e parágrafos
   - Personalize as mensagens de acordo com sua história

### Senha
1. Para alterar a senha, edite o arquivo `js/script.js`:
   - Localize a linha `const correctPassword = "280975";` no início do arquivo
   - Substitua "280975" pela nova senha desejada

## Como Publicar no GitHub Pages

1. Crie um repositório no GitHub
2. Faça upload de todos os arquivos deste projeto para o repositório
3. Vá para "Settings" > "Pages"
4. Em "Source", selecione "main" (ou "master") e clique em "Save"
5. Aguarde alguns minutos e seu site estará disponível no URL fornecido

## Estrutura de Arquivos
- `index.html` - Página principal
- `css/style.css` - Estilos visuais
- `js/script.js` - Funcionalidades interativas
- `img/` - Diretório de imagens
- `audio/` - Diretório de áudios

## Observações
- O site é responsivo e funciona bem em dispositivos móveis
- Todos os efeitos visuais foram otimizados para performance
- Os placeholders de áudio precisam ser substituídos por arquivos reais antes da publicação
