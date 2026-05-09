import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GameContext } from '@/context/GameContext';

export default function RecuerdosScreen() {
  const { recuerdos } = useContext(GameContext);
  const insets = useSafeAreaInsets();

  const TAB_BAR_HEIGHT = 70;

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
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>
          🧠 Recuerdos ({recuerdos.length})
        </Text>
      </View>

      {/* LISTA */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 120,
        }}
      >
        {recuerdos.length === 0 ? (
          <Text style={styles.contentText}>
            No hay recuerdos aún...
          </Text>
        ) : (
          recuerdos.map((r) => (
            <View key={r.id} style={styles.card}>
              <Text style={styles.cardTitle}>{r.titulo}</Text>
              <Text style={styles.cardDesc}>{r.descripcion}</Text>
            </View>
          ))
        )}

        {/* 🔥 BOTÓN AHORA DENTRO DEL SCROLL (FIX REAL) */}
        <TouchableOpacity style={styles.button} onPress={playClick}>
          <Text style={styles.buttonText}>Explorar recuerdos</Text>
        </TouchableOpacity>

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
  },

  header: {
    alignItems: 'center',
    paddingBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },

  contentText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
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
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});