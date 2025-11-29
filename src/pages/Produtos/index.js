import { Text, View, ActivityIndicator, StyleSheet } from "react-native";
import PageTitle from "../../components/PageTitle/index";
import Layout from "../../layout/index";
import CustomButton from "../../components/CustomButton/index"
import ProductItem from "../../components/ProductItem/index"

// 🛑 Novo Import: O hook que contém a lógica da API
import { useProducts } from '../../hooks/useProducts'; 

// REMOVA: import { products } from "../../constants/data/products";

export default function Produtos({ navigation }) {
    // 🛑 USE O HOOK PARA PEGAR OS DADOS E O ESTADO
    const { isLoading, error, products } = useProducts();

    // ----------------------------------------------------
    // Lógica de Carregamento e Erro
    // ----------------------------------------------------
    if (isLoading) {
        return (
            <Layout>
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#007bff" />
                    <Text>Carregando Produtos...</Text>
                </View>
            </Layout>
        );
    }

    if (error) {
         return (
            <Layout>
                <View style={styles.center}>
                    <Text style={styles.errorText}>❌ Erro ao carregar produtos: {error.message}</Text>
                </View>
            </Layout>
         );
    }
    
    // ----------------------------------------------------
    // Renderização (Usa a variável 'products' da API)
    // ----------------------------------------------------
   const productList = products.map((product) => (
    <ProductItem
      key={product.id}
      name={product.name}
      description={product.description}
      units={product.units}
      min={product.min}
    />
  ));

  return (
    <Layout>
      <PageTitle subtitle="Gerencie seu catálogo de produtos">Produtos</PageTitle>
      <CustomButton onPress={() => navigation.navigate("CadastrarProduto")}>Cadastrar Produto</CustomButton>
      
      <View style={{ marginTop: 20 }}>
        {productList}
      </View>

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