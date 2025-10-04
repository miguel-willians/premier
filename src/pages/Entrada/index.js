import { Text, View, ScrollView } from "react-native";
import { useState } from 'react';
import Layout from "../../layout/index";
import InputText from "../../components/InputText/index";
import CustomButton from "../../components/CustomButton/index";
import { products } from "../../constants/data/products";
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

export default function Entrada() {
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(0); 
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
            <Text>Produto</Text>
            <Picker
              selectedValue={produtoSelecionado}
              onValueChange={(itemValue) => setProdutoSelecionado(itemValue)}
            >
              <Picker.Item label="-- Selecione um produto --" value="" />
              {products.map((p) => (
                <Picker.Item 
                  key={p.id} 
                  label={`${p.name} (${p.description})`} 
                  value={p.id} 
                />
              ))}
            </Picker>
          </View>

          <View>
            <Text>Quantidade</Text>
            <InputText
              placeholder="Ex: 100"
              value={quantidade.toString()}
              onChangeText={(text) => {
                const numericValue = parseInt(text) || 0;
                setQuantidade(numericValue);
              }}
              keyboardType="numeric"
            />

            <Slider
              minimumValue={0}
              maximumValue={500}
              step={1}
              value={quantidade}
              onValueChange={setQuantidade}
              minimumTrackTintColor="#1fb28a"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#b9e4c9"
            />
          </View>

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

        </View>

        <View style={{ marginTop: 30 }}>
          <CustomButton onPress={handleRegistrarEntrada}>
            Registrar Entrada
          </CustomButton>
        </View>

      </ScrollView>
    </Layout>
  );
}
