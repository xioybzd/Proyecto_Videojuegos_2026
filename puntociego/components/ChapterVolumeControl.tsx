import Slider from '@react-native-community/slider';
import { RefObject, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { Fonts } from '@/constants/fonts';

type ChapterVolumeControlProps = {
  musicRef?: RefObject<Audio.Sound | null>;
};

export function ChapterVolumeControl({ musicRef }: ChapterVolumeControlProps) {
  const [musicVolume, setMusicVolume] = useState(
    (global as any).musicVolume ?? 0.5
  );

  const handleMusicVolume = async (v: number) => {
    setMusicVolume(v);
    (global as any).musicVolume = v;

    await musicRef?.current?.setVolumeAsync(v);
    await (global as any).bgSound?.current?.setVolumeAsync(v);
  };

  return (
    <View style={styles.panel}>
      <View style={styles.row}>
        <Text style={styles.label}>Musica</Text>
        <View style={styles.barBackground}>
          <View style={[styles.barFill, { width: `${musicVolume * 100}%` }]} />
          <Slider
            style={StyleSheet.absoluteFillObject}
            minimumValue={0}
            maximumValue={1}
            value={musicVolume}
            onValueChange={handleMusicVolume}
            minimumTrackTintColor="transparent"
            maximumTrackTintColor="transparent"
            thumbTintColor="transparent"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    top: 42,
    left: 14,
    right: 14,
    zIndex: 20,
    backgroundColor: 'rgba(247,240,245,0.9)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  label: {
    width: 70,
    fontFamily: Fonts.sunshine,
    fontSize: 18,
    color: '#6b4c6b',
  },

  barBackground: {
    flex: 1,
    height: 18,
    backgroundColor: '#ead7e6',
    borderRadius: 20,
    overflow: 'hidden',
  },

  barFill: {
    height: '100%',
    backgroundColor: '#c084b6',
    borderRadius: 20,
  },
});
