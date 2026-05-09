import { createContext, useState, ReactNode } from 'react';

type Item = {
  id: string;
  titulo: string;
  descripcion: string;
};

type GameContextType = {
  pistas: Item[];
  recuerdos: Item[];
  agregarPista: (p: Item) => void;
  agregarRecuerdo: (r: Item) => void;
};

export const GameContext = createContext<GameContextType>({
  pistas: [],
  recuerdos: [],
  agregarPista: () => {},
  agregarRecuerdo: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [pistas, setPistas] = useState<Item[]>([]);
  const [recuerdos, setRecuerdos] = useState<Item[]>([]);

  const agregarPista = (p: Item) => {
    setPistas((prev) => [...prev, p]);
  };

  //  FIX IMPORTANTE
  const agregarRecuerdo = (nuevo: Item) => {
    setRecuerdos((prev) => {
      const existe = prev.some((r) => r.id === nuevo.id);
      if (existe) return prev; // ❌ evita duplicados
      return [...prev, nuevo];
    });
  };

  return (
    <GameContext.Provider
      value={{ pistas, recuerdos, agregarPista, agregarRecuerdo }}
    >
      {children}
    </GameContext.Provider>
  );
}