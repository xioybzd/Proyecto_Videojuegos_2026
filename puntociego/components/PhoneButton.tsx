import { Image, StyleSheet, TouchableOpacity } from 'react-native';

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
      <Image 
        source={require('@/assets/images/celular.png')} 
        style={styles.logoImage}
        resizeMode="contain"
      />
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
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
});
