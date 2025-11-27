import { View, Text } from "react-native";
import { styles } from "./style";
import Feather from "@expo/vector-icons/Feather";
import CustomButton from "../CustomButton/index";
import { useNavigation } from "@react-navigation/native";
import { useLogout } from "../../hooks/useLogout";

export default function Header({ children }) {
  const navigation = useNavigation();
  const { logout } = useLogout({ navigation });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>
      <CustomButton onPress={logout}>
        <Feather name="log-out" size={16} color="#fff" />
      </CustomButton>
    </View>
  );
}
