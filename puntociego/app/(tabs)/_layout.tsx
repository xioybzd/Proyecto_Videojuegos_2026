import React, { useContext, useEffect, useState } from 'react';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '@/constants/fonts';
import { GameContext } from '@/context/GameContext';

const bunnyImages = [
  require('@/assets/images/ayuda/14.png'),
  require('@/assets/images/ayuda/15.png'),
  require('@/assets/images/ayuda/16.png'),
  require('@/assets/images/ayuda/17.png'),
];

const mapHelpMessages = [
  'Hoja rota, secreto escrito: busca el hogar del librito.',
  'Si muchas historias duermen juntitas, por ahi se esconden las pistas.',
  'Ya sin misterio, Azula: ve a la biblioteca.',
];

const screenHelpMessages = {
  pistas: [
    'Mira la pista con atencion: hasta un papel roto guarda direccion.',
    'La nota no grita donde ir, pero sus palabras te hacen seguir.',
    'Si dudas mucho, vuelve al mapa: el conejito no se escapa.',
  ],
  recuerdos: [
    'Cada recuerdo es pedacito, arma la verdad poquito a poquito.',
    'Si una memoria parece mentir, mirala dos veces antes de seguir.',
    'Lo que Azula recuerda puede cambiar; no todo brillo sabe alumbrar.',
  ],
  perfil: [
    'Dato curioso: Janna nota cosas raras antes que los demas.',
    'Dato curioso: Kira parece fria, pero observa mas de lo que dice.',
    'Dato curioso: Jhon se queja del codigo, pero nunca abandona al grupo.',
    'Dato curioso: Ben molesta a Azula, pero siempre aparece con cafe.',
  ],
};

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { pistas, glitchAparecio } = useContext(GameContext);
  const [showHelp, setShowHelp] = useState(false);
  const [helpIndex, setHelpIndex] = useState(0);
  const [clueHelpStep, setClueHelpStep] = useState(0);
  const activeTab = pathname.includes('pistas')
    ? 'pistas'
    : pathname.includes('recuerdos')
      ? 'recuerdos'
      : pathname.includes('perfil')
        ? 'perfil'
        : pathname.includes('mapa')
          ? 'mapa'
          : '';
  const showBunnyButton = Boolean(activeTab);
  const hasFirstClue = pistas.some((p) => p.id === 'cap1_pista1');

  useEffect(() => {
    const syncMainMusic = async () => {
      try {
        if (!activeTab) {
          await (global as any).bgSound?.current?.pauseAsync();
          return;
        }

        await (global as any).bgSound?.current?.setVolumeAsync(
          (global as any).musicVolume ?? 0.5
        );
        await (global as any).bgSound?.current?.playAsync();
      } catch (e) {
        console.log('error sync music:', e);
      }
    };

    syncMainMusic();
  }, [activeTab]);

  const playSound = async () => {
    try {
      const sound = (global as any).clickSound?.current;

      if (sound) {
        await sound.stopAsync();
        await sound.playAsync();
      }
    } catch (e) {
      console.log('Error sonido:', e);
    }
  };

  const toggleHelp = async () => {
    await playSound();
    setHelpIndex(Math.floor(Math.random() * bunnyImages.length));

    if (activeTab === 'mapa' && hasFirstClue) {
      if (showHelp) {
        setClueHelpStep((prev) => Math.min(prev + 1, mapHelpMessages.length - 1));
      }
      setShowHelp(true);
      return;
    }

    setShowHelp((prev) => !prev);
  };

  const currentHelpMessage = (() => {
    if (activeTab === 'mapa') {
      return hasFirstClue
        ? mapHelpMessages[clueHelpStep]
        : 'Toca play, Azula, y empieza a mirar: la primera pista te va a despertar.';
    }

    if (activeTab === 'pistas') {
      return screenHelpMessages.pistas[helpIndex % screenHelpMessages.pistas.length];
    }

    if (activeTab === 'recuerdos') {
      return screenHelpMessages.recuerdos[helpIndex % screenHelpMessages.recuerdos.length];
    }

    if (activeTab === 'perfil') {
      return screenHelpMessages.perfil[helpIndex % screenHelpMessages.perfil.length];
    }

    return '';
  })();

  return (
    <>
      {/* BARRA SUPERIOR */}
      <View pointerEvents="box-none" style={[styles.topBar, { paddingTop: insets.top }]}>
        <Image
          source={
            glitchAparecio
              ? require('@/assets/images/glitched/barrasup_glitched.png')
              : require('@/assets/images/barrasup.png')
          }
          style={styles.topBarImage}
          resizeMode="stretch"
        />

        <View style={[styles.header, { top: insets.top + 10 }]}>
          <TouchableOpacity
            onPress={async () => {
              await playSound();

              setTimeout(() => {
                router.replace('/');
              }, 150);
            }}
            style={{ padding: 8 }}
          >
            <Text style={styles.backIcon}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        {showBunnyButton && (
          <>
            <TouchableOpacity
              style={[styles.helpButton, { top: insets.top + 20 }]}
              onPress={toggleHelp}
              activeOpacity={0.85}
            >
              <Image
                source={
                  glitchAparecio
                    ? require('@/assets/images/glitched/botonayuda_glitched.png')
                    : require('@/assets/images/ayuda/botonayuda.png')
                }
                style={styles.helpButtonImage}
              />
            </TouchableOpacity>

            {showHelp && (
              <View style={[styles.helpPanel, { top: insets.top + 80 }]}>
                <Image source={bunnyImages[helpIndex]} style={styles.bunnyImage} />
                <View style={[styles.helpBubble, glitchAparecio && { borderColor: '#701616' , backgroundColor: '#c27c7c' }]}>
                  <Text style={[styles.helpTitle, glitchAparecio && { color: '#440000'}]}>Conejito guia</Text>
                  <Text style={styles.helpText}>{currentHelpMessage}</Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>

      {/* 🔥 TABS */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#7600fd',
          tabBarInactiveTintColor: '#000000',

          tabBarBackground: () => (
            <Image
                source={
                  glitchAparecio
                    ? require('@/assets/images/glitched/barrainf_glitched.png')
                    : require('@/assets/images/barrainf.png')
                }
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="stretch"
              />
          ),

          
          tabBarStyle: {
            height: 70,
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          },

          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 7,
          },

          tabBarLabelStyle: {
            fontFamily: Fonts.sunshine,
            marginTop: -10,
            fontSize: 17,
          },

          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="mapa"
          listeners={{ tabPress: playSound }}
          options={{
            tabBarIcon: () => (
              <Image
                source={
                  glitchAparecio
                    ? require('@/assets/images/glitched/mapa_glitched.png')
                    : require('@/assets/images/mapa.png')
                }
                style={styles.iconImage}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="recuerdos"
          listeners={{ tabPress: playSound }}
          options={{
            tabBarIcon: () => (
              <Image
                source={
                  glitchAparecio
                    ? require('@/assets/images/glitched/recuerdos_glitched.png')
                    : require('@/assets/images/recuerdos.png')
                }
                style={styles.iconImage}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="pistas"
          listeners={{ tabPress: playSound }}
          options={{
            tabBarIcon: () => (
              <Image
                source={
                  glitchAparecio
                    ? require('@/assets/images/glitched/pistas_glitched.png')
                    : require('@/assets/images/pistas.png')
                }
                style={styles.iconImage}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="perfil"
          listeners={{ tabPress: playSound }}
          options={{
            tabBarIcon: () => (
              <Image
                source={
                  glitchAparecio
                    ? require('@/assets/images/glitched/perfil_glitched.png')
                    : require('@/assets/images/perfil.png')
                }
                style={styles.iconImage}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    height: 120,
    position: 'absolute',
    top: 0,
    zIndex: 80,
    elevation: 80,
  },

  topBarImage: {
    width: '100%',
    height: '100%',
  },

  header: {
    position: 'absolute',
    left: 10,
    zIndex: 90,
    elevation: 90,
  },

  helpButton: {
    position: 'absolute',
    right: 16,
    width: 58,
    height: 58,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex: 100,
    elevation: 100,
  },

  helpButtonImage: {
    width: '100%',
    height: '100%',
  },

  helpPanel: {
    position: 'absolute',
    right: 14,
    left: 14,
    zIndex: 95,
    elevation: 95,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bunnyImage: {
    width: 104,
    height: 104,
    resizeMode: 'contain',
    marginRight: 8,
  },

  helpBubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 2,
    borderColor: '#c084b6',
  },

  helpTitle: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: '#7600fd',
  },

  helpText: {
    fontFamily: Fonts.sunshine,
    fontSize: 18,
    color: '#1D3D47',
    marginTop: 2,
  },

  backIcon: {
    fontFamily: Fonts.sunshine,
    fontSize: 34,
    color: 'black',
  },

  iconImage: {
    width: 80,
    height: 80,
    marginTop: -20,
    resizeMode: 'contain',
  },
});
