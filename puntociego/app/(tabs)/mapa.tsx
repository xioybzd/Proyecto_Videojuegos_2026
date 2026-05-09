import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function MapaScreen() {
  const router = useRouter();

  //  SONIDO GLOBAL 
  const playClick = async () => {
    try {
      const sound = (global as any).clickSound?.current;

      if (sound) {
        // asegura volumen correcto
        await sound.setVolumeAsync((global as any).sfxVolume ?? 1);

        // reproduce limpio siempre
        await sound.replayAsync();
      }
    } catch (e) {
      console.log('error click:', e);
    }
  };

  // BOTÓN PLAY
  const handlePlay = async () => {
    await playClick();

    setTimeout(() => {
      router.push('/capitulo');
    }, 120);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mapa en construcción...</Text>

      {/* BOTÓN FLOTANTE */}
      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlay}
        activeOpacity={0.8}
      >
        <Image
          source={require('@/assets/images/botonplay.png')}
          style={styles.playImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83b7c7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },

  playButton: {
    position: 'absolute',
    right: 20,
    bottom: 120,

    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',

    justifyContent: 'center',
    alignItems: 'center',

    elevation: 10,

    // sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  playImage: {
    width: '100%',
    height: '100%',
  },
});