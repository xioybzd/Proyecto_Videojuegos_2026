import type { GameItem } from './types';

export const clues: GameItem[] = [
  {
    id: 'cap1_pista1',
    titulo: 'Pedazo de libro',
    descripcion: 'Un fragmento arrancado de un libro. Entre manchas rojas se alcanza a leer: "Donde las paginas guardan silencio, la verdad espera".',
    imagen: require('@/assets/images/pista1.jpg'),
    capituloId: 'cap1',
    lugarId: 'biblioteca-central',
  },
  {
    id: 'cap2_pista1',
    titulo: 'Nota escrita',
    descripcion: 'Una frase incompleta sugiere que alguien oculto informacion en la biblioteca.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena2.png'),
    capituloId: 'cap2',
    lugarId: 'biblioteca-central',
  },
];

export const getClueById = (id?: string) =>
  clues.find((clue) => clue.id === id);
