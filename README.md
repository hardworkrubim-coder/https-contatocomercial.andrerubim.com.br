# Cartão digital Flypay

Abra `index.html` no navegador para usar o cartão digital.

## Como editar

1. Clique em `Editar`.
2. Atualize telefone, WhatsApp, e-mail, site, redes sociais e serviços.
3. Defina o `Link do cartão` com a URL final publicada.
4. Defina o `Link para gravação NFC` com a mesma URL final, ou com a URL específica que será gravada no cartão.
5. Clique em `Salvar alterações`.

As alterações ficam salvas no navegador via `localStorage`.

## Arquivos principais

- `index.html`: estrutura da landing page
- `styles.css`: layout e identidade visual
- `script.js`: interações, QR Code, VCF, painel administrativo e estatísticas locais
- `assets/andre-rubim-flypay.svg`: avatar inicial
- `assets/flypay-mark.svg`: logo inicial
- `assets/catalogo-flypay.pdf`: catálogo PDF de exemplo

## Observações

- Os dados de telefone e e-mail estão com valores editáveis de demonstração.
- Para o QR Code e o NFC funcionarem corretamente em produção, preencha o `Link do cartão` com a URL pública final.
- Para usar Google Analytics e Meta Pixel, insira os IDs no painel administrativo.

## Publicação (recomendado)

- **Netlify**: arraste a pasta do projeto (os arquivos `index.html`, `styles.css`, `script.js`, etc.) para o painel do Netlify.
- **Vercel**: crie um projeto estático e faça upload/commit desses arquivos.
- **Hospedagem comum**: envie tudo via FTP para o seu domínio.

Depois de publicar:
1. Volte no cartão e preencha `Link do cartão` com a URL pública final.
2. Atualize `sitemap.xml` trocando `https://SEU-DOMINIO-AQUI/` pela URL real.
