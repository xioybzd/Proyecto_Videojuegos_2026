import type { GameLocation } from './types';

type LocationUnlock =
  | {
      clueId?: string;
      recuerdoId: string;
      prerequisiteRecuerdoId?: string;
      prerequisiteChapterId?: string;
    }
  | {
      clueId?: string;
      lugarId: string;
      prerequisiteRecuerdoId?: string;
      prerequisiteChapterId?: string;
    };

export const locations: GameLocation[] = [
  {
    id: 'tubos',
    nombre: 'Tubos',
    descripcion: 'Un punto escondido entre camino y sospecha.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.05649,
      longitude: -77.082169,
    },
  },
  {
    id: 'comedor-sanmarquino',
    nombre: 'Comedor Universitario',
    descripcion: 'Hora punta, ruido y demasiadas miradas.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.05735,
      longitude: -77.0819,
    },
  },
  {
    id: 'fcm',
    nombre: 'FCM',
    descripcion: 'La fachada empieza a abrir otra pregunta.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.060406764261632,
      longitude: -77.0822178803222,
    },
  },
  {
    id: 'parque-asmaticos',
    nombre: 'Parque Asmaticos',
    descripcion: 'Un lugar quieto para una memoria dificil.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.057568244765173,
      longitude: -77.0860115087151,
    },
  },
  {
    id: 'huaca',
    nombre: 'La Huaca',
    descripcion: 'El ultimo punto de la verdad.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.060047189302184,
      longitude: -77.08640565675314,
    },
  },
  {
    id: 'biblioteca-central',
    nombre: 'Biblioteca Central Pedro Zulen',
    descripcion: 'Un espacio clave para reconstruir recuerdos fragmentados.',
    radioMetros: 65,
    coordenadas: {
      latitude: -12.05574,
      longitude: -77.08559,
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

export const locationUnlocks: LocationUnlock[] = [
  {
    clueId: 'cel_pista_comedor',
    lugarId: 'comedor-sanmarquino',
  },
  {
    lugarId: 'fcm',
    prerequisiteRecuerdoId: 'cap4_recuerdo1',
  },
  {
    clueId: 'cap5_pista1',
    recuerdoId: 'cap5_recuerdo1',
  },
  {
    clueId: 'cap6_pista1',
    recuerdoId: 'cap6_recuerdo1',
  },
];

export const getLocationById = (id?: string) =>
  locations.find((location) => location.id === id);
