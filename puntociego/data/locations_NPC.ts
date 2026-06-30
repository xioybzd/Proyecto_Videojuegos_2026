import type { LocationNPC } from './types';

export const locations_npc: LocationNPC[] = [
  {
    id: 'NPC_comedor',
    capituloID: 'cap4',
    nombre: 'NPC Comedor',
    descripcion: 'NPC que aparece en el cap5 para desbloquear cap5',
    radioMetros: 25,
    imagen: require('@/assets/images/botonplay.png'),
    coordenadas_inicio: {
      latitude: -12.059390,
      longitude: -77.082853,
    },
    coordenadas_final: {
      latitude: -12.060263,
      longitude: -77.082571,
    },
  },
];

export const getLocationNPCById = (id?: string) =>
  locations_npc.find((location_npc) => location_npc.id === id);
