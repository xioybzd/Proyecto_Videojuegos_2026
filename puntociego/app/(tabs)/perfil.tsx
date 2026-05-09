import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

export default function PerfilScreen() {

  //  SONIDO GLOBAL
  const playClick = async () => {
    try {
      const sound = (global as any).clickSound?.current;

      if (sound) {
        await sound.setVolumeAsync((global as any).sfxVolume ?? 1);
        await sound.replayAsync();
      }
    } catch (e) {
      console.log('error click:', e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>👤 Perfil</Text>
      </View>

      {/* CONTENIDO */}
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Perfil vacío</Text>

        {/* BOTÓN */}
        <TouchableOpacity
          style={styles.testButton}
          onPress={playClick}
        >
          <Text style={styles.testText}>Probar sonido</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
  },

  header: {
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },

  testButton: {
    backgroundColor: '#c084b6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },

  testText: {
    color: 'white',
    fontWeight: '600',
  },
});