import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../pages/Home/index";
import Produtos from "../pages/Produtos/index";
import Entrada from "../pages/Entrada/index";
import Saida from "../pages/Saida/index";
import Relatorios from "../pages/Relatorios/index";
import CadastrarUsuario from "../pages/CadastrarUsuario/index";
import Header from "../components/Header/index";

import { useUserRole } from "../hooks/useUserRole";

export default function MainTabs() {
  const Tab = createBottomTabNavigator();
  const { role } = useUserRole();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
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
          header: () => <Header>Premier</Header>,
        }}
      />

      <Tab.Screen
        name="Produtos"
        component={Produtos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="box" size={size} color={color} />
          ),
          header: () => <Header>Premier</Header>,
        }}
      />

      {role === "admin" && (
        <Tab.Screen
          name="CadastrarUsuario"
          component={CadastrarUsuario}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Feather name="user-plus" size={size} color={color} />
            ),
            header: () => <Header>Premier</Header>,
            tabBarLabel: "Criar Usuário",
          }}
        />
      )}

      <Tab.Screen
        name="Entrada"
        component={Entrada}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="arrow-up" size={size} color={color} />
          ),
          header: () => <Header>Premier</Header>,
        }}
      />

      <Tab.Screen
        name="Saida"
        component={Saida}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="arrow-down" size={size} color={color} />
          ),
          header: () => <Header>Premier</Header>,
        }}
      />

      <Tab.Screen
        name="Relatorios"
        component={Relatorios}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
          header: () => <Header>Premier</Header>,
        }}
      />
    </Tab.Navigator>
  );
}
