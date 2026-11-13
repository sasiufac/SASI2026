# SASI 2026

Site da **3ª Semana Acadêmica de Sistemas de Informação da Universidade Federal do Acre**.

**Datas:** 23 a 27 de novembro de 2026.  
**Local:** Centro de Convivência da UFAC, Rio Branco, Acre.

## Executar localmente

O site usa HTML, CSS e JavaScript sem dependências de build. Como o JavaScript utiliza módulos ES, sirva o projeto com um servidor HTTP local:

```bash
python3 -m http.server 8000
```

Depois acesse http://localhost:8000/.

## GitHub Pages

O projeto foi desenvolvido para ser publicado em **https://sasiufac.github.io/SASI2026/** sem etapa de compilação. Todos os caminhos internos são relativos ao repositório.

1. Abra **Settings → Pages** no repositório.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Selecione a branch **main** e a pasta **/(root)**, depois salve.
4. Após integrar o pull request à main, o GitHub Pages publicará os arquivos da raiz.

O arquivo `.nojekyll` impede o processamento Jekyll e mantém a publicação fiel aos arquivos estáticos.

## Estrutura

- `index.html`: layout e conteúdo institucional.
- `styles.css`: identidade visual responsiva.
- `src/data.js`: programação, minicursos, parceiros e convidados.
- `src/main.js`: programação por dia (levels), cards de convidados, parceiros, faixa, easter eggs e menu móvel.
- `assets/inviteds/` e `assets/partners/`: fotos e logos em WebP, já no tamanho usado na tela.
- `assets/icons/`: ícones de Lattes, LinkedIn, Instagram e Google Scholar (créditos em `CREDITS.txt`).
- `assets/comissao-sasi-520.webp`: logo da Comissão Organizadora (rodapé).
- `assets/favicon-comissao-32.png`, `assets/favicon-comissao-192.png` e `assets/apple-touch-icon.png`: ícone da aba do navegador, feito com a logo da Comissão.
- `assets/logosasi-compact.svg`: logotipo SASI UFAC 2026 usado no topo (versão leve).
- `assets/logosasi.svg`: arquivo original do logotipo (1,76 MB), não é carregado pelo site.
- `assets/labs/`: fotos e logos dos locais (Centro de Convivência/SebraeLab, PAVIC-Lab, Web Academy e NaveTech), em WebP.
- `assets/share/conquista-sasi2026.jpg`: arte para compartilhar a platina (só é baixada quando alguém completa os segredos).

## Manutenção de conteúdo

Edite os arrays `days`, `places`, `schedule`, `workshops`, `partners` e `guests` em `src/data.js`. As atividades de cada convidado aparecem sozinhas no card quando o nome dele está no campo `speaker` da programação. Atualize as informações em um pull request, revise e integre à main.

- **Títulos (Prof. Dr. / Prof.ª Dr.ª):** ficam no campo `title` do convidado, separados do `name`. Assim a ligação com a programação continua usando só o nome, e o título aparece sozinho no card e na agenda.
- **Locais:** cada entrada de `places` vira um card em "Locais da SASI" (seção do local) e um botão de destaque na agenda, nos convidados e nos minicursos. A chave da entrada é o texto usado no campo `place` da programação. O botão abre uma janela com logo, descrição, links, agradecimento, carrossel de fotos e mapa. Campos:
  - `kicker`, `name` e `subtitle`: textos do topo (andar, prédio etc.).
  - `logo` e `logoSize: [largura, altura]` do arquivo; `logoDark: true` para logo claro, que aparece sobre fundo escuro.
  - `about`: descrição do local ou do projeto. `links`: `[{ type: "instagram" | "site", url }]`, com `owner` opcional quando o perfil é de outra marca (ex.: o Instagram do SebraeLab na página do Centro de Convivência).
  - `thanks: { theme, icon, badge, title, text }`: o agradecimento, que aparece numa caixa estilo RPG e é "digitado" letra por letra. `theme` escolhe o visual em `styles.css` (`sebrae`, `pavic`, `web` ou `nave`; sem tema fica rosa com corações), `icon` é um ícone pixel do sprite (ex.: `rocket`) e `badge` é o selo do canto.
  - `photos: [{ src, alt, caption }]`: as fotos passam sozinhas a cada 4 s (constante `SLIDE_MS` em `src/main.js`), sem setas. Pausam com o mouse em cima, trocam ao deslizar o dedo ou pelos pontinhos. Enquanto estiver vazio, o carrossel mostra "Fotos do local em breve".
  - `lat`/`lng` (ponto exato) ou `query` (busca), e `mapsUrl` (link de rota).
