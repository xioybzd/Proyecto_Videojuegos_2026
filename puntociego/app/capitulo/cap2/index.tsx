import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { Fonts } from '@/constants/fonts';
import { cap2Scenes } from '@/data/chapters';
import { getMemoryById } from '@/data/memories';
import { ChapterVolumeControl } from '@/components/ChapterVolumeControl';

export default function Cap2() {
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  const terminarCapitulo = () => {
    const recuerdo = getMemoryById('cap2_recuerdo1');
    if (!recuerdo) return;

    router.push({
      pathname: '/recompensa',
      params: {
        id: recuerdo.id,
        tipo: 'recuerdo',
      },
    });
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < cap2Scenes.length - 1) return prev + 1;
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
        <Image
          source={cap2Scenes[escena].imagen}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{cap2Scenes[escena].texto}</Text>
        </View>
      </TouchableOpacity>
      <ChapterVolumeControl />
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
    backgroundColor: 'rgba(32, 36, 54, 0.76)',
    padding: 20,
  },
  texto: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: 'white',
  },
});
