import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Fonts } from '@/constants/fonts';
import { cap1Scenes } from '@/data/chapters';
import { getClueById } from '@/data/clues';

export default function Cap1() {
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  const terminarCapitulo = () => {
    const pista = getClueById('cap1_pista1');
    if (!pista) return;

    router.push({
      pathname: '/recompensa',
      params: {
        id: pista.id,
        tipo: 'pista',
      },
    });
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < cap1Scenes.length - 1) return prev + 1;
      terminarCapitulo();
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

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <TouchableOpacity style={styles.touchableArea} onPress={manejarToque}>
        <Image source={cap1Scenes[escena].imagen} style={styles.image} />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{cap1Scenes[escena].texto}</Text>
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
    backgroundColor: 'rgba(173, 83, 83, 0.7)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
});
