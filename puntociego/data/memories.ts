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
    descripcion: 'Un encuentro breve deja una direccion clara: FCM.',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_14.jpg'),
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
    titulo: 'Ultima coordenada',
    descripcion: 'La Huaca queda como el ultimo punto de la historia.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
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
      imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_14.jpg'),
      texto: 'NPC\nSi buscas el inicio, no mires donde todos miran.',
    },
    {
      id: 'cap4_recuerdo1_escena2',
      imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_15.jpg'),
      texto: 'NPC\nFCM guarda una parte de la historia que Janna no quiso decir en voz alta.',
    },
  ],
};
