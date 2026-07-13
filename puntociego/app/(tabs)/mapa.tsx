import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import * as Haptics from 'expo-haptics';
import MapView, { Circle, Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { DEMO_SKIP_LOCATION_CHECKS } from '@/config/demo';
import { GameContext } from '@/context/GameContext';
import { Fonts } from '@/constants/fonts';
import { locationUnlocks, locations } from '@/data/locations';
import { locations_npc } from '@/data/locations_NPC';
import { getMemoryById } from '@/data/memories';
import { PhoneButton } from '@/components/PhoneButton';

type PlayerLocation = {
  latitude: number;
  longitude: number;
};

const UNMSM_REGION: Region = {
  latitude: -12.05574,
  longitude: -77.08559,
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
  const {
    pistas,
    recuerdos,
    lugaresVisitados,
    capitulosCompletados,
    celularDesbloqueado,
    glitchAparecio,
    marcarLugarVisitado,
  } = useContext(GameContext);
  const [playerLocation, setPlayerLocation] = useState<PlayerLocation | null>(null);
  const [permissionError, setPermissionError] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [npcPosition, setNpcPosition] = useState<PlayerLocation | null>(null);
  const movingToEnd = useRef(true);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  const desbloqueoActivo = useMemo(
    () =>
      locationUnlocks.find(
        (unlock) =>
          (!unlock.clueId || pistas.some((pista) => pista.id === unlock.clueId)) &&
          (!unlock.prerequisiteRecuerdoId ||
            recuerdos.some((recuerdo) => recuerdo.id === unlock.prerequisiteRecuerdoId)) &&
          (!unlock.prerequisiteChapterId ||
            capitulosCompletados.includes(unlock.prerequisiteChapterId)) &&
          (!('recuerdoId' in unlock) ||
            !recuerdos.some((recuerdo) => recuerdo.id === unlock.recuerdoId)) &&
          (!('lugarId' in unlock) || !lugaresVisitados.includes(unlock.lugarId))
      ),
    [pistas, recuerdos, lugaresVisitados, capitulosCompletados]
  );

  const recuerdoObjetivo =
    desbloqueoActivo && 'recuerdoId' in desbloqueoActivo
      ? getMemoryById(desbloqueoActivo.recuerdoId)
      : undefined;
  const lugarObjetivoId =
    recuerdoObjetivo?.lugarId ??
    (desbloqueoActivo && 'lugarId' in desbloqueoActivo
      ? desbloqueoActivo.lugarId
      : undefined);
  const objetivoDesbloqueado = desbloqueoActivo
    ? ('recuerdoId' in desbloqueoActivo &&
        recuerdos.some((r) => r.id === desbloqueoActivo.recuerdoId)) ||
      ('lugarId' in desbloqueoActivo &&
        lugaresVisitados.includes(desbloqueoActivo.lugarId))
    : false;

  const ubicacionObjetivo = useMemo(
    () => locations.find((location) => location.id === lugarObjetivoId),
    [lugarObjetivoId]
  );

  const ubicacionNPC = useMemo(() => {
    const cap4Completado = capitulosCompletados.includes('cap4');
    const recuerdoNPCDesbloqueado = recuerdos.some((r) => r.id === 'cap4_recuerdo1');

    if (!cap4Completado || recuerdoNPCDesbloqueado) return undefined;
    return locations_npc.find((locationNpc) => locationNpc.capituloID === 'cap4');
  }, [capitulosCompletados, recuerdos]);

  const distanciaObjetivo =
    playerLocation && ubicacionObjetivo?.coordenadas
      ? getDistanceMeters(playerLocation, ubicacionObjetivo.coordenadas)
      : null;

  const distanciaNPC =
    playerLocation && npcPosition
      ? getDistanceMeters(playerLocation, npcPosition)
      : null;

  const estaEnObjetivo =
    distanciaObjetivo !== null &&
    ubicacionObjetivo &&
    distanciaObjetivo <= ubicacionObjetivo.radioMetros;

  const interactuarNPC =
    distanciaNPC !== null &&
    ubicacionNPC &&
    distanciaNPC <= ubicacionNPC.radioMetros;

  useEffect(() => {
    if (!ubicacionNPC) {
      setNpcPosition(null);
      return;
    }

    setNpcPosition(ubicacionNPC.coordenadas_inicio);
  }, [ubicacionNPC]);

  const moveTowards = (
    current: PlayerLocation,
    target: PlayerLocation,
    step: number
  ): PlayerLocation => {
    const dx = target.latitude - current.latitude;
    const dy = target.longitude - current.longitude;
    const length = Math.sqrt(dx * dx + dy * dy);

    if (length === 0) return target;

    return {
      latitude: current.latitude + (dx / length) * step,
      longitude: current.longitude + (dy / length) * step,
    };
  };

  useEffect(() => {
    if (!ubicacionNPC) return;

    const interval = setInterval(() => {
      setNpcPosition((current) => {
        if (!current) return current;

        const target = movingToEnd.current
          ? ubicacionNPC.coordenadas_final
          : ubicacionNPC.coordenadas_inicio;

        const next = moveTowards(current, target, 0.0000005);
        const distance = getDistanceMeters(next, target);

        if (distance < 2) {
          movingToEnd.current = !movingToEnd.current;
          return target;
        }

        return next;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [ubicacionNPC]);

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

  const startLocation = async () => {
    if (DEMO_SKIP_LOCATION_CHECKS) {
      setLoadingLocation(false);
      setPermissionError('');
      return;
    }

    setLoadingLocation(true);
    setPermissionError('');

    try {
      const servicesEnabled = await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        setPermissionError('Activa el GPS del celular y vuelve a intentar.');
        setLoadingLocation(false);
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setPermissionError('Dale permiso de ubicacion a Expo Go para jugar con GPS.');
        setLoadingLocation(false);
        return;
      }

      const cached = await Location.getLastKnownPositionAsync({
        maxAge: 120000,
        requiredAccuracy: 250,
      });

      if (cached) {
        setPlayerLocation({
          latitude: cached.coords.latitude,
          longitude: cached.coords.longitude,
        });
      }

      try {
        const current = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setPlayerLocation({
          latitude: current.coords.latitude,
          longitude: current.coords.longitude,
        });
      } catch (e) {
        console.log('error current location:', e);

        if (!cached) {
          setPermissionError('No pude leer tu ubicacion. Sal a un lugar abierto o toca reintentar.');
        }
      }

      locationSubscription.current?.remove();
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 4000,
          distanceInterval: 5,
        },
        (location) => {
          setPlayerLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
          setPermissionError('');
        }
      );
    } catch (e) {
      console.log('error location:', e);
      setPermissionError('No pude activar el GPS. Revisa permisos y toca reintentar.');
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    startLocation();

    return () => {
      locationSubscription.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (DEMO_SKIP_LOCATION_CHECKS) return;
    if (!estaEnObjetivo || !desbloqueoActivo || objetivoDesbloqueado) return;

    const unlock = async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      if ('lugarId' in desbloqueoActivo) {
        marcarLugarVisitado(desbloqueoActivo.lugarId);
        router.replace('/capitulo');
        return;
      }

      router.push({
        pathname: '/recompensa',
        params: {
          id: desbloqueoActivo.recuerdoId,
          tipo: 'recuerdo',
        },
      });
    };

    unlock();
  }, [estaEnObjetivo, desbloqueoActivo, objetivoDesbloqueado, marcarLugarVisitado, router]);

  useEffect(() => {
    if (DEMO_SKIP_LOCATION_CHECKS) return;
    if (!interactuarNPC) return;

    const unlock = async () => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      router.push({
        pathname: '/recompensa',
        params: {
          id: 'cap4_recuerdo1',
          tipo: 'recuerdo',
        },
      });
    };

    unlock();
  }, [interactuarNPC, router]);

  const handlePlay = async () => {
    await playClick();

    setTimeout(() => {
      router.push('/capitulo');
    }, 120);
  };

  return (
    <View style={[styles.container,
      glitchAparecio && { backgroundColor: '#180101' }
    ]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={UNMSM_REGION}
        showsUserLocation
        showsMyLocationButton
        customMapStyle={glitchAparecio ? glitchMapStyle : []}
      >
        {ubicacionObjetivo?.coordenadas && !objetivoDesbloqueado && (
          <>
            <Marker
              coordinate={ubicacionObjetivo.coordenadas}
              title="Punto de investigacion"
              description="Hay algo esperando por Azula."
              pinColor={glitchAparecio ? "#5d0d7ce6" : "#c084b6"}
            />

            <Circle
              center={ubicacionObjetivo.coordenadas}
              radius={ubicacionObjetivo.radioMetros}
              strokeColor={
                glitchAparecio
                  ? "#5d0d7ce6"
                  : "#c084b6e6"
              }
              fillColor={
                glitchAparecio
                  ? "#6b377e5b"
                  : "#c084b638"
              }
            />
          </>
        )}

        {npcPosition && ubicacionNPC && (
          <>
            <Marker coordinate={npcPosition} anchor={{ x: 0.5, y: 0.5 }}>
              <View style={styles.markerContainer}>
                <Image
                  source={ubicacionNPC.imagen}
                  style={styles.npcMarker}
                />
              </View>
            </Marker>

            <Circle
              center={npcPosition}
              radius={ubicacionNPC.radioMetros}
              strokeColor={
                glitchAparecio
                  ? "#7a00255b"
                  : "#c084b6e6"
              }
              fillColor={
                glitchAparecio
                  ? "#7e374c5b"
                  : "#c084b638"
              }
            />
          </>
        )}
      </MapView>

      {(DEMO_SKIP_LOCATION_CHECKS || loadingLocation || permissionError || ubicacionObjetivo) && (
        <View style={[
          styles.statusPanel,
          glitchAparecio && { 
            backgroundColor: '#270101', 
            borderColor: '#fd0000' 
          }
        ]}>
          {DEMO_SKIP_LOCATION_CHECKS ? (
            <>
              <Text style={styles.statusText}>Modo expo activo</Text>
              <Text style={styles.detailText}>
                Las ubicaciones no bloquean la historia durante la presentacion.
              </Text>
            </>
          ) : loadingLocation ? (
            <View style={styles.loadingRow}>
              <ActivityIndicator color="white" />
              <Text style={styles.statusText}>Buscando tu ubicacion...</Text>
            </View>
          ) : permissionError ? (
            <>
              <Text style={styles.statusText}>{permissionError}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={startLocation}>
                <Text style={styles.retryText}>Reintentar GPS</Text>
              </TouchableOpacity>
            </>
          ) : ubicacionObjetivo ? (
            <>
              <Text style={styles.statusText}>Punto de investigacion activo</Text>
              <Text style={styles.detailText}>
                {distanciaObjetivo === null
                  ? 'Acercate al punto marcado para desbloquear el siguiente fragmento.'
                  : estaEnObjetivo
                    ? 'Fragmento desbloqueado'
                    : `Estas a ${Math.round(distanciaObjetivo)} m de una memoria escondida.`}
              </Text>
            </>
          ) : null}
        </View>
      )}

      <TouchableOpacity
        style={styles.playButton}
        onPress={handlePlay}
        activeOpacity={0.8}
      >
        <Image
          source={
            glitchAparecio
              ? require('@/assets/images/glitched/botonplay_glitched.png')
              : require('@/assets/images/botonplay.png')
          }
          style={styles.playImage}
        />
      </TouchableOpacity>

      <PhoneButton
        visible={celularDesbloqueado}
        onPress={() => router.push('/celular')}
      />
    </View>
  );
}

const glitchMapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#0A0A0A" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#8A5757" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#120909" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1A1111" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#321111" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#B66A6A" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#120707" }],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [{ color: "#080808" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#101010" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6E4444" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#111111" }],
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7D5B5B" }],
  },
];

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

  retryButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#c084b6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 10,
  },

  retryText: {
    fontFamily: Fonts.sunshine,
    color: 'white',
    fontSize: 18,
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

  markerContainer: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  npcMarker: {
      width: 30,
      height: 30,
      transform: [{ scale: 1.4 }],
  },
});
