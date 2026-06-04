import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';
import { chapters } from '@/data/chapters';
import type { Chapter } from '@/data/types';

const { width } = Dimensions.get('window');

export default function Capitulos() {
  const router = useRouter();
  const { recuerdos } = useContext(GameContext);

  useEffect(() => {
    const pauseMainMusic = async () => {
      try {
        await (global as any).bgSound?.current?.pauseAsync();
      } catch (e) {
        console.log('error pause music:', e);
      }
    };

    pauseMainMusic();
  }, []);

  const estaDesbloqueado = (capitulo: Chapter) => {
    if (!capitulo.requeridoRecuerdoId) return true;
    return recuerdos.some((r) => r.id === capitulo.requeridoRecuerdoId);
  };

  const renderItem = ({ item }: { item: Chapter }) => {
    const desbloqueado = estaDesbloqueado(item);
    const puedeJugar = desbloqueado && item.ruta;

    return (
      <View style={styles.card}>
        <Image source={item.imagen} style={styles.image} resizeMode="cover" />

        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.desc}>
          {desbloqueado ? item.descripcion : 'Bloqueado'}
        </Text>
        <Text style={styles.memory}>{item.memoria}% memoria</Text>

        <TouchableOpacity
          disabled={!puedeJugar}
          style={[
            styles.button,
            { backgroundColor: puedeJugar ? '#7600fd' : '#555' },
          ]}
          onPress={() => {
            if (item.ruta) router.push(item.ruta as any);
          }}
        >
          <Text style={styles.buttonText}>
            {puedeJugar ? 'Jugar' : 'Bloqueado'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chapters}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0b0f',
  },
  card: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.sunshine,
    fontSize: 36,
    color: 'white',
  },
  desc: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
  },
  memory: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: '#c084b6',
    marginTop: 8,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  buttonText: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: 'white',
  },
});
