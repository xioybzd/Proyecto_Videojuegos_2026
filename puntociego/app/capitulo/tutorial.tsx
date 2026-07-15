import { Fonts } from '@/constants/fonts';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Array con las 3 imágenes del tutorial
const TUTORIAL_IMAGES = [
  require('@/assets/images/tutorial_1.png'),
  require('@/assets/images/tutorial_2.png'),
  require('@/assets/images/tutorial_3.png'),
];

export default function TutorialScreen() {
  const router = useRouter();
  const [pasoActual, setPasoActual] = useState(0);

  // Reproducir sonido de clic
  const playClick = async () => {
    try {
      const sound = (global as any).clickSound?.current;
      if (sound) {
        await sound.stopAsync();
        await sound.playAsync();
      }
    } catch (e) {
      console.log('error click:', e);
    }
  };

  const handleVolver = async () => {
    await playClick();
    router.back();
  };

  const handleSiguiente = async () => {
    await playClick();
    if (pasoActual < TUTORIAL_IMAGES.length - 1) {
      setPasoActual(pasoActual + 1);
    }
  };

  const handleAnterior = async () => {
    await playClick();
    if (pasoActual > 0) {
      setPasoActual(pasoActual - 1);
    }
  };

  return (
    <View style={styles.container}>
      {/* IMAGEN DE FONDO A PANTALLA COMPLETA */}
      <Image 
        source={TUTORIAL_IMAGES[pasoActual]} 
        style={styles.backgroundImage} 
        resizeMode="contain" // "contain" evita que se recorte, si prefieres que llene todo usa "cover"
      />

      {/* BOTÓN VOLVER AL MENÚ (Arriba a la izquierda) */}
      <TouchableOpacity style={styles.backButton} onPress={handleVolver} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Volver al menú</Text>
      </TouchableOpacity>

      {/* CONTROLES DE NAVEGACIÓN (Abajo) */}
      <View style={styles.navigationContainer}>
        {/* Botón Anterior (Solo se muestra si no estamos en la primera imagen) */}
        {pasoActual > 0 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleAnterior} activeOpacity={0.8}>
            <Text style={styles.navButtonText}>Anterior</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navButtonPlaceholder} /> // Espacio vacío para mantener alineación
        )}

        {/* Indicador de página (Ej: 1 / 3) */}
        <View style={styles.indicatorContainer}>
           <Text style={styles.indicatorText}>{pasoActual + 1} / {TUTORIAL_IMAGES.length}</Text>
        </View>

        {/* Botón Siguiente (Solo se muestra si no estamos en la última imagen) */}
        {pasoActual < TUTORIAL_IMAGES.length - 1 ? (
          <TouchableOpacity style={styles.navButton} onPress={handleSiguiente} activeOpacity={0.8}>
            <Text style={styles.navButtonText}>Siguiente</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.navButtonPlaceholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090910', // Fondo oscuro por si la imagen es formato contain
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute', // Cubre todo el fondo
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(192, 132, 182, 0.9)', // #c084b6 con un poco de transparencia
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ead7e6',
  },
  buttonText: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: 'white',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo semitransparente oscuro
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#c084b6',
    minWidth: 120,
    alignItems: 'center',
  },
  navButtonPlaceholder: {
    minWidth: 120, // Mismo ancho que el botón para mantener el centro en su lugar
  },
  navButtonText: {
    fontFamily: Fonts.sunshine,
    fontSize: 24,
    color: '#ead7e6',
  },
  indicatorContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
  },
  indicatorText: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: 'white',
  }
});