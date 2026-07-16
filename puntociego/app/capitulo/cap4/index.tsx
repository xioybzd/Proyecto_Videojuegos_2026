import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Fonts } from '@/constants/fonts';
import { GameContext } from '@/context/GameContext';
import { cap4Scenes } from '@/data/chapters';
import { ChapterVolumeControl } from '@/components/ChapterVolumeControl';
import { useChapterAudio } from '@/hooks/use-chapter-audio';

export default function Cap4() {
  const { marcarCapituloCompletado } = useContext(GameContext);
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  const { chapterMusic, stopChapterMusic } = useChapterAudio(
      require('@/assets/sounds/cap4_music.mp3')
    );

  useEffect(() => {
    cap4Scenes.forEach((scene) => {
      const asset = Image.resolveAssetSource(scene.imagen);
      if (asset?.uri) Image.prefetch(asset.uri);
    });
  }, []);

  const terminarCapitulo = async () => {
    await stopChapterMusic();

    marcarCapituloCompletado('cap4');
    router.replace('/(tabs)/mapa');
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < cap4Scenes.length - 1) return prev + 1;
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
          source={cap4Scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{cap4Scenes[escena].texto}</Text>
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
