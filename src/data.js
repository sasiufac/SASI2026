// SASI 2026 — programação conferida com a planilha "precronogramasasi2026.xlsx"
// (abas Cronograma e Detalhes) e com os planos de atividade dos convidados.
// Conferência: 13/11/2026. A escala de voluntários e as anotações de logística
// são internas e não entram na agenda pública.
export const days = [
  { id: "23", weekday: "SEG", name: "Segunda-feira" },
  { id: "24", weekday: "TER", name: "Terça-feira" },
  { id: "25", weekday: "QUA", name: "Quarta-feira" },
  { id: "26", weekday: "QUI", name: "Quinta-feira" },
  { id: "27", weekday: "SEX", name: "Sexta-feira" }
];

// Locais com página própria: abrem pelo botão do local na agenda, nos
// convidados e nos minicursos, e pelos cards "Locais da SASI".
// Fotos e logos ficam em assets/labs/ (WebP; fotos com até 1200 px de largura).
// Campos: kicker, name, subtitle, logo + logoSize [largura, altura do arquivo],
// logoDark (logo claro sobre fundo escuro), about, links (instagram/site),
// thanks { theme, icon, badge, title, text } (agradecimento; "theme" escolhe o
// visual em styles.css: sebrae, pavic, web ou nave; "icon" é um ícone pixel do
// sprite), photos [{ src, alt, caption }],
// lat/lng (ponto exato) ou query (busca) e mapsUrl (link de rota).
// A chave de cada local é o texto usado no campo "place" da programação.
const lab = file => "./assets/labs/" + file;
const BLOCO_PAVIC_WEB = { src: lab("bloco-pavic-webacademy.webp"), alt: "Fachada do bloco com as marcas UFAC, Motorola, Web Academy e PAVIC Lab" };

export const places = {
  "Centro de Convivência": {
    kicker: "PONTO DE ENCONTRO",
    name: "Centro de Convivência",
    subtitle: "SebraeLab · UFAC, Campus Rio Branco",
    logo: lab("centro/sebraelab-logo.webp"),
    logoSize: [290, 112],
    links: [{ type: "instagram", url: "https://www.instagram.com/sebraelab_ac/", owner: "SebraeLab" }],
    thanks: {
      theme: "sebrae", icon: "diamond", badge: "+30 VIDAS",
      title: "VALEU, SEBRAELAB!",
      text: "Obrigado por ser o palco principal da SASI! É aqui que a gente faz o credenciamento toda manhã, celebra os 30 anos de SI na UFAC e aprende a empreender com o Sebrae. Vocês ganharam +30 VIDAS e um lugar especial no nosso coração."
    },
    photos: [
      { src: lab("centro/sebraelab-evento.webp"), alt: "Grupo reunido no palco do SebraeLab, com a plateia sentada em frente" },
      { src: lab("centro/sebraelab-palestra.webp"), alt: "Palestra no SebraeLab, com o público sentado em cadeiras brancas" },
      { src: lab("centro/sebraelab-palco.webp"), alt: "Palco do SebraeLab com púlpito e telão" }
    ],
    lat: -9.955764,
    lng: -67.86623,
    mapsUrl: "https://maps.app.goo.gl/vh1PXfoVqWrhr7e2A?g_st=ac"
  },
  "Lab 01 PAVIC": {
    kicker: "LABORATÓRIO · 1º ANDAR",
    name: "PAVIC-Lab",
    subtitle: "Lab 01 · 1º andar · mesmo bloco do Web Academy",
    logo: lab("pavic/pavic-logo.webp"),
    logoSize: [420, 109],
    about: "Projeto público-privado de pesquisa e desenvolvimento em Visão e Inteligência Computacional da UFAC, com incentivos da Motorola e da Flextronics pela Lei de Informática. A equipe trabalha com redes neurais e IA aplicada, de imagens médicas à reconstrução de imagens HDR.",
    links: [
      { type: "instagram", url: "https://www.instagram.com/pavicufac/" },
      { type: "site", url: "https://www.ufac.br/pavic/o-projeto" }
    ],
    thanks: {
      theme: "pavic", icon: "eye", badge: "GRATIDÃO 99%",
      title: "VALEU, PAVIC!",
      text: "Agradecemos por abrir o Lab 01 para a SASI! Aqui as GPUs treinam redes neurais, e na sexta a equipe mostra de perto as pesquisas do laboratório. Nosso detector encontrou 99% de gratidão, e o 1% que sobrou é carinho."
    },
    photos: [
      { src: lab("pavic/pavic-sala.webp"), alt: "Sala do PAVIC-Lab com estações de trabalho e monitores" },
      { src: lab("pavic/pavic-corredor.webp"), alt: "Corredor do PAVIC-Lab com o letreiro da Motorola na parede" },
      { ...BLOCO_PAVIC_WEB, caption: "PAVIC-Lab no 1º andar e Web Academy no 2º" }
    ],
    lat: -9.956458,
    lng: -67.865235,
    mapsUrl: "https://maps.app.goo.gl/NF6P9y9st3yyWJb69"
  },
  "Web Academy": {
    kicker: "LABORATÓRIO · 2º ANDAR",
    name: "Web Academy",
    subtitle: "2º andar · mesmo bloco do PAVIC-Lab",
    logo: lab("webacademy/webacademy-logo.webp"),
    logoSize: [420, 71],
    logoDark: true,
    about: "O projeto Web Academy tem como objetivo formar recursos humanos com habilidades para conceber, projetar, implementar e testar aplicações de software voltadas para a Internet.",
    links: [
      { type: "instagram", url: "https://www.instagram.com/webacademy.ufac/" },
      { type: "site", url: "https://app.projetowebacademy.online/" }
    ],
    thanks: {
      theme: "web", icon: "terminal", badge: "200 OK",
      title: "<ValeuWebAcademy />",
      text: "Agradecemos pelo espaço no 2º andar! Pelo menos 6 convidados desta SASI passaram pelas turmas de vocês, e isso diz muito sobre quem vocês formam. Resposta da nossa gratidão: 200 OK, com carinho em loop infinito."
    },
    photos: [
      { src: lab("webacademy/webacademy-lab.webp"), alt: "Laboratório do Web Academy com fileiras de bancadas e a marca na parede" },
      { src: lab("webacademy/webacademy-sala-azul.webp"), alt: "Sala do Web Academy com parede azul, logo da Motorola e mesas" },
      { src: lab("webacademy/webacademy-sala-reuniao.webp"), alt: "Sala com mesa de reunião, cadeiras e TV na parede" },
      { ...BLOCO_PAVIC_WEB, caption: "Web Academy no 2º andar e PAVIC-Lab no 1º" }
    ],
    lat: -9.956458,
    lng: -67.865235,
    mapsUrl: "https://maps.app.goo.gl/NF6P9y9st3yyWJb69"
  },
  "NaveTech": {
    kicker: "LABORATÓRIO · 2º PISO",
    name: "NaveTech",
    subtitle: "Biblioteca Central da UFAC · 2º piso",
    logo: lab("navetech/navetech-logo.webp"),
    logoSize: [281, 112],
    about: "Laboratório ligado ao InovaLab UFAC e ao projeto Internet das Coisas (IoT) para a Indústria 4.0. O projeto oferece trilhas de Inteligência Artificial, IoT e Manufatura Aditiva, com acesso a dispositivos IoT, impressoras 3D e ferramentas de IA.",
    links: [
      { type: "instagram", url: "https://www.instagram.com/inovalab_ufac/" },
      { type: "site", url: "https://www.ufac.br/iot" }
    ],
    thanks: {
      theme: "nave", icon: "rocket", badge: "MISSÃO CUMPRIDA",
      title: "VALEU, NAVETECH!",
      text: "Obrigado por receber a tripulação da SASI a bordo, lá no 2º piso da Biblioteca Central! Entre impressoras 3D, sensores IoT e IA, essa nave leva a criatividade do Acre para outra órbita. Valeu pela carona, com muito carinho."
    },
    photos: [
      { src: lab("navetech/navetech-turma.webp"), alt: "Turma com notebooks nas mesas do NaveTech, com o painel N.A.V.E Tech na parede" }
    ],
    lat: -9.95519,
    lng: -67.864044,
    mapsUrl: "https://maps.app.goo.gl/7gpdLXmizNMcSZFU8"
  }
};

