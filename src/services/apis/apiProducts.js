import supabase from "../supabase/index";

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products') // Sua tabela de produtos
    .select('id, name, description, units, min, created_at'); // Seleciona as colunas

  if (error) throw new Error(error.message);
  return data;
}

export async function createProduct(newProductData) {
    // A tabela 'products' recebe os dados
    const { data, error } = await supabase
        .from('products') 
        .insert([newProductData]) // Envia o objeto para inserção
        .select(); // Retorna o registro inserido

    if (error) throw new Error(error.message);
    return data;
}