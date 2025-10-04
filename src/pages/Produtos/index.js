import { Text, View } from "react-native";
import PageTitle from "../../components/PageTitle/index";
import InfoCard from "../../components/InfoCard/index";
import Layout from "../../layout/index";
import CustomButton from "../../components/CustomButton/index"
import ProductItem from "../../components/ProductItem/index"
import { products } from "../../constants/data/products";

export default function Produtos({ navigation }) {
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
