import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/Home/index";
import Produtos from "../pages/Produtos/index";
import Entrada from "../pages/Entrada/index";
import Saida from "../pages/Saida/index";
import Relatorios from "../pages/Relatorios/index";

export default function MainTabs() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: { height: 60 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Produtos"
        component={Produtos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="box" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Entrada"
        component={Entrada}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="arrow-up" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Saida"
        component={Saida}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="arrow-down" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Relatorios"
        component={Relatorios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
