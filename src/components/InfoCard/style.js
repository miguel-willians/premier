import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Elevação para Android
  },
  textContainer: {
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
    color: "#6c757d", // Cinza suave
    fontWeight: "500",
    marginBottom: 4,
  },
  value: {
    fontSize: 32,
    fontWeight: "700",
    color: "#343a40", // Preto forte
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
