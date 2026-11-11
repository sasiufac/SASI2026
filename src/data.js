// SASI 2026 — programação publicada a partir do "Cronograma Detalhado SASI".
// Fonte: https://docs.google.com/spreadsheets/d/12EKpO2r8yDyjEWYG7r8ClESVPbKYGsxm/edit
// Data da consulta: 10/11/2026. Os intervalos e as atividades simultâneas são preservados.
// Anotações de escala de voluntários, lembretes de logística e linhas vazias não integram a agenda pública.
export const days = [
  { id: "23", weekday: "SEG", name: "Segunda-feira", theme: "Institucional" },
  { id: "24", weekday: "TER", name: "Terça-feira", theme: "IEEE e cultura" },
  { id: "25", weekday: "QUA", name: "Quarta-feira", theme: "PPGCC" },
  { id: "26", weekday: "QUI", name: "Quinta-feira", theme: "PPGCC e empreendedorismo" },
  { id: "27", weekday: "SEX", name: "Sexta-feira", theme: "Mostra e apresentações" }
];

// O formato de "time" é HH:mm, usado nos elementos <time datetime>.
// "endTime" permite exibir os horários completos sem perder a marcação semântica.
const activity = (day, time, endTime, title, type, speaker = "", place = "Centro de Convivência") => ({
  day, time, endTime, title, type, speaker, place
});

