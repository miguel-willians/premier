import { View, Text } from "react-native";
import { styles } from "./style";

import ActivityItem from "../ActivityItem/index";

export default function RecentActivityCard({ title, activities }) {

  console.log(activities)
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.listContainer}>
        {activities.length > 0 ? (
          activities.map((act) => <ActivityItem
                    key={act.id}
                    type={act.type}
                    product={act.productName} 
                    quantity={act.quantity}
                    date={act.date}
                />)
        ) : (
          <Text style={styles.noDataText}>Nenhuma movimentação registrada</Text>
        )}
      </View>
    </View>
  );
}
