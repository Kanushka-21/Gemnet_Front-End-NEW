import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  DatePicker,
  InputNumber,
  Select,
  Table,
  Tag,
  Image,
  Descriptions,
  message,
  Divider,
  Alert,
  Progress,
  Statistic,
  List,
  Avatar,
  Badge,
  Tooltip,
  Switch,
  Drawer
} from 'antd';
import {
  PlusOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  BarChartOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  FileImageOutlined,
  TrophyOutlined,
  StarOutlined,
  RocketOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  submittedBy: string;
  submitterEmail: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  startDate?: string;
  endDate?: string;
  cost: number;
  views: number;
  clicks: number;
  category: 'premium' | 'standard' | 'banner';
  position: 'home' | 'marketplace' | 'sidebar' | 'footer';
  priority: number;
  targetAudience?: string[];
  rejectionReason?: string;
}

interface AdSubmission {
  title: string;
  description: string;
  image: File | null;
  category: 'premium' | 'standard' | 'banner';
  position: 'home' | 'marketplace' | 'sidebar' | 'footer';
  dateRange: [Dayjs, Dayjs] | null;
  targetAudience: string[];
  budget: number;
}

const AdvertisementManagement: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [form] = Form.useForm();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [statsDrawerVisible, setStatsDrawerVisible] = useState(false);

  // Mock data
  useEffect(() => {
    setAdvertisements([
      {
        id: '1',
        title: 'Premium Ceylon Sapphires Collection',
        description: 'Discover the finest collection of certified Ceylon sapphires. Unbeatable quality and prices.',
        image: 'https://via.placeholder.com/400x200/4169E1/FFFFFF?text=Ceylon+Sapphires',
        submittedBy: 'Sapphire Masters Ltd',
        submitterEmail: 'contact@sapphiremasters.com',
        submissionDate: '2024-01-15',
        status: 'approved',
        startDate: '2024-01-20',
        endDate: '2024-02-20',
        cost: 750,
        views: 12540,
        clicks: 856,
        category: 'premium',
        position: 'home',
        priority: 1,
        targetAudience: ['buyers', 'collectors', 'investors']
      },
      {
        id: '2',
        title: 'Ruby Investment Opportunity',
        description: 'Special investment-grade rubies now available. Limited time offer with authentication guarantee.',
        image: 'https://via.placeholder.com/400x200/DC143C/FFFFFF?text=Ruby+Investment',
        submittedBy: 'Ruby Traders International',
        submitterEmail: 'info@rubytraders.com',
        submissionDate: '2024-01-18',
        status: 'pending',
        cost: 500,
        views: 0,
        clicks: 0,
        category: 'standard',
        position: 'marketplace',
        priority: 2,
        targetAudience: ['investors', 'dealers']
      },
      {
        id: '3',
        title: 'Emerald Verification Services',
        description: 'Professional emerald authentication and certification services. Trusted by collectors worldwide.',
        image: 'https://via.placeholder.com/400x200/50C878/FFFFFF?text=Emerald+Services',
        submittedBy: 'GemCert Solutions',
        submitterEmail: 'services@gemcert.com',
        submissionDate: '2024-01-12',
        status: 'rejected',
        cost: 300,
        views: 0,
        clicks: 0,
        category: 'banner',
        position: 'sidebar',
        priority: 3,
        rejectionReason: 'Image quality does not meet our standards'
      }
    ]);
  }, []);

  // Calculate statistics
  const totalAds = advertisements.length;
  const pendingAds = advertisements.filter(ad => ad.status === 'pending').length;
  const approvedAds = advertisements.filter(ad => ad.status === 'approved').length;
  const totalRevenue = advertisements
    .filter(ad => ad.status === 'approved')
    .reduce((sum, ad) => sum + ad.cost, 0);
  const totalViews = advertisements.reduce((sum, ad) => sum + ad.views, 0);
  const totalClicks = advertisements.reduce((sum, ad) => sum + ad.clicks, 0);
  const avgCTR = totalViews > 0 ? ((totalClicks / totalViews) * 100) : 0;

  // Table columns
  const columns: ColumnsType<Advertisement> = [
    {
      title: 'Advertisement',
      key: 'ad',
      render: (_, record) => (
        <Space>
          <Image
            width={60}
            height={40}
            src={record.image}
            style={{ borderRadius: 4 }}
            preview={false}
          />
          <div>
            <div style={{ fontWeight: 500, maxWidth: 200 }}>{record.title}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.submittedBy}</div>
          </div>
        </Space>
      ),
      width: 300,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        const config = {
          premium: { color: 'gold', icon: <TrophyOutlined /> },
          standard: { color: 'blue', icon: <StarOutlined /> },
          banner: { color: 'green', icon: <RocketOutlined /> }
        };
        return (
          <Tag color={config[category as keyof typeof config]?.color} 
               icon={config[category as keyof typeof config]?.icon}>
            {category.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      render: (position: string) => (
        <Tag>{position.toUpperCase()}</Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          approved: { color: 'success', icon: <CheckCircleOutlined /> },
          pending: { color: 'warning', icon: <ClockCircleOutlined /> },
          rejected: { color: 'error', icon: <CloseCircleOutlined /> },
          expired: { color: 'default', icon: <ClockCircleOutlined /> }
        };
        return (
          <Tag color={config[status as keyof typeof config]?.color} 
               icon={config[status as keyof typeof config]?.icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, record) => (
        record.status === 'approved' ? (
          <div>
            <div>Views: {record.views.toLocaleString()}</div>
            <div>Clicks: {record.clicks.toLocaleString()}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>
              CTR: {record.views > 0 ? ((record.clicks / record.views) * 100).toFixed(2) : 0}%
            </div>
          </div>
        ) : (
          <Text type="secondary">-</Text>
        )
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: number) => (
        <Text strong>${cost.toLocaleString()}</Text>
      ),
    },
    {
      title: 'Submitted',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedAd(record);
                setDetailsModalVisible(true);
              }}
            />
          </Tooltip>
          {record.status === 'pending' && (
            <>
              <Tooltip title="Approve">
                <Button 
                  size="small" 
                  type="primary" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleAdStatus(record.id, 'approved')}
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button 
                  size="small" 
                  danger 
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleAdStatus(record.id, 'rejected')}
                />
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Handle ad status change
  const handleAdStatus = (adId: string, status: 'approved' | 'rejected') => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === adId ? { 
        ...ad, 
        status,
        startDate: status === 'approved' ? dayjs().format('YYYY-MM-DD') : undefined,
        endDate: status === 'approved' ? dayjs().add(30, 'days').format('YYYY-MM-DD') : undefined
      } : ad
    ));
    message.success(`Advertisement ${status} successfully`);
  };

  // Handle ad submission
  const handleSubmitAd = async (values: any) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newAd: Advertisement = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        image: 'https://via.placeholder.com/400x200/1890FF/FFFFFF?text=New+Ad',
        submittedBy: 'Current User',
        submitterEmail: 'user@example.com',
        submissionDate: dayjs().format('YYYY-MM-DD'),
        status: 'pending',
        cost: values.budget,
        views: 0,
        clicks: 0,
        category: values.category,
        position: values.position,
        priority: advertisements.length + 1,
        targetAudience: values.targetAudience || []
      };
      
      setAdvertisements(prev => [newAd, ...prev]);
      setSubmitModalVisible(false);
      form.resetFields();
      message.success('Advertisement submitted for review');
      setLoading(false);
    }, 1000);
  };

  // Filter advertisements
  const filteredAds = advertisements.filter(ad => 
    filterStatus === 'all' || ad.status === filterStatus
  );

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <RocketOutlined style={{ marginRight: 8 }} />
          Advertisement Management
        </Title>
        <Text type="secondary">Manage and review advertising campaigns</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Advertisements"
              value={totalAds}
              prefix={<FileImageOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Review"
              value={pendingAds}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <Text type="secondary">
              {totalAds > 0 ? Math.round((pendingAds / totalAds) * 100) : 0}% of total
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue Generated"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average CTR"
              value={avgCTR}
              suffix="%"
              precision={2}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Action Bar */}
      <Card style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setSubmitModalVisible(true)}
              >
                Submit Advertisement
              </Button>
              <Button 
                icon={<BarChartOutlined />}
                onClick={() => setStatsDrawerVisible(true)}
              >
                View Analytics
              </Button>
            </Space>
          </Col>
          <Col>
            <Space>
              <Text>Filter by status:</Text>
              <Select
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 120 }}
              >
                <Option value="all">All</Option>
                <Option value="pending">Pending</Option>
                <Option value="approved">Approved</Option>
                <Option value="rejected">Rejected</Option>
                <Option value="expired">Expired</Option>
              </Select>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Advertisements Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredAds}
          rowKey="id"
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} advertisements`,
          }}
          scroll={{ x: 1200 }}
        />
      </Card>

      {/* Submit Advertisement Modal */}
      <Modal
        title={<span><PlusOutlined style={{ marginRight: 8 }} />Submit New Advertisement</span>}
        open={submitModalVisible}
        onCancel={() => setSubmitModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form form={form} onFinish={handleSubmitAd} layout="vertical">
          <Form.Item
            name="title"
            label="Advertisement Title"
            rules={[{ required: true, message: 'Please enter the title' }]}
          >
            <Input placeholder="Enter an engaging title for your advertisement" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Describe your advertisement content and value proposition"
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Advertisement Image"
            rules={[{ required: true, message: 'Please upload an image' }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <UploadOutlined />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            </Upload>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select a category' }]}
              >
                <Select placeholder="Select category">
                  <Option value="premium">Premium ($500-1000)</Option>
                  <Option value="standard">Standard ($200-500)</Option>
                  <Option value="banner">Banner ($100-300)</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: 'Please select a position' }]}
              >
                <Select placeholder="Select position">
                  <Option value="home">Home Page</Option>
                  <Option value="marketplace">Marketplace</Option>
                  <Option value="sidebar">Sidebar</Option>
                  <Option value="footer">Footer</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="dateRange"
            label="Campaign Duration"
            rules={[{ required: true, message: 'Please select campaign dates' }]}
          >
            <RangePicker 
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current < dayjs().startOf('day')}
            />
          </Form.Item>

          <Form.Item
            name="targetAudience"
            label="Target Audience"
          >
            <Select mode="multiple" placeholder="Select target audience">
              <Option value="buyers">Buyers</Option>
              <Option value="sellers">Sellers</Option>
              <Option value="collectors">Collectors</Option>
              <Option value="investors">Investors</Option>
              <Option value="dealers">Dealers</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="budget"
            label="Budget (USD)"
            rules={[{ required: true, message: 'Please enter your budget' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={100}
              max={1000}
              step={50}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Alert
            message="Advertisement Review Process"
            description="Your advertisement will be reviewed within 24-48 hours. You will be notified via email once the review is complete."
            type="info"
            style={{ marginBottom: 16 }}
          />

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setSubmitModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Submit for Review
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Advertisement Details Modal */}
      <Modal
        title={<span><EyeOutlined style={{ marginRight: 8 }} />Advertisement Details</span>}
        open={detailsModalVisible}
        onCancel={() => setDetailsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedAd && (
          <div>
            <Row gutter={16}>
              <Col span={10}>
                <Image src={selectedAd.image} width="100%" />
              </Col>
              <Col span={14}>
                <Descriptions bordered column={1} size="small">
                  <Descriptions.Item label="Title">{selectedAd.title}</Descriptions.Item>
                  <Descriptions.Item label="Submitted By">
                    <Space>
                      <Avatar icon={<UserOutlined />} size="small" />
                      <div>
                        <div>{selectedAd.submittedBy}</div>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          {selectedAd.submitterEmail}
                        </Text>
                      </div>
                    </Space>
                  </Descriptions.Item>
                  <Descriptions.Item label="Category">
                    <Tag color={
                      selectedAd.category === 'premium' ? 'gold' :
                      selectedAd.category === 'standard' ? 'blue' : 'green'
                    }>
                      {selectedAd.category.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Position">
                    <Tag>{selectedAd.position.toUpperCase()}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={
                      selectedAd.status === 'approved' ? 'success' :
                      selectedAd.status === 'pending' ? 'warning' : 'error'
                    }>
                      {selectedAd.status.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Cost">
                    ${selectedAd.cost.toLocaleString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Submission Date">
                    {dayjs(selectedAd.submissionDate).format('MMMM DD, YYYY')}
                  </Descriptions.Item>
                  {selectedAd.status === 'approved' && (
                    <>
                      <Descriptions.Item label="Campaign Period">
                        {selectedAd.startDate && selectedAd.endDate ? 
                          `${dayjs(selectedAd.startDate).format('MMM DD')} - ${dayjs(selectedAd.endDate).format('MMM DD, YYYY')}` 
                          : 'Not set'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Performance">
                        <div>
                          <div>Views: {selectedAd.views.toLocaleString()}</div>
                          <div>Clicks: {selectedAd.clicks.toLocaleString()}</div>
                          <div>CTR: {selectedAd.views > 0 ? ((selectedAd.clicks / selectedAd.views) * 100).toFixed(2) : 0}%</div>
                        </div>
                      </Descriptions.Item>
                    </>
                  )}
                </Descriptions>
              </Col>
            </Row>
            
            <div style={{ marginTop: 16 }}>
              <Title level={5}>Description</Title>
              <Paragraph>{selectedAd.description}</Paragraph>
            </div>

            {selectedAd.targetAudience && selectedAd.targetAudience.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Title level={5}>Target Audience</Title>
                <Space wrap>
                  {selectedAd.targetAudience.map((audience, index) => (
                    <Tag key={index} color="blue">{audience.toUpperCase()}</Tag>
                  ))}
                </Space>
              </div>
            )}

            {selectedAd.rejectionReason && (
              <div style={{ marginTop: 16 }}>
                <Alert
                  message="Rejection Reason"
                  description={selectedAd.rejectionReason}
                  type="error"
                  showIcon
                />
              </div>
            )}

            {selectedAd.status === 'pending' && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Space>
                  <Button 
                    type="primary" 
                    icon={<CheckCircleOutlined />}
                    onClick={() => {
                      handleAdStatus(selectedAd.id, 'approved');
                      setDetailsModalVisible(false);
                    }}
                  >
                    Approve Advertisement
                  </Button>
                  <Button 
                    danger 
                    icon={<CloseCircleOutlined />}
                    onClick={() => {
                      handleAdStatus(selectedAd.id, 'rejected');
                      setDetailsModalVisible(false);
                    }}
                  >
                    Reject Advertisement
                  </Button>
                </Space>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Analytics Drawer */}
      <Drawer
        title={<span><BarChartOutlined style={{ marginRight: 8 }} />Advertisement Analytics</span>}
        width={600}
        open={statsDrawerVisible}
        onClose={() => setStatsDrawerVisible(false)}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Statistic
                title="Total Campaign Revenue"
                value={totalRevenue}
                prefix={<DollarOutlined />}
                suffix="USD"
                valueStyle={{ color: '#52c41a', fontSize: '28px' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Total Views"
                value={totalViews}
                valueStyle={{ fontSize: '20px' }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Total Clicks"
                value={totalClicks}
                valueStyle={{ fontSize: '20px' }}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Performance by Category</Title>
        <List
          dataSource={['premium', 'standard', 'banner']}
          renderItem={(category) => {
            const categoryAds = advertisements.filter(ad => ad.category === category && ad.status === 'approved');
            const categoryViews = categoryAds.reduce((sum, ad) => sum + ad.views, 0);
            const categoryClicks = categoryAds.reduce((sum, ad) => sum + ad.clicks, 0);
            const categoryRevenue = categoryAds.reduce((sum, ad) => sum + ad.cost, 0);
            const categoryCTR = categoryViews > 0 ? ((categoryClicks / categoryViews) * 100) : 0;

            return (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Badge 
                      count={categoryAds.length}
                      style={{ backgroundColor: category === 'premium' ? '#gold' : category === 'standard' ? '#1890ff' : '#52c41a' }}
                    >
                      <Avatar 
                        icon={category === 'premium' ? <TrophyOutlined /> : category === 'standard' ? <StarOutlined /> : <RocketOutlined />}
                        style={{ backgroundColor: category === 'premium' ? '#faad14' : category === 'standard' ? '#1890ff' : '#52c41a' }}
                      />
                    </Badge>
                  }
                  title={category.toUpperCase()}
                  description={
                    <div>
                      <div>Revenue: ${categoryRevenue.toLocaleString()}</div>
                      <div>Views: {categoryViews.toLocaleString()} | Clicks: {categoryClicks.toLocaleString()}</div>
                      <div>CTR: {categoryCTR.toFixed(2)}%</div>
                    </div>
                  }
                />
                <Progress 
                  percent={Math.min(100, categoryCTR * 10)} 
                  size="small" 
                  status={categoryCTR > 2 ? 'success' : categoryCTR > 1 ? 'normal' : 'exception'}
                />
              </List.Item>
            );
          }}
        />
      </Drawer>
    </div>
  );
};

export default AdvertisementManagement;
