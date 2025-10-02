import { ScrollView } from "react-native";

import { styles } from "./style";

export default function Layout({ children }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
}
