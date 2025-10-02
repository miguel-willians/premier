import { View, Text } from "react-native";
import { styles } from "./style";

export default function ProductItem({ name, description, units, min }) {
  return (
    <View style={styles.itemRow}>
      <View>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
      <View style={styles.itemUnitsContainer}>
        <Text style={styles.itemUnits}>{units} un.</Text>
        <Text style={styles.itemMin}>Mín: {min}</Text>
      </View>
    </View>
  );
}
