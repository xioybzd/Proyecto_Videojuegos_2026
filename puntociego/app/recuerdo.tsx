import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
import { Fonts } from '@/constants/fonts';
import { memoryScenes } from '@/data/memories';

export default function RecuerdoScreen() {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const scenes = memoryScenes[id] ?? [];
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < scenes.length - 1) return prev + 1;
      router.replace('/(tabs)/recuerdos');
      return prev;
    });
  };

  const anteriorEscena = () => {
    setEscena((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const manejarToque = (e: any) => {
    const x = e.nativeEvent.locationX;
    if (x > width / 2) {
      siguienteEscena();
    } else {
      anteriorEscena();
    }
  };

  if (scenes.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Este recuerdo aun no quiere abrirse.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(tabs)/recuerdos')}>
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <TouchableOpacity style={styles.touchableArea} onPress={manejarToque}>
        <Image
          source={scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{scenes[escena].texto}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  touchableArea: { flex: 1 },
  image: { width: '100%', height: '100%' },
  dialogo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(40, 30, 50, 0.78)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
  empty: {
    flex: 1,
    backgroundColor: '#1D3D47',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: Fonts.sunshine,
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#c084b6',
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 18,
  },
  backText: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: 'white',
  },
});
