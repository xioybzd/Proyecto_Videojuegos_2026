import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useRef, useState, ReactNode } from 'react';
import type { GameItem } from '@/data/types';
import { chapters } from '@/data/chapters';
import { clues } from '@/data/clues';
import { memories } from '@/data/memories';

const SAVE_KEY = 'punto_ciego_save_v1';

type SavedGameState = {
  pistaIds: string[];
  recuerdoIds: string[];
  lugaresVisitados: string[];
  capitulosCompletados: string[];
  conversacionesCelularVistas: string[];
  celularDesbloqueado: boolean;
  glitchAparecio: boolean;
};

type GameContextType = {
  pistas: GameItem[];
  recuerdos: GameItem[];
  lugaresVisitados: string[];
  capitulosCompletados: string[];
  conversacionesCelularVistas: string[];
  celularDesbloqueado: boolean;
  glitchAparecio: boolean;
  memoriaRecuperada: number;
  agregarPista: (p: GameItem) => void;
  agregarRecuerdo: (r: GameItem) => void;
  marcarLugarVisitado: (lugarId: string) => void;
  marcarCapituloCompletado: (capituloId: string) => void;
  marcarConversacionCelularVista: (conversacionId: string) => void;
  desbloquearCelular: () => void;
  aparicionGlitch: () => void;
};

export const GameContext = createContext<GameContextType>({
  pistas: [],
  recuerdos: [],
  lugaresVisitados: [],
  capitulosCompletados: [],
  conversacionesCelularVistas: [],
  celularDesbloqueado: false,
  glitchAparecio: false,
  memoriaRecuperada: 0,
  agregarPista: () => {},
  agregarRecuerdo: () => {},
  marcarLugarVisitado: () => {},
  marcarCapituloCompletado: () => {},
  marcarConversacionCelularVista: () => {},
  desbloquearCelular: () => {},
  aparicionGlitch: () => {},
});

export function GameProvider({ children }: { children: ReactNode }) {
  const [pistas, setPistas] = useState<GameItem[]>([]);
  const [recuerdos, setRecuerdos] = useState<GameItem[]>([]);
  const [lugaresVisitados, setLugaresVisitados] = useState<string[]>([]);
  const [capitulosCompletados, setCapitulosCompletados] = useState<string[]>([]);
  const [conversacionesCelularVistas, setConversacionesCelularVistas] = useState<string[]>([]);
  const [celularDesbloqueado, setCelularDesbloqueado] = useState(false);
  const [glitchAparecio, setAparicionGlitch] = useState(false);
  const saveLoaded = useRef(false);

  const memoriaRecuperada = capitulosCompletados.reduce((maxMemoria, capituloId) => {
    const chapter = chapters.find((item) => item.id === capituloId);
    return Math.max(maxMemoria, chapter?.memoria ?? 0);
  }, 0);

  useEffect(() => {
    const cargarPartida = async () => {
      try {
        const rawSave = await AsyncStorage.getItem(SAVE_KEY);
        if (!rawSave) return;

        const save = JSON.parse(rawSave) as Partial<SavedGameState>;

        setPistas(clues.filter((clue) => save.pistaIds?.includes(clue.id)));
        setRecuerdos(memories.filter((memory) => save.recuerdoIds?.includes(memory.id)));
        setLugaresVisitados(save.lugaresVisitados ?? []);
        setCapitulosCompletados(save.capitulosCompletados ?? []);
        setConversacionesCelularVistas(save.conversacionesCelularVistas ?? []);
        setCelularDesbloqueado(save.celularDesbloqueado ?? false);
        setAparicionGlitch(save.glitchAparecio ?? false);
      } catch (e) {
        console.log('error cargando partida:', e);
      } finally {
        saveLoaded.current = true;
      }
    };

    cargarPartida();
  }, []);

  useEffect(() => {
    if (!saveLoaded.current) return;

    const guardarPartida = async () => {
      try {
        const save: SavedGameState = {
          pistaIds: pistas.map((pista) => pista.id),
          recuerdoIds: recuerdos.map((recuerdo) => recuerdo.id),
          lugaresVisitados,
          capitulosCompletados,
          conversacionesCelularVistas,
          celularDesbloqueado,
          glitchAparecio,
        };

        await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(save));
      } catch (e) {
        console.log('error guardando partida:', e);
      }
    };

    guardarPartida();
  }, [
    pistas,
    recuerdos,
    lugaresVisitados,
    capitulosCompletados,
    conversacionesCelularVistas,
    celularDesbloqueado,
    glitchAparecio,
  ]);

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

  const marcarConversacionCelularVista = (conversacionId: string) => {
    setConversacionesCelularVistas((prev) => {
      if (prev.includes(conversacionId)) return prev;
      return [...prev, conversacionId];
    });
  };

  const desbloquearCelular = () => {
    setCelularDesbloqueado(true);
  };

  const aparicionGlitch = () => {
    setAparicionGlitch(true);
  }

  return (
    <GameContext.Provider
      value={{
        pistas,
        recuerdos,
        lugaresVisitados,
        capitulosCompletados,
        conversacionesCelularVistas,
        celularDesbloqueado,
        glitchAparecio,
        memoriaRecuperada,
        agregarPista,
        agregarRecuerdo,
        marcarLugarVisitado,
        marcarCapituloCompletado,
        marcarConversacionCelularVista,
        desbloquearCelular,
        aparicionGlitch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
