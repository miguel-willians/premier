import { View, Text, ScrollView, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import { useState } from "react";
import { Switch } from "react-native";
import PageTitle from "../../components/PageTitle";
import InfoCard from "../../components/InfoCard";
import ProductItem from "../../components/ProductItem";
import ActivityItem from "../../components/ActivityItem";
import CustomButton from "../../components/CustomButton";

// 🛑 Novo Import: O hook agregador de relatórios
import { useReports } from '../../hooks/useReports'; 

export default function Relatorios() {
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [showOnlyLowStock, setShowOnlyLowStock] = useState(false);

    // 🛑 Consome todos os dados e métricas do hook
    const { 
        isLoading, 
        error, 
        products, 
        activities, 
        totalProducts, 
        criticalProducts 
    } = useReports();

    // ----------------------------------------------------
    // Lógica de Carregamento e Erro
    // ----------------------------------------------------

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Gerando Relatórios...</Text>
            </View>
        );
    }

    if (error) {
         return (
            <View style={styles.center}>
               <Text style={styles.errorText}>❌ Erro ao carregar dados do relatório: {error.message}</Text>
            </View>
         );
    }
    
    // ----------------------------------------------------
    // Lógica de Filtro (Mantida)
    // ----------------------------------------------------

    // Aplica o filtro de estoque baixo (low stock) e categoria
    const filteredProducts = products
        .filter(p => !showOnlyLowStock || p.units < p.min)
        // Lógica de filtro por categoria (Você precisará de uma coluna 'category' na sua tabela products)
        .filter(p => selectedCategory === "Todos" || p.category === selectedCategory);


    return (
        // 🛑 Usamos o ScrollView para envolver o conteúdo
        <ScrollView style={styles.container}> 
            <PageTitle subtitle="Relatório de Estoque" >
                Controle de Estoque
            </PageTitle>

            {/* Cards de resumo (Agora usam dados da API) */}
            <View style={styles.summaryContainer}>
                <InfoCard title="Total Produtos" value={totalProducts.toString()} />
                <InfoCard title="Produtos Críticos" value={criticalProducts.toString()} iconName="alert-triangle" iconColor="#dc3545" iconBgColor="#FDEAEA" />
            </View>

            {/* Filtros */}
            <View style={{ marginBottom: 16 }}>
                <Text>Filtrar por Categoria:</Text>
                {/* 🛑 ATENÇÃO: Os itens do Picker devem ser gerados dinamicamente com base nos dados reais das categorias */}
                <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                >
                    <Picker.Item label="Todos" value="Todos" />
                    {/* Exemplo de Picker, adicione mais itens aqui ou gere dinamicamente */}
                    <Picker.Item label="Adulto" value="Adulto" /> 
                </Picker>

                <View style={styles.switchContainer}>
                    <Text>Mostrar apenas estoque baixo:</Text>
                    <Switch
                        value={showOnlyLowStock}
                        onValueChange={(val) => setShowOnlyLowStock(val)}
                    />
                </View>
            </View>

            {/* Lista de Produtos Filtrada (FlatList) */}
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => <ProductItem {...item} />}
                ListHeaderComponent={() => <Text style={styles.listHeader}>Produtos</Text>}
                scrollEnabled={false} // Necessário quando FlatList está dentro de ScrollView
            />

            {/* Lista de Movimentações Recentes */}
            <Text style={styles.listHeaderActivity}>Movimentações Recentes</Text>
            {activities.map(act => (
                <ActivityItem
                    key={act.id}
                    type={act.type}
                    // 🛑 Usa o nome do produto enriquecido no hook
                    product={act.productName} 
                    quantity={act.quantity}
                    date={act.date}
                />
            ))}

            <CustomButton onPress={() => console.log("Exportar relatório")}>Exportar Relatório</CustomButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 10,
        backgroundColor: "#F7F9FC",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    errorText: {
        color: "#dc3545",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },

    // Cards de resumo totalmente responsivos
    summaryContainer: {
        flexDirection: "colunm",
        justifyContent: "space-between",
        marginVertical: 16,
        gap: 10,
    },

    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#FFF",
        borderRadius: 8,
        marginTop: 12,
        borderWidth: 1,
        borderColor: "#e3e3e3",
    },

    listHeader: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 16,
        marginBottom: 8,
        color: "#333",
    },

    listHeaderActivity: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 22,
        marginBottom: 10,
        color: "#333",
    },
});
