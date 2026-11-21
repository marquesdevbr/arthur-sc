# Como atualizar o site quando o material do Arthur chegar

Tudo que muda fica em `src/config/site.ts` e na pasta `public/`. Depois de qualquer alteração: `npm run typecheck`, `npm run build`, conferir com `npm run dev` ou `npm run preview` e só então commitar.

## 1. Logo
1. Salve em `public/logo.svg` (ou `.png` com fundo transparente).
2. Em `site.ts`: `logo: '/logo.svg'`.
3. O tamanho vem de `.logo-mark { width: 92px }` em `src/index.css` (74px no celular, dentro do bloco `@media (max-width: 800px)`). Aumente se a logo ficar pequena.

## 2. Favicon
Substitua o arquivo `public/favicon.svg` mantendo o mesmo nome (hoje é o ícone padrão do Figma Make). Pode ser a própria logo, em formato quadrado.

## 3. Foto oficial
1. Salve em `public/arthur.jpg`. Ideal: vertical (4:5), pelo menos 1200 px de largura e menos de 400 KB.
2. Em `site.ts`: `portrait: '/arthur.jpg'`.

## 4. Texto de apresentação (aba Sobre)
Em `site.ts`, dentro de `about`. Use crase e deixe uma **linha em branco** entre os parágrafos:

```ts
about: {
  bio: `Primeiro parágrafo.

Segundo parágrafo.`,
},
```

## 5. Áudios de prévia (30 segundos de cada mega)
1. Se o Arthur mandar só o mega inteiro, corte 30 s com fade final (troque `-ss` pelo ponto onde o mega "bate"):
   ```
   ffmpeg -i mega.mp4 -ss 00:00:30 -t 30 -vn -af "afade=t=out:st=27:d=3" -b:a 128k mega-01.mp3
   ```
   Sem ffmpeg: no Audacity, recorte 30 s, aplique Efeito → Fade out nos últimos 3 s e exporte em MP3 a 128 kbps.
2. Salve em `public/audio/` como `mega-01.mp3` … `mega-06.mp3` (cerca de 500 KB cada).
3. Em `site.ts`, em cada mega: `audio: '/audio/mega-01.mp3'`.

## 6. Títulos e links do YouTube
Em `site.ts`, na lista `megas`:

```ts
{ id: '01', title: 'Nome do mega', audio: '/audio/mega-01.mp3', youtube: 'https://www.youtube.com/watch?v=...' },
```

Campos vazios não quebram nada: o card mostra "Mega 01", "Prévia em breve" e "YouTube em breve".

## 7. Imagem de compartilhamento do link (depois da logo)
1. Crie uma imagem 1200×630 px em `public/og.png`.
2. Em `index.html`, adicione `<meta property="og:image" content="https://arthur-sc.vercel.app/og.png" />` e troque `twitter:card` de `summary` para `summary_large_image`.

## 8. Antes da publicação definitiva
- Em `.figma/make/site.json`, troque `"index": false` por `true` (hoje o Google não indexa o site).
- Se o endereço mudar, atualize `og:url` e `canonical` em `index.html`.
- Rode `npm run typecheck` e `npm run build`, confira no celular e só então faça o push.
