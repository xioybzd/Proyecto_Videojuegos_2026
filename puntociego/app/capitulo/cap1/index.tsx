import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { router } from 'expo-router';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';
import { Fonts } from '@/constants/fonts';
import { cap1Scenes } from '@/data/chapters';
import { getClueById } from '@/data/clues';
import { ChapterVolumeControl } from '@/components/ChapterVolumeControl';

export default function Cap1() {
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);
  const chapterMusic = useRef<Audio.Sound | null>(null);

  const stopChapterMusic = async () => {
    try {
      const sound = chapterMusic.current;
      chapterMusic.current = null;
      await sound?.stopAsync();
      await sound?.unloadAsync();
    } catch (e) {
      console.log('error stop cap1 music:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let active = true;

    const startChapterMusic = async () => {
      try {
        await (global as any).bgSound?.current?.pauseAsync();
        await stopChapterMusic();

        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/cap1_music.mp3'),
          {
            isLooping: true,
            volume: (global as any).musicVolume ?? 0.5,
          }
        );

        if (!active) {
          await sound.unloadAsync();
          return;
        }

        chapterMusic.current = sound;
        await sound.playAsync();
      } catch (e) {
        console.log('error cap1 music:', e);
      }
    };

    startChapterMusic();

    return () => {
      active = false;
      stopChapterMusic();
    };
    }, [])
  );

  const terminarCapitulo = async () => {
    const pista = getClueById('cap1_pista1');
    if (!pista) return;

    await stopChapterMusic();

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
      if (prev < cap1Scenes.length - 1) return prev + 1;
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
          source={cap1Scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{cap1Scenes[escena].texto}</Text>
        </View>
      </TouchableOpacity>
      <ChapterVolumeControl musicRef={chapterMusic} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  touchableArea: { flex: 1 },
  image: { width: '100%', height: '100%' },
  dialogo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(173, 83, 83, 0.7)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
});
