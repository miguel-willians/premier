import { Text, View } from "react-native";

import CustomButton from "../CustomButton/index";
import { styles } from "./style";

export default function PageTitle({
  children,
  subtitle,
  buttonLabel,
  buttonAction,
}) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{children}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      {buttonLabel && (
        <CustomButton onPress={buttonAction}>{buttonLabel}</CustomButton>
      )}
    </View>
  );
}
