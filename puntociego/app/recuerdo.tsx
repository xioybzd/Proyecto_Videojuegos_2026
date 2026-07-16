import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';
import { getMemoryById, memoryScenes } from '@/data/memories';

export default function RecuerdoScreen() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const unlockOnFinish = params.unlock === '1';
  const scenes = useMemo(() => memoryScenes[id] ?? [], [id]);
  const memory = getMemoryById(id);
  const { agregarRecuerdo, marcarLugarVisitado } = useContext(GameContext);
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    scenes.forEach((scene) => {
      const asset = Image.resolveAssetSource(scene.imagen);
      if (asset?.uri) Image.prefetch(asset.uri);
    });
  }, [scenes]);

  const terminarRecuerdo = () => {
    if (unlockOnFinish && memory) {
      agregarRecuerdo(memory);
      if (memory.lugarId) marcarLugarVisitado(memory.lugarId);
    }

    router.replace('/(tabs)/recuerdos');
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < scenes.length - 1) return prev + 1;
      terminarRecuerdo();
      return prev;
    });
  };

  const anteriorEscena = () => {
    setEscena((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const manejarToque = (e: any) => {
    const x = e.nativeEvent.locationX;
    if (x > width / 2) {
      siguienteEscena();
    } else {
      anteriorEscena();
    }
  };

  if (scenes.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Este recuerdo aun no quiere abrirse.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/recuerdos')}>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <TouchableOpacity style={styles.touchableArea} onPress={manejarToque}>
        <Image
          source={scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{scenes[escena].texto}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  touchableArea: { flex: 1, backgroundColor: '#151018' },
  image: { width: '100%', height: '100%', backgroundColor: '#151018' },
  dialogo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(40, 30, 50, 0.78)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
  empty: {
    flex: 1,
    backgroundColor: '#1D3D47',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: Fonts.sunshine,
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#c084b6',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 18,
  },
  backText: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: 'white',
  },
});
