import React from 'react';
import { Layout, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const NotFoundPage: React.FC = () => {
  return (
    <Layout className="not-found-page">
      <Content style={{ padding: '50px', textAlign: 'center' }}>
        <Title level={1}>404 - Page Not Found</Title>
        <Paragraph>
          Sorry, the page you are looking for does not exist.
        </Paragraph>
        <Button type="primary">
          <Link to="/">Go to Home</Link>
        </Button>
      </Content>
    </Layout>
  );
};

export default NotFoundPage;