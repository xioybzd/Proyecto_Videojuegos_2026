import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Fonts } from '@/constants/fonts';

type PhoneButtonProps = {
  visible: boolean;
  onPress: () => void;
};

export function PhoneButton({ visible, onPress }: PhoneButtonProps) {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <View style={styles.speaker} />
      <Text style={styles.icon}>✦</Text>
      <View style={styles.home} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 22,
    top: '36%',
    width: 58,
    height: 104,
    borderRadius: 17,
    backgroundColor: '#f3c8d8',
    borderWidth: 3,
    borderColor: '#84596b',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 9,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
  },
  speaker: {
    width: 22,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#84596b',
  },
  icon: {
    fontFamily: Fonts.sunshine,
    color: '#84596b',
    fontSize: 28,
  },
  home: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#84596b',
  },
});