const AWS_TEAM = "Amanda Lemos de Souza, Bruna Soares Silva e Maxswell Emanoell Araújo de Melo";
const SAUDE_TEAM = "Gleice Beatriz Mourão Araújo, Isaque Costa Santarém, Kelvin do Nascimento Moreira, Mayara Silva de Sousa e Mirelle Campos Góis";
const PAVIC_TEAM = "Clécio Elias Silva e Silva, Cristopher Alexander Ochoa Villanueva, Gustavo de Souza Ferreti, Ian Oliveira Teixeira, Julio Sousa Martins e Lucas Hildelbrano Costa Carvalho";

// "time" e "endTime" usam HH:mm (alimentam <time datetime>). "extra" aceita
// "note" (aviso curto) e "seats" (capacidade prevista no plano de atividade).
const activity = (day, time, endTime, title, type, speaker = "", place = "Centro de Convivência", extra = {}) => ({
  day, time, endTime, title, type, speaker, place, ...extra
});

// VI Workshop de Pesquisa do PPGCC: um evento dentro da SASI. As atividades com
// track: "wppgcc" aparecem juntas num "cartucho" especial na programação, e as
// apresentações de cada sessão ficam em "talks" (conferido com a planilha
// WPPGCC.xlsx). A sessão extra das 12h, "se houver demanda", não entra.
export const wppgcc = {
  name: "VI Workshop de Pesquisa do PPGCC",
  short: "VI WPPGCC",
  org: "Mestrado em Ciência da Computação da UFAC",
  logo: "./assets/ppgcc-logo.webp",
  logoSize: [360, 147],
  instagram: "https://www.instagram.com/ppgcc_ufac/",
  site: "http://www2.ufac.br/ppgcc",
  description: "O programa de mestrado em Ciência da Computação (PPGCC/UFAC) é o terceiro na região norte do Brasil e o único no Estado do Acre. Criado para atender às demandas tecnológicas da região, oferece vagas nas áreas de Engenharia de Sistemas e Informação e Sistemas Computacionais Inteligentes. O programa desempenha um papel estratégico na formação de mão de obra qualificada, alcançando a região Sul da Amazônia Ocidental, incluindo Rondônia, sul do Amazonas, Bolívia e Peru. Além de promover pesquisas em tecnologia da informação e cooperação entre universidades e instituições, busca atrair investimentos em TI para a região, gerando empregos e negócios baseados em tecnologia. Os objetivos do programa são formar profissionais capacitados, promover intercâmbios e desenvolver habilidades de pesquisa científica e tecnológica nos graduados.",
  thanks: {
    theme: "ppgcc", icon: "flask", badge: "NÍVEL MESTRE", title: "VALEU, PPGCC!",
    text: "Obrigado por trazer a pesquisa para dentro da SASI! No único mestrado em Ciência da Computação do Acre, cada dissertação é uma nova fase desbloqueada para a tecnologia da região."
  }
};

