import type { Chapter, ChapterScene } from './types';

export const chapters: Chapter[] = [
  {
    id: 'cap1',
    titulo: 'Capitulo 1',
    descripcion: 'Solo un dia cualquiera en mi vida...',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_01.jpg'),
    ruta: '/capitulo/cap1',
    memoria: 0,
  },
  {
    id: 'cap2',
    titulo: 'Capitulo 2',
    descripcion: 'Continua la historia...',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_01.jpg'),
    ruta: '/capitulo/cap2',
    memoria: 20,
    requeridoPistaId: 'cap1_pista1',
  },
  {
    id: 'cap3',
    titulo: 'Capitulo 3 - Al Anochecer',
    descripcion: 'Tubos guarda una fotografia y una sospecha.',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_01.jpg'),
    ruta: '/capitulo/cap3',
    memoria: 40,
    requeridoRecuerdoId: 'cap2_recuerdo1',
  },
  {
    id: 'cap4',
    titulo: 'Capitulo 4 - Hora punta',
    descripcion: 'En el comedor, todos hacen cola y nadie mira.',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_02.jpg'),
    ruta: '/capitulo/cap4',
    memoria: 60,
    requeridoLugarId: 'comedor-sanmarquino',
  },
  {
    id: 'cap5',
    titulo: 'Capitulo 5',
    descripcion: 'Proximamente',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
    memoria: 80,
    requeridoLugarId: 'fcm',
  },
  {
    id: 'cap6',
    titulo: 'Capitulo 6',
    descripcion: 'Proximamente',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
    memoria: 90,
    requeridoRecuerdoId: 'cap5_recuerdo1',
  },
  {
    id: 'cap7',
    titulo: 'Capitulo 7 - Final',
    descripcion: 'Proximamente',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
    memoria: 100,
    requeridoRecuerdoId: 'cap6_recuerdo1',
  },
];

export const cap1Scenes: ChapterScene[] = [
  {
    id: 'cap1_escena1',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_01.jpg'),
    texto: 'Antes de que todo se arruinara...\n\nMi vida era normal.',
  },
  {
    id: 'cap1_escena2',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_02.jpg'),
    texto: 'O al menos eso creia.',
  },
  {
    id: 'cap1_escena3',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_03.jpg'),
    texto: 'Ben\nLlegas tarde.\n\nAzula\nLlegue a tiempo... para la segunda hora.\n\nBen\nEso no cuenta.',
  },
  {
    id: 'cap1_escena4',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_04.jpg'),
    texto: 'Jhon\nSi este codigo falla otra vez abandono ingenieria.\n\nKira\nLo dices todos los dias.\n\nJanna\nY aqui sigue.',
  },
  {
    id: 'cap1_escena5',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_05.jpg'),
    texto: 'Eramos inseparables.',
  },
  {
    id: 'cap1_escena6',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_06.jpg'),
    texto: 'Janna\nNunca sienten que algo esta mal aqui?\n\nAzula\nAhi va otra vez.\n\nJhon\nNecesitas dormir.',
  },
  {
    id: 'cap1_escena7',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_07.jpg'),
    texto: 'Pense que esos dias durarian para siempre.',
  },
  {
    id: 'cap1_escena8',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_08.jpg'),
    texto: 'Janna\nSi algun dia desaparezco...\n\nAzula\nQue?',
  },
  {
    id: 'cap1_escena9',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_09.jpg'),
    texto: '--prometeme que recordaras--',
  },
  {
    id: 'cap1_escena10',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_10.jpg'),
    texto: 'DIA ACTUAL',
  },
  {
    id: 'cap1_escena11',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_11.jpg'),
    texto: 'Janna desaparecio hace tres semanas.',
  },
  {
    id: 'cap1_escena12',
    imagen: require('@/assets/images/capituloimgs/capitulo1/cap1_12.jpg'),
    texto: 'No confies en tus recuerdos.\n\nPISTA DESBLOQUEADA',
  },
];

export const cap2Scenes: ChapterScene[] = [
  {
    id: 'cap2_escena1',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_01.jpg'),
    texto: 'La biblioteca no se sentia como un lugar seguro.',
  },
  {
    id: 'cap2_escena2',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_02.jpg'),
    texto: 'Azula\nSi Janna vino aqui... tuvo que dejar algo.',
  },
  {
    id: 'cap2_escena3',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_03.jpg'),
    texto: 'Cada pasillo parecia guardar una version distinta de la historia.',
  },
  {
    id: 'cap2_escena4',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_04.jpg'),
    texto: 'Kira\nNo busques respuestas donde solo hay ecos.\n\nAzula\nEntonces por que estoy tan cerca?',
  },
  {
    id: 'cap2_escena5',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_05.jpg'),
    texto: 'Algo entre las paginas parecia reconocerme.',
  },
  {
    id: 'cap2_escena6',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_06.jpg'),
    texto: 'Janna\nSi algun recuerdo vuelve incompleto... no lo creas de inmediato.',
  },
  {
    id: 'cap2_escena7',
    imagen: require('@/assets/images/capituloimgs/capitulo2/cap2_07.jpg'),
    texto: 'Un recuerdo se abrio, pero solo la primera parte quiso mostrarse.',
  },
];

