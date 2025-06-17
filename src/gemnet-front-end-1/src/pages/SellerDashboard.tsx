import React, { useState, useEffect } from 'react';
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Button,
  Table,
  Tag,
  Space,
  Avatar,
  message,
} from 'antd';
import { UserOutlined, ShopOutlined, DollarOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Content } = Layout;

const SellerDashboard = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch seller listings
    setTimeout(() => {
      setListings([
        {
          id: '1',
          gemName: 'Blue Sapphire',
          price: 1200,
          status: 'available',
        },
        {
          id: '2',
          gemName: 'Ruby Star',
          price: 950,
          status: 'sold',
        },
        {
          id: '3',
          gemName: 'Green Emerald',
          price: 1500,
          status: 'available',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleDelete = (id) => {
    setListings(listings.filter((listing) => listing.id !== id));
    message.success('Listing deleted successfully');
  };

  const columns = [
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'available' ? 'green' : 'red'}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button type="danger" size="small" onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="seller-dashboard">
      <Content style={{ padding: '20px' }}>
        <Title level={2}>Seller Dashboard</Title>
        <Row gutter={16}>
          <Col span={24}>
            <Card title="Your Listings">
              <Table
                dataSource={listings}
                columns={columns}
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

export default SellerDashboard;