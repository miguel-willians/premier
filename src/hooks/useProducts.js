import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../services/apis/apiProducts'; // Importa a função criada acima

export function useProducts() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['productsList'],
        queryFn: fetchProducts,
    });

    return {
        isLoading,
        error,
        // Retorna o array de produtos (ou um array vazio se for null)
        products: data || [], 
    };
}