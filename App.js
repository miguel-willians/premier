import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './src/components/Header/index';
import MainTabs from './src/navigation/index';

import Login from './src/pages/Login/index';
import Home from './src/pages/Home/index';
import Produtos from './src/pages/Produtos/index';
import CadastrarProduto from './src/pages/CadastrarProduto/index';
import Entrada from './src/pages/Entrada/index';
import Relatorios from './src/pages/Relatorios/index';
import Saida from './src/pages/Saida/index';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Saida">
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
      <Stack.Screen
        name="Produtos"
        component={Produtos}
        options={{
          header: () => <Header>Premier</Header>,
        }}
      />
      <Stack.Screen
        name="CadastrarProduto"
        component={CadastrarProduto}
        options={{
          header: () => <Header>Premier</Header>,
        }}
      />
      <Stack.Screen
        name="Entrada"
        component={Entrada}
        options={{
          header: () => <Header>Premier</Header>,
        }}
      />
      <Stack.Screen
        name="Relatorios"
        component={Relatorios}
        options={{
          header: () => <Header>Premier</Header>,
        }}
      />
      <Stack.Screen
        name="Saida"
        component={Saida}
        options={{
          header: () => <Header>Premier</Header>,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
