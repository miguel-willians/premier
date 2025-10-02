import PageTitle from '../../components/PageTitle/index';
import InfoCard from '../../components/InfoCard/index';
import Layout from '../../layout/index';
import { dashboardData } from '../../constants/data/dashboardData';

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
    </Layout>
  );
}
