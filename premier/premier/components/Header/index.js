import { View, Text } from "react-native";
import { styles } from "./style";
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../CustomButton/index"; 

export default function Header({ children }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{children}</Text>

      <CustomButton onPress={() => navigation.navigate("Login")}>
        <Feather name="log-in" size={16} color="#fff" />
      </CustomButton>
    </View>
  );
}
