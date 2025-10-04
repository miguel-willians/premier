import { View, Text } from "react-native";
import { styles } from "./style";
import Feather from "react-native-vector-icons/Feather";

export default function InfoCard({
  title,
  value,
  iconName = "package",
  iconColor = "#38b000",
  iconBgColor = "#E6F4EA",
}) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>

      <View style={[styles.iconWrapper, { backgroundColor: iconBgColor }]}>
        <Feather name={iconName} size={28} color={iconColor} />
      </View>
    </View>
  );
}
