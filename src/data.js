// SASI 2026 — programação publicada a partir do "Cronograma Detalhado SASI".
// Fonte: https://docs.google.com/spreadsheets/d/12EKpO2r8yDyjEWYG7r8ClESVPbKYGsxm/edit
// Data da consulta: 09/11/2026. Os intervalos e as atividades simultâneas são preservados.
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
  // Segunda-feira, 23/11 — Institucional
  activity("23", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("23", "08:00", "08:30", "Cerimonial / Solenidade dos 30 anos", "Institucional"),
  activity("23", "08:30", "09:30", "Conversando com quem começou essa jornada", "Mesa-redonda"),
  activity("23", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("23", "09:45", "10:45", "Computação Gráfica, Jogos Ultrarealísticos e Inteligência Artificial", "Palestra", "Manuel Menezes de Oliveira Neto"),
  activity("23", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("23", "11:00", "12:00", "Iniciativas estudantis: Protagonismo Estudantil e Inovação Tecnológica na UFAC", "Palestra", "Dayan Freitas Alves"),
  activity("23", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("23", "14:00", "18:00", "Introdução à Pixel Art para Jogos", "Minicurso", "Felipe de Pádua Silva e Clara Serena Farias Simone", ""),
  activity("23", "14:00", "16:00", "Uma Breve Introdução a Deep Learning — Especial Mulheres", "Minicurso", "Manuel Menezes de Oliveira Neto", "Lab 1 PAVIC"),

  // Terça-feira, 24/11 — IEEE e cultura
  activity("24", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("24", "08:00", "09:30", "Convênios", "Atividade"),
  activity("24", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  // A célula de 09:45 contém apenas "pessoal"; não é um título publicável.
  activity("24", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("24", "11:00", "12:00", "Direito na Internet", "Atividade"),
  activity("24", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("24", "14:00", "18:00", "Introdução à Godot — Crie seu primeiro jogo", "Minicurso", "Luís Geovani de Lima Moraes e Caio Gabriel Pontes de Albuquerque", ""),
  activity("24", "17:00", "17:30", "Abertura da Game Jam", "Game Jam"),

  // Quarta-feira, 25/11 — PPGCC
  activity("25", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("25", "08:00", "09:30", "PPGCC", "Atividade"),
  activity("25", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("25", "09:45", "10:45", "PPGCC", "Atividade"),
  activity("25", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("25", "11:00", "12:00", "PPGCC", "Atividade"),
  activity("25", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("25", "14:00", "18:00", "Minicursos e atividades práticas", "Minicursos", "", ""),

  // Quinta-feira, 26/11 — PPGCC e empreendedorismo
  activity("26", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("26", "08:00", "09:30", "Inovação que transforma: Da faculdade ao mercado de trabalho", "Palestra", "SEBRAE"),
  activity("26", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("26", "09:45", "10:45", "Do sonho ao negócio: Seja protagonista da sua história", "Palestra", "SEBRAE"),
  activity("26", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("26", "11:00", "12:00", "PPGCC", "Atividade"),
  activity("26", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("26", "14:00", "18:00", "Minicursos e atividades práticas", "Minicursos", "", ""),

  // Sexta-feira, 27/11 — Mostra e apresentações
  activity("27", "07:30", "08:00", "Credenciamento", "Institucional"),
  activity("27", "08:00", "08:30", "Despedida", "Institucional"),
  activity("27", "08:30", "09:30", "Palestra principal", "Palestra"),
  activity("27", "09:30", "09:45", "Intervalo", "Intervalo", "", ""),
  activity("27", "09:45", "10:45", "Painel acreano de jogos e encerramento da Game Jam", "Painel"),
  activity("27", "10:45", "11:00", "Intervalo", "Intervalo", "", ""),
  activity("27", "11:00", "12:00", "Final da Game Jam", "Game Jam"),
  activity("27", "12:00", "14:00", "Intervalo para almoço", "Intervalo", "", ""),
  activity("27", "14:00", "18:00", "Minicursos e atividades práticas", "Minicursos", "", ""),
];

export const workshops = [
  {
    title: "Introdução à Pixel Art para Jogos",
    day: "Segunda, 23/11", time: "14h–18h", icon: "▦",
    speaker: "Felipe de Pádua Silva e Clara Serena Farias Simone",
    description: "Criação visual e fundamentos da estética pixel art aplicada a jogos."
  },
  {
    title: "Uma Breve Introdução a Deep Learning — Especial Mulheres",
    day: "Segunda, 23/11", time: "14h–16h", icon: "✳",
    speaker: "Manuel Menezes de Oliveira Neto", place: "Lab 1 PAVIC",
    description: "Introdução aos principais conceitos e aplicações de aprendizado profundo."
  },
  {
    title: "Introdução à Godot — Crie seu primeiro jogo",
    day: "Terça, 24/11", time: "14h–18h", icon: "⌘",
    speaker: "Luís Geovani de Lima Moraes e Caio Gabriel Pontes de Albuquerque",
    description: "Primeiros passos no desenvolvimento de jogos com a engine Godot."
  }
];

// Patrocínios seguem a classificação institucional já utilizada no site.
export const partners = [
  { tier: "Diamante", names: ["UFAC"] },
  { tier: "Platinum", names: ["CASI", "LASI", "AWS Builder Group", "IEEE"] },
  { tier: "Esmeralda", names: ["Motorola"] },
  { tier: "Ouro", names: ["Sem Fronteiras", "AWS"] },
  { tier: "Bronze", names: ["Dona Cachos"] }
];
