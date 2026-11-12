# Arthur SC — Pendências para o Arthur

Tudo abaixo está preparado no código. É só enviar o material e substituir no ponto indicado.

| # | O que precisamos | Onde entra |
|---|------------------|------------|
| 1 | **WhatsApp oficial** para pedidos (com DDD) | `src/config/site.ts` → `whatsappNumber` (formato `5548999999999`). Enquanto vazio, o formulário fica bloqueado ("em breve"). |
| 2 | **Logo** em boa resolução (SVG ou PNG transparente) | Colocar em `public/` e preencher `logo` em `src/config/site.ts`. |
| 3 | **Favicon** oficial (SVG/PNG quadrado) | Substituir `public/favicon.svg` (hoje é o ícone padrão do Figma Make). |
| 4 | **Foto oficial** | Colocar em `public/` e preencher `portrait` em `src/config/site.ts`. |
| 5 | **Texto de apresentação** (biografia) e, se quiser, uma frase/depoimento autorizado | `about.bio` e `about.quote` em `src/config/site.ts`. Sem `quote`, o bloco não aparece. |
| 6 | **6 títulos** dos megas | `megas[].title` em `src/config/site.ts`. |
| 7 | **6 capas** (quadradas) | Arquivos em `public/covers/` e `megas[].cover` (ex.: `/covers/mega-01.jpg`). |
| 8 | **6 áudios de prévia** (mp3) | Arquivos em `public/audio/` e `megas[].audio` (ex.: `/audio/mega-01.mp3`). |
| 9 | **6 links do YouTube** (um por mega) | `megas[].youtube` em `src/config/site.ts`. |
| 11 | Spotify / SoundCloud, **se existirem** | Hoje não aparecem. Só adicionar quando houver endereço oficial. |
| 12 | **Confirmar os textos** já no site: "Produtor independente", "Santa Catarina · BR", "O peso do Mega Funk tem nome", "Grave sem limite", "Do Sul para as pistas", "Independente por essência" | `src/App.tsx` |
| 13 | **E-mail de contato** (opcional) | `email` em `src/config/site.ts`. Se preenchido, aparece no rodapé. |
| 14 | **Confirmar preços e regras** dos pacotes (R$ 5 / R$ 40 / R$ 70) | `packs` em `src/config/site.ts`. |

## Antes da publicação definitiva

- [ ] **Liberar indexação no Google**: em `.figma/make/site.json`, trocar `"robots": { "index": false }` por `"index": true`. Hoje o site está marcado como *noindex* de propósito, enquanto é protótipo.
- [ ] Preencher o WhatsApp e testar um pedido de ponta a ponta.
- [ ] Rodar `npm run typecheck` e `npm run build` na máquina.
- [ ] Imagem de compartilhamento (og:image): só quando houver material adequado.
