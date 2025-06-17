import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Table, Tag, Space, Avatar, List, message } from 'antd';
import { UserOutlined, ShopOutlined, DollarOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const BuyerDashboard = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch purchases
    setTimeout(() => {
      setPurchases([
        {
          id: '1',
          gemName: 'Blue Sapphire',
          price: 1200,
          seller: 'Ceylon Gems',
          status: 'completed',
        },
        {
          id: '2',
          gemName: 'Ruby Star',
          price: 950,
          seller: 'Sri Lanka Gems',
          status: 'pending',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const purchaseColumns = [
    {
      title: 'Gem',
      dataIndex: 'gemName',
      key: 'gemName',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = status === 'completed' ? 'green' : 'orange';
        return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => message.info(`Viewing details for ${record.gemName}`)}>
            View Details
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="buyer-dashboard">
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Buyer Dashboard</Title>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="My Purchases">
              <Table
                dataSource={purchases}
                columns={purchaseColumns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default BuyerDashboard;