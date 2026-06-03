import type { GameItem } from './types';

export const memories: GameItem[] = [
  {
    id: 'cap1_recuerdo1',
    titulo: 'Voz en el comedor',
    descripcion: 'Un fragmento vuelve: una conversacion borrosa, una mesa vacia y una promesa que no encaja.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/recuerdo/recuerdo1c1.png'),
    capituloId: 'cap1',
    lugarId: 'comedor-sanmarquino',
  },
  {
    id: 'cap2_recuerdo1',
    titulo: 'Mensaje borrado',
    descripcion: 'La protagonista recuerda haber leido algo que despues nego haber visto.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/recuerdo/recuerdo1c1.png'),
    capituloId: 'cap2',
    lugarId: 'biblioteca-central',
  },
];

export const getMemoryById = (id?: string) =>
  memories.find((memory) => memory.id === id);
