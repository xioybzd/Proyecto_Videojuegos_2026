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

export default function PistasScreen() {
  const { pistas } = useContext(GameContext);
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
        <Text style={styles.title}>Pistas ({pistas.length})</Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: TAB_BAR_HEIGHT + insets.bottom + 120,
        }}
      >
        {pistas.length === 0 ? (
          <Text style={styles.contentText}>No hay pistas aun...</Text>
        ) : (
          pistas.map((p) => {
            const lugar = getLocationById(p.lugarId);

            return (
              <View key={p.id} style={styles.card}>
                <Image source={p.imagen} style={styles.cardImage} />
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle}>{p.titulo}</Text>
                  <Text style={styles.cardDesc}>{p.descripcion}</Text>
                  {lugar && <Text style={styles.place}>Ir a: {lugar.nombre}</Text>}
                </View>
              </View>
            );
          })
        )}

        <TouchableOpacity style={styles.button} onPress={playClick}>
          <Text style={styles.buttonText}>Explorar pistas</Text>
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
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 12,
  },

  cardImage: {
    width: 78,
    height: 78,
    borderRadius: 8,
  },

  cardBody: {
    flex: 1,
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
