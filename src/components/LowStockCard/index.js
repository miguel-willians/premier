import { View, Text } from "react-native";
import { styles } from "./style";
import Feather from "react-native-vector-icons/Feather";

import ProductItem from "../ProductItem/index";

export default function LowStockCard({ title, products, iconName, iconColor }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Feather
          name={iconName}
          size={20}
          color={iconColor}
          style={styles.headerIcon}
        />
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      <View style={styles.listContainer}>
        {products.length > 0 ? (
          products.map((p) => <ProductItem key={p.id} {...p} />)
        ) : (
          <Text>Nenhum produto com estoque baixo.</Text>
        )}
      </View>
    </View>
  );
}
