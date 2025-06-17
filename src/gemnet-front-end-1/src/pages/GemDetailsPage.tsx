import React from 'react';
import { Layout, Typography, Image, Button, Space } from 'antd';
import { useParams } from 'react-router-dom';
import { Gem } from '../interfaces/gem.interface';
import { getGemDetails } from '../services/gem.service';

const { Title, Text } = Typography;
const { Content } = Layout;

const GemDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [gem, setGem] = React.useState<Gem | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGemDetails = async () => {
      try {
        const gemData = await getGemDetails(id);
        setGem(gemData);
      } catch (error) {
        console.error('Error fetching gem details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGemDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!gem) {
    return <div>Gem not found.</div>;
  }

  return (
    <Layout className="gem-details-page">
      <Content style={{ padding: '20px' }}>
        <Title level={2}>{gem.name}</Title>
        <Image src={gem.image} alt={gem.name} style={{ maxWidth: '100%' }} />
        <Space direction="vertical" style={{ marginTop: '20px' }}>
          <Text strong>Description:</Text>
          <Text>{gem.description}</Text>
          <Text strong>Price:</Text>
          <Text>${gem.price}</Text>
          <Button type="primary">Add to Cart</Button>
        </Space>
      </Content>
    </Layout>
  );
};

export default GemDetailsPage;