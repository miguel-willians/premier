import { Text, View, ScrollView  } from "react-native";
import React, { useState } from 'react';
import Layout from "../../layout/index";
import InputText from "../../components/InputText/index";
import CustomButton from "../../components/CustomButton/index"
import { products } from "../../constants/data/products";
import { Picker } from '@react-native-picker/picker';

export default function Entrada() {
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [lote, setLote] = useState('');
  const [dataValidade, setDataValidade] = useState('');

  const handleRegistrarEntrada = () => {
    console.log("Entrada de estoque registrada:", {
      produto: produtoSelecionado,
      quantidade: quantidade,
      lote: lote,
      dataValidade: dataValidade
    });
  };

  return (
    <Layout>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Entrada de Estoque
        </Text>
        <Text style={{ fontSize: 16, color: '#666' }}>
          Registre novos lotes e produtos recebidos.
        </Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ gap: 15 }}>
          
          <View>
            <Text >Produto</Text>
              <Picker
                selectedValue={produtoSelecionado}
                onValueChange={(itemValue, itemIndex) =>
                  setProdutoSelecionado(itemValue)
                }
              >
                {/* Item padrão (dica para o usuário) */}
                <Picker.Item label="-- Selecione um produto --" value="" />
                
                {/* Loop para listar os produtos do seu array */}
                {products.map((p) => (
                  <Picker.Item 
                    key={p.id} 
                    label={`${p.name} (${p.description})`} 
                    value={p.id} 
                  />
                ))}
              </Picker>
            </View>
          </View>

          <InputText
            label="Quantidade"
            placeholder="Ex: 100"
            value={quantidade}
            onChangeText={setQuantidade}
            keyboardType="numeric"
          />

          <InputText
            label="Lote"
            placeholder="Ex: LOTE0045"
            value={lote}
            onChangeText={setLote}
          />

          <InputText
            label="Data de Validade"
            placeholder="DD/MM/AAAA (Opcional)"
            value={dataValidade}
            onChangeText={setDataValidade}
          />

        <View style={{ marginTop: 30 }}>
            <CustomButton onPress={handleRegistrarEntrada}>
                Registrar Entrada
            </CustomButton>
        </View>

      </ScrollView>
    </Layout>
  );
}