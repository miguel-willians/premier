import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../services/apis/apiProducts'; // Importa a nova função

export function useCreateProduct() {
    const queryClient = useQueryClient();

    // useMutation gerencia o processo de ENVIO/ESCRITA de dados (INSERT, UPDATE, DELETE)
    const { mutate, isPending, isSuccess, error } = useMutation({
        mutationFn: createProduct, // Função que será chamada para salvar o produto
        
        onSuccess: () => {
            // Invalida a query da lista de produtos para forçar a atualização da tela principal
            queryClient.invalidateQueries({ queryKey: ['productsList'] });
        },
    });

    return {
        isCreating: isPending, // Renomeado para maior clareza
        create: mutate,
        isSuccess,
        error,
    };
}