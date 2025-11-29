import { useQuery } from '@tanstack/react-query';
import { 
  fetchDashboardMetrics, 
  fetchActivities,
  fetchLowStockProducts 
} from '../services/apis/apiDashboard';

// Função auxiliar para injetar ícones e cores nas métricas (dados que não vêm do Supabase)
const formatMetrics = (metrics) => {
    return (metrics || []).map(cardData => {
        let iconDetails = {};
        if (cardData.title.includes("Itens")) {
            iconDetails = { iconName: 'grid', iconColor: '#007bff', iconBgColor: '#e6f0ff' };
        } else if (cardData.title.includes("Cadastrados")) {
            iconDetails = { iconName: 'users', iconColor: '#28a745', iconBgColor: '#e6f3e9' };
        } else if (cardData.title.includes("Baixo")) {
            iconDetails = { iconName: 'alert-triangle', iconColor: '#ffc107', iconBgColor: '#fff8e6' };
        } else {
            iconDetails = { iconName: 'activity', iconColor: '#6c757d', iconBgColor: '#f8f9fa' };
        }
        
        return {
            ...cardData,
            ...iconDetails
        };
    });
};

export function useDashboardData() {
    // Busca 1: Métricas principais
    const { data: metricsData, isLoading: loadingMetrics, error: errorMetrics } = useQuery({
        queryKey: ['dashboardMetrics'],
        queryFn: fetchDashboardMetrics,
    });

    // Busca 2: Atividades recentes
    const { data: activitiesData, isLoading: loadingActivities, error: errorActivities } = useQuery({
        queryKey: ['recentActivities'],
        queryFn: fetchActivities,
    });

    // Busca 3: Produtos com estoque baixo
    const { data: lowStockData, isLoading: loadingLowStock, error: errorLowStock } = useQuery({
        queryKey: ['lowStockProducts'],
        queryFn: fetchLowStockProducts,
    });

    const isLoading = loadingMetrics || loadingActivities || loadingLowStock;
    const error = errorMetrics || errorActivities || errorLowStock;

    return {
        isLoading,
        error,
        // Retorna os dados já formatados para os componentes
        dashboardData: formatMetrics(metricsData),
        activities: activitiesData || [],
        outOfStockProducts: lowStockData || [],
    };
}