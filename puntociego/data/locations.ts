import type { GameLocation } from './types';

export const locations: GameLocation[] = [
  {
    id: 'comedor-sanmarquino',
    nombre: 'Comedor Sanmarquino',
    descripcion: 'Lugar indicado por la primera pista.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.05735,
      longitude: -77.0819,
    },
  },
  {
    id: 'biblioteca-central',
    nombre: 'Biblioteca Central',
    descripcion: 'Un espacio clave para reconstruir recuerdos fragmentados.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.05892,
      longitude: -77.08305,
    },
  },
  {
    id: 'patio-principal',
    nombre: 'Patio principal',
    descripcion: 'Punto abierto para encuentros y contradicciones de la historia.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.0598,
      longitude: -77.08215,
    },
  },
];

export const getLocationById = (id?: string) =>
  locations.find((location) => location.id === id);
