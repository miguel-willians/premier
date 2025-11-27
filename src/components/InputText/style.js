import { StyleSheet } from "react-native";
import { AppColors } from "../../constants/colors/colors";

export const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: AppColors["gray-300"],
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    marginTop: 0,
    backgroundColor: AppColors["gray-0"],
    color: AppColors["gray-900"],
  },
  inputDisabled: {
    backgroundColor: AppColors["gray-100"],
    borderColor: AppColors["gray-400"],
    color: AppColors["gray-600"],
  },
  label: {
    fontWeight: "600",
    color: AppColors["gray-900"],
  },
  errorText: { color: "red", marginTop: 10, padding: 0 },
  error: { borderColor: "red" },
});
