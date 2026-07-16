import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Fonts } from '@/constants/fonts';
import { GameContext } from '@/context/GameContext';
import { getClueById } from '@/data/clues';

export default function CelularScreen() {
  const { agregarPista } = useContext(GameContext);

  const cerrarCelular = () => {
    const pista = getClueById('cel_pista_comedor');
    if (pista) agregarPista(pista);

    router.replace('/(tabs)/mapa');
  };

  return (
    <View style={styles.container}>
      <View style={styles.phone}>
        <View style={styles.header}>
          <Text style={styles.contact}>Janna</Text>
          <Text style={styles.status}>en linea</Text>
        </View>

        <View style={styles.message}>
          <Text style={styles.sender}>Janna</Text>
          <Text style={styles.text}>Donde todos hacen cola, nadie mira.</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={cerrarCelular}>
        <Text style={styles.buttonText}>Guardar pista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090910',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  phone: {
    width: '86%',
    maxWidth: 340,
    aspectRatio: 0.56,
    backgroundColor: '#15111f',
    borderRadius: 34,
    borderWidth: 5,
    borderColor: '#f3c8d8',
    padding: 22,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.14)',
    paddingBottom: 14,
    marginBottom: 24,
  },
  contact: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 30,
  },
  status: {
    fontFamily: Fonts.sunshine,
    color: '#c084b6',
    fontSize: 18,
  },
  message: {
    alignSelf: 'flex-start',
    maxWidth: '88%',
    backgroundColor: '#352642',
    borderRadius: 18,
    padding: 16,
  },
  sender: {
    fontFamily: Fonts.sunshine,
    color: '#c084b6',
    fontSize: 18,
    marginBottom: 6,
  },
  text: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 25,
  },
  button: {
    backgroundColor: '#c084b6',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 24,
  },
  buttonText: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 23,
  },
});
