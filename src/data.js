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
  activity("24", "08:00", "09:30", "Mesa-redonda: Parcerias Público-Privadas e Convênios Tecnológicos — Desafios de Gestão e Benefícios para a Comunidade Acadêmica", "Mesa-redonda", "", "Centro de Convivência"),
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
        "logo": "./assets/partners/Logo-ufac.png"
      }
    ]
  },
  {
    "tier": "Platinum",
    "items": [
      {
        "name": "CASI",
        "logo": "./assets/partners/logo-casi-enhanced-no-bg.png"
      },
      {
        "name": "LASI",
        "logo": "./assets/partners/logo_LASI.png"
      },
      {
        "name": "AWS Builder Group",
        "logo": "./assets/partners/AWS-Student-Builder-Group_RGB_Program-Icon_Blue.png"
      },
      {
        "name": "IEEE",
        "logo": "./assets/partners/LOGO_IEEE.png"
      }
    ]
  },
  {
    "tier": "Esmeralda",
    "items": [
      {
        "name": "Motorola",
        "logo": "./assets/partners/Logo-Motorola-Grande.png"
      }
    ]
  },
  {
    "tier": "Ouro",
    "items": [
      {
        "name": "Sem Fronteiras",
        "logo": "./assets/partners/logo_sem_fronteiras.png"
      },
      {
        "name": "AWS",
        "logo": "./assets/partners/AWS_Logo.svg"
      }
    ]
  },
  {
    "tier": "Bronze",
    "items": [
      {
        "name": "Dona Cachos",
        "logo": "./assets/partners/logo_dona_cachos.PNG"
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
    "activity": "Conversando com quem começou essa jornada",
    "photo": "./assets/inviteds/Laura Costa.png"
  },
  {
    "name": "Valmir Saraiva de Oliveira",
    "role": "Mesa-redonda",
    "activity": "Conversando com quem começou essa jornada",
    "photo": "./assets/inviteds/Valmir Saraiva.jpg"
  },
  {
    "name": "Olacir Rodrigues Castro Junior",
    "role": "Mesa-redonda",
    "activity": "Conversando com quem começou essa jornada",
    "photo": "./assets/inviteds/Olacir Rodrigues.png"
  },
  {
    "name": "João Gabriel Santana de Sousa",
    "role": "Mesa-redonda",
    "activity": "Conversando com quem começou essa jornada",
    "photo": "./assets/inviteds/João Gabriel.jpg"
  },
  {
    "name": "Manuel Menezes de Oliveira Neto",
    "role": "Palestrante e ministrante",
    "activity": "Computação Gráfica e IA · Introdução a Deep Learning",
    "photo": "./assets/inviteds/Manuel_Menezes_CNDB.JPG"
  },
  {
    "name": "Dayan Freitas Alves",
    "role": "Palestrante",
    "activity": "Iniciativas estudantis e inovação tecnológica na UFAC",
    "photo": "./assets/inviteds/Dayan Freitas.jpg"
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
    "photo": "./assets/inviteds/Sabrina Cassol.jpg"
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
    "photo": "./assets/inviteds/Elcio Hideiti Shiguemori.png"
  },
  {
    "name": "Amanda Lemos de Souza",
    "role": "Ministrante",
    "activity": "Amazon Rekognition · AWS Lambda e S3",
    "photo": "./assets/inviteds/Amanda Lemos de Souza.jpg"
  },
  {
    "name": "Bruna Soares Silva",
    "role": "Ministrante",
    "activity": "Amazon Rekognition · AWS Lambda e S3",
    "photo": "./assets/inviteds/Bruna Soares Silva.jpg"
  },
  {
    "name": "Maxswell Emanoell Araújo de Melo",
    "role": "Ministrante",
    "activity": "Amazon Rekognition · AWS Lambda e S3",
    "photo": "./assets/inviteds/Maxwell Emanoell Araújo.jpg"
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
    "photo": "./assets/inviteds/Clécio Elias.jpeg"
  },
  {
    "name": "Guilherme Félix Cavalcante",
    "role": "Ministrante",
    "activity": "Inteligência Artificial na Pesquisa Científica: explorando o LeapSpace na prática",
    "photo": "./assets/inviteds/Guilherme Félix Cavalcante.jpg"
  }
];
