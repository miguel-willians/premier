import { StyleSheet } from "react-native";
import { AppColors } from '../../constants/colors/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors["primary-600"],
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: AppColors["gray-0"],
    fontSize: 20,
    fontWeight: "bold",
  },
});
