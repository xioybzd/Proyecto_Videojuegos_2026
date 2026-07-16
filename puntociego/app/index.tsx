import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Fonts } from '@/constants/fonts';
import Slider from '@react-native-community/slider';
import { ResizeMode, Video } from 'expo-av';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const videoRef = useRef(null);

  // valores globales
  const [musicVolume, setMusicVolume] = useState(
    (global as any).musicVolume ?? 0.5
  );

  const [sfxVolume, setSfxVolume] = useState(
    (global as any).sfxVolume ?? 1
  );

  const [showVolume, setShowVolume] = useState(false);

  const anim = useRef(new Animated.Value(0)).current;

  // 🔊 CLICK GLOBAL
  const playClick = async () => {
    try {
      const sound = (global as any).clickSound?.current;

      if (sound) {
        await sound.stopAsync();
        await sound.playAsync();
      }
    } catch (e) {
      console.log('error click:', e);
    }
  };

  // 🎮 BOTÓN JUGAR
  const handlePlay = async () => {
    await playClick();

    setTimeout(() => {
      router.replace('/(tabs)/mapa');
    }, 120);
  };

  // 📖 BOTÓN TUTORIAL (NUEVO)
  const handleTutorial = async () => {
    await playClick();
    
    setTimeout(() => {
      // Usamos push para que pueda regresar a esta pantalla fácilmente
      router.push('/capitulo/tutorial');
    }, 120);
  };

  // 🎵 MÚSICA
  const handleMusicVolume = async (v: number) => {
    setMusicVolume(v);
    (global as any).musicVolume = v; 

    if ((global as any).bgSound?.current) {
      await (global as any).bgSound.current.setVolumeAsync(v);
    }
  };

  // 🔊 EFECTOS
  const handleSfxVolume = async (v: number) => {
    setSfxVolume(v);
    (global as any).sfxVolume = v; 

    if ((global as any).clickSound?.current) {
      await (global as any).clickSound.current.setVolumeAsync(v);
    }
  };

  // 🎛 MODAL
  const toggleVolume = () => {
    if (!showVolume) {
      setShowVolume(true);

      Animated.timing(anim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowVolume(false));
    }
  };

  return (
    <View style={styles.container}>

      {/* 🎞 VIDEO */}
      <Video
        ref={videoRef}
        source={require('@/assets/videos/portada.mp4')}
        style={styles.background}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay
      />

      <View style={styles.overlay} />

      {/* 🎮 CONTENEDOR DE BOTONES JUGAR Y TUTORIAL */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={handlePlay}
          activeOpacity={0.8}
        >
          <Image
            source={require('@/assets/images/jugar.png')}
            style={styles.buttonImage}
          />
        </TouchableOpacity>

        {/* 📖 TUTORIAL (NUEVO RECUADRO) */}
        <TouchableOpacity
          style={styles.tutorialButton}
          onPress={handleTutorial}
          activeOpacity={0.8}
        >
          <Text style={styles.tutorialText}>Tutorial</Text>
        </TouchableOpacity>
      </View>
      {/* 🔊 BOTÓN VOLUMEN */}
      <TouchableOpacity
        style={styles.volumeButton}
        onPress={async () => {
          await playClick();
          toggleVolume();
        }}
      >
        <Image
          source={require('@/assets/images/volumen.png')}
          style={styles.volumeImage}
        />
      </TouchableOpacity>

      {/* 🪟 MODAL */}
      {showVolume && (
        <View style={styles.overlayDim}>
          <Animated.View
            style={[
              styles.modal,
              {
                opacity: anim,
                transform: [
                  {
                    scale: anim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.85, 1],
                    }),
                  },
                ],
              },
            ]}
          >

            {/* 🎵 MÚSICA */}
            <Text style={styles.title}>Música</Text>

            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  { width: `${musicVolume * 100}%` },
                ]}
              />

              <Slider
                style={StyleSheet.absoluteFillObject}
                minimumValue={0}
                maximumValue={1}
                value={musicVolume}
                onValueChange={handleMusicVolume}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor="transparent"
              />
            </View>

            {/* 🔊 EFECTOS */}
            <Text style={[styles.title, { marginTop: 20 }]}>Efectos</Text>

            <View style={styles.barBackground}>
              <View
                style={[
                  styles.barFill,
                  { width: `${sfxVolume * 100}%` },
                ]}
              />

              <Slider
                style={StyleSheet.absoluteFillObject}
                minimumValue={0}
                maximumValue={1}
                value={sfxVolume}
                onValueChange={handleSfxVolume}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor="transparent"
              />
            </View>

            {/* ❌ CERRAR */}
            <TouchableOpacity
              onPress={async () => {
                await playClick();
                toggleVolume();
              }}
            >
              <Text style={styles.close}>Cerrar</Text>
            </TouchableOpacity>

          </Animated.View>
        </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },

  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.25,
  },

  /* NUEVO CONTENEDOR PARA LOS BOTONES */
  buttonsContainer: {
    position: 'absolute',
    bottom: 120,
    alignSelf: 'center',
    flexDirection: 'row', // Los pone uno al lado del otro
    alignItems: 'center',
    gap: 15, // Espacio entre el botón jugar y el tutorial
  },

  playButton: {
    width: 180,
    height: 70,
  },

  buttonImage: {
    width: '100%',
    height: '100%',
  },

  /* ESTILOS DEL BOTÓN TUTORIAL (Recuadro) */
  tutorialButton: {
    width: 140,
    height: 60,
    backgroundColor: 'rgba(192, 132, 182, 0.8)', // Color #c084b6 semi-transparente
    borderWidth: 2,
    borderColor: '#ead7e6',
    borderRadius: 15, // Bordes redondeados pero sigue siendo rectangular
    justifyContent: 'center',
    alignItems: 'center',
  },

  tutorialText: {
    fontFamily: Fonts.sunshine,
    fontSize: 28,
    color: 'white',
  },

  volumeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
  },

  volumeImage: {
    width: '100%',
    height: '100%',
  },

  overlayDim: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: 260,
    padding: 20,
    backgroundColor: '#f7f0f5',
    borderRadius: 20,
    alignItems: 'center',
  },

  title: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: '#6b4c6b',
    marginBottom: 10,
  },

  barBackground: {
    width: 200,
    height: 18,
    backgroundColor: '#ead7e6',
    borderRadius: 20,
    overflow: 'hidden',
  },

  barFill: {
    height: '100%',
    backgroundColor: '#c084b6',
    borderRadius: 20,
  },

  close: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    marginTop: 25,
    color: '#6b4c6b',
  },
});
