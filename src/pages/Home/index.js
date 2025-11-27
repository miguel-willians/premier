import PageTitle from "../../components/PageTitle/index";
import InfoCard from "../../components/InfoCard/index";
import Layout from "../../layout/index";
import { dashboardData } from "../../constants/data/dashboardData";
import { outOfStockProducts } from "../../constants/data/outOfStockProducts";
import { activities } from "../../constants/data/activities";
import LowStockCard from "../../components/LowStockCard/index";
import RecentActivityCard from "../../components/RecentActivityCard/index";

export default function Home() {
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
        iconColor="#ffc107" // Amarelo/Laranja do aviso
      />

      <RecentActivityCard
        title="Últimas Movimentações"
        activities={activities}
      />
    </Layout>
  );
}
