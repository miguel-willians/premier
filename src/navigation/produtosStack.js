import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Produtos from '../pages/Produtos/index'; 

import CadastrarProduto from '../pages/CadastrarProduto/index'; 

const Stack = createStackNavigator();

export default function ProdutosStack() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        cardStyle: { flex: 1, backgroundColor: 'white' } 
      }}
    >
      <Stack.Screen name="ListaProdutos" component={Produtos} />
      <Stack.Screen name="CadastrarProduto" component={CadastrarProduto} />
    </Stack.Navigator>
  );
}