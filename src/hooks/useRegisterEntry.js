import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createActivityEntry } from '../services/apis/apiActivities'; 

export function useRegisterEntry() {
    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess, error } = useMutation({
        mutationFn: createActivityEntry,
        
        onSuccess: () => {
            // Invalida a query de atividades e dashboard para atualizar os dados em Home.js
            queryClient.invalidateQueries({ queryKey: ['recentActivities'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardMetrics'] });
            queryClient.invalidateQueries({ queryKey: ['productsList'] }); // Para atualizar o estoque
        },
    });

    return {
        isRegistering: isPending, 
        registerEntry: mutate,
        isSuccess,
        error,
    };
}