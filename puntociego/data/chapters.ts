import type { Chapter, ChapterScene } from './types';

export const chapters: Chapter[] = [
  {
    id: 'cap1',
    titulo: 'Capitulo 1',
    descripcion: 'Solo un dia cualquiera en mi vida...',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
    ruta: '/capitulo/cap1',
    memoria: 0,
  },
  {
    id: 'cap2',
    titulo: 'Capitulo 2',
    descripcion: 'Continua la historia...',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
    memoria: 20,
    requeridoRecuerdoId: 'cap1_recuerdo1',
  },
  {
    id: 'cap3',
    titulo: 'Capitulo 3',
    descripcion: 'Las pistas empiezan a contradecirse.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
    memoria: 40,
    requeridoRecuerdoId: 'cap2_recuerdo1',
  },
  {
    id: 'cap4',
    titulo: 'Capitulo 4',
    descripcion: 'Bloqueado',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
    memoria: 60,
    requeridoRecuerdoId: 'cap3_recuerdo1',
  },
  {
    id: 'cap5',
    titulo: 'Capitulo 5',
    descripcion: 'Bloqueado',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
    memoria: 80,
    requeridoRecuerdoId: 'cap4_recuerdo1',
  },
];

export const cap1Scenes: ChapterScene[] = [
  {
    id: 'cap1_escena1',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Antes de que todo se arruinara...\n\nMi vida era normal.',
  },
  {
    id: 'cap1_escena2',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'O al menos eso creia.',
  },
  {
    id: 'cap1_escena3',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Ben\nLlegas tarde.\n\nProtagonista\nLlegue a tiempo... para la segunda hora.\n\nBen\nEso no cuenta.',
  },
  {
    id: 'cap1_escena4',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Jhon\nSi este codigo falla otra vez abandono ingenieria.\n\nKira\nLo dices todos los dias.\n\nJanna\nY aqui sigue.',
  },
  {
    id: 'cap1_escena5',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Eramos inseparables.',
  },
  {
    id: 'cap1_escena6',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Janna\nNunca sienten que algo esta mal aqui?\n\nProtagonista\nAhi va otra vez.\n\nJhon\nNecesitas dormir.',
  },
  {
    id: 'cap1_escena7',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Pense que esos dias durarian para siempre.',
  },
  {
    id: 'cap1_escena8',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Janna\nSi algun dia desaparezco...\n\nProtagonista\nQue?',
  },
  {
    id: 'cap1_escena9',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: '--prometeme que recordaras--',
  },
  {
    id: 'cap1_escena10',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'DIA ACTUAL',
  },
  {
    id: 'cap1_escena11',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'Janna desaparecio hace tres semanas.',
  },
  {
    id: 'cap1_escena12',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
    texto: 'No confies en tus recuerdos.\n\nPISTA DESBLOQUEADA',
  },
];
