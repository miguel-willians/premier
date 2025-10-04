import { View, Text, ScrollView, FlatList } from "react-native";
import { Picker } from "@react-native-picker/picker"; // precisa instalar
import { useState } from "react";
import { Switch } from "react-native";
import PageTitle from "../../components/PageTitle";
import InfoCard from "../../components/InfoCard";
import ProductItem from "../../components/ProductItem";
import ActivityItem from "../../components/ActivityItem";
import CustomButton from "../../components/CustomButton";

export default function Relatorios() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);

  const products = [
    { id: "1", name: "Ração Adulto", description: "Sabor carne", units: 50, min: 20 },
    { id: "2", name: "Ração Filhote", description: "Sabor frango", units: 10, min: 20 },
    { id: "3", name: "Petiscos", description: "Biscoito sabor carne", units: 100, min: 50 },
  ];

  const activities = [
    { id: "1", type: "Entrada", product: "Ração Adulto", quantity: 20, date: "02/10/2025" },
    { id: "2", type: "Saída", product: "Ração Filhote", quantity: 5, date: "03/10/2025" },
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      <PageTitle subtitle="Relatório de Estoque" buttonLabel="Atualizar" buttonAction={() => console.log("Atualizar")} >
        Controle de Estoque
      </PageTitle>

      {/* Cards de resumo */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 16 }}>
        <InfoCard title="Total Produtos" value={products.length.toString()} />
        <InfoCard title="Produtos Críticos" value={products.filter(p => p.units < p.min).length.toString()} iconName="alert-triangle" iconColor="#dc3545" iconBgColor="#FDEAEA" />
      </View>

      {/* Filtros */}
      <View style={{ marginBottom: 16 }}>
        <Text>Filtrar por Categoria:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          <Picker.Item label="Todos" value="Todos" />
          <Picker.Item label="Adulto" value="Adulto" />
          <Picker.Item label="Filhote" value="Filhote" />
          <Picker.Item label="Petiscos" value="Petiscos" />
        </Picker>

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 8 }}>
          <Text>Mostrar apenas estoque baixo:</Text>
          <Switch
            value={showOnlyLowStock}
            onValueChange={(val) => setShowOnlyLowStock(val)}
          />
        </View>
      </View>

      <FlatList
        data={products.filter(p => !showOnlyLowStock || p.units < p.min)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductItem {...item} />}
        ListHeaderComponent={() => <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Produtos</Text>}
      />

      <Text style={{ fontWeight: "bold", marginTop: 16, marginBottom: 8 }}>Movimentações Recentes</Text>
      {activities.map(act => (
        <ActivityItem
          key={act.id}
          type={act.type}
          product={act.product}
          quantity={act.quantity}
          date={act.date}
        />
      ))}

      <CustomButton onPress={() => console.log("Exportar relatório")}>Exportar Relatório</CustomButton>
    </ScrollView>
  );
}