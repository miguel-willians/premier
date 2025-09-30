import { StyleSheet } from 'react-native';
import { AppColors } from '../../constants/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppColors['primary-300'],
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
    color: AppColors['gray-600'],
  },
  card: {
    padding: 24,
    borderRadius: 20,
  },
});
