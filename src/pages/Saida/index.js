import { useState } from "react";
import { View, Text, ScrollView, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useToast } from "react-native-toast-notifications";
import { useQuery } from '@tanstack/react-query'; 

// Importando seus hooks e componentes
import PageTitle from "../../components/PageTitle";
import CustomButton from "../../components/CustomButton";
import InputText from "../../components/InputText";
import ActivityItem from "../../components/ActivityItem";

// 🛑 NOVOS IMPORTS
import { useProducts } from '../../hooks/useProducts';
import { useRegisterExit } from '../../hooks/useRegisterExit';
import { fetchRecentExits } from '../../services/apis/apiActivities'; 
import Layout from "../../layout/index"; // 🛑 IMPORTANDO O LAYOUT FALTANTE

export default function Saida() {
    const toast = useToast();
    
    // LEITURA: Lista de Produtos
    const { 
        products, 
        isLoading: loadingProducts, 
        error: errorProducts 
    } = useProducts();
    
    // LEITURA: Saídas Recentes
    const { 
        data: recentesSaidas, 
        isLoading: loadingExits, 
        error: errorExits
    } = useQuery({
        queryKey: ['recentExits'],
        queryFn: fetchRecentExits,
    });

    // MUTATION: Hook para registrar a Saída
    const { 
        isRegistering, 
        registerExit 
    } = useRegisterExit();

    // Estados para controlar o formulário
    // 🛑 Inicializa como string vazia para melhor compatibilidade com o Picker
    const [selectedProductId, setSelectedProductId] = useState(''); 
    const [quantity, setQuantity] = useState("");

    // Encontra o produto selecionado para mostrar o estoque atual
    // 🛑 Converte o ID para integer ANTES de encontrar o produto, pois products.id é INT
    const selectedIdInt = parseInt(selectedProductId, 10);
    const selectedProduct = products.find(p => p.id === selectedIdInt);

    const handleRegisterSaida = () => {
        // Validações básicas
        if (!selectedProductId || !quantity) {
            toast.show("Por favor, selecione um produto e informe a quantidade.", { type: "warning" });
            return;
        }

        const qtd = parseInt(quantity, 10);
        if (isNaN(qtd) || qtd <= 0) {
            toast.show("A quantidade deve ser um número maior que zero.", { type: "danger" });
            return;
        }

        if (qtd > selectedProduct.units) {
            toast.show(`Quantidade de saída (${qtd}) maior que o estoque atual (${selectedProduct.units}).`, { type: "danger" });
            return;
        }
        
        // Objeto da Atividade para a tabela 'activities'
        const newActivity = {
            // 🛑 Converte o ID selecionado para integer antes de enviar para o banco (INT4)
            product_id: selectedIdInt, 
            quantity: qtd, 
            type: 'Saída', 
            date: new Date().toISOString(),
            description: `Retirada de ${qtd} un. do produto ${selectedProduct.name}`,
        };

        // Chamada da Mutação
        registerExit(newActivity, {
            onSuccess: () => {
                toast.show("Saída registrada com sucesso!", { type: "success" });
                setSelectedProductId(''); // Limpa
                setQuantity("");
            },
            onError: (err) => {
                console.error("Erro ao registrar saída:", err);
                toast.show(`Erro ao registrar: ${err.message}`, { type: "danger" });
            }
        });
    };

    // ----------------------------------------------------
    // Lógica de Carregamento e Erro
    // ----------------------------------------------------

    if (loadingProducts || loadingExits || isRegistering) {
        return (
             <View style={styles.center}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Carregando dados...</Text>
            </View>
        );
    }
    
    if (errorProducts || errorExits) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>Erro ao carregar dados da saída.</Text>
            </View>
        );
    }


    return (
        // 🛑 Usamos o componente Layout para envolver o conteúdo
        <Layout> 
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
                    {/* 🛑 O valor nulo deve ser uma string vazia para corresponder ao estado inicial */}
                    <Picker.Item label="-- Selecione um produto --" value="" /> 
                    {products.map(p => (
                        <Picker.Item 
                            key={p.id} 
                            label={`${p.name} (Estoque: ${p.units})`} 
                            // 🛑 O valor no Picker deve ser uma string
                            value={p.id.toString()} 
                        />
                    ))}
                </Picker>

                {/* Mostra o estoque atual quando um produto é selecionado */}
                {selectedProduct && (
                    <InputText
                        label="Estoque Atual"
                        value={`${selectedProduct.units} unidades`}
                        disabled={true} 
                    />
                )}

                <InputText
                    label="Quantidade a ser retirada"
                    placeholder="Ex: 10"
                    value={quantity}
                    onChangeText={setQuantity}
                    keyboardType="numeric" 
                />

                <View style={{marginTop: 24}}>
                    <CustomButton 
                        onPress={handleRegisterSaida}
                        disabled={isRegistering || !selectedProductId || !quantity}
                    >
                        {isRegistering ? "Registrando..." : "Registrar Saída"}
                    </CustomButton>
                </View>
            </View>

            {/* Lista de Saídas Recentes */}
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
                    Saídas Recentes
                </Text>
                {recentesSaidas && recentesSaidas.length > 0 ? (
                    recentesSaidas.map(saida => <ActivityItem key={saida.id} {...saida} />)
                ) : (
                    <Text>Nenhuma saída registrada recentemente.</Text>
                )}
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    // 🛑 Substituímos o ScrollView externo pelo Layout
    // O Layout deve ter a lógica ScrollView/flex:1
    // Aqui definimos apenas os estilos necessários para a tela de loading/erro
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
    }
});