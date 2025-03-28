import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Colors from '@/data/Colors';

type ButtonProps = {
  text: string;
  loading?: boolean;
  onPress: () => void;
  size?: 'small' | 'large'; // Made this optional with default value
};

export default function Button({
  text,
  onPress,
  loading,
  size = 'large', // Default size is large
}: ButtonProps) {
  const buttonStyles = [
    styles.btn,
    size === 'small' ? styles.smallBtn : styles.largeBtn,
  ];

  const textStyles = [
    styles.btnText,
    size === 'small' ? styles.smallText : styles.largeText,
  ];

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.WHITE} />
      ) : (
        <Text style={textStyles}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeBtn: {
    padding: 15,
  },
  smallBtn: {
    padding: 8,
  },
  btnText: {
    textAlign: 'center',
    color: Colors.WHITE,
  },
  largeText: {
    fontSize: 18,
  },
  smallText: {
    fontSize: 14,
  },
});
