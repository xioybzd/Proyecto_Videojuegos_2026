import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

export default function Cap1() {
  const [escena, setEscena] = useState(0);
  const [width, setWidth] = useState(0);

  const escenas = [
    {
      imagen: require('@/assets/images/capituloimgs/capitulo1/escena1.png'),
      texto: 'Desperté sin recordar nada...',
    },
    {
      imagen: require('@/assets/images/capituloimgs/capitulo1/escena2.png'),
      texto: 'Mi cabeza dolía demasiado...',
    },
    {
      imagen: require('@/assets/images/capituloimgs/capitulo1/escena3.png'),
      texto: '¿Dónde estoy?',
    },
  ];

  const terminarCapitulo = () => {
    router.push({
      pathname: '/recompensa',
      params: {
        id: 'cap1_recuerdo1',
        titulo: 'Recuerdo borroso',
        descripcion: 'Sentiste que ya habías estado aquí...',
        tipo: 'recuerdo', // 👈 CLAVE
      },
    });
  };

  const siguienteEscena = () => {
    setEscena((prev) => {
      if (prev < escenas.length - 1) return prev + 1;
      terminarCapitulo();
      return prev;
    });
  };

  const anteriorEscena = () => {
    setEscena((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const manejarToque = (e: any) => {
    const x = e.nativeEvent.locationX;
    x > width / 2 ? siguienteEscena() : anteriorEscena();
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <TouchableOpacity style={styles.touchableArea} onPress={manejarToque}>
        <Image source={escenas[escena].imagen} style={styles.image} />
        <View style={styles.dialogo}>
          <Text style={styles.texto}>{escenas[escena].texto}</Text>
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
  texto: { color: 'white' },
});