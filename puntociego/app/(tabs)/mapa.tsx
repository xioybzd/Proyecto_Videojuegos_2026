import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';
import { locations } from '@/data/locations';

type PlayerLocation = {
  latitude: number;
  longitude: number;
};

const UNMSM_REGION: Region = {
  latitude: -12.0589,
  longitude: -77.0824,
  latitudeDelta: 0.006,
  longitudeDelta: 0.006,
};

const getDistanceMeters = (
  a: PlayerLocation,
  b: PlayerLocation
) => {
  const earthRadius = 6371000;
  const toRadians = (value: number) => (value * Math.PI) / 180;
  const latA = toRadians(a.latitude);
  const latB = toRadians(b.latitude);
  const deltaLat = toRadians(b.latitude - a.latitude);
  const deltaLng = toRadians(b.longitude - a.longitude);

  const h =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(latA) *
      Math.cos(latB) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);

  return earthRadius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
};

export default function MapaScreen() {
  const router = useRouter();
  const { pistas, recuerdos } = useContext(GameContext);
  const [playerLocation, setPlayerLocation] = useState<PlayerLocation | null>(null);
  const [permissionError, setPermissionError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);

  const pistaActiva = pistas.find((p) => p.id === 'cap1_pista1');
  const recuerdoDesbloqueado = recuerdos.some((r) => r.id === 'cap1_recuerdo1');

  const ubicacionObjetivo = useMemo(
    () => locations.find((location) => location.id === pistaActiva?.lugarId),
    [pistaActiva?.lugarId]
  );

  const distanciaObjetivo =
    playerLocation && ubicacionObjetivo?.coordenadas
      ? getDistanceMeters(playerLocation, ubicacionObjetivo.coordenadas)
      : null;

  const estaEnObjetivo =
    distanciaObjetivo !== null &&
    ubicacionObjetivo &&
    distanciaObjetivo <= ubicacionObjetivo.radioMetros;

  const playClick = async () => {
    try {
      const sound = (global as any).clickSound?.current;

      if (sound) {
        await sound.setVolumeAsync((global as any).sfxVolume ?? 1);
        await sound.replayAsync();
      }
    } catch (e) {
      console.log('error click:', e);
    }
  };

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          setPermissionError('Activa el permiso de ubicacion para jugar con GPS.');
          setLoadingLocation(false);
          return;
        }

        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setPlayerLocation({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        });

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 3,
          },
          (location) => {
            setPlayerLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
          }
        );
      } catch (e) {
        console.log('error location:', e);
        setPermissionError('No pude leer tu ubicacion. Revisa GPS y permisos.');
      } finally {
        setLoadingLocation(false);
      }
    };

    startLocation();

    return () => {
      subscription?.remove();
    };
  }, []);

  useEffect(() => {
    if (!estaEnObjetivo || !pistaActiva || recuerdoDesbloqueado) return;

    const unlock = async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.push({
        pathname: '/recompensa',
        params: {
          id: 'cap1_recuerdo1',
          tipo: 'recuerdo',
        },
      });
    };

    unlock();
  }, [estaEnObjetivo, pistaActiva, recuerdoDesbloqueado, router]);

  const handlePlay = async () => {
    await playClick();

    setTimeout(() => {
      router.push('/capitulo');
    }, 120);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={UNMSM_REGION}
        showsUserLocation
        showsMyLocationButton
      >
        {locations.map((location) => {
          if (!location.coordenadas) return null;

          const isTarget = location.id === ubicacionObjetivo?.id && !recuerdoDesbloqueado;
          const isVisited = recuerdos.some((r) => r.lugarId === location.id);

          return (
            <React.Fragment key={location.id}>
              <Marker
                coordinate={location.coordenadas}
                title={location.nombre}
                description={location.descripcion}
                pinColor={isVisited ? '#5fcf7a' : isTarget ? '#c084b6' : '#7600fd'}
              />

              {isTarget && (
                <Circle
                  center={location.coordenadas}
                  radius={location.radioMetros}
                  strokeColor="rgba(192,132,182,0.9)"
                  fillColor="rgba(192,132,182,0.22)"
                />
              )}
            </React.Fragment>
          );
        })}
      </MapView>

      <View style={styles.statusPanel}>
        <Text style={styles.title}>UNMSM</Text>

        {loadingLocation ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator color="white" />
            <Text style={styles.statusText}>Buscando tu ubicacion...</Text>
          </View>
        ) : permissionError ? (
          <Text style={styles.statusText}>{permissionError}</Text>
        ) : ubicacionObjetivo ? (
          <>
            <Text style={styles.statusText}>Objetivo: {ubicacionObjetivo.nombre}</Text>
            <Text style={styles.detailText}>
              {distanciaObjetivo === null
                ? 'Acercate al punto marcado para desbloquear el recuerdo.'
                : estaEnObjetivo
                  ? 'Recuerdo desbloqueado'
                  : `Estas a ${Math.round(distanciaObjetivo)} m del recuerdo.`}
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.statusText}>Completa el Capitulo 1 para obtener tu primera pista.</Text>
            <TouchableOpacity style={styles.chapterButton} onPress={handlePlay}>
              <Text style={styles.chapterText}>Abrir capitulos</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlay}
        activeOpacity={0.8}
      >
        <Image
          source={require('@/assets/images/botonplay.png')}
          style={styles.playImage}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D3D47',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },

  statusPanel: {
    position: 'absolute',
    top: 122,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(29,61,71,0.92)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },

  title: {
    fontFamily: Fonts.sunshine,
    fontSize: 30,
    color: 'white',
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },

  statusText: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 21,
    marginTop: 4,
  },

  detailText: {
    fontFamily: Fonts.sunshine,
    color: '#c7d5d9',
    fontSize: 18,
    marginTop: 4,
  },

  chapterButton: {
    backgroundColor: '#7600fd',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },

  chapterText: {
    fontFamily: Fonts.sunshine,
    fontSize: 22,
    color: 'white',
  },

  playButton: {
    position: 'absolute',
    right: 20,
    bottom: 120,
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  playImage: {
    width: '100%',
    height: '100%',
  },
});
