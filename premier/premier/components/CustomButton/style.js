import { StyleSheet } from 'react-native';
import { AppColors } from '../../constants/colors/colors'; 


export const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColors['primary-400'],
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});