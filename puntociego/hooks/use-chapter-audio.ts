import { useCallback, useRef } from 'react';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

export function useChapterAudio(audioSource: any) {
  const chapterMusic = useRef<Audio.Sound | null>(null);

  const stopChapterMusic = async () => {
    try {
      const sound = chapterMusic.current;
      chapterMusic.current = null;
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    } catch (e) {
      console.log('Error deteniendo música:', e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const startChapterMusic = async () => {
        try {

          await Audio.setAudioModeAsync({
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
          });

          await (global as any).bgSound?.current?.pauseAsync();
          await stopChapterMusic();


          const { sound } = await Audio.Sound.createAsync(
            audioSource,
            {
              shouldPlay: true,
              isLooping: true,
              volume: (global as any).musicVolume ?? 0.5,
            },
            undefined,
            false
          );

          if (!active) {
            await sound.unloadAsync();
            return;
          }

          chapterMusic.current = sound;
        } catch (e) {
          console.log('Error en música del capítulo:', e);
        }
      };

      startChapterMusic();

      return () => {
        active = false;
        stopChapterMusic();
      };
    }, [audioSource])
  );

  return { chapterMusic, stopChapterMusic };
}