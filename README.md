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
- `src/data.js`: programação, minicursos e parceiros.
- `src/main.js`: interação dos filtros de programação, cards e menu móvel.
- `assets/favicon.svg`: ícone da página.
- `assets/logosasi.svg`: logotipo oficial SASI UFAC 2026.

## Manutenção de conteúdo

Edite os arrays `days`, `schedule`, `workshops` e `partners` em `src/data.js`. Atualize as informações em um pull request, revise e integre à main.

## Referências

- [Cronograma SASI 2026](https://docs.google.com/spreadsheets/d/12EKpO2r8yDyjEWYG7r8ClESVPbKYGsxm/edit)
- [Identidade visual](https://canva.link/hcxd51q83ve4ke1)
- [SASI 2024](https://github.com/sasiufac/SASI2024)
- [SASI 2025](https://github.com/sasiufac/SASI2025)
