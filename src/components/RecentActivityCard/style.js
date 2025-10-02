import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    minHeight: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529", // Preto forte
    marginBottom: 15,
  },
  listContainer: {
    flex: 1,
    justifyContent: "center", // Centraliza a mensagem de "sem dados"
  },
  noDataText: {
    textAlign: "center",
    fontSize: 14,
    color: "#6c757d", // Cinza suave
    fontStyle: "italic",
  },
});
