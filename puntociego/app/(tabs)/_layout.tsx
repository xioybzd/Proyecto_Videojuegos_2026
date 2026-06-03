import React from 'react';
import { Tabs, useRouter } from 'expo-router';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';
import { HapticTab } from '@/components/haptic-tab';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '@/constants/fonts';

export default function TabLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

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

  return (
    <>
      {/* BARRA SUPERIOR */}
      <View style={[styles.topBar, { paddingTop: insets.top }]}>
        <Image
          source={require('@/assets/images/barrasup.png')}
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
      </View>

      {/* 🔥 TABS */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#7600fd',
          tabBarInactiveTintColor: '#000000',

          tabBarBackground: () => (
            <Image
              source={require('@/assets/images/barrainf.png')}
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
                source={require('@/assets/images/mapa.png')}
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
                source={require('@/assets/images/recuerdos.png')}
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
                source={require('@/assets/images/pistas.png')}
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
                source={require('@/assets/images/perfil.png')}
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
    zIndex: 10,
  },

  topBarImage: {
    width: '100%',
    height: '100%',
  },

  header: {
    position: 'absolute',
    left: 10,
    zIndex: 20,
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
