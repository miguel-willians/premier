import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F7F7F7", // Fundo cinza suave do item
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#343a40",
  },
  itemDescription: {
    fontSize: 12,
    color: "#6c757d",
  },
  itemUnitsContainer: {
    alignItems: "flex-end",
  },
  itemUnits: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffc107", // Unidades em laranja
  },
  itemMin: {
    fontSize: 10,
    color: "#adb5bd",
  },
});