const WP = { track: "wppgcc" };
const wpTalk = (title, by) => ({ title, by });
const WP_TALKS = [
  wpTalk("Análise de Conflitos de Merge em Sistemas Feitos com Agentes de Inteligência Artificial", "Álvaro Lopes Rios"),
  wpTalk("Feedback Semântico Localizado como Estratégia Pedagógica para Elicitação e Revisão de Requisitos Funcionais", "Christopher Ric Coelho Saar"),
  wpTalk("Reconstrução 3D de Ambientes Internos Baseada em Signed Distance Functions", "Clécio Elias Silva e Silva"),
  wpTalk("Abordagem baseada em aprendizado profundo para a reconstrução de vídeos HDR a partir de sequências de múltiplas exposições alternadas", "Cristopher Alexander Ochoa Villanueva"),
  wpTalk("Desenvolvimento de Abordagens de Baixo Custo Computacional Baseado em Redes Neurais Convolucionais para a Reconstrução de Imagens High Dynamic Range a partir de Múltiplas Exposições", "Gustavo de Souza Ferreti"),
  wpTalk("Ensino de Testes Exploratórios com SBTM: Estudo Empírico sobre o impacto do uso com Inteligência Artificial", "Jayra Nascimento Bandeira Bezerra"),
  wpTalk("Modelo Baseado em Aprendizado Profundo para Reconstrução HDR a partir de uma Única Exposição LDR com Recuperação de Detalhes em Regiões com Perda de Informação", "Lucas Hildelbrano Costa Carvalho"),
  wpTalk("Adaptação de Hiper-heurísticas Mono-objetivo para Otimização Multi-objetivo", "Victor Alexandre Lima Ribeiro"),
  wpTalk("Hiper-heurística Multiobjetivo Guiada por Modelos de Linguagem para a Geração de Estratégias de Redução de Mutantes", "Dayan Freitas Alves")
];
const joinNames = names => (names.length > 1 ? names.slice(0, -1).join(", ") + " e " + names[names.length - 1] : names[0] || "");
// O "speaker" com os nomes liga cada apresentação ao card do convidado.
const wpSession = (day, time, endTime, n, talks) =>
  activity(day, time, endTime, `Apresentações de pesquisas de mestrado · Sessão ${n}`, "Apresentação", joinNames(talks.map(t => t.by)), "Centro de Convivência", { ...WP, talks });

