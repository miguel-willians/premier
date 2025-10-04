import { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

// Importando seus componentes existentes
import PageTitle from "../../components/PageTitle";
import CustomButton from "../../components/CustomButton";
import InputText from "../../components/InputText"; // Supondo que você tenha este componente de input
import ActivityItem from "../../components/ActivityItem";

export default function Saida() {
  // Dados de exemplo (em um app real, viria do seu estado global ou API)
  const [products] = useState([
    { id: "1", name: "Ração Adulto", units: 50 },
    { id: "2", name: "Ração Filhote", units: 10 },
    { id: "3", name: "Petiscos", units: 100 },
  ]);

  const [recentesSaidas, setRecentesSaidas] = useState([
    { id: "1", type: "Saída", product: "Ração Adulto", quantity: 5, date: "04/10/2025" },
    { id: "2", type: "Saída", product: "Petiscos", quantity: 10, date: "03/10/2025" },
  ]);

  // Estados para controlar o formulário
  const [selectedProductId, setSelectedProductId] = useState();
  const [quantity, setQuantity] = useState("");

  // Encontra o produto selecionado para mostrar o estoque atual
  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleRegisterSaida = () => {
    // Validações básicas
    if (!selectedProductId || !quantity) {
      Alert.alert("Erro", "Por favor, selecione um produto e informe a quantidade.");
      return;
    }

    const qtd = parseInt(quantity, 10);
    if (isNaN(qtd) || qtd <= 0) {
      Alert.alert("Erro", "A quantidade deve ser um número maior que zero.");
      return;
    }

    if (qtd > selectedProduct.units) {
      Alert.alert("Erro", "Quantidade de saída maior que o estoque atual.");
      return;
    }

    // Lógica de registro (aqui você atualizaria seu estado global ou chamaria a API)
    console.log(`Registrando saída de ${quantity} un. do produto ${selectedProduct.name}`);
    Alert.alert("Sucesso", "Saída registrada com sucesso!");

    // Limpa o formulário
    setSelectedProductId(null);
    setQuantity("");
  };

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <PageTitle subtitle="Registre a retirada de produtos do estoque">
        Saída de Estoque
      </PageTitle>

      {/* Formulário de Saída */}
      <View style={{ marginVertical: 24 }}>
        <Text style={{ marginBottom: 8 }}>Selecione o Produto:</Text>
        <Picker
          selectedValue={selectedProductId}
          onValueChange={(itemValue) => setSelectedProductId(itemValue)}
          style={{ backgroundColor: '#f0f0f0', marginBottom: 16 }}
        >
          <Picker.Item label="-- Selecione um produto --" value={null} />
          {products.map(p => (
            <Picker.Item key={p.id} label={p.name} value={p.id} />
          ))}
        </Picker>

        {/* Mostra o estoque atual quando um produto é selecionado */}
        {selectedProduct && (
            <InputText
                label="Estoque Atual"
                value={`${selectedProduct.units} unidades`}
                disabled={true} // Deixa o campo não editável
            />
        )}

        <InputText
          label="Quantidade a ser retirada"
          placeholder="Ex: 10"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric" // Garante que o teclado seja numérico
        />

        <View style={{marginTop: 24}}>
          <CustomButton 
            onPress={handleRegisterSaida}
            // Desabilita o botão se algo estiver faltando
            disabled={!selectedProductId || !quantity}
          >
            Registrar Saída
          </CustomButton>
        </View>
      </View>

      {/* Lista de Saídas Recentes */}
      <View>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
          Saídas Recentes
        </Text>
        {recentesSaidas.length > 0 ? (
          recentesSaidas.map(saida => <ActivityItem key={saida.id} {...saida} />)
        ) : (
          <Text>Nenhuma saída registrada recentemente.</Text>
        )}
      </View>
    </ScrollView>
  );
}