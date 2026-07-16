import { ChapterVolumeControl } from '@/components/ChapterVolumeControl';
import { Fonts } from '@/constants/fonts';
import { GameContext } from '@/context/GameContext'; // 2. Importamos el GameContext
import { cap5Scenes } from '@/data/chapters';
import { getClueById } from '@/data/clues';
import { useChapterAudio } from '@/hooks/use-chapter-audio';
import { router } from 'expo-router';
import { useContext, useEffect, useState } from 'react'; // 1. Importamos useContext
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Cap5() {
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  // 3. Extraemos la función para guardar el progreso del capítulo
  const { marcarCapituloCompletado } = useContext(GameContext);

  const { chapterMusic, stopChapterMusic } = useChapterAudio(
    require('@/assets/sounds/cap5_music.mp3')
  );

  useEffect(() => {
    cap5Scenes.forEach((scene) => {
      const asset = Image.resolveAssetSource(scene.imagen);
      if (asset?.uri) Image.prefetch(asset.uri);
    });
  }, []);

  const terminarCapitulo = async () => {
    const pista = getClueById('cap5_pista1');
    if (!pista) return;

    await stopChapterMusic();

    // 4. Guardamos el progreso oficial del capítulo 5 en el estado global
    if (marcarCapituloCompletado) {
      marcarCapituloCompletado('cap5');
    }

    router.push({
      pathname: '/recompensa',
      params: {
        id: pista.id,
        tipo: 'pista',
      },
    });
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < cap5Scenes.length - 1) return prev + 1;
      terminarCapitulo();
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

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <TouchableOpacity style={styles.touchableArea} onPress={manejarToque}>
        <Image
          source={cap5Scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{cap5Scenes[escena].texto}</Text>
        </View>
      </TouchableOpacity>
      <ChapterVolumeControl />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#141218' },
  touchableArea: { flex: 1, backgroundColor: '#141218' },
  image: { width: '100%', height: '100%', backgroundColor: '#141218' },
  dialogo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(30, 28, 34, 0.78)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
});