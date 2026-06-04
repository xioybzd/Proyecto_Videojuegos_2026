import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';

export default function PerfilScreen() {
  const { pistas, recuerdos, lugaresVisitados, memoriaRecuperada } = useContext(GameContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Perfil</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Image
              source={require('@/assets/images/fotoperfilAzulaNueva.png')}
              style={styles.avatarImage}
            />
          </View>

          <Text style={styles.name}>Azula</Text>
          <Text style={styles.contentText}>Estudiante universitaria</Text>
          <Text style={styles.mysteryText}>En busca de la verdad</Text>
        </View>

        <View style={styles.progressBox}>
          <Text style={styles.progressLabel}>Memoria recuperada</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(memoriaRecuperada, 100)}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.min(memoriaRecuperada, 100)}%</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{pistas.length}</Text>
            <Text style={styles.stat}>Pistas</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{recuerdos.length}</Text>
            <Text style={styles.stat}>Recuerdos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{lugaresVisitados.length}</Text>
            <Text style={styles.stat}>Lugares</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
  },

  title: {
    fontFamily: Fonts.sunshine,
    fontSize: 36,
    color: 'white',
    marginBottom: 16,
  },

  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 130,
    paddingBottom: 120,
  },

  profileCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 16,
    alignItems: 'center',
    padding: 20,
    marginBottom: 18,
  },

  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#c084b6',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.75)',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  name: {
    fontFamily: Fonts.sunshine,
    fontSize: 42,
    color: 'white',
  },

  contentText: {
    fontFamily: Fonts.sunshine,
    fontSize: 25,
    color: '#c7d5d9',
    textAlign: 'center',
  },

  mysteryText: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: '#c084b6',
    marginTop: 4,
    textAlign: 'center',
  },

  progressBox: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },

  progressLabel: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: 'white',
    marginBottom: 8,
  },

  progressBar: {
    width: '100%',
    height: 18,
    backgroundColor: '#0d252d',
    borderRadius: 20,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#c084b6',
    borderRadius: 20,
  },

  progressText: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: 'white',
    marginTop: 6,
    textAlign: 'right',
  },

  stats: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },

  statNumber: {
    fontFamily: Fonts.sunshine,
    fontSize: 34,
    color: '#c084b6',
  },

  stat: {
    fontFamily: Fonts.sunshine,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },

});
