import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useContext } from 'react';
import { GameContext } from '@/context/GameContext';

const { width } = Dimensions.get('window');

export default function Capitulos() {
  const router = useRouter();

  const { recuerdos } = useContext(GameContext);

  //  condición de desbloqueo
  const cap2Desbloqueado = recuerdos.some(r => r.id === 'cap1_recuerdo1');

  const capitulos = [
    {
      id: '1',
      titulo: 'Capítulo 1',
      descripcion: 'Solo un día cualquiera en mi vida...',
      imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
      desbloqueado: true,
    },
    {
      id: '2',
      titulo: 'Capítulo 2',
      descripcion: cap2Desbloqueado ? 'Continúa la historia...' : 'Bloqueado',
      imagen: require('@/assets/images/capituloimgs/capitulo1/portadah1c1.png'),
      desbloqueado: cap2Desbloqueado,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.imagen} style={styles.image} />

      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.desc}>{item.descripcion}</Text>

      <TouchableOpacity
        disabled={!item.desbloqueado}
        style={[
          styles.button,
          { backgroundColor: item.desbloqueado ? '#7600fd' : '#555' },
        ]}
        onPress={() => {
          if (item.id === '1') router.push('/capitulo/cap1');
          if (item.id === '2') router.push('/capitulo/cap2');
        }}
      >
        <Text style={styles.buttonText}>
          {item.desbloqueado ? 'Jugar' : 'Bloqueado 🔒'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={capitulos}
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
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
  },
  desc: {
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});