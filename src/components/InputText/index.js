import { Text, TextInput } from "react-native";
import { styles } from "./style";

export default function InputText({
  label,
  placeholder,
  value,
  onChangeText,
  disabled,
  error,
  secureTextEntry,
}) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <TextInput
        style={[
          styles.input,
          disabled && styles.inputDisabled,
          error && styles.error,
        ]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        editable={!disabled}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
}
