import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layout,
  Card,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Statistic,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Upload,
  Alert,
  Progress,
  Divider,
  Avatar,
  List,
  Radio,
  message
} from 'antd';
import {
  ShopOutlined,
  PlusOutlined,
  DollarOutlined,
  CalendarOutlined,
  TrophyOutlined,
  UploadOutlined,
  RobotOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import type { ColumnsType } from 'antd/es/table';

const { Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface Listing {
  id: number;
  gemName: string;
  price: number;
  status: 'active' | 'sold' | 'pending' | 'expired';
  dateAdded: string;
  views: number;
  bids: number;
  category: string;
  certified: boolean;
  image: string;
}

interface Sale {
  id: number;
  gemName: string;
  saleAmount: number;
  commission: number;
  saleDate: string;
  status: 'completed' | 'pending';
  meetingDate: string;
  buyer: string;
}

interface Meeting {
  id: number;
  gemName: string;
  date: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  buyer: string;
}

// ML Price Prediction Component
const PricePrediction: React.FC<{ 
  gemData: any; 
  onPredictionReceived: (prediction: { min: number; max: number; confidence: number }) => void 
}> = ({ gemData, onPredictionReceived }) => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const runPrediction = async () => {
    setLoading(true);
    
    // Simulate ML API call
    setTimeout(() => {
      const basePrices = {
        'sapphire': 1500,
        'ruby': 2000,
        'emerald': 2500,
        'topaz': 800,
        'amethyst': 600,
        'aquamarine': 1200
      };
      
      const basePrice = basePrices[gemData.category?.toLowerCase()] || 1000;
      const caratMultiplier = parseFloat(gemData.carat) || 1;
      const certifiedMultiplier = gemData.certified ? 1.3 : 1;
      const clarityMultiplier = {
        'FL': 1.5, 'IF': 1.4, 'VVS': 1.3, 'VS': 1.2, 'SI': 1.1, 'I': 1
      }[gemData.clarity] || 1.1;
      
      const estimatedPrice = basePrice * caratMultiplier * certifiedMultiplier * clarityMultiplier;
      const variance = estimatedPrice * 0.15; // 15% variance
      
      const result = {
        min: Math.round(estimatedPrice - variance),
        max: Math.round(estimatedPrice + variance),
        confidence: Math.round(85 + Math.random() * 10) // 85-95% confidence
      };
      
      setPrediction(result);
      onPredictionReceived(result);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (gemData.category && gemData.carat) {
      runPrediction();
    }
  }, [gemData.category, gemData.carat, gemData.certified, gemData.clarity]);

  return (
    <Card 
      title={
        <Space>
          <RobotOutlined />
          ML Price Prediction
        </Space>
      }
      loading={loading}
    >
      {prediction ? (
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Statistic 
                title="Minimum Price" 
                value={prediction.min} 
                prefix="$" 
                valueStyle={{ color: '#52c41a' }}
              />
            </Col>
            <Col span={12}>
              <Statistic 
                title="Maximum Price" 
                value={prediction.max} 
                prefix="$" 
                valueStyle={{ color: '#1890ff' }}
              />
            </Col>
          </Row>
          <div className="mt-4">
            <Text strong>Confidence Level</Text>
            <Progress 
              percent={prediction.confidence} 
              strokeColor="#52c41a"
              className="mt-2"
            />
          </div>
          <Alert
            className="mt-4"
            message="Price Recommendation"
            description={`Based on market analysis, we recommend setting your starting price between $${prediction.min.toLocaleString()} - $${prediction.max.toLocaleString()}`}
            type="success"
            showIcon
          />
        </div>
      ) : (
        <Text type="secondary">Fill in gem details to get price prediction</Text>
      )}
    </Card>
  );
};

const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [addListingModalVisible, setAddListingModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [gemType, setGemType] = useState<'certified' | 'non-certified'>('certified');
  const [pricePrediction, setPricePrediction] = useState<any>(null);

  // Stats
  const [stats, setStats] = useState({
    totalListings: 15,
    activeBids: 23,
    totalSales: 8,
    revenue: 45600
  });

  // Mock data
  const [listings, setListings] = useState<Listing[]>([
    {
      id: 1,
      gemName: "Blue Sapphire Premium",
      price: 4500,
      status: 'active',
      dateAdded: "2025-06-10",
      views: 127,
      bids: 8,
      category: "Sapphire",
      certified: true,
      image: "https://via.placeholder.com/100?text=Sapphire"
    },
    {
      id: 2,
      gemName: "Natural Ruby",
      price: 5800,
      status: 'sold',
      dateAdded: "2025-06-05",
      views: 156,
      bids: 12,
      category: "Ruby",
      certified: true,
      image: "https://via.placeholder.com/100?text=Ruby"
    }
  ]);

  const [sales, setSales] = useState<Sale[]>([
    {
      id: 1,
      gemName: "Natural Ruby",
      saleAmount: 5800,
      commission: 580,
      saleDate: "2025-06-15",
      status: 'completed',
      meetingDate: "2025-06-18",
      buyer: "John Doe"
    }
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: 1,
      gemName: "Blue Sapphire Premium",
      date: "2025-06-20",
      location: "GemNet Office, Colombo",
      status: 'scheduled',
      buyer: "Jane Smith"
    }
  ]);

  const listingColumns: ColumnsType<Listing> = [
    {
      title: 'Gem',
      dataIndex: 'gemName',
      key: 'gemName',
      render: (text, record) => (
        <Space>
          <Avatar src={record.image} size={40} />
          <div>
            <Text strong>{text}</Text>
            <br />
            <Tag color="blue" size="small">{record.category}</Tag>
            {record.certified && <Tag color="green" size="small">Certified</Tag>}
          </div>
        </Space>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          active: { color: 'green', text: 'Active' },
          sold: { color: 'blue', text: 'Sold' },
          pending: { color: 'orange', text: 'Pending' },
          expired: { color: 'default', text: 'Expired' }
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: 'Views/Bids',
      key: 'engagement',
      render: (_, record) => `${record.views} views, ${record.bids} bids`
    },
    {
      title: 'Date Added',
      dataIndex: 'dateAdded',
      key: 'dateAdded'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small">Edit</Button>
          <Button size="small" danger>Remove</Button>
        </Space>
      )
    }
  ];

  const handleAddListing = (values: any) => {
    const newListing: Listing = {
      id: Date.now(),
      gemName: values.gemName,
      price: values.startingPrice,
      status: 'active',
      dateAdded: new Date().toISOString().split('T')[0],
      views: 0,
      bids: 0,
      category: values.category,
      certified: gemType === 'certified',
      image: "https://via.placeholder.com/100?text=Gem"
    };
    
    setListings([newListing, ...listings]);
    setAddListingModalVisible(false);
    form.resetFields();
    message.success('Listing added successfully!');
  };

  const menuItems = [
    { key: 'overview', icon: <TrophyOutlined />, label: 'Overview' },
    { key: 'listings', icon: <ShopOutlined />, label: 'My Listings' },
    { key: 'sales', icon: <DollarOutlined />, label: 'Confirmed Sales' },
    { key: 'meetings', icon: <CalendarOutlined />, label: 'Upcoming Meetings' }
  ];

  const renderOverview = () => (
    <div>
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Listings"
              value={stats.totalListings}
              prefix={<ShopOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Bids"
              value={stats.activeBids}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={stats.totalSales}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue"
              value={stats.revenue}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Listings" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={listings.slice(0, 3)}
              renderItem={(listing) => (
                <List.Item
                  actions={[
                    <Tag color={listing.status === 'active' ? 'green' : 'blue'}>
                      {listing.status}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={listing.image} />}
                    title={listing.gemName}
                    description={`$${listing.price.toLocaleString()} • ${listing.views} views • ${listing.bids} bids`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Upcoming Meetings" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={meetings.slice(0, 3)}
              renderItem={(meeting) => (
                <List.Item
                  actions={[
                    <Tag color="blue">{meeting.status}</Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<CalendarOutlined />} />}
                    title={meeting.gemName}
                    description={`${meeting.date} • ${meeting.location}`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  const renderListings = () => (
    <div>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={4}>My Listings</Title>
            <Text type="secondary">Manage your gemstone listings and track their performance</Text>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setAddListingModalVisible(true)}
          >
            Add New Listing
          </Button>
        </div>
        <Table
          columns={listingColumns}
          dataSource={listings}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );

  const renderSales = () => (
    <Card title="Confirmed Sales">
      <Table
        columns={[
          {
            title: 'Gem Name (ID)',
            dataIndex: 'gemName',
            key: 'gemName',
          },
          {
            title: 'Sale Amount',
            dataIndex: 'saleAmount',
            key: 'saleAmount',
            render: (value) => `$${value.toLocaleString()}`
          },
          {
            title: 'Commission',
            dataIndex: 'commission',
            key: 'commission',
            render: (value) => `$${value.toLocaleString()}`
          },
          {
            title: 'Sale Date',
            dataIndex: 'saleDate',
            key: 'saleDate'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
              <Tag color={status === 'completed' ? 'green' : 'orange'}>
                {status}
              </Tag>
            )
          },
          {
            title: 'Meeting Date',
            dataIndex: 'meetingDate',
            key: 'meetingDate'
          }
        ]}
        dataSource={sales}
        rowKey="id"
        pagination={false}
      />
    </Card>
  );

  const renderMeetings = () => (
    <Card title="Upcoming Meetings">
      <Table
        columns={[
          {
            title: 'Gem Name (ID)',
            dataIndex: 'gemName',
            key: 'gemName',
          },
          {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
          },
          {
            title: 'Location',
            dataIndex: 'location',
            key: 'location'
          },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
              <Tag color={status === 'scheduled' ? 'blue' : status === 'completed' ? 'green' : 'default'}>
                {status}
              </Tag>
            )
          }
        ]}
        dataSource={meetings}
        rowKey="id"
        pagination={false}
      />
    </Card>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'overview':
        return renderOverview();
      case 'listings':
        return renderListings();
      case 'sales':
        return renderSales();
      case 'meetings':
        return renderMeetings();
      default:
        return renderOverview();
    }
  };

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="container mx-auto">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} className="mb-0">Seller Dashboard</Title>
              <Text type="secondary">Welcome back, {user?.firstName}!</Text>
            </Col>
            <Col>
              <Space>
                <Button onClick={() => navigate('/marketplace')}>
                  View Marketplace
                </Button>
                <Button onClick={() => navigate('/')}>
                  Home
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </div>

      <Layout>
        {/* Sidebar */}
        <Sider width={250} className="bg-white shadow-sm">
          <div className="p-4">
            <Avatar size={64} icon={<ShopOutlined />} className="mb-4" />
            <Title level={4} className="mb-0">{user?.firstName} {user?.lastName}</Title>
            <Text type="secondary">Verified Seller</Text>
          </div>
          <Divider />
          <div className="px-4">
            {menuItems.map(item => (
              <div
                key={item.key}
                className={`flex items-center p-3 cursor-pointer rounded-lg mb-2 transition-colors ${
                  selectedMenu === item.key 
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMenu(item.key)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </div>
            ))}
          </div>
        </Sider>

        {/* Main Content */}
        <Content className="p-6 bg-gray-50">
          {renderContent()}
        </Content>
      </Layout>

      {/* Add Listing Modal */}
      <Modal
        title="Add New Gem Listing"
        open={addListingModalVisible}
        onCancel={() => setAddListingModalVisible(false)}
        width={800}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddListing}
        >
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Gem Type" required>
                <Radio.Group value={gemType} onChange={(e) => setGemType(e.target.value)}>
                  <Radio value="certified">Certified</Radio>
                  <Radio value="non-certified">Non-Certified</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="gemName"
                label="Gem Name"
                rules={[{ required: true, message: 'Please enter gem name' }]}
              >
                <Input placeholder="e.g. Blue Sapphire Premium" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Option value="sapphire">Sapphire</Option>
                  <Option value="ruby">Ruby</Option>
                  <Option value="emerald">Emerald</Option>
                  <Option value="topaz">Topaz</Option>
                  <Option value="amethyst">Amethyst</Option>
                  <Option value="aquamarine">Aquamarine</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                name="carat"
                label="Carat Weight"
                rules={[{ required: true, message: 'Please enter carat weight' }]}
              >
                <InputNumber 
                  placeholder="3.5" 
                  step={0.1} 
                  min={0.1}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="color"
                label="Color"
                rules={[{ required: true, message: 'Please enter color' }]}
              >
                <Input placeholder="e.g. Royal Blue" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="clarity"
                label="Clarity"
                rules={[{ required: true, message: 'Please select clarity' }]}
              >
                <Select placeholder="Select clarity">
                  <Option value="FL">FL (Flawless)</Option>
                  <Option value="IF">IF (Internally Flawless)</Option>
                  <Option value="VVS">VVS (Very Very Slightly Included)</Option>
                  <Option value="VS">VS (Very Slightly Included)</Option>
                  <Option value="SI">SI (Slightly Included)</Option>
                  <Option value="I">I (Included)</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="cut"
                label="Cut"
                rules={[{ required: true, message: 'Please enter cut' }]}
              >
                <Select placeholder="Select cut">
                  <Option value="round">Round</Option>
                  <Option value="oval">Oval</Option>
                  <Option value="cushion">Cushion</Option>
                  <Option value="emerald">Emerald</Option>
                  <Option value="princess">Princess</Option>
                  <Option value="pear">Pear</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="origin"
                label="Origin"
                rules={[{ required: true, message: 'Please enter origin' }]}
              >
                <Input placeholder="e.g. Ratnapura, Sri Lanka" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <TextArea 
              rows={3}
              placeholder="Describe the gem's unique features, quality, and characteristics..."
            />
          </Form.Item>

          <Form.Item
            name="images"
            label="Images"
            rules={[{ required: true, message: 'Please upload images' }]}
          >
            <Upload
              listType="picture-card"
              multiple
              maxCount={5}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          {/* ML Price Prediction */}
          <PricePrediction 
            gemData={form.getFieldsValue()}
            onPredictionReceived={setPricePrediction}
          />

          <Form.Item
            name="startingPrice"
            label="Starting Price"
            rules={[{ required: true, message: 'Please enter starting price' }]}
          >
            <InputNumber 
              placeholder="Enter starting price"
              min={1}
              className="w-full"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '') as any}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button onClick={() => setAddListingModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create Listing
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default SellerDashboard;
