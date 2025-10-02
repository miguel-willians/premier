import { StyleSheet } from "react-native";
import { AppColors } from "../../constants/colors/colors";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: {
    color: AppColors["gray-900"],
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
  },
  subtitle: {
    color: AppColors["gray-600"],
    fontSize: 16,
  },
});