export const cap3Scenes: ChapterScene[] = [
  {
    id: 'cap3_escena1',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_01.jpg'),
    texto: 'Este era el lugar del recuerdo.',
  },
  {
    id: 'cap3_escena2',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_02.jpg'),
    texto: 'No entendia que estaba buscando.',
  },
  {
    id: 'cap3_escena3',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_03.jpg'),
    texto: 'Janna venia mucho aqui.',
  },
  {
    id: 'cap3_escena4',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_04.jpg'),
    texto: 'Otra vez este simbolo...',
  },
  {
    id: 'cap3_escena5',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_05.jpg'),
    texto: 'Debajo del arbol, entre las raices, habia una fotografia doblada.',
  },
  {
    id: 'cap3_escena6',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_06.jpg'),
    texto: 'Era una foto tomada desde lejos. Un grupo reunido. Mala calidad. Demasiadas sombras.',
  },
  {
    id: 'cap3_escena7',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_07.jpg'),
    texto: '...Ben.',
  },
  {
    id: 'cap3_escena8',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_08.jpg'),
    texto: 'Que hacia aqui?',
  },
  {
    id: 'cap3_escena9',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_09.jpg'),
    texto: 'A lo lejos, entre varios estudiantes, habia una figura demasiado parecida a el.',
  },
  {
    id: 'cap3_escena10',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_10.jpg'),
    texto: 'Me acerque sin pensar. Confundida. Con el pecho apretado.',
  },
  {
    id: 'cap3_escena11',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_11.jpg'),
    texto: 'Era Ben. Pero no sonreia. No parecia el mismo de siempre.',
  },
  {
    id: 'cap3_escena12',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_12.jpg'),
    texto: 'Hablaba con dos desconocidos. Todos parecian tensos.',
  },
  {
    id: 'cap3_escena13',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_13.jpg'),
    texto: 'Uno de ellos le entrego algo pequeno. Fue un intercambio rapido.',
  },
  {
    id: 'cap3_escena14',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_14.jpg'),
    texto: 'Ben lo guardo en el bolsillo y miro alrededor, como comprobando que nadie observaba.',
  },
  {
    id: 'cap3_escena15',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_15.jpg'),
    texto: 'Que estas haciendo...?',
  },
  {
    id: 'cap3_escena16',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_16.jpg'),
    texto: 'Un recuerdo borroso: Ben y Janna discutiendo. No podia escuchar nada.',
  },
  {
    id: 'cap3_escena17',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_17.jpg'),
    texto: 'Janna se alejaba molesta. Ben se quedaba observandola.',
  },
  {
    id: 'cap3_escena18',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_18.jpg'),
    texto: 'El presente volvio de golpe. Ben empezo a caminar y se perdio entre la gente.',
  },
  {
    id: 'cap3_escena19',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_19.jpg'),
    texto: 'Janna investigaba algo.\n\nY Ben estaba alli.',
  },
];

export const cap4Scenes: ChapterScene[] = [
  {
    id: 'cap4_escena1',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_02.jpg'),
    texto: 'Donde todos hacen cola, nadie mira.\n\nLa pista me llevo al comedor.',
  },
  {
    id: 'cap4_escena2',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_03.jpg'),
    texto: 'Era hora punta.\n\nDemasiada gente. Demasiado ruido.',
  },
  {
    id: 'cap4_escena3',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_04.jpg'),
    texto: 'Si Janna escondio algo aqui...\n\ntenia que estar entre todos.',
  },
  {
    id: 'cap4_escena4',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_05.jpg'),
    texto: 'Estudiante 1\nTengo un bajon horrible.\n\nEstudiante 2\nEse brownie me dejo con hambre de alma.',
  },
  {
    id: 'cap4_escena5',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_06.jpg'),
    texto: 'Estudiante 3\nOe, esas papas eran mias.\n\nEstudiante 1\nEran. Pasado.',
  },
  {
    id: 'cap4_escena6',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_07.jpg'),
    texto: 'Azula\nDisculpen...\n\nEstudiante\nTienes mas brownies?',
  },
  {
    id: 'cap4_escena7',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_08.jpg'),
    texto: 'Azula\nConocen a Ben?\n\nEstudiante\nBen?\n\nOtro estudiante\nBen estaba con ellos.',
  },
  {
    id: 'cap4_escena8',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_09.jpg'),
    texto: 'Ben...\n\nOtra vez Ben.',
  },
  {
    id: 'cap4_escena9',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_10.jpg'),
    texto: 'Azula\nY Janna?\n\nChica\nElla preguntaba mucho.',
  },
  {
    id: 'cap4_escena10',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_11.jpg'),
    texto: 'Estudiante\nDemasiado.\n\nOtro\nPor eso la miraban feo.',
  },
  {
    id: 'cap4_escena11',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_12.jpg'),
    texto: 'Chica\nNo deberias preguntar tanto.\n\nEstudiante\nLuego tambien te van a mirar a ti.',
  },
  {
    id: 'cap4_escena12',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_13.jpg'),
    texto: 'Chica\nToma.\n\nAzula\nEsto era de Janna?\n\nChica\nNo se... quiza.',
  },
  {
    id: 'cap4_escena13',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_14.jpg'),
    texto: 'Quimica no es el inicio.\nSolo la fachada.\n\nEl mismo simbolo.',
  },
  {
    id: 'cap4_escena14',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_15.jpg'),
    texto: 'Quimica no es el inicio...\n\nSolo la fachada...\n\nQue se supone que significa eso?',
  },
];