export const schedule = [
  // Segunda-feira, 23/11
  activity("23", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("23", "08:00", "08:30", "Solenidade Comemorativa de 30 Anos", "Institucional", "Cerimonial: Clécio Elias Silva e Silva"),
  activity("23", "08:30", "09:30", "Conversando com quem começou essa jornada", "Mesa-redonda", "Valmir Saraiva de Oliveira, Olacir Rodrigues Castro Junior, Laura Costa Sarkis e Daricelio Moreira Soares · Mediação: João Gabriel Santana de Sousa"),
  activity("23", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("23", "09:45", "10:45", "Computação Gráfica, Jogos Ultrarealísticos e Inteligência Artificial", "Palestra", "Manuel Menezes de Oliveira Neto"),
  activity("23", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("23", "11:00", "12:00", "Iniciativas estudantis: Protagonismo Estudantil e Inovação Tecnológica na UFAC", "Palestra", "Dayan Freitas Alves"),
  activity("23", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("23", "14:00", "16:00", "Introdução à Pixel Art para Jogos", "Minicurso", "Felipe de Pádua Silva e Clara Serena Farias Simione", "", { seats: "20" }),
  activity("23", "14:00", "16:00", "Uma Breve Introdução a Deep Learning — Especial Mulheres", "Minicurso", "Manuel Menezes de Oliveira Neto", "Lab 01 PAVIC", { note: "Atividade do projeto de extensão WIE Vision Academy" }),
  activity("23", "16:00", "18:30", "Da Ideia ao Pitch — Oficina Prática de Apresentação de Produtos", "Oficina", "Kaio Oliveira de Almeida", "", { seats: "20" }),
  activity("23", "17:00", "", "Abertura SASI: Game Jam", "Game Jam", "", "", { note: "Divulgação do tema e dos desafios" }),

  // Terça-feira, 24/11
  activity("24", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("24", "08:00", "09:30", "Mesa-redonda: Parcerias Público-Privadas e Convênios Tecnológicos — Desafios de Gestão e Benefícios para a Comunidade Acadêmica", "Mesa-redonda", "Daricelio Moreira Soares, Laura Costa Sarkis e Ana Beatriz Alvarez Mamani · Mediação: João Gabriel Santana de Sousa"),
  activity("24", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("24", "09:45", "10:45", "Atividade a confirmar", "A confirmar"),
  activity("24", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("24", "11:00", "12:00", "A Evolução dos Direitos Humanos, a Internet como Direito Fundamental e os Desafios do Manejo Digital", "Palestra", "Sabrina Cassol e Gean Wenderson Sampaio Rebouças"),
  activity("24", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("24", "14:00", "17:00", "Introdução à Godot — Crie seu primeiro jogo", "Minicurso", "Luís Geovani de Lima Moraes e Caio Gabriel Pontes de Albuquerque", "", { seats: "20" }),
  activity("24", "14:00", "17:00", "Treinamento em Engenharia Artificial — Módulo 1: A Inferência em Modelos Locais de Inteligência Artificial", "Minicurso", "Lucas (HEADSCON)", ""),

  // Quarta-feira, 25/11
  activity("25", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("25", "08:00", "09:30", "Aplicações e Desafios da Inteligência Artificial e dos Sistemas Inteligentes em Tecnologias Aeroespaciais", "Palestra", "Elcio Hideiti Shiguemori", "Centro de Convivência", WP),
  activity("25", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  wpSession("25", "09:45", "10:45", 1, WP_TALKS.slice(0, 3)),
  activity("25", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  wpSession("25", "11:00", "12:00", 2, WP_TALKS.slice(3, 6)),
  activity("25", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("25", "14:00", "16:00", "Visão Computacional e Reconhecimento Facial na Nuvem com Amazon Rekognition", "Minicurso", AWS_TEAM, "", { note: "Para estudantes de cursos de computação" }),
  activity("25", "14:00", "16:00", "Docker para Desenvolvedores", "Minicurso", "Flora Oliveira França", "", { seats: "15 a 25" }),

  // Quinta-feira, 26/11
  activity("26", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("26", "08:00", "09:30", "Inovação que transforma: Da faculdade ao mercado de trabalho", "Palestra", "SEBRAE"),
  activity("26", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("26", "09:45", "10:45", "Do sonho ao negócio: Seja protagonista da sua história", "Palestra", "SEBRAE"),
  activity("26", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  wpSession("26", "11:00", "12:00", 3, WP_TALKS.slice(6, 9)),
  activity("26", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("26", "14:00", "18:00", "Saúde Digital", "Minicurso", SAUDE_TEAM, ""),
  activity("26", "15:00", "", "Término SASI: Game Jam", "Game Jam", "", "On-line · itch.io", { note: "Prazo final de envio dos jogos" }),
  activity("26", "16:00", "18:00", "Inteligência Artificial na Pesquisa Científica: explorando o LeapSpace na prática", "Minicurso", "Guilherme Félix Cavalcante", "", { seats: "20" }),

  // Sexta-feira, 27/11
  activity("27", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("27", "08:00", "08:30", "Despedida", "Institucional"),
  activity("27", "08:30", "09:30", "Palestra nacional — HEADSCON (tema a confirmar)", "Palestra", "HEADSCON"),
  activity("27", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("27", "09:45", "10:45", "Games e o Futuro do Trabalho na Era da IA", "Palestra", "Marcelo Minutti"),
  activity("27", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("27", "11:00", "12:00", "Sessão de Avaliação, Exibição de Protótipos e Premiação — SASI: Game Jam", "Game Jam", "Comissão avaliadora da Game Jam"),
  activity("27", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("27", "14:00", "18:00", "Conhecendo na Prática os Projetos e Pesquisas em Desenvolvimento pelo PAVIC", "Minicurso", "Equipe PAVIC: " + PAVIC_TEAM, "Lab 01 PAVIC", { seats: "20 a 30" }),
  activity("27", "16:00", "18:00", "AWS Lambda e S3: Automação Orientada a Eventos na Prática", "Minicurso", AWS_TEAM, "", { note: "Para estudantes de ensino superior em computação" })
];

export const workshops = [
  {
    title: "Introdução à Pixel Art para Jogos",
    day: "Segunda, 23/11", time: "14h–16h", icon: "pencil", seats: "20",
    description: "Fundamentos de pixel art e criação de sprites no LibreSprite: espaço de trabalho, ferramentas de desenho e camadas.",
    speaker: "Felipe de Pádua Silva e Clara Serena Farias Simione"
  },
  {
    title: "Uma Breve Introdução a Deep Learning — Especial Mulheres",
    day: "Segunda, 23/11", time: "14h–16h", icon: "network", place: "Lab 01 PAVIC",
    description: "Os conceitos fundamentais de deep learning, de forma intuitiva, para as participantes do projeto de extensão WIE Vision Academy.",
    speaker: "Manuel Menezes de Oliveira Neto"
  },
  {
    title: "Da Ideia ao Pitch — Oficina Prática de Apresentação de Produtos",
    day: "Segunda, 23/11", time: "16h–18h30", icon: "rocket", seats: "20",
    description: "Como mostrar o valor de um produto em até 1 minuto: estrutura do pitch, ensaio, feedback e apresentação, junto com os makers do programa Do Maker à Indústria.",
    speaker: "Kaio Oliveira de Almeida"
  },
  {
    title: "Introdução à Godot — Crie seu primeiro jogo",
    day: "Terça, 24/11", time: "14h–17h", icon: "gamepad", seats: "20",
    description: "Godot Engine na prática: cenas, nós e GDScript para montar um jogo simples. Um bom aquecimento para a Game Jam.",
    speaker: "Luís Geovani de Lima Moraes e Caio Gabriel Pontes de Albuquerque"
  },
  {
    title: "Treinamento em Engenharia Artificial — Módulo 1: A Inferência em Modelos Locais de Inteligência Artificial",
    day: "Terça, 24/11", time: "14h–17h", icon: "chip",
    description: "",
    speaker: "Lucas (HEADSCON)"
  },
  {
    title: "Visão Computacional e Reconhecimento Facial na Nuvem com Amazon Rekognition",
    day: "Quarta, 25/11", time: "14h–16h", icon: "eye", requirement: "Para estudantes de cursos de computação",
    description: "Análise de imagens, leitura de texto (OCR), atributos faciais e busca de rostos com o Amazon Rekognition, pelo console e pela AWS CLI.",
    speaker: AWS_TEAM
  },
  {
    title: "Docker para Desenvolvedores",
    day: "Quarta, 25/11", time: "14h–16h", icon: "terminal", seats: "15 a 25", requirement: "Noções básicas de terminal e de programação",
    description: "Conteinerização na prática: imagens, containers, Dockerfile e Docker Compose, do ambiente no Windows com WSL 2 ou no Linux até uma aplicação web rodando em container.",
    speaker: "Flora Oliveira França"
  },
  {
    title: "Saúde Digital",
    day: "Quinta, 26/11", time: "14h–18h", icon: "health",
    description: "",
    speaker: SAUDE_TEAM
  },
  {
    title: "Inteligência Artificial na Pesquisa Científica: explorando o LeapSpace na prática",
    day: "Quinta, 26/11", time: "16h–18h", icon: "book", seats: "20",
    description: "IA como apoio à pesquisa com o LeapSpace, da Elsevier: busca de literatura, leitura assistida, comparação de artigos e verificação das fontes.",
    speaker: "Guilherme Félix Cavalcante"
  },
  {
    title: "Conhecendo na Prática os Projetos e Pesquisas em Desenvolvimento pelo PAVIC",
    day: "Sexta, 27/11", time: "14h–18h", icon: "flask", seats: "20 a 30", place: "Lab 01 PAVIC",
    description: "O PAVIC-Lab por dentro: linhas de pesquisa, infraestrutura com GPUs e os fundamentos de IA, aprendizado profundo e computação de alto desempenho.",
    speaker: "Equipe PAVIC"
  },
  {
    title: "AWS Lambda e S3: Automação Orientada a Eventos na Prática",
    day: "Sexta, 27/11", time: "16h–18h", icon: "cloud", requirement: "Para estudantes de ensino superior em computação",
    description: "Computação serverless na prática: criar uma função Lambda, ler os logs no CloudWatch e disparar automações a partir de uploads no S3.",
    speaker: AWS_TEAM
  }
];

// Patrocínios seguem a classificação institucional já utilizada no site.
// "theme: dark" usa o card escuro; "outline" desenha um contorno fino no logo.
// Na janela do parceiro: "logoDark" põe o logo sobre fundo escuro e "thanks"
// { theme, icon, badge, title, text } é o agradecimento (temas em styles.css).
export const partners = [
  {
    tier: "Diamante",
    items: [
      { name: "UFAC", logo: "./assets/partners/ufac.webp", url: "https://www.instagram.com/ufac_oficial/", description: "Universidade pública federal do Acre, dedicada ao ensino, à pesquisa e à extensão.", thanks: { theme: "ufac", icon: "book", badge: "+30 ANOS", title: "VALEU, UFAC!", text: "Obrigado por ser a nossa casa! São 30 anos de Sistemas de Informação formando gente que transforma o Acre com tecnologia. Do primeiro level ao último, a SASI existe porque a UFAC abre as portas para ensino, pesquisa e extensão." } }
    ]
  },
  {
    tier: "Platinum",
    items: [
      { name: "CASI", logo: "./assets/partners/casi.webp", url: "https://www.instagram.com/casi.ufac/", description: "Centro Acadêmico de Sistemas de Informação da UFAC, espaço de representação e integração estudantil.", thanks: { theme: "casi", icon: "player", badge: "PLAYER 2", title: "VALEU, CASI!", text: "Obrigado por representar a galera de SI e fazer a ponte entre estudantes e curso! Toda partida boa precisa de um player 2, e na SASI esse player são vocês." } },
      { name: "LASI", logo: "./assets/partners/lasi.webp", url: "https://www.instagram.com/lasi.ufac/", description: "Liga Acadêmica de Sistemas de Informação da UFAC, dedicada à formação e ao compartilhamento de conhecimentos em tecnologia.", thanks: { theme: "lasi", icon: "gamepad", badge: "SKILL UP", title: "VALEU, LASI!", text: "Obrigado por espalhar conhecimento e incentivar cada estudante a subir de nível! Com a LASI, curiosidade vira skill, e skill vira projeto." } },
      { name: "AWS Builder Group", logo: "./assets/partners/aws-builder-group.webp", url: "https://www.instagram.com/awssbgufac/", description: "Comunidade liderada por estudantes da UFAC, com foco em aprendizado prático e projetos de computação em nuvem com AWS.", thanks: { theme: "awsbg", icon: "terminal", badge: "BUILD OK", title: "VALEU, BUILDERS!", text: "Obrigado por mostrar que estudante também constrói na nuvem! Cada projeto da comunidade é mais um bloco na UFAC, e juntos a gente empilha até o topo." } },
      { name: "IEEE", logo: "./assets/partners/ieee.webp", url: "https://www.instagram.com/ramo_ieee_ufac/", description: "Ramo estudantil do IEEE na UFAC, que conecta estudantes a iniciativas e comunidades de engenharia e tecnologia.", thanks: { theme: "ieee", icon: "network", badge: "CONECTADO", title: "VALEU, IEEE!", text: "Obrigado, Ramo Estudantil IEEE UFAC, por ligar a SASI a uma rede mundial de engenharia e tecnologia! Com vocês, todo circuito fecha e a corrente de ideias não para." } },
      { name: "Sebrae", logo: "./assets/partners/sebrae.svg", url: "https://www.instagram.com/sebraenoacre/", description: "Serviço de apoio às micro e pequenas empresas no Acre, com capacitação, consultoria e incentivo a quem empreende.", thanks: { theme: "sebraep", icon: "rocket", badge: "MODO EMPREENDER", title: "VALEU, SEBRAE!", text: "Obrigado por apoiar a SASI e por acreditar em quem empreende no Acre! Com vocês, uma boa ideia é só o primeiro level: o resto do jogo é transformar ela em negócio." } }
    ]
  },
  {
    tier: "Esmeralda",
    items: [
      { name: "Motorola", logo: "./assets/partners/motorola.webp", url: "https://www.instagram.com/motorolabr/", description: "Marca de tecnologia reconhecida pelo desenvolvimento de smartphones e dispositivos conectados.", thanks: { theme: "moto", icon: "phone", badge: "HELLO MOTO", title: "HELLO, MOTOROLA!", text: "Obrigado por apoiar a SASI e por apostar em tecnologia e inovação! Dos smartphones aos dispositivos conectados, vocês mostram que o futuro cabe na palma da mão. Hello Moto, hello futuro!" } }
    ]
  },
  {
    tier: "Ouro",
    items: [
      { name: "Sem Fronteiras", logo: "./assets/partners/sem-fronteiras.webp", outline: true, url: "https://www.instagram.com/semfronteirasac/", description: "Empresa de telecomunicações que oferece serviços de internet e conectividade no Acre.", logoDark: true, thanks: { theme: "semfronteiras", icon: "wifi", badge: "SINAL 100%", title: "VALEU, SEM FRONTEIRAS!", text: "Obrigado por apoiar a SASI e por manter o Acre conectado! Afinal, sem internet não tem Game Jam, não tem deploy e não tem live. Com vocês, a conexão fica com todas as barrinhas." } },
      { name: "AWS", logo: "./assets/partners/AWS_Logo.svg", url: "https://www.instagram.com/amazonwebservices/", description: "Amazon Web Services: serviços de computação em nuvem para aplicações, armazenamento, dados e inteligência artificial.", thanks: { theme: "aws", icon: "cloud", badge: "CLOUD ON", title: "VALEU, AWS!", text: "Obrigado por apoiar a SASI e por colocar a tecnologia nas nuvens! Com a AWS, uma ideia que nasce num notebook pode escalar para o mundo inteiro. Que venham muitos deploys!" } },
      { name: "HUB ACRE", logo: "./assets/partners/hubacre.webp", url: "", description: "Hub de inovação do Estado do Acre, que conecta empreendedores, startups, instituições e poder público em ações de tecnologia, games, impressão 3D e economia criativa.", thanks: { theme: "hub", icon: "rocket", badge: "START UP!", title: "VALEU, HUB ACRE!", text: "Obrigado por apoiar a SASI e por conectar quem cria a quem faz acontecer! Tecnologia, games e economia criativa ganham força quando todo mundo joga no mesmo time. Bora dar START nas startups do Acre!" } },
      { name: "Instituto Mercosul Amazônia", logo: "./assets/partners/ima.webp", url: "https://www.instagram.com/ima.oficial/", description: "Instituto que desenvolve projetos de inovação, empreendedorismo e desenvolvimento regional, construindo parcerias estratégicas na Amazônia.", thanks: { theme: "ima", icon: "leaf", badge: "RAIZ FORTE", title: "VALEU, IMA!", text: "Obrigado, Instituto Mercosul Amazônia, por cultivar inovação com raízes na floresta! Parcerias assim fazem a tecnologia do Acre crescer forte, igual samaúma." } }
    ]
  },
  {
    tier: "Bronze",
    items: [
      { name: "Dona Cachos", logo: "./assets/partners/dona-cachos.webp", url: "https://www.instagram.com/donnacachosoficial/", description: "Espaço especializado em cuidados e valorização de cabelos crespos, cacheados e ondulados.", thanks: { theme: "cachos", icon: "scissors", badge: "+100 CHARME", title: "VALEU, DONA CACHOS!", text: "Obrigado por apoiar a SASI com tanto carinho! Vocês mostram que autoestima também dá XP: cada cacho é único, igual a cada player desta semana." } }
    ]
  }
];

// Convidados: biografias resumidas a partir do Lattes, do LinkedIn e dos
// planos de atividade (pasta Info, que não é publicada). As atividades de cada
// pessoa (dia, horário e local) são ligadas automaticamente pela programação.
// Enquadramento das fotos: "photoPosition" (object-position) e, quando
// necessário, "photoTranslate" + "photoScale" (zoom a partir do centro).
const lattes = id => ({ type: "lattes", url: "https://lattes.cnpq.br/" + id });
const linkedin = slug => ({ type: "linkedin", url: "https://www.linkedin.com/in/" + slug });
const photo = slug => "./assets/inviteds/" + slug + ".webp";

export const guests = [
  {
    name: "Laura Costa Sarkis", title: "Prof.ª Dr.ª", role: "Mesa-redonda",
    affiliation: "UFAC · Professora titular de Sistemas de Informação e do Mestrado em Ciência da Computação",
    bio: "Doutora em Ciência da Computação pela UFF e mestre pela UFSC, é professora da UFAC desde 1996. Pesquisa engenharia de requisitos, metodologias ativas de ensino e educação em computação.",
    photo: photo("laura-costa-sarkis"), photoPosition: "50% 34%", photoTranslate: "-8%, 5%", photoScale: 1.15,
    links: [lattes("6846153302568344")]
  },
  {
    name: "Valmir Saraiva de Oliveira", role: "Mesa-redonda",
    affiliation: "UFAC · Docente de 1979 a 2008",
    bio: "Licenciado em Matemática pela UFAC, especialista em Matemática e em Análise de Sistemas e mestre em Ciência da Computação pela UFSC. Atuou como professor universitário de 1979 a 2008.",
    photo: photo("valmir-saraiva-de-oliveira"), photoPosition: "50% 26%", photoTranslate: "2%, 1%", photoScale: 1.03,
    links: [lattes("1618079243544282")]
  },
  {
    name: "Olacir Rodrigues Castro Junior", title: "Prof. Dr.", role: "Mesa-redonda",
    affiliation: "UFAC · Professor do CCET e do Mestrado em Ciência da Computação",
    bio: "Bacharel em Sistemas de Informação pela UFAC, mestre em Informática e doutor em Ciência da Computação pela UFPR. Atua em inteligência computacional e orienta pesquisas em aprendizado profundo.",
    photo: photo("olacir-rodrigues-castro-junior"), photoPosition: "58% 50%", photoTranslate: "0%, 3%", photoScale: 1.06,
    links: [lattes("1893693615984125")]
  },
  {
    name: "João Gabriel Santana de Sousa", role: "Mediador das mesas-redondas",
    affiliation: "UFAC · Graduando em Sistemas de Informação",
    bio: "Estudante do 5º período de Sistemas de Informação, com três anos de experiência em desenvolvimento de software. Pesquisa visão computacional e deep learning para detectar sonolência em motoristas.",
    photo: photo("joao-gabriel-santana-de-sousa"), photoPosition: "50% 32%", photoTranslate: "5%, -3%", photoScale: 1.85,
    links: [lattes("4076560803482553")]
  },
  {
    name: "Manuel Menezes de Oliveira Neto", title: "Prof. Dr.", role: "Palestrante e ministrante",
    affiliation: "UFRGS · Professor Titular do Instituto de Informática",
    bio: "Doutor pela University of North Carolina at Chapel Hill e professor visitante do MIT Media Lab em 2009–2010. Pesquisa computação gráfica, processamento de imagens, IA e fotografia computacional; recebeu o Prêmio Pesquisador Gaúcho 2016.",
    photo: photo("manuel-menezes-de-oliveira-neto"), photoPosition: "50% 34%", photoTranslate: "0%, 1%", photoScale: 1,
    links: [
      { type: "lattes", url: "https://buscatextual.cnpq.br/buscatextual/visualizacv.do?id=K4728001D2" },
      { type: "scholar", url: "https://scholar.google.com/citations?user=f2UrnmAAAAAJ" },
      { type: "site", url: "http://www.inf.ufrgs.br/~oliveira", label: "Página acadêmica" }
    ]
  },
  {
    name: "Dayan Freitas Alves", role: "Palestrante",
    affiliation: "UFAC · Mestrando em Ciência da Computação e especializando em Engenharia de Testes de Software com IA",
    bio: "Bacharel em Sistemas de Informação pela UFAC, mestrando em Ciência da Computação e aluno da especialização em Engenharia de Testes de Software com Inteligência Artificial. Atua com programação, análise de dados e gestão de projetos, com foco em banco de dados e inteligência artificial.",
    photo: photo("dayan-freitas-alves"), photoPosition: "50% 50%", photoTranslate: "-3%, 2%", photoScale: 1.08,
    links: [lattes("3295624815461329"), linkedin("dayanfa")]
  },
  {
    name: "Felipe de Pádua Silva", role: "Ministrante",
    affiliation: "Minicurso de Pixel Art · LASI",
    photo: ""
  },
  {
    name: "Clara Serena Farias Simione", role: "Ministrante",
    affiliation: "UFAC · Graduanda em Sistemas de Informação",
    bio: "Estudante do 5º período de Sistemas de Informação na UFAC, fez a capacitação full stack do Web Academy. Tem foco em desenvolvimento web, com front-end em Angular e design UX/UI.",
    photo: photo("clara-serena-farias-simione"),
    links: [lattes("2804249202889262")]
  },
  {
    name: "Sabrina Cassol", title: "Prof.ª Dr.ª", role: "Palestrante",
    affiliation: "UFAC · Professora adjunta do Curso de Direito",
    bio: "Doutora em Direito pela UnB e mestre pela UNISC. Advogada e docente das pós-graduações em Gestão do Sistema Penitenciário e Direitos Humanos e em Direito do Estado e Políticas Públicas da UFAC.",
    photo: photo("sabrina-cassol"), photoPosition: "50% 18%", photoTranslate: "1%, 0%", photoScale: 1.24,
    links: [lattes("3538062591852177")]
  },
  {
    name: "Gean Wenderson Sampaio Rebouças", role: "Palestrante",
    affiliation: "UFAC · Licenciatura em Ciências Biológicas",
    bio: "Estagiário do Laboratório de Pesquisas Paleontológicas e do museu da UFAC. Participa de projetos de pesquisa e de divulgação científica.",
    photo: photo("gean-wenderson-sampaio-reboucas"), photoPosition: "50% 45%",
    links: [lattes("2271433135854796")]
  },
  {
    name: "Luís Geovani de Lima Moraes", role: "Ministrante",
    affiliation: "UFAC · Graduando em Sistemas de Informação",
    bio: "Desenvolvedor front-end com Angular, Bootstrap, JavaScript/TypeScript e prototipação no Figma. Formado na capacitação Web Full-Stack do Web Academy (UFAC e Motorola), coordenou o desenvolvimento de um software de análise temporal de regras de associação.",
    photo: photo("luis-geovani-de-lima-moraes"),
    links: [lattes("1422606374376168")]
  },
  {
    name: "Caio Gabriel Pontes de Albuquerque", role: "Ministrante",
    affiliation: "UFAC · Graduando em Sistemas de Informação",
    bio: "Estudante de Sistemas de Informação na UFAC desde 2024. Na SASI, ministra pela LASI o minicurso de introdução à Godot, junto com Luís Geovani.",
    photo: photo("caio-gabriel-pontes-de-albuquerque"),
    links: [lattes("8242385965340751")]
  },
  {
    name: "Lucas (HEADSCON)", role: "Ministrante",
    affiliation: "HEADSCON",
    photo: ""
  },
  {
    name: "Elcio Hideiti Shiguemori", title: "Prof. Dr.", role: "Palestrante",
    affiliation: "IEAv/DCTA · Pesquisador titular e docente no INPE e no ITA",
    bio: "Doutor em Computação Aplicada pelo INPE, é pesquisador do Instituto de Estudos Avançados e docente das pós-graduações do INPE e do ITA. Trabalha com IA, aprendizado de máquina, visão computacional e navegação aérea autônoma.",
    photo: photo("elcio-hideiti-shiguemori"), photoPosition: "50% 50%", photoTranslate: "0%, 7%", photoScale: 1.05,
    links: [lattes("7243145638158319"), linkedin("elcio-hideiti-shiguemori-276359127")]
  },
  {
    name: "Amanda Lemos de Souza", role: "Ministrante",
    affiliation: "Poder Judiciário do Acre · Desenvolvedora front-end",
    bio: "Desenvolvedora front-end (JavaScript, TypeScript, Angular e React) e tecnóloga em Redes de Computadores pelo IFAC. Estagia com desenvolvimento e BI no Judiciário acreano e já atuou como monitora de robótica.",
    photo: photo("amanda-lemos-de-souza"),
    links: [linkedin("amanda-lemos-dev-frontend"), lattes("8200344597088589")]
  },
  {
    name: "Bruna Soares Silva", role: "Ministrante",
    affiliation: "UFAC · Especialização em Engenharia de Testes com IA",
    bio: "Bacharela em Sistemas de Informação pela UFAC e especializanda em Engenharia de Testes com Inteligência Artificial.",
    photo: photo("bruna-soares-silva"), photoPosition: "50% 11%", photoTranslate: "6%, 5%", photoScale: 1.22,
    links: [linkedin("bruna-soares-82315b234"), lattes("9444526444477657")]
  },
  {
    name: "Maxswell Emanoell Araújo de Melo", role: "Ministrante",
    affiliation: "Creditas · Software Engineer II",
    bio: "Engenheiro de software com cerca de 4 anos em backend e arquitetura, com Kotlin, Java e AWS. Desenvolve APIs de decisão de crédito e integra agentes de IA ao processo de desenvolvimento.",
    photo: photo("maxswell-emanoell-araujo-de-melo"), photoPosition: "50% 50%", photoTranslate: "0%, 0%", photoScale: 1,
    links: [linkedin("maxswell-araujo")]
  },
  {
    name: "Flora Oliveira França", role: "Ministrante",
    affiliation: "Prefeitura de Rio Branco (SDTI) · Analista de Tecnologia da Informação",
    bio: "Desenvolvedora full stack com Java, Spring Boot, Angular e APIs REST. Formada em Sistemas para Internet e técnica em Redes de Computadores pelo IFAC, concluiu a capacitação Web Full-Stack do Web Academy e competiu na Maratona Feminina de Programação e na Maratona ICPC.",
    photo: photo("flora-oliveira-franca"),
    links: [linkedin("flora-fran%C3%A7a-827030266")]
  },
  { name: "Gleice Beatriz Mourão Araújo", role: "Ministrante", affiliation: "Minicurso de Saúde Digital", photo: "" },
  { name: "Isaque Costa Santarém", role: "Ministrante", affiliation: "Minicurso de Saúde Digital", photo: "" },
  { name: "Kelvin do Nascimento Moreira", role: "Ministrante", affiliation: "Minicurso de Saúde Digital", photo: "" },
  { name: "Mayara Silva de Sousa", role: "Ministrante", affiliation: "Minicurso de Saúde Digital", photo: "" },
  { name: "Mirelle Campos Góis", role: "Ministrante", affiliation: "Minicurso de Saúde Digital", photo: "" },
  {
    name: "Clécio Elias Silva e Silva", role: "Cerimonial e equipe PAVIC",
    affiliation: "UFAC · Professor substituto e pesquisador do PAVIC",
    bio: "Mestrando em Ciência da Computação na UFAC e pesquisador do PAVIC desde 2022. No TCC, criou um modelo compacto de deep learning para identificar doenças e pragas em folhas de café.",
    photo: photo("clecio-elias-silva-e-silva"), photoPosition: "50% 50%", photoTranslate: "1%, 3%", photoScale: 1.04,
    links: [lattes("4595049657680778")]
  },
  {
    name: "Guilherme Félix Cavalcante", role: "Ministrante",
    affiliation: "UFAC · Graduando em Sistemas de Informação e bolsista PIBIT/CNPq",
    bio: "Pesquisa jogos digitais para a saúde, prototipados em ambiente de Game Jam, e aplica ciência de dados e IA em projetos interdisciplinares. Foi desenvolvedor full-stack no programa WebAcademy (Motorola e UFAC).",
    photo: photo("guilherme-felix-cavalcante"), photoPosition: "50% 50%", photoTranslate: "2%, 1%", photoScale: 1.08,
    links: [lattes("3416104383970740")]
  },
  {
    name: "Daricelio Moreira Soares", title: "Prof. Dr.", role: "Mesa-redonda",
    affiliation: "UFAC · Professor associado do CCET",
    bio: "Doutor em Ciência da Computação pela UFF, mestre em Desenvolvimento Regional e bacharel em Sistemas de Informação pela UFAC. Pesquisa mineração de repositórios de software, desenvolvimento colaborativo e sistemas de apoio à decisão.",
    photo: photo("daricelio-moreira-soares"), photoPosition: "50% 48%", photoTranslate: "-2%, 0%", photoScale: 1.18,
    links: [lattes("7376671815596508")]
  },
  {
    name: "Ana Beatriz Alvarez Mamani", title: "Prof.ª Dr.ª", role: "Mesa-redonda",
    affiliation: "UFAC · Professora da Engenharia Elétrica e do PPGCC; coordenadora do PAVIC-Lab",
    bio: "Mestre e doutora em Engenharia Elétrica pela Unicamp, com doutorado sanduíche na Universidad de Alcalá (Espanha). Desde 2022 coordena o PAVIC-Lab, no convênio UFAC, Motorola e Flextronics.",
    photo: photo("ana-beatriz-alvarez-mamani"), photoPosition: "50% 24%", photoTranslate: "-2%, 2%", photoScale: 1.08,
    links: [lattes("2945180266108059")]
  },
  {
    name: "Kaio Oliveira de Almeida", role: "Facilitador da oficina",
    affiliation: "HUB ACRE · Coordenador; Instituto Mercosul Amazônia · Diretor-presidente",
    bio: "Empreendedor e executivo com atuação em gestão, tecnologia e inovação na iniciativa privada, no setor público e no terceiro setor. Coordena o HUB ACRE, preside o Instituto Mercosul Amazônia e é CEO da Almo.",
    photo: photo("kaio-oliveira-de-almeida"), photoPosition: "50% 45%",
    links: [linkedin("kaio-oliveira-de-almeida-684454b7")]
  },
  {
    name: "Marcelo Minutti", role: "Palestrante",
    affiliation: "Professor de MBA no Ibmec, na FGV e no Insper",
    bio: "Palestrante e pesquisador de liderança, inovação, estratégia e games, com mais de 25 anos em transformação digital e pioneiro do Design Thinking no Brasil. Mestre em Inovação Tecnológica pela UnB e fundador da INLABS, recebeu o Prêmio de Excelência Acadêmica do Ibmec em 2017 e 2018.",
    photo: photo("marcelo-minutti"), photoPosition: "50% 30%",
    links: [linkedin("marcelominutti")]
  },
  {
    name: "Cristopher Alexander Ochoa Villanueva", role: "Equipe PAVIC",
    affiliation: "UFAC · Mestrando em Ciência da Computação",
    bio: "Engenheiro Eletrônico e de Telecomunicações pela UNTELS (Peru). Pesquisa High Dynamic Range (HDR) e processamento de vídeo.",
    photo: photo("cristopher-alexander-ochoa-villanueva"), photoPosition: "50% 50%", photoTranslate: "0%, 8%", photoScale: 1.08,
    links: [lattes("9001473561538954")]
  },
  {
    name: "Gustavo de Souza Ferreti", role: "Equipe PAVIC",
    affiliation: "UFAC · Mestrando em Ciência da Computação",
    bio: "Engenheiro eletricista pela UFAC e pesquisador do PAVIC-Lab. Desenvolve modelos leves de visão computacional para reconstrução de imagens HDR, com artigos na IEEE Access, na Applied Sciences e na Computers & Graphics.",
    photo: photo("gustavo-de-souza-ferreti"),
    links: [lattes("8384894705962726"), { type: "scholar", url: "https://scholar.google.com.br/citations?user=yBZc050AAAAJ&hl=pt-BR" }]
  },
  {
    name: "Ian Oliveira Teixeira", role: "Equipe PAVIC",
    affiliation: "UFAC · Mestrando em Ciência da Computação",
    bio: "Engenheiro eletricista pela UFAC. No PAVIC-Lab pesquisa super-resolução eficiente de imagens, depois de trabalhar com reconstrução HDR; também atua com robótica educacional e IoT.",
    photo: photo("ian-oliveira-teixeira"), photoPosition: "48% 50%", photoTranslate: "0%, 4%", photoScale: 1.1,
    links: [lattes("3039947338622333")]
  },
  {
    name: "Julio Sousa Martins", role: "Equipe PAVIC",
    affiliation: "UFAC · Mestrando em Ciência da Computação",
    bio: "Engenheiro eletricista pela UFAC, com experiência em projetos elétricos e Python aplicado à engenharia. Pesquisa visão computacional e IA no convênio UFAC, Motorola, Flextronics e Fundape.",
    photo: photo("julio-sousa-martins"), photoPosition: "50% 0%",
    links: [lattes("4303545253624532")]
  },
  {
    name: "Lucas Hildelbrano Costa Carvalho", role: "Equipe PAVIC",
    affiliation: "UFAC · Mestrando em Ciência da Computação",
    bio: "Bacharel em Sistemas de Informação pela UFAC. Pesquisa processamento de imagens HDR e tem experiência com Flutter, análise de dados e aprendizado de máquina.",
    photo: photo("lucas-hildelbrano-costa-carvalho"), photoPosition: "50% 50%", photoTranslate: "-6%, 6%", photoScale: 1.08,
    links: [lattes("1318813280093180")]
  }
];
