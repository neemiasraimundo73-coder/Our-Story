# Nossa História — Neemias & Yolly ❤️

Experiência romântica, responsiva e interativa feita em HTML5, CSS3 e JavaScript puro.

## Executar localmente

Abra `index.html` no navegador ou, para testar como num servidor:

```bash
python3 -m http.server 8000 --directory nossa-historia
```

Depois abre `http://localhost:8000`.

## Personalizar

- **Música:** coloca o ficheiro `ousado-amor.mp3` em `assets/music/`.
- **Vídeo:** coloca o ficheiro `nosso-video.mp4` em `assets/video/`.
- **Data do relacionamento:** já está configurada como `2018-05-10`, correspondente a 10/05/2018.
- **Linha do tempo:** edita os seis cartões diretamente em `index.html` quando quiseres acrescentar datas e memórias verdadeiras.
- **Legendas das fotos:** edita o array `galleryCaptions` em `script.js` e os textos visíveis nos cartões de foto em `index.html`.
- **Fotos:** as dez imagens recebidas já estão em `assets/images/foto01.jpg` até `foto10.jpg`. Para substituir uma, mantém o mesmo nome.

## Publicar

Este é um site estático: pode ser publicado no Vercel ou no GitHub Pages. No Vercel, importa a pasta `nossa-historia/` como projeto; no GitHub Pages, envia o conteúdo dessa pasta para o repositório e ativa Pages.

O MP3 e o vídeo são opcionais no pacote inicial. Até serem adicionados, o player e a área de vídeo mostram instruções claras em vez de fingirem que existe um ficheiro.
