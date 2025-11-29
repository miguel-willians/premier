import supabase from "../supabase/index";

// 1. Funções para o DASHBOARD HOME (Tabela: dashboard_data)
export async function fetchDashboardMetrics() {
  const { data, error } = await supabase
    .from('dashboard_data') 
    .select('id, title, value'); // Colunas da sua tabela

  if (error) throw new Error(error.message);
  return data; 
}

// 2. Funções para as ATIVIDADES (Tabela: activities)
export async function fetchActivities() {
  const { data, error } = await supabase
    .from('activities')
    // Colunas da sua tabela (usando 'date' como timestamp, confirmado na imagem)
    .select('id, type, product_id, quantity, date') 
    .order('date', { ascending: false }) 
    .limit(10); 

  if (error) throw new Error(error.message);
  return data;
}

// 3. Funções para ESTOQUE BAIXO (Tabela: products)
export async function fetchLowStockProducts() {
    const { data, error } = await supabase
        .from('products') 
        // Colunas da sua tabela (name, units, min)
        .select('id, name, description, units, min') 
        .lt('units', 5) // Filtro: unidades abaixo de 5 (ou use 'min' se configurar o filtro de coluna no Supabase)
        .limit(10);

    if (error) throw new Error(error.message);
    return data;
}