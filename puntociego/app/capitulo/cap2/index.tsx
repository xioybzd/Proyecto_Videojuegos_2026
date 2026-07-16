import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Fonts } from '@/constants/fonts';
import { cap2Scenes } from '@/data/chapters';
import { getMemoryById } from '@/data/memories';
import { ChapterVolumeControl } from '@/components/ChapterVolumeControl';
import { useChapterAudio } from '@/hooks/use-chapter-audio';

export default function Cap2() {
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  const { chapterMusic, stopChapterMusic } = useChapterAudio(
    require('@/assets/sounds/cap2_music.mp3')
  );

  useEffect(() => {
    cap2Scenes.forEach((scene) => {
      const asset = Image.resolveAssetSource(scene.imagen);
      if (asset?.uri) Image.prefetch(asset.uri);
    });
  }, []);

  const terminarCapitulo = async () => {
    const recuerdo = getMemoryById('cap2_recuerdo1');
    if (!recuerdo) return;

    await stopChapterMusic();

    router.push({
      pathname: '/recompensa',
      params: {
        id: recuerdo.id,
        tipo: 'recuerdo',
      },
    });
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < cap2Scenes.length - 1) return prev + 1;
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
          source={cap2Scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
          fadeDuration={0}
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{cap2Scenes[escena].texto}</Text>
        </View>
      </TouchableOpacity>
      <ChapterVolumeControl musicRef={chapterMusic}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121620' },
  touchableArea: { flex: 1, backgroundColor: '#121620' },
  image: { width: '100%', height: '100%', backgroundColor: '#121620' },
  dialogo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(32, 36, 54, 0.76)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
});
