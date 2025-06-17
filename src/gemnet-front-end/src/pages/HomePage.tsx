import React from 'react';
import { Layout, Typography, Row, Col, Card } from 'antd';
import { Header, Footer } from '../components/common';

const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Header />
      <Layout.Content style={{ padding: '20px' }}>
        <Title level={2}>Welcome to GemNet</Title>
        <Paragraph>
          Discover a wide range of exquisite gems and connect with buyers and sellers in our marketplace.
        </Paragraph>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Featured Gem 1" bordered={false}>
              <p>Description of featured gem 1.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Featured Gem 2" bordered={false}>
              <p>Description of featured gem 2.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Featured Gem 3" bordered={false}>
              <p>Description of featured gem 3.</p>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default HomePage;