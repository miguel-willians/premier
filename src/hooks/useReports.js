import { useQueries } from '@tanstack/react-query'; // Permite buscas paralelas
import { fetchProducts } from '../services/apis/apiProducts';
import { fetchActivities } from '../services/apis/apiActivities';

export function useReports() {
    // Usa useQueries para buscar produtos e atividades simultaneamente
    const results = useQueries({
        queries: [
            { queryKey: ['reportProducts'], queryFn: fetchProducts },
            { queryKey: ['reportActivities'], queryFn: fetchActivities },
        ],
    });

    const productsResult = results[0];
    const activitiesResult = results[1];

    const isLoading = productsResult.isLoading || activitiesResult.isLoading;
    const error = productsResult.error || activitiesResult.error;

    // Lógica de Processamento e Cálculo das Métricas
    const products = productsResult.data || [];
    const activities = activitiesResult.data || [];

    // Cálculo das Métricas (que antes estavam hardcoded)
    const totalProducts = products.length;
    const criticalProducts = products.filter(p => p.units < p.min).length;
    
    // Transforma atividades (que têm product_id) para incluir o nome do produto.
    const enrichedActivities = activities.map(act => {
        const product = products.find(p => p.id === act.product_id);
        return {
            ...act,
            productName: product ? product.name : 'Produto Desconhecido',
        };
    });

    return {
        isLoading,
        error,
        products, // Lista completa de produtos
        activities: enrichedActivities, // Lista de atividades com nome do produto
        totalProducts,
        criticalProducts,
    };
}