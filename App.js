import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/Header/index";
import Relatorios from "./src/pages/Relatorios/index";
import Saida from "./src/pages/Saida";
import Login from "./src/pages/Login/index";
import Home from "./src/pages/Home/index";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Saida">
        <Stack.Screen
          name="Saida"
          component={Saida}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            header: () => <Header>Premier</Header>,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
