import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { GameContext } from '@/context/GameContext';

export default function PistasScreen() {
  const { pistas } = useContext(GameContext);

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

      <View style={styles.header}>
        <Text style={styles.title}>🔍 Pistas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {pistas.length === 0 ? (
          <Text style={styles.empty}>No hay pistas aún...</Text>
        ) : (
          pistas.map((p) => (
            <View key={p.id} style={styles.card}>
              <Text style={styles.cardTitle}>{p.titulo}</Text>
              <Text style={styles.cardDesc}>{p.descripcion}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={playClick}>
        <Text style={styles.buttonText}>Explorar pistas</Text>
      </TouchableOpacity>

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

  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },

  empty: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  cardDesc: {
    fontSize: 14,
    color: 'gray',
  },

  button: {
    backgroundColor: '#c084b6',
    padding: 12,
    borderRadius: 15,
    margin: 20,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});