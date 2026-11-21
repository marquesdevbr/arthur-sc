# Arthur SC — Pendências para fechar o site

O passo a passo de cada item está em `COMO-ATUALIZAR.md`.

## Aguardando o Arthur
| Item | Onde entra |
|------|------------|
| **Logo** (SVG ou PNG com fundo transparente) | `public/` + `logo` em `src/config/site.ts`. Serve também de base para o favicon e a imagem de compartilhamento. |
| **Foto oficial** | `public/` + `portrait` em `src/config/site.ts` |
| **Texto de apresentação** (aba Sobre) | `about.bio` em `src/config/site.ts` |
| **30 segundos de cada mega** (4 áudios) | `public/audio/mega-01.mp3` … `mega-04.mp3` + `audio` de cada mega em `src/config/site.ts` |
| **Confirmação dos textos** "Produtor independente", "Santa Catarina · BR", "Grave sem limite", "Do Sul para as pistas" | `src/App.tsx`, se ele quiser trocar algo |

## Para preencher por nossa conta
| Item | Onde entra |
|------|------------|
| WhatsApp oficial para pedidos (já colocado; testar um pedido real) | `whatsappNumber` em `src/config/site.ts` |

## Depois que a logo chegar
- Favicon (hoje é o ícone padrão do Figma Make): substituir `public/favicon.svg`.
- Imagem de compartilhamento do link: adicionar `og:image` e trocar `twitter:card` para `summary_large_image` em `index.html`.

## Antes da publicação definitiva
- [ ] Trocar `"robots": { "index": false }` por `true` em `.figma/make/site.json` (hoje o Google não indexa o site).
- [ ] Rodar `npm run typecheck` e `npm run build`.
- [ ] Conferir no celular.
- [ ] Autorizar o push.

## Já feito
Os 4 megas (Rua do Ouro, Água Rosa, Fumaça do Ice e Geme Baixo) já estão no site com título e link do YouTube.

## Decididos (fora do site)
Depoimento, e-mail, Spotify, SoundCloud, capas dos megas e domínio próprio ficaram de fora. O endereço continua `arthur-sc.vercel.app`; se mudar, atualizar `og:url` e `canonical` em `index.html`.
