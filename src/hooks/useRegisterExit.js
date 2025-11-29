import { useMutation, useQueryClient } from '@tanstack/react-query';
// Você pode reutilizar createActivityEntry se ele estiver em apiActivities
import { createActivityEntry } from '../services/apis/apiActivities'; 

export function useRegisterExit() {
    const queryClient = useQueryClient();

    const { mutate, isPending, error } = useMutation({
        mutationFn: createActivityEntry,
        
        onSuccess: () => {
            // Invalida todas as queries que dependem de mudanças no estoque e atividades
            queryClient.invalidateQueries({ queryKey: ['recentActivities'] });
            queryClient.invalidateQueries({ queryKey: ['dashboardMetrics'] });
            queryClient.invalidateQueries({ queryKey: ['productsList'] }); 
            queryClient.invalidateQueries({ queryKey: ['recentExits'] }); // Invalida a lista local
        },
    });

    return {
        isRegistering: isPending,
        registerExit: mutate,
        error,
    };
}