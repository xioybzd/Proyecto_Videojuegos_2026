import type { ImageSourcePropType } from 'react-native';

export type RewardType = 'pista' | 'recuerdo';

export type GameLocation = {
  id: string;
  nombre: string;
  descripcion: string;
  radioMetros: number;
  coordenadas?: {
    latitude: number;
    longitude: number;
  };
};

export type LocationNPC = {
  id: string;
  capituloID: string;
  nombre: string;
  descripcion: string;
  radioMetros: number;
  imagen: ImageSourcePropType;
  coordenadas_inicio: {
    latitude: number;
    longitude: number;
  };
  coordenadas_final: {
    latitude: number;
    longitude: number;
  };
};

export type GameItem = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: ImageSourcePropType;
  capituloId: string;
  lugarId?: string;
};

export type Chapter = {
  id: string;
  titulo: string;
  descripcion: string;
  imagen: ImageSourcePropType;
  ruta?: string;
  memoria: number;
  requeridoRecuerdoId?: string;
};

export type ChapterScene = {
  id: string;
  texto: string;
  imagen: ImageSourcePropType;
};
