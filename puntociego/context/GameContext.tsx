import { createContext, useState, ReactNode } from 'react';
import type { GameItem } from '@/data/types';

type GameContextType = {
  pistas: GameItem[];
  recuerdos: GameItem[];
  lugaresVisitados: string[];
  capitulosCompletados: string[];
  celularDesbloqueado: boolean;
  memoriaRecuperada: number;
  agregarPista: (p: GameItem) => void;
  agregarRecuerdo: (r: GameItem) => void;
  marcarLugarVisitado: (lugarId: string) => void;
  marcarCapituloCompletado: (capituloId: string) => void;
  desbloquearCelular: () => void;
};

export const GameContext = createContext<GameContextType>({
  pistas: [],
  recuerdos: [],
  lugaresVisitados: [],
  capitulosCompletados: [],
  celularDesbloqueado: false,
  memoriaRecuperada: 0,
  agregarPista: () => {},
  agregarRecuerdo: () => {},
  marcarLugarVisitado: () => {},
  marcarCapituloCompletado: () => {},
  desbloquearCelular: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [pistas, setPistas] = useState<GameItem[]>([]);
  const [recuerdos, setRecuerdos] = useState<GameItem[]>([]);
  const [lugaresVisitados, setLugaresVisitados] = useState<string[]>([]);
  const [capitulosCompletados, setCapitulosCompletados] = useState<string[]>([]);
  const [celularDesbloqueado, setCelularDesbloqueado] = useState(false);

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

  const marcarCapituloCompletado = (capituloId: string) => {
    setCapitulosCompletados((prev) => {
      if (prev.includes(capituloId)) return prev;
      return [...prev, capituloId];
    });
  };

  const desbloquearCelular = () => {
    setCelularDesbloqueado(true);
  };

  return (
    <GameContext.Provider
      value={{
        pistas,
        recuerdos,
        lugaresVisitados,
        capitulosCompletados,
        celularDesbloqueado,
        memoriaRecuperada,
        agregarPista,
        agregarRecuerdo,
        marcarLugarVisitado,
        marcarCapituloCompletado,
        desbloquearCelular,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
