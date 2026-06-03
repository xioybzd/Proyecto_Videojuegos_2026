import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';
import { getLocationById } from '@/data/locations';

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
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <Text style={styles.title}>Recuerdos ({recuerdos.length})</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 120,
        }}
      >
        {recuerdos.length === 0 ? (
          <Text style={styles.contentText}>No hay recuerdos aun...</Text>
        ) : (
          recuerdos.map((r) => {
            const lugar = getLocationById(r.lugarId);

            return (
              <View key={r.id} style={styles.card}>
                <Image source={r.imagen} style={styles.cardImage} />
                <Text style={styles.cardTitle}>{r.titulo}</Text>
                <Text style={styles.cardDesc}>{r.descripcion}</Text>
                {lugar && <Text style={styles.place}>Encontrado en: {lugar.nombre}</Text>}
              </View>
            );
          })
        )}

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
    fontFamily: Fonts.sunshine,
    fontSize: 31,
    color: 'white',
  },

  contentText: {
    fontFamily: Fonts.sunshine,
    fontSize: 24,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },

  cardTitle: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
  },

  cardDesc: {
    fontFamily: Fonts.sunshine,
    fontSize: 19,
    color: 'gray',
  },

  place: {
    fontFamily: Fonts.sunshine,
    fontSize: 18,
    color: '#7600fd',
    marginTop: 8,
  },

  button: {
    backgroundColor: '#c084b6',
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: 'white',
  },
});
