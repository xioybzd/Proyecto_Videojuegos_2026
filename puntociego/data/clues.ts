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
    id: 'cel_pista_comedor',
    titulo: 'Mensaje del celular',
    descripcion: 'Donde todos hacen cola, nadie mira.',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_01.jpg'),
    capituloId: 'cap3',
    lugarId: 'comedor-sanmarquino',
  },
  {
    id: 'cap4_pista1',
    titulo: 'Solo la fachada',
    descripcion: 'La servilleta apunta a FCM. Quimica no era el inicio.',
    imagen: require('@/assets/images/capituloimgs/capitulo4/cap4_14.jpg'),
    capituloId: 'cap4',
    lugarId: 'fcm',
  },
  {
    id: 'cap5_pista1',
    titulo: 'Parque Asmaticos',
    descripcion: 'El siguiente fragmento espera en el Parque Asmaticos.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
    capituloId: 'cap5',
    lugarId: 'parque-asmaticos',
  },
  {
    id: 'cap6_pista1',
    titulo: 'La Huaca',
    descripcion: 'El punto final queda marcado en la Huaca.',
    imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.jpg'),
    capituloId: 'cap6',
    lugarId: 'huaca',
  },
];

export const getClueById = (id?: string) =>
  clues.find((clue) => clue.id === id);
