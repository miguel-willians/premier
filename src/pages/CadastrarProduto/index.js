import { Text, View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
// Importações de Componentes
import Layout from "../../layout/index";
import InputText from "../../components/InputText/index";
import CustomButton from "../../components/CustomButton/index";

// Importações de Hooks
import { useCreateProduct } from '../../hooks/useCreateProduct'; 
import { useToast } from "react-native-toast-notifications";

export default function CadastrarProduto({ navigation }) {
    // Estados do Formulário
    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [pesoTamanho, setPesoTamanho] = useState("");
    const [qtdInicial, setQtdInicial] = useState("");
    const [qtdMinima, setQtdMinima] = useState("");
    const [dataValidade, setDataValidade] = useState("");
    
    // Hooks de API e Feedback
    const { isCreating, create } = useCreateProduct();
    const toast = useToast();

    // Função de tratamento de envio de dados
    const handleSalvarProduto = () => {
        // 1. Validação Simples
        if (!nome || !qtdInicial || !qtdMinima || !dataValidade) {
            toast.show("Preencha todos os campos obrigatórios.", { type: "warning" });
            return;
        }

        // 2. Lógica de Formatação da Data (DD/MM/AAAA para AAAA-MM-DD)
        let dataFormatada = null;
        const [dia, mes, ano] = dataValidade.split('/');
        
        // Verifica se a data está no formato esperado para evitar o erro do PostgreSQL
        if (dia && mes && ano && ano.length === 4) {
            dataFormatada = `${ano}-${mes}-${dia}`;
        } else {
            toast.show("Formato de Data de Validade inválido (Use DD/MM/AAAA).", { type: "danger" });
            return; 
        }

        // 3. Montagem do Objeto para o Supabase
        const newProduct = {
            name: nome,
            // 🛑 ATENÇÃO: Verifique se as colunas no Supabase são 'brand', 'size_weight', etc.
            brand: marca, 
            size_weight: pesoTamanho,
            units: parseInt(qtdInicial), 
            min: parseInt(qtdMinima),   
            validity_date: dataFormatada, // Data no formato YYYY-MM-DD
        };

        // 4. Chamada da Mutação (API)
        create(newProduct, {
            onSuccess: () => {
                toast.show("Produto cadastrado com sucesso!", { type: "success" });
                // Limpar formulário ou voltar para a lista
                navigation.goBack(); 
            },
            onError: (err) => {
                console.error("Erro ao salvar produto:", err);
                toast.show(`Erro ao salvar: ${err.message}`, { type: "danger" });
            }
        });
    };

    return (
        <Layout>
            <Text style={styles.headerText}>
                Cadastrar Novo Produto
            </Text>

            <ScrollView contentContainerStyle={styles.scrollContent}>
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
                        label="Data de Validade (DD/MM/AAAA)"
                        placeholder="15/11/2028"
                        value={dataValidade}
                        onChangeText={setDataValidade}
                    />
                </View>

                <View style={{ marginTop: 30 }}>
                    <CustomButton 
                        onPress={handleSalvarProduto} 
                        disabled={isCreating} // Desabilita durante o envio
                    >
                        {isCreating ? "Salvando..." : "Salvar Produto"}
                    </CustomButton>
                </View>
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20
    },
    scrollContent: {
        paddingBottom: 40 // Garante um espaço no final da rolagem
    }
});