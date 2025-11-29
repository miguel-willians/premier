import { Text, View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from 'react';
import Layout from "../../layout/index";
import InputText from "../../components/InputText/index";
import CustomButton from "../../components/CustomButton/index";
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';

// 🛑 NOVOS IMPORTS
import { useProducts } from '../../hooks/useProducts'; // Hook para LER produtos
import { useRegisterEntry } from '../../hooks/useRegisterEntry'; // Hook para REGISTRAR a mutação
import { useToast } from "react-native-toast-notifications";

export default function Entrada({ navigation }) {
    // 🛑 BUSCA DE PRODUTOS para o Picker
    const { products, isLoading: loadingProducts, error: errorProducts } = useProducts();
    
    // 🛑 MUTATION HOOK e Feedback
    const { isRegistering, registerEntry } = useRegisterEntry();
    const toast = useToast();

    // Estados do Formulário
    const [produtoSelecionado, setProdutoSelecionado] = useState(''); // Armazena o ID do produto
    const [quantidade, setQuantidade] = useState(0); 
    const [lote, setLote] = useState('');
    const [dataValidade, setDataValidade] = useState('');

    // Função de tratamento de envio de dados
    const handleRegistrarEntrada = () => {
        if (!produtoSelecionado || quantidade <= 0) {
            toast.show("Selecione um produto e insira a quantidade.", { type: "warning" });
            return;
        }

        // 1. Formatação da Data (DD/MM/AAAA para AAAA-MM-DD)
        let dataFormatada = null;
        if (dataValidade) {
            const [dia, mes, ano] = dataValidade.split('/');
            if (dia && mes && ano && ano.length === 4) {
                dataFormatada = `${ano}-${mes}-${dia}`;
            } else {
                toast.show("Formato de Data de Validade inválido (Use DD/MM/AAAA).", { type: "danger" });
                return;
            }
        }
        
        // 2. Objeto da Atividade para a tabela 'activities'
        const newActivity = {
            product_id: produtoSelecionado,
            quantity: quantidade,          
            type: 'Entrada',               // Tipo da transação
            date: new Date().toISOString(),// Data/Hora atual (coluna 'date' do Supabase)
            // Se a tabela 'activities' tiver uma coluna 'lote' ou 'validade', use-as aqui:
            description: `Entrada: Lote ${lote || 'N/A'}. Validade: ${dataFormatada || 'N/A'}`,
        };

        // 3. Chamada da Mutação
        registerEntry(newActivity, {
            onSuccess: () => {
                toast.show("Entrada registrada com sucesso!", { type: "success" });
                setQuantidade(0); 
                setLote('');
                setDataValidade('');
                setProdutoSelecionado('');
            },
            onError: (err) => {
                toast.show(`Erro ao registrar entrada: ${err.message}`, { type: "danger" });
            }
        });
    };
    
    // ----------------------------------------------------
    // Lógica de Carregamento da Lista de Produtos
    // ----------------------------------------------------
    if (loadingProducts) {
        return (
            <Layout>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text>Carregando lista de produtos...</Text>
                </View>
            </Layout>
        );
    }
    
    if (errorProducts) {
         return (
            <Layout>
                <View style={styles.center}>
                    <Text style={styles.errorText}>Erro ao carregar lista de produtos.</Text>
                </View>
            </Layout>
         );
    }


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
                    
                    {/* 1. SELEÇÃO DE PRODUTO (Picker) */}
                    <View>
                        <Text>Produto</Text>
                        <Picker
                            selectedValue={produtoSelecionado}
                            onValueChange={(itemValue) => setProdutoSelecionado(itemValue)}
                        >
                            <Picker.Item label="-- Selecione um produto --" value="" />
                            {/* Mapeamento usando dados da API */}
                            {products.map((p) => (
                                <Picker.Item 
                                    key={p.id} 
                                    label={`${p.name} (${p.description})`} 
                                    value={p.id} // O valor é o ID do produto
                                />
                            ))}
                        </Picker>
                    </View>

                    {/* 2. QUANTIDADE (InputText + Slider) */}
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

                        {/* 🛑 SLIDER RESTAURADO */}
                        <Slider
                            minimumValue={0}
                            maximumValue={500} // Ajuste o valor máximo conforme sua necessidade
                            step={1}
                            value={quantidade}
                            onValueChange={setQuantidade} // Atualiza o estado
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
                        label="Data de Validade (DD/MM/AAAA)"
                        placeholder="DD/MM/AAAA (Opcional)"
                        value={dataValidade}
                        onChangeText={setDataValidade}
                    />

                </View>

                <View style={{ marginTop: 30 }}>
                    <CustomButton 
                        onPress={handleRegistrarEntrada} 
                        disabled={isRegistering || loadingProducts} 
                    >
                        {isRegistering ? "Registrando..." : "Registrar Entrada"}
                    </CustomButton>
                </View>

            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
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