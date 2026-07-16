import { Audio } from 'expo-av';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Fonts } from '@/constants/fonts';

const creditLines = [
  'PUNTO CIEGO',
  '',
  'Una experiencia narrativa interactiva',
  'sobre memoria, culpa y verdad',
  '',
  '',
  'Direccion general',
  'Angellina Yepez Brigada',
  '',
  'Historia principal',
  'Capitulos importantes',
  'Direccion visual',
  'Integracion narrativa',
  'Programacion delicada',
  '',
  '',
  'NPCs y eventos especiales',
  'Jarol Carrascal Mejia',
  '',
  'Glitches',
  'Lugares del campus',
  'Visualizacion de pistas',
  'Visualizacion de recuerdos',
  'Apoyo de guion',
  '',
  '',
  'Tutorial y sistema de celular',
  'Dylan Arroni Guadalupe',
  '',
  'Textos simples',
  'Documentacion',
  'Apoyo en flujo de usuario',
  '',
  '',
  'Programacion e integracion',
  'Equipo Punto Ciego',
  '',
  'Arte, musica y recursos visuales',
  'Equipo Punto Ciego',
  '',
  'Pruebas y presentacion',
  'Equipo Punto Ciego',
  '',
  '',
  'Agradecimientos especiales',
  'A quienes caminaron la universidad',
  'buscando pistas con Azula',
  '',
  'A quienes escucharon la historia',
  'aunque los recuerdos no fueran confiables',
  '',
  '',
  'Fin del recorrido',
  '',
  '',
  'Gracias por jugar',
  '',
  '',
  'No confies en tus recuerdos.',
];

export default function CreditosScreen() {
  const translateY = useRef(new Animated.Value(520)).current;
  const creditsSound = useRef<Audio.Sound | null>(null);

  const finishCredits = async () => {
    try {
      await creditsSound.current?.stopAsync();
      await creditsSound.current?.unloadAsync();
      creditsSound.current = null;
      await (global as any).bgSound?.current?.playAsync();
    } catch (e) {
      console.log('error finish credits:', e);
    }

    router.replace('/');
  };

  useEffect(() => {
    let active = true;

    const startCredits = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });

        await (global as any).bgSound?.current?.pauseAsync();

        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/creditosfinales.mp3'),
          {
            shouldPlay: false,
            isLooping: false,
            volume: Math.max((global as any).musicVolume ?? 0.7, 0.35),
          }
        );

        if (!active) {
          await sound.unloadAsync();
          return;
        }

        creditsSound.current = sound;
        await sound.playAsync();
      } catch (e) {
        console.log('error creditos music:', e);
      }

      Animated.timing(translateY, {
        toValue: -1500,
        duration: 78000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          finishCredits();
        }
      });
    };

    startCredits();

    return () => {
      active = false;
      translateY.stopAnimation();
      creditsSound.current?.unloadAsync();
    };
  }, [translateY]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.credits, { transform: [{ translateY }] }]}>
        {creditLines.map((line, index) => (
          <Text
            key={`${line}-${index}`}
            style={[
              styles.line,
              index === 0 && styles.title,
              line === 'No confies en tus recuerdos.' && styles.finalLine,
            ]}
          >
            {line}
          </Text>
        ))}
      </Animated.View>

      <TouchableOpacity style={styles.skipButton} onPress={finishCredits}>
        <Text style={styles.skipText}>Saltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  credits: {
    position: 'absolute',
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  line: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 24,
    lineHeight: 35,
    textAlign: 'center',
  },
  title: {
    fontSize: 44,
    lineHeight: 58,
    marginBottom: 14,
  },
  finalLine: {
    fontSize: 34,
    lineHeight: 44,
    marginTop: 16,
  },
  skipButton: {
    position: 'absolute',
    right: 18,
    bottom: 34,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  skipText: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 20,
  },
});
