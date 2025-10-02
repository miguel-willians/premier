import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  activityItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0", // Linha divisória suave
  },
  activityIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  activityDetails: {
    flex: 1,
  },
  activityProduct: {
    fontSize: 14,
    fontWeight: "600",
    color: "#343a40",
  },
  activityType: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
  activityMeta: {
    alignItems: "flex-end",
    marginLeft: 10,
  },
  activityQuantity: {
    fontSize: 14,
    fontWeight: "700",
  },
  activityDate: {
    fontSize: 12,
    color: "#6c757d",
    marginTop: 2,
  },
});
