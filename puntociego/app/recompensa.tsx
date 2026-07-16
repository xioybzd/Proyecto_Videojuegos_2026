import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useContext, useEffect } from 'react';
import { Audio } from 'expo-av';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';
import { getClueById } from '@/data/clues';
import { getMemoryById } from '@/data/memories';
import type { RewardType } from '@/data/types';

export default function Recompensa() {
  const params = useLocalSearchParams();
  const { agregarPista, agregarRecuerdo } = useContext(GameContext);

  const tipo = params.tipo as RewardType;
  const id = params.id as string;
  const item = tipo === 'recuerdo' ? getMemoryById(id) : getClueById(id);
  const rewardTitle =
    tipo === 'recuerdo'
      ? 'Recuerdo desbloqueado'
      : 'Nueva pista encontrada';

  useEffect(() => {
    let tingSound: Audio.Sound | null = null;

    const playRewardSound = async () => {
      try {
        await (global as any).bgSound?.current?.pauseAsync();

        const { sound } = await Audio.Sound.createAsync(
          require('@/assets/sounds/ting.mp3'),
          {
            shouldPlay: true,
            volume: (global as any).sfxVolume ?? 1,
          }
        );

        tingSound = sound;
      } catch (e) {
        console.log('error reward sound:', e);
      }
    };

    playRewardSound();

    return () => {
      tingSound?.unloadAsync();
    };
  }, []);

  const handlePress = () => {
    if (!item) {
      router.replace('/(tabs)/mapa');
      return;
    }

    if (tipo === 'recuerdo') {
      agregarRecuerdo(item);
      router.replace('/(tabs)/recuerdos');
    } else {
      agregarPista(item);
      router.replace('/(tabs)/pistas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {rewardTitle}
      </Text>

      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        <Image
          source={item?.imagen ?? require('@/assets/images/capituloimgs/capitulo1/escena3.png')}
          style={[styles.image, tipo === 'pista' && styles.clueImage]}
        />
      </TouchableOpacity>

      {tipo === 'recuerdo' && (
        <>
          <Text style={styles.itemTitle}>{item?.titulo ?? 'Elemento no encontrado'}</Text>
          <Text style={styles.text}>{item?.descripcion ?? 'Vuelve al mapa para continuar.'}</Text>
        </>
      )}

      <Text style={styles.hint}>Toca la imagen para continuar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  title: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 32,
    marginBottom: 20,
    textAlign: 'center',
  },

  image: {
    width: 200,
    height: 200,
    borderRadius: 20,
  },

  clueImage: {
    width: 330,
    height: 210,
  },

  itemTitle: {
    fontFamily: Fonts.sunshine,
    fontSize: 26,
    color: 'white',
    marginTop: 18,
    textAlign: 'center',
  },

  text: {
    fontFamily: Fonts.sunshine,
    fontSize: 20,
    color: 'gray',
    marginTop: 12,
    textAlign: 'center',
  },

  hint: {
    fontFamily: Fonts.sunshine,
    fontSize: 18,
    color: '#777',
    marginTop: 18,
  },
});
