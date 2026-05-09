import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

import { GameProvider } from '@/context/GameContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  const bgSound = useRef<Audio.Sound | null>(null);
  const clickSound = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
        });

        if ((global as any).musicVolume === undefined) {
          (global as any).musicVolume = 0.5;
        }

        if ((global as any).sfxVolume === undefined) {
          (global as any).sfxVolume = 1;
        }

        const { sound: music } = await Audio.Sound.createAsync(
          require('@/assets/sounds/Elegy_portada.mp3'),
          {
            isLooping: true,
            volume: (global as any).musicVolume,
          }
        );

        bgSound.current = music;
        (global as any).bgSound = bgSound;
        await music.playAsync();

        const { sound: click } = await Audio.Sound.createAsync(
          require('@/assets/sounds/burbuja6.mp3'),
          {
            shouldPlay: false,
            volume: (global as any).sfxVolume,
          }
        );

        clickSound.current = click;
        (global as any).clickSound = clickSound;

      } catch (e) {
        console.log('error audio:', e);
      }
    };

    init();

    return () => {
      bgSound.current?.unloadAsync();
      clickSound.current?.unloadAsync();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <GameProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar style="auto" />
        </ThemeProvider>
      </GameProvider>
    </SafeAreaProvider>
  );
}