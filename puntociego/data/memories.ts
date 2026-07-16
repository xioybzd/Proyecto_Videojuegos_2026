import type { GameItem } from './types';

export const memories: GameItem[] = [
  {
    id: 'cap2_recuerdo1',
    titulo: 'Historia olvidada',
    descripcion: 'Un recuerdo incompleto. Tocalo para reconstruirlo.',
    imagen: require('@/assets/images/recuerdos/recuerdo1/recuerdo1_01.jpg'),
    capituloId: 'cap2',
    lugarId: 'tubos',
  },
  {
    id: 'cap3_recuerdo1',
    titulo: 'Foto en Tubos',
    descripcion: 'La sospecha de Tubos abre el camino hacia el comedor universitario.',
    imagen: require('@/assets/images/capituloimgs/capitulo3/cap3_19.jpg'),
    capituloId: 'cap3',
    lugarId: 'comedor-sanmarquino',
  },
  {
    id: 'cap4_recuerdo1',
    titulo: 'Historia del NPC',
    descripcion: 'El estudiante del comedor confiesa que Janna dejo algo en FCM.',
    imagen: require('@/assets/images/recuerdos/npc_cap/66.jpg'),
    capituloId: 'cap4',
    lugarId: 'npc-jarol',
  },
  {
    id: 'cap5_recuerdo1',
    titulo: 'Fragmento de FCM',
    descripcion: 'Una memoria pendiente que lleva al Parque Asmaticos.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
    capituloId: 'cap5',
    lugarId: 'parque-asmaticos',
  },
  {
    id: 'cap6_recuerdo1',
    titulo: 'El llavero de conejito',
    descripcion: 'El llavero de Janna guarda una nota que apunta a la Huaca.',
    imagen: require('@/assets/images/recuerdos/recuerdo2/recuerdo2_01.jpg'),
    capituloId: 'cap6',
    lugarId: 'huaca',
  },
];

export const getMemoryById = (id?: string) =>
  memories.find((memory) => memory.id === id);

export const memoryScenes: Record<string, import('./types').ChapterScene[]> = {
  cap2_recuerdo1: [
    {
      id: 'cap2_recuerdo1_escena1',
      imagen: require('@/assets/images/recuerdos/recuerdo1/recuerdo1_01.jpg'),
      texto: 'El recuerdo empieza como una pagina arrancada.',
    },
    {
      id: 'cap2_recuerdo1_escena2',
      imagen: require('@/assets/images/recuerdos/recuerdo1/recuerdo1_02.jpg'),
      texto: 'La voz de Janna vuelve, pero no completa.',
    },
    {
      id: 'cap2_recuerdo1_escena3',
      imagen: require('@/assets/images/recuerdos/recuerdo1/recuerdo1_03.jpg'),
      texto: 'Azula entiende algo terrible: recordar tambien puede mentir.',
    },
  ],
  cap4_recuerdo1: [
    {
      id: 'cap4_recuerdo1_escena1',
      imagen: require('@/assets/images/recuerdos/npc_cap/66.jpg'),
      texto: 'Azula\nTu estabas en el comedor.\n\nEstudiante\nNo se nada.',
    },
    {
      id: 'cap4_recuerdo1_escena2',
      imagen: require('@/assets/images/recuerdos/npc_cap/67.jpg'),
      texto: 'Azula\nMe hablaste de Ben.\n\nEstudiante\nYo no dije nada.\n\nAzula\nDijiste que estaba con ellos.',
    },
    {
      id: 'cap4_recuerdo1_escena3',
      imagen: require('@/assets/images/recuerdos/npc_cap/68.jpg'),
      texto: 'Estudiante\nTodos lo vimos.\n\nAzula\nA Ben?\n\nEstudiante\nA Ben... o a alguien como el.',
    },
    {
      id: 'cap4_recuerdo1_escena4',
      imagen: require('@/assets/images/recuerdos/npc_cap/69.jpg'),
      texto: 'Azula\nQue vio Janna?\n\nEstudiante\nSi quieres saber que vio Janna... ve a la FCM.\n\nAzula\nLa Facultad de Ciencias Matematicas?\n\nEstudiante\nElla dejo algo ahi.',
    },
    {
      id: 'cap4_recuerdo1_escena5',
      imagen: require('@/assets/images/recuerdos/npc_cap/70.jpg'),
      texto: 'Azula\nQue cosa?\n\nEstudiante\nUn archivo.\n\nAzula\nCon quien?\n\nEstudiante\nCon el chico que sabe de computadoras.\n\nAzula\nJhon.\n\nEstudiante\nYo no te dije nada.',
    },
  ],
  cap6_recuerdo1: [
    {
      id: 'cap6_recuerdo1_escena1',
      imagen: require('@/assets/images/recuerdos/recuerdo2/recuerdo2_01.jpg'),
      texto: 'Janna\nNo debi seguirlos sola...',
    },
    {
      id: 'cap6_recuerdo1_escena2',
      imagen: require('@/assets/images/recuerdos/recuerdo2/recuerdo2_02.jpg'),
      texto: 'Janna\nAzula tiene que saberlo...',
    },
    {
      id: 'cap6_recuerdo1_escena3',
      imagen: require('@/assets/images/recuerdos/recuerdo2/recuerdo2_03.jpg'),
      texto: 'Azula encuentra una nota doblada dentro del llavero.\n\n"Nos encontramos en la Huaca."',
    },
    {
      id: 'cap6_recuerdo1_escena4',
      imagen: require('@/assets/images/recuerdos/recuerdo2/recuerdo2_04.jpg'),
      texto: 'La nota continua:\n\n"Si no vuelvo, no fue un accidente."\n\nAzula (susurrando)\nLa Huaca...\n\nTengo que ir.',
    },
  ],
};
