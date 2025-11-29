import { View, Text } from 'react-native';
import { styles } from './style';
import Feather from 'react-native-vector-icons/Feather';

export default function ActivityItem({ type, product, quantity, date }) {
  const isEntry = type === 'Entrada';
  const typeColor = isEntry ? '#28a745' : '#dc3545'; // Verde para Entrada, Vermelho para Saída
  const typeIcon = isEntry ? 'arrow-up-right' : 'arrow-down-left';

  const formattedDate = new Date(date).toLocaleString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.activityItemContainer}>
      <View
        style={[
          styles.activityIconWrapper,
          { backgroundColor: typeColor + '15' },
        ]}>
        <Feather name={typeIcon} size={18} color={typeColor} />
      </View>

      <View style={styles.activityDetails}>
        <Text style={styles.activityProduct} numberOfLines={1}>
          {product}
        </Text>
        <Text style={[styles.activityType, { color: typeColor }]}>{type}</Text>
      </View>

      <View style={styles.activityMeta}>
        <Text style={[styles.activityQuantity, { color: typeColor }]}>
          {isEntry ? '+' : '-'} {quantity} un.
        </Text>
        <Text style={styles.activityDate}>{formattedDate}</Text>
      </View>
    </View>
  );
}
