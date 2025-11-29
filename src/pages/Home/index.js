import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// 🛑 Novo Import: O hook que centraliza a lógica da API
import { useDashboardData } from '../../hooks/useDashboardData';

// Componentes UI e Layout
import PageTitle from "../../components/PageTitle/index";
import InfoCard from "../../components/InfoCard/index";
import Layout from "../../layout/index"; 
import LowStockCard from "../../components/LowStockCard/index";
import RecentActivityCard from "../../components/RecentActivityCard/index";
import { useReports } from '../../hooks/useReports'; 


// 🛑 REMOVA: Todos os imports de dados mock (dashboardData, outOfStockProducts, activities)

export default function Home() {
    // 🛑 USE O HOOK PARA PEGAR OS DADOS E O ESTADO
    const { 
      isLoading, 
      error, 
      dashboardData, 
      outOfStockProducts,  
    } = useDashboardData();

    const {activities} = useReports()

    // ----------------------------------------------------
    // Lógica de Estado
    // ----------------------------------------------------
    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text>Carregando Dashboard...</Text>
            </View>
        );
    }

    if (error) {
         return (
            <View style={styles.center}>
               <Text style={styles.errorText}>❌ Falha ao carregar dados:</Text>
               <Text style={styles.errorTextDetail}>{error.message}</Text>
            </View>
         );
    }
    
    // ----------------------------------------------------
    // Estrutura de Renderização (Idêntica à original)
    // ----------------------------------------------------
    return (
        <Layout>
            <PageTitle subtitle="Visão geral do seu estoque">Dashboard</PageTitle>
            
            {dashboardData.map((cardData) => (
                <InfoCard
                    key={cardData.id}
                    title={cardData.title}
                    value={cardData.value}
                    iconName={cardData.iconName}
                    iconColor={cardData.iconColor}
                    iconBgColor={cardData.iconBgColor}
                />
            ))}

            <LowStockCard
                title="Produtos com Estoque Baixo"
                products={outOfStockProducts}
                iconName="alert-triangle"
                iconColor="#ffc107"
            />

            <RecentActivityCard
                title="Últimas Movimentações"
                activities={activities}
            />
        </Layout>
    );
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        marginBottom: 5,
    },
    errorTextDetail: {
        color: '#6c757d',
        fontSize: 14,
    }
});