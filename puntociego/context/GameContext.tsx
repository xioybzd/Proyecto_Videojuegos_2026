import { createContext, useState, ReactNode } from 'react';
import type { GameItem } from '@/data/types';

type GameContextType = {
  pistas: GameItem[];
  recuerdos: GameItem[];
  lugaresVisitados: string[];
  memoriaRecuperada: number;
  agregarPista: (p: GameItem) => void;
  agregarRecuerdo: (r: GameItem) => void;
  marcarLugarVisitado: (lugarId: string) => void;
};

export const GameContext = createContext<GameContextType>({
  pistas: [],
  recuerdos: [],
  lugaresVisitados: [],
  memoriaRecuperada: 0,
  agregarPista: () => {},
  agregarRecuerdo: () => {},
  marcarLugarVisitado: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [pistas, setPistas] = useState<GameItem[]>([]);
  const [recuerdos, setRecuerdos] = useState<GameItem[]>([]);
  const [lugaresVisitados, setLugaresVisitados] = useState<string[]>([]);

  const memoriaRecuperada = recuerdos.length * 20;

  const agregarPista = (nuevo: GameItem) => {
    setPistas((prev) => {
      const existe = prev.some((p) => p.id === nuevo.id);
      if (existe) return prev;
      return [...prev, nuevo];
    });
  };

  const agregarRecuerdo = (nuevo: GameItem) => {
    setRecuerdos((prev) => {
      const existe = prev.some((r) => r.id === nuevo.id);
      if (existe) return prev;
      return [...prev, nuevo];
    });
  };

  const marcarLugarVisitado = (lugarId: string) => {
    setLugaresVisitados((prev) => {
      if (prev.includes(lugarId)) return prev;
      return [...prev, lugarId];
    });
  };

  return (
    <GameContext.Provider
      value={{
        pistas,
        recuerdos,
        lugaresVisitados,
        memoriaRecuperada,
        agregarPista,
        agregarRecuerdo,
        marcarLugarVisitado,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
