import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./src/components/Header/index";

import Login from "./src/pages/Login/index";
import Home from "./src/pages/Home/index";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
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