export const schedule = [
  // Segunda-feira, 23/11
  activity("23", "07:30", "08:00", "Credenciamento", "Institucional", "", "Centro de Convivência"),
  activity("23", "08:00", "08:30", "Solenidade Comemorativa de 30 Anos", "Institucional", "", "Centro de Convivência"),
  activity("23", "08:30", "09:30", "Conversando com quem começou essa jornada", "Mesa-redonda", "", "Centro de Convivência"),
  activity("23", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("23", "09:45", "10:45", "Computação Gráfica, Jogos Ultrarealísticos e Inteligência Artificial", "Palestra", "Manuel Menezes de Oliveira Neto", "Centro de Convivência"),
  activity("23", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("23", "11:00", "12:00", "Iniciativas estudantis: Protagonismo Estudantil e Inovação Tecnológica na UFAC", "Palestra", "Dayan Freitas Alves", "Centro de Convivência"),
  activity("23", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("23", "14:00", "16:00", "Introdução à Pixel Art para Jogos", "Minicurso", "Felipe de Pádua Silva e Clara Serena Farias Simone", ""),
  activity("23", "14:00", "16:00", "Uma Breve Introdução a Deep Learning — Especial Mulheres", "Minicurso", "Manuel Menezes de Oliveira Neto", "Lab 1 PAVIC"),
  activity("23", "17:00", "", "Abertura SASI: Game Jam", "Game Jam", "", ""),

  // Terça-feira, 24/11
  activity("24", "07:30", "08:00", "Credenciamento", "Institucional", "", "Centro de Convivência"),
  activity("24", "08:00", "09:30", "Mesa-redonda: Parcerias Público-Privadas e Convênios Tecnológicos — Desafios de Gestão e Benefícios para a Comunidade Acadêmica", "Mesa-redonda", "Daricelio Moreira Soares, Laura Costa Sarkis e Ana Beatriz Alvarez Mamani · Mediação: João Gabriel Santana de Sousa", "Centro de Convivência"),
  activity("24", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("24", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("24", "11:00", "12:00", "A Evolução dos Direitos Humanos, a Internet como Direito Fundamental e os Desafios do Manejo Digital", "Palestra", "Sabrina Cassol", "Centro de Convivência"),
  activity("24", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("24", "14:00", "17:00", "Introdução à Godot — Crie seu primeiro jogo", "Minicurso", "Luís Geovani de Lima Moraes e Caio Gabriel Pontes de Albuquerque", ""),
  activity("24", "14:00", "17:00", "Treinamento em Engenharia Artificial — Módulo 1: A Inferência em Modelos Locais de Inteligência Artificial", "Minicurso", "Lucas (HEADSCON)", ""),

  // Quarta-feira, 25/11
  activity("25", "07:30", "08:00", "Credenciamento", "Institucional", "", "Centro de Convivência"),
  activity("25", "08:00", "09:30", "Workshop de Pesquisa do PPGCC — Palestra", "Palestra", "Elcio Hideiti Shiguemori", "Centro de Convivência"),
  activity("25", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("25", "09:45", "10:45", "Workshop de Pesquisa do PPGCC — Apresentação de Pesquisas de Mestrado", "Apresentação", "", "Centro de Convivência"),
  activity("25", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("25", "11:00", "12:00", "Workshop de Pesquisa do PPGCC — Apresentação de Pesquisas de Mestrado", "Apresentação", "", "Centro de Convivência"),
  activity("25", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("25", "14:00", "16:00", "Visão Computacional e Reconhecimento Facial na Nuvem com Amazon Rekognition", "Minicurso", "Amanda Lemos de Souza, Bruna Soares Silva e Maxswell Emanoell Araújo de Melo", ""),

  // Quinta-feira, 26/11
  activity("26", "07:30", "08:00", "Credenciamento", "Institucional", "", "Centro de Convivência"),
  activity("26", "08:00", "09:30", "Inovação que transforma: Da faculdade ao mercado de trabalho", "Palestra", "SEBRAE", "Centro de Convivência"),
  activity("26", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("26", "09:45", "10:45", "Do sonho ao negócio: Seja protagonista da sua história", "Palestra", "SEBRAE", "Centro de Convivência"),
  activity("26", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("26", "11:00", "12:00", "Workshop de Pesquisa do PPGCC — Apresentação de Pesquisas de Mestrado", "Apresentação", "", "Centro de Convivência"),
  activity("26", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("26", "14:00", "18:00", "Saúde Digital", "Minicurso", "Gleice Beatriz Mourão Araújo, Isaque Costa Santarém, Kelvin do Nascimento Moreira, Mayara Silva de Sousa e Mirelle Campos Góis", ""),
  activity("26", "15:00", "", "Término SASI: Game Jam", "Game Jam", "", ""),
  activity("26", "16:00", "18:00", "Inteligência Artificial na Pesquisa Científica: explorando o LeapSpace na prática", "Minicurso", "Guilherme Félix Cavalcante", ""),

  // Sexta-feira, 27/11
  activity("27", "07:30", "08:00", "Credenciamento", "Institucional", "", "Centro de Convivência"),
  activity("27", "08:00", "08:30", "Despedida", "Institucional", "", "Centro de Convivência"),
  activity("27", "08:30", "09:30", "Palestra nacional — HEADSCON", "Palestra", "", "Centro de Convivência"),
  activity("27", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("27", "09:45", "10:45", "Painel: Comunidade acreana de games e experiências de Game Jams", "Painel", "HEADSCON", "Centro de Convivência"),
  activity("27", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("27", "11:00", "12:00", "Sessão de Avaliação, Exibição de Protótipos e Premiação — SASI: Game Jam", "Game Jam", "", "Centro de Convivência"),
  activity("27", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("27", "14:00", "18:00", "Conhecendo na Prática os Projetos e Pesquisas em Desenvolvimento pelo PAVIC", "Atividade", "", "Lab 01 PAVIC"),
  activity("27", "16:00", "18:00", "AWS Lambda e S3: Automação Orientada a Eventos na Prática", "Minicurso", "Amanda Lemos de Souza, Bruna Soares Silva e Maxswell Emanoell Araújo de Melo", ""),
];

export const workshops = [
  {
    "title": "Introdução à Pixel Art para Jogos",
    "day": "Segunda, 23/11",
    "time": "14h–16h",
    "icon": "▦",
    "description": "Criação visual e fundamentos da estética pixel art aplicada a jogos.",
    "speaker": "Felipe de Pádua Silva e Clara Serena Farias Simone"
  },
  {
    "title": "Uma Breve Introdução a Deep Learning — Especial Mulheres",
    "day": "Segunda, 23/11",
    "time": "14h–16h",
    "icon": "✳",
    "description": "Introdução aos principais conceitos e aplicações de aprendizado profundo.",
    "speaker": "Manuel Menezes de Oliveira Neto",
    "place": "Lab 1 PAVIC"
  },
  {
    "title": "Introdução à Godot — Crie seu primeiro jogo",
    "day": "Terça, 24/11",
    "time": "14h–17h",
    "icon": "⌘",
    "description": "Primeiros passos no desenvolvimento de jogos com a engine Godot.",
    "speaker": "Luís Geovani de Lima Moraes e Caio Gabriel Pontes de Albuquerque"
  },
  {
    "title": "Treinamento em Engenharia Artificial — Módulo 1: A Inferência em Modelos Locais de Inteligência Artificial",
    "day": "Terça, 24/11",
    "time": "14h–17h",
    "icon": "▦",
    "description": "",
    "speaker": "Lucas (HEADSCON)"
  },
  {
    "title": "Visão Computacional e Reconhecimento Facial na Nuvem com Amazon Rekognition",
    "day": "Quarta, 25/11",
    "time": "14h–16h",
    "icon": "✳",
    "description": "",
    "speaker": "Amanda Lemos de Souza, Bruna Soares Silva e Maxswell Emanoell Araújo de Melo"
  },
  {
    "title": "Saúde Digital",
    "day": "Quinta, 26/11",
    "time": "14h–18h",
    "icon": "⌘",
    "description": "",
    "speaker": "Gleice Beatriz Mourão Araújo, Isaque Costa Santarém, Kelvin do Nascimento Moreira, Mayara Silva de Sousa e Mirelle Campos Góis"
  },
  {
    "title": "Inteligência Artificial na Pesquisa Científica: explorando o LeapSpace na prática",
    "day": "Quinta, 26/11",
    "time": "16h–18h",
    "icon": "▦",
    "description": "",
    "speaker": "Guilherme Félix Cavalcante"
  },
  {
    "title": "AWS Lambda e S3: Automação Orientada a Eventos na Prática",
    "day": "Sexta, 27/11",
    "time": "16h–18h",
    "icon": "✳",
    "description": "",
    "speaker": "Amanda Lemos de Souza, Bruna Soares Silva e Maxswell Emanoell Araújo de Melo"
  }
];

// Patrocínios seguem a classificação institucional já utilizada no site.
export const partners = [
  {
    "tier": "Diamante",
    "items": [
      {
        "name": "UFAC",
        "logo": "./assets/partners/Logo-ufac.png",
        "url": "https://www.instagram.com/ufac_oficial/",
        "description": "Universidade pública federal do Acre, dedicada ao ensino, à pesquisa e à extensão."
      }
    ]
  },
  {
    "tier": "Platinum",
    "items": [
      {
        "name": "CASI",
        "logo": "./assets/partners/logo-casi-enhanced-no-bg.png",
        "url": "https://www.instagram.com/casi.ufac/",
        "description": "Centro Acadêmico de Sistemas de Informação da UFAC, espaço de representação e integração estudantil."
      },
      {
        "name": "LASI",
        "logo": "./assets/partners/logo_LASI.png",
        "url": "https://www.instagram.com/lasi.ufac/",
        "description": "Liga Acadêmica de Sistemas de Informação da UFAC, dedicada à formação e ao compartilhamento de conhecimentos em tecnologia."
      },
      {
        "name": "AWS Builder Group",
        "logo": "./assets/partners/AWS-Student-Builder-Group_RGB_Program-Icon_Blue.png",
        "url": "https://www.instagram.com/awssbgufac/",
        "description": "Comunidade liderada por estudantes da UFAC, com foco em aprendizado prático e projetos de computação em nuvem com AWS."
      },
      {
        "name": "IEEE",
        "logo": "./assets/partners/LOGO_IEEE.png",
        "url": "https://www.instagram.com/ramo_ieee_ufac/",
        "description": "Ramo estudantil do IEEE na UFAC, que conecta estudantes a iniciativas e comunidades de engenharia e tecnologia."
      }
    ]
  },
  {
    "tier": "Esmeralda",
    "items": [
      {
        "name": "Motorola",
        "logo": "./assets/partners/Logo-Motorola-Grande.png",
        "url": "https://www.instagram.com/motorolabr/",
        "description": "Marca de tecnologia reconhecida pelo desenvolvimento de smartphones e dispositivos conectados."
      }
    ]
  },
  {
    "tier": "Ouro",
    "items": [
      {
        "name": "Sem Fronteiras",
        "logo": "./assets/partners/logo_sem_fronteiras.png",
        "url": "https://www.instagram.com/semfronteirasac/",
        "description": "Empresa de telecomunicações que oferece serviços de internet e conectividade no Acre."
      },
      {
        "name": "AWS",
        "logo": "./assets/partners/AWS_Logo.svg",
        "url": "https://www.instagram.com/amazonwebservices/",
        "description": "Amazon Web Services: serviços de computação em nuvem para aplicações, armazenamento, dados e inteligência artificial."
      }
    ]
  },
  {
    "tier": "Bronze",
    "items": [
      {
        "name": "Dona Cachos",
        "logo": "./assets/partners/logo_dona_cachos.PNG",
        "url": "https://www.instagram.com/donnacachosoficial/",
        "description": "Espaço especializado em cuidados e valorização de cabelos crespos, cacheados e ondulados."
      }
    ]
  }
];

// Convidados identificados na aba "Detalhes" do cronograma da SASI 2026 e
// nas pastas de materiais dos participantes. Foto opcional: use caminho relativo
// em "photo" quando o arquivo estiver disponível em assets/guests/.
export const guests = [
  {
    "name": "Laura Costa Sarkis",
    "role": "Mesa-redonda",
    "activity": "Conversando com quem começou essa jornada · Parcerias Público-Privadas e Convênios Tecnológicos",
    "photo": "./assets/inviteds/Laura Costa.png",
    "photoOffset": -6,
    "photoScale": 1.22,
    "affiliation": "UFAC · Sistemas de Informação e PPGCC",
    "bio": "Doutora em Ciência da Computação pela UFF. Pesquisa engenharia de requisitos, metodologias ativas e educação em computação.",
    "profileUrl": "http://lattes.cnpq.br/6846153302568344",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Valmir Saraiva de Oliveira",
    "role": "Mesa-redonda",
    "activity": "Conversando com quem começou essa jornada",
    "photo": "./assets/inviteds/Valmir Saraiva.jpg",
    "affiliation": "UFAC · Trajetória docente",
    "bio": "Mestre em Ciências da Computação pela UFSC, com longa atuação no ensino universitário e em sistemas de computação.",
    "profileUrl": "http://lattes.cnpq.br/1618079243544282",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Olacir Rodrigues Castro Junior",
    "role": "Mesa-redonda",
    "activity": "Conversando com quem começou essa jornada",
    "photo": "./assets/inviteds/Olacir Rodrigues.png",
    "affiliation": "UFAC · Professor",
    "bio": "Doutor em Ciência da Computação pela UFPR. Atua em inteligência computacional e otimização.",
    "profileUrl": "http://lattes.cnpq.br/1893693615984125",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "João Gabriel Santana de Sousa",
    "role": "Participante da equipe e mediador",
    "activity": "Conversando com quem começou essa jornada · Parcerias Público-Privadas e Convênios Tecnológicos",
    "photo": "./assets/inviteds/João Gabriel.jpg",
    "affiliation": "UFAC · Sistemas de Informação",
    "bio": "Graduando em Sistemas de Informação e participante de pesquisa em visão computacional e aprendizado profundo para detecção de sonolência.",
    "profileUrl": "http://lattes.cnpq.br/4076560803482553",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Manuel Menezes de Oliveira Neto",
    "role": "Palestrante e ministrante",
    "activity": "Computação Gráfica e IA · Introdução a Deep Learning",
    "photo": "./assets/inviteds/Manuel_Menezes_CNDB.JPG",
    "affiliation": "UFRGS · Instituto de Informática",
    "bio": "Professor titular e doutor pela University of North Carolina at Chapel Hill. Pesquisa computação gráfica, processamento de imagens e inteligência artificial.",
    "profileUrl": "http://www.inf.ufrgs.br/~oliveira",
    "profileLabel": "Página acadêmica"
  },
  {
    "name": "Dayan Freitas Alves",
    "role": "Palestrante",
    "activity": "Iniciativas estudantis e inovação tecnológica na UFAC",
    "photo": "./assets/inviteds/Dayan Freitas.jpg",
    "affiliation": "UFAC · Sistemas de Informação",
    "bio": "Atua com programação, análise de dados e projetos colaborativos, com interesse em inteligência artificial e desenvolvimento de software.",
    "profileUrl": "http://lattes.cnpq.br/3295624815461329",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Felipe de Pádua Silva",
    "role": "Ministrante",
    "activity": "Introdução à Pixel Art para Jogos",
    "photo": ""
  },
  {
    "name": "Clara Serena Farias Simone",
    "role": "Ministrante",
    "activity": "Introdução à Pixel Art para Jogos",
    "photo": ""
  },
  {
    "name": "Sabrina Cassol",
    "role": "Palestrante",
    "activity": "A Evolução dos Direitos Humanos, a Internet como Direito Fundamental e os Desafios do Manejo Digital",
    "photo": "./assets/inviteds/Sabrina Cassol.jpg",
    "affiliation": "UFAC · Curso de Direito",
    "bio": "Professora adjunta e doutora em Direito pela UnB, com atuação em direitos humanos, políticas públicas e educação jurídica.",
    "profileUrl": "http://lattes.cnpq.br/3538062591852177",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Luís Geovani de Lima Moraes",
    "role": "Ministrante",
    "activity": "Introdução à Godot — Crie seu primeiro jogo",
    "photo": ""
  },
  {
    "name": "Caio Gabriel Pontes de Albuquerque",
    "role": "Ministrante",
    "activity": "Introdução à Godot — Crie seu primeiro jogo",
    "photo": ""
  },
  {
    "name": "Lucas (HEADSCON)",
    "role": "Ministrante",
    "activity": "Treinamento em Engenharia Artificial — Módulo 1: Inferência em Modelos Locais de Inteligência Artificial",
    "photo": ""
  },
  {
    "name": "Elcio Hideiti Shiguemori",
    "role": "Palestrante",
    "activity": "Workshop de Pesquisa do PPGCC",
    "photo": "./assets/inviteds/Elcio Hideiti Shiguemori.png",
    "affiliation": "IEAv/DCTA · INPE/ITA",
    "bio": "Pesquisador e doutor em Computação Aplicada pelo INPE. Trabalha com IA, aprendizado de máquina, processamento de imagens e visão computacional.",
    "profileUrl": "http://lattes.cnpq.br/7243145638158319",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Amanda Lemos de Souza",
    "role": "Ministrante",
    "activity": "Amazon Rekognition · AWS Lambda e S3",
    "photo": "./assets/inviteds/Amanda Lemos de Souza.jpg",
    "photoOffset": -7,
    "photoScale": 1.28,
    "affiliation": "Desenvolvimento de software",
    "bio": "Desenvolvedora front-end com formação em Redes de Computadores e experiência em JavaScript, TypeScript, Angular e React.",
    "profileUrl": "http://lattes.cnpq.br/8200344597088589",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Bruna Soares Silva",
    "role": "Ministrante",
    "activity": "Amazon Rekognition · AWS Lambda e S3",
    "photo": "./assets/inviteds/Bruna Soares Silva.jpg",
    "affiliation": "UFAC · Sistemas de Informação",
    "bio": "Bacharela em Sistemas de Informação e pós-graduanda em Engenharia de Testes com Inteligência Artificial. Participou de oficinas de programação.",
    "profileUrl": "http://lattes.cnpq.br/9444526444477657",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Maxswell Emanoell Araújo de Melo",
    "role": "Ministrante",
    "activity": "Amazon Rekognition · AWS Lambda e S3",
    "photo": "./assets/inviteds/Maxwell Emanoell Araújo.jpg",
    "photoOffset": -10,
    "photoScale": 1.34,
    "affiliation": "Creditas · Engenharia de Software",
    "bio": "Engenheiro de software com atuação em backend, arquitetura de sistemas, AWS e uso de inteligência artificial no desenvolvimento.",
    "profileUrl": "https://www.linkedin.com/in/maxswell-araujo",
    "profileLabel": "LinkedIn"
  },
  {
    "name": "Gleice Beatriz Mourão Araújo",
    "role": "Ministrante",
    "activity": "Saúde Digital",
    "photo": ""
  },
  {
    "name": "Isaque Costa Santarém",
    "role": "Ministrante",
    "activity": "Saúde Digital",
    "photo": ""
  },
  {
    "name": "Kelvin do Nascimento Moreira",
    "role": "Ministrante",
    "activity": "Saúde Digital",
    "photo": ""
  },
  {
    "name": "Mayara Silva de Sousa",
    "role": "Ministrante",
    "activity": "Saúde Digital",
    "photo": ""
  },
  {
    "name": "Mirelle Campos Góis",
    "role": "Ministrante",
    "activity": "Saúde Digital",
    "photo": ""
  },
  {
    "name": "Clécio Elias Silva e Silva",
    "role": "Convidado",
    "activity": "Solenidade Comemorativa de 30 Anos",
    "photo": "./assets/inviteds/Clécio Elias.jpeg",
    "affiliation": "UFAC · PAVIC",
    "bio": "Professor substituto e mestrando em Ciência da Computação na UFAC. Pesquisa visão computacional e reconstrução 3D baseada em aprendizado profundo.",
    "profileUrl": "https://lattes.cnpq.br/4595049657680778",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Guilherme Félix Cavalcante",
    "role": "Ministrante",
    "activity": "Inteligência Artificial na Pesquisa Científica: explorando o LeapSpace na prática",
    "photo": "./assets/inviteds/Guilherme Félix Cavalcante.jpg",
    "affiliation": "UFAC · Sistemas de Informação",
    "bio": "Graduando e pesquisador de iniciação científica em IA, ciência de dados e jogos digitais aplicados à saúde.",
    "profileUrl": "http://lattes.cnpq.br/3416104383970740",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Daricelio Moreira Soares",
    "role": "Mesa-redonda",
    "activity": "Parcerias Público-Privadas e Convênios Tecnológicos",
    "photo": "./assets/inviteds/Daricélio.jpg",
    "affiliation": "UFAC · CCET",
    "bio": "Professor associado e doutor em Ciência da Computação pela UFF. Atua em engenharia de software, mineração de repositórios e sistemas de apoio à decisão.",
    "profileUrl": "http://lattes.cnpq.br/7376671815596508",
    "profileLabel": "Currículo Lattes"
  },
  {
    "name": "Ana Beatriz Alvarez Mamani",
    "role": "Mesa-redonda",
    "activity": "Parcerias Público-Privadas e Convênios Tecnológicos",
    "photo": "./assets/inviteds/Ana Beatriz Alvarez.jpg",
    "affiliation": "UFAC · Engenharia Elétrica e PPGCC",
    "bio": "Professora e doutora em Engenharia Elétrica pela Unicamp. Coordena o PAVIC-Lab e pesquisa inteligência e visão computacional.",
    "profileUrl": "http://lattes.cnpq.br/2945180266108059",
    "profileLabel": "Currículo Lattes"
  }
];
