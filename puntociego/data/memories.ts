import type { GameItem } from './types';

export const memories: GameItem[] = [
  {
    id: 'cap1_recuerdo1',
    titulo: 'Voz en el comedor',
    descripcion: 'Un fragmento vuelve: una conversacion borrosa, una mesa vacia y una promesa que no encaja.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/recuerdo/recuerdo1c1.png'),
    capituloId: 'cap1',
    lugarId: 'biblioteca-central',
  },
  {
    id: 'cap2_recuerdo1',
    titulo: 'Historia olvidada',
    descripcion: 'Un recuerdo incompleto. Tocalo para reconstruirlo.',
    imagen: require('@/assets/images/recuerdos/recuerdo1/recuerdo1_01.jpg'),
    capituloId: 'cap2',
    lugarId: 'biblioteca-central',
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
};