- **Fotos dos locais:** salve em `assets/labs/<local>/` como WebP com até 1200 px de largura (qualidade ~80). Logos com o dobro do tamanho exibido (cerca de 112 px de altura).
- **VI WPPGCC (evento dentro da SASI):** os dados do workshop ficam em `wppgcc`, em `src/data.js`: nome, logo (`assets/ppgcc-logo.webp`), Instagram, site, descrição e agradecimento. Na programação, as atividades com `track: "wppgcc"` aparecem juntas num "cartucho" especial, junto com os intervalos entre elas. As pesquisas de cada sessão ficam em `talks: [{ title, by }]` e são numeradas em ordem. O filtro "VI WPPGCC" mostra só o workshop, as abas dos dias com workshop ganham o selo WPPGCC e o botão "Sobre o PPGCC" abre a janela do programa. Nos cards dos convidados, as atividades do workshop ganham a tag WPPGCC (ao lado da data) e mostram o título da pesquisa da própria pessoa.
- **Parceiros:** ao clicar num parceiro abre uma janela com o logo, a cota, a descrição, um agradecimento e o botão do Instagram. Cada item de `partners` aceita `logoDark: true` (logo claro sobre fundo escuro) e `thanks: { theme, icon, badge, title, text }`, igual aos locais. Os temas dos parceiros ficam em `styles.css`, na seção "Agradecimentos dos parceiros" (`ufac`, `casi`, `lasi`, `awsbg`, `ieee`, `sebraep`, `moto`, `semfronteiras`, `aws`, `hub`, `ima` e `cachos`).
- **Ícones pixel:** os ícones do site são um sprite SVG embutido no início do `index.html` (`<symbol id="px-...">`), usados com `<svg class="px-icon"><use href="#px-nome"></use></svg>`. A cor principal vem de `color` e a de destaque de `--px-accent`.
- **Segredos e troféus:** a lista fica em `ACHIEVEMENTS` (seção 8 de `src/main.js`). Cada segredo tem um `tier` (`bronze`, `silver` ou `gold`) e vale 50G, 100G ou 200G; com os 10 vem a platina (50G), somando 1000G. O progresso e a data de cada troféu ficam no `localStorage` do navegador.
- **Arte da platina:** `assets/share/conquista-sasi2026.jpg` (1080×1920, formato de status/story, com QR code para o site). Quem completa os 10 segredos vê a janela de parabéns com o botão de compartilhar: no celular abre a janela de compartilhar do sistema (WhatsApp → Meu status, Instagram → Story); no computador a imagem é baixada e o texto com o link é copiado. Para trocar a arte, substitua o arquivo mantendo o nome e o tamanho e troque o `?v=` dele em `SHARE_ART` (`src/main.js`) e no link de download (`index.html`).
- **Linktree:** o link `https://linktr.ee/sasiufac` aparece no rodapé e no chamado final.
- **Cache:** ao alterar CSS ou JS, troque o `?v=` em `index.html` (CSS e JS) e no `import` de `src/main.js`.

Para fotos novas de convidados, use WebP com cerca de 300 px no lado menor (qualidade ~82). A pasta `Info/` guarda o material interno (planilhas, currículos e planos com CPF) e está no `.gitignore`: ela não deve ser enviada ao repositório. O upload arrastando arquivos no site do GitHub ignora o `.gitignore`, então não arraste a pasta `Info/`.

## Referências

- [Cronograma SASI 2026](https://docs.google.com/spreadsheets/d/12EKpO2r8yDyjEWYG7r8ClESVPbKYGsxm/edit)
- [Identidade visual](https://canva.link/hcxd51q83ve4ke1)
- [SASI 2024](https://github.com/sasiufac/SASI2024)
- [SASI 2025](https://github.com/sasiufac/SASI2025)
