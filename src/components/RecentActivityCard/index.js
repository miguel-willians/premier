import { View, Text } from "react-native";
import { styles } from "./style";

import ActivityItem from "../ActivityItem/index";

export default function RecentActivityCard({ title, activities }) {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.headerTitle}>{title}</Text>

      <View style={styles.listContainer}>
        {activities.length > 0 ? (
          activities.map((a) => <ActivityItem key={a.id} {...a} />)
        ) : (
          <Text style={styles.noDataText}>Nenhuma movimentação registrada</Text>
        )}
      </View>
    </View>
  );
}
