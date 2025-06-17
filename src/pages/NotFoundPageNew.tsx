import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Result, Button, Space } from 'antd';
import { HomeOutlined, ShopOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const NotFoundPageNew: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f5f5f5',
      padding: '24px'
    }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Space size="middle">
            <Button 
              type="primary" 
              icon={<HomeOutlined />}
              onClick={() => navigate('/')}
              size="large"
            >
              Back to Home
            </Button>
            <Button 
              icon={<ShopOutlined />}
              onClick={() => navigate('/marketplace')}
              size="large"
            >
              Visit Marketplace
            </Button>
            <Button 
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(-1)}
              size="large"
            >
              Go Back
            </Button>
          </Space>
        }
      />
    </div>
  );
};

export default NotFoundPageNew;
