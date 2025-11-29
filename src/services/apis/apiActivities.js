import supabase from "../supabase/index";

export async function createActivityEntry(activityData) {
    // activityData deve incluir: product_id, quantity, lote, validity_date, type, etc.
    const { data, error } = await supabase
        .from('activities') // Sua tabela de atividades
        .insert([activityData])
        .select(); 

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchActivities() {
    const { data, error } = await supabase
        .from('activities')
        .select('id, type, product_id, quantity, date, description') 
        .order('date', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

export async function fetchRecentExits() {
    const { data, error } = await supabase
        .from('activities')
        // Busca apenas saídas e ordena pela data mais recente
        .select('id, type, product_id, quantity, date') 
        .eq('type', 'SAIDA') // 🛑 Filtra pelo tipo de saída (AJUSTE CONFORME SEU BANCO!)
        .order('date', { ascending: false })
        .limit(5);

    if (error) throw new Error(error.message);
    return data;
}