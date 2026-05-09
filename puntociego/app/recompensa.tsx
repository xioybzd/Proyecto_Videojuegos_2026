import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

export default function Recompensa() {
  const params = useLocalSearchParams();
  const { agregarPista, agregarRecuerdo } = useContext(GameContext);

  // imágenes separadas
  const imagenRecuerdo = require('@/assets/images/capituloimgs/capitulo1/recuerdo/recuerdo1c1.png');
  const imagenPista = require('@/assets/images/capituloimgs/capitulo1/escena3.png');

  const handlePress = () => {
    const data = {
      id: params.id as string,
      titulo: params.titulo as string,
      descripcion: params.descripcion as string,
    };

    // decide destino
    if (params.tipo === 'recuerdo') {
      agregarRecuerdo(data);
      router.replace('/(tabs)/recuerdos');
    } else {
      agregarPista(data);
      router.replace('/(tabs)/pistas');
    }
  };

  return (
    <View style={styles.container}>
      
      {/* TÍTULO */}
      <Text style={styles.title}>
        {params.tipo === 'recuerdo'
          ? '✨ Recuerdo encontrado'
          : '🔍 Pista encontrada'}
      </Text>

      {/* IMAGEN DINÁMICA */}
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Image
          source={
            params.tipo === 'recuerdo'
              ? imagenRecuerdo
              : imagenPista
          }
          style={styles.image}
        />
      </TouchableOpacity>

      <Text style={styles.text}>Toca la imagen para continuar</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 22,
    marginBottom: 20,
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },

  text: {
    color: 'gray',
    marginTop: 15,
  },
});