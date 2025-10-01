import { Pressable, Text } from 'react-native';
import { styles } from './style';

export default function CustomButton({ onPress, children }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}