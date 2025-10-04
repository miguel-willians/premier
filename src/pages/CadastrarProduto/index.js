import { Text, View, ScrollView } from "react-native";
import React, { useState } from 'react';
import Layout from "../../layout/index";
import InputText from "../../components/InputText/index";
import CustomButton from "../../components/CustomButton/index"


export default function CadastrarProduto() {
  const [nome, setNome] = useState('');
  const [marca, setMarca] = useState('');
  const [pesoTamanho, setPesoTamanho] = useState('');
  const [qtdInicial, setQtdInicial] = useState('');
  const [qtdMinima, setQtdMinima] = useState('');
  const [dataValidade, setDataValidade] = useState('');

  const handleSalvarProduto = () => {
    console.log("Produto a ser salvo:", {
      nome,
      marca,
      pesoTamanho,
      qtdInicial,
      qtdMinima,
      dataValidade
    });
  };

  return (
    <Layout>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Cadastrar Novo Produto
      </Text>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ gap: 15 }}>
          
          <InputText
            label="Nome do Produto"
            placeholder="Ração Filhote Premium"
            value={nome}
            onChangeText={setNome}
          />

          <InputText
            label="Marca"
            placeholder="NutriPet"
            value={marca}
            onChangeText={setMarca}
          />

          <InputText
            label="Peso/Tamanho *"
            placeholder="10kg ou Tamanho M"
            value={pesoTamanho}
            onChangeText={setPesoTamanho}
          />

          <InputText
            label="Quantidade Inicial"
            placeholder="50"
            value={qtdInicial}
            onChangeText={setQtdInicial}
            keyboardType="numeric"
          />

          <InputText
            label="Quantidade Mínima"
            placeholder="15"
            value={qtdMinima}
            onChangeText={setQtdMinima}
            keyboardType="numeric"
          />

          <InputText
            label="Data de Validade"
            placeholder="DD/MM/AAAA"
            value={dataValidade}
            onChangeText={setDataValidade}
          />
        </View>

        <View style={{ marginTop: 30 }}>
            <CustomButton onPress={handleSalvarProduto}>
                Salvar Produto
            </CustomButton>
        </View>

      </ScrollView>
    </Layout>
  );
}