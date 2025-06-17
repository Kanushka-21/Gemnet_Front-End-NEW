import React, { useEffect, useState } from 'react';
import { Layout, Typography, Row, Col, Card, List, Button, Spin } from 'antd';
import { Header, Footer } from '../components/common';
import { Gem } from '../interfaces/gem.interface';
import { getGems } from '../services/gem.service';

const { Title } = Typography;
const { Content } = Layout;

const MarketplacePage: React.FC = () => {
  const [gems, setGems] = useState<Gem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGems = async () => {
      try {
        const gemsData = await getGems();
        setGems(gemsData);
      } catch (error) {
        console.error('Failed to fetch gems:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGems();
  }, []);

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Marketplace</Title>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={16}>
            {gems.map(gem => (
              <Col span={8} key={gem.id}>
                <Card
                  title={gem.name}
                  cover={<img alt={gem.name} src={gem.image} />}
                  actions={[
                    <Button type="primary">View Details</Button>
                  ]}
                >
                  <p>Price: ${gem.price}</p>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Content>
      <Footer />
    </Layout>
  );
};

export default MarketplacePage;