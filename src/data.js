// Conteúdo editorial — SASI 2026. Atualize esta fonte para alterar a programação.
export const days=[
  {id:"23",weekday:"SEG",name:"Segunda-feira",theme:"Institucional"},
  {id:"24",weekday:"TER",name:"Terça-feira",theme:"IEEE e cultura"},
  {id:"25",weekday:"QUA",name:"Quarta-feira",theme:"PPGCC"},
  {id:"26",weekday:"QUI",name:"Quinta-feira",theme:"Empreendedorismo"},
  {id:"27",weekday:"SEX",name:"Sexta-feira",theme:"Mostra e apresentações"}
];
const activity=(day,time,title,type,speaker="",place="Centro de Convivência",description="")=>({day,time,title,type,speaker,place,description});
export const schedule=[
activity("23","07:30","Credenciamento","Institucional"),
activity("23","08:00","Cerimonial de abertura","Institucional"),
activity("23","08:30","Conversando com quem começou essa jornada","Mesa-redonda"),
activity("23","09:45","Computação Gráfica, Jogos Ultrarealísticos e Inteligência Artificial","Palestra","Manuel Menezes de Oliveira Neto"),
activity("23","11:00","Iniciativas Estudantis: Protagonismo Estudantil e Inovação Tecnológica na UFAC","Palestra","Dayan Freitas Alves"),
activity("23","14:00","Introdução à Pixel Art para Jogos","Minicurso","",""),
activity("23","14:00","Uma Breve Introdução a Deep Learning — Especial Mulheres","Minicurso","Manuel Menezes de Oliveira Neto","Lab 1 PAVIC"),
activity("24","07:30","Credenciamento","Institucional"),
activity("24","14:00","Introdução à Godot — Crie seu primeiro jogo","Minicurso","",""),
activity("24","17:00","Abertura da Game Jam","Game Jam"),
activity("25","07:30","Credenciamento","Institucional"),
activity("26","07:30","Credenciamento","Institucional"),
activity("26","08:00","Inovação que transforma: Da faculdade ao mercado de trabalho","Palestra","SEBRAE"),
activity("26","09:45","Do sonho ao negócio: Seja protagonista da sua história","Palestra","SEBRAE"),
activity("27","07:30","Credenciamento","Institucional"),
activity("27","09:45","Painel acreano de jogos","Painel"),
activity("27","11:00","Encerramento da Game Jam","Game Jam")
];
export const workshops=[
{title:"Introdução à Pixel Art para Jogos",day:"Segunda, 23/11",time:"14h",icon:"▦",description:"Criação visual e fundamentos da estética pixel art aplicada a jogos."},
{title:"Uma Breve Introdução a Deep Learning — Especial Mulheres",day:"Segunda, 23/11",time:"14h–16h",icon:"✳",description:"Introdução aos principais conceitos e aplicações de aprendizado profundo.",speaker:"Manuel Menezes de Oliveira Neto",place:"Lab 1 PAVIC"},
{title:"Introdução à Godot — Crie seu primeiro jogo",day:"Terça, 24/11",time:"14h",icon:"⌘",description:"Primeiros passos no desenvolvimento de jogos com a engine Godot."}
];
export const partners=[
{tier:"Diamante",names:["UFAC"]},
{tier:"Platinum",names:["CASI","LASI","AWS Builder Group","IEEE"]},
{tier:"Esmeralda",names:["Motorola"]},
{tier:"Ouro",names:["Sem Fronteiras","AWS"]},
{tier:"Bronze",names:["Dona Cachos"]}
];