import type { GameItem } from './types';

export const clues: GameItem[] = [
  {
    id: 'cap1_pista1',
    titulo: 'Fotografia extrana',
    descripcion: 'Encontraste una foto arrugada en el suelo. Al reverso aparece una referencia al Comedor Sanmarquino.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/escena3.png'),
    capituloId: 'cap1',
    lugarId: 'comedor-sanmarquino',
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
