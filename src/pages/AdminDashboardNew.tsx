import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Statistic,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Tag,
  Space,
  Divider,
  Tabs,
  Avatar,
  Badge,
  Typography,
  Progress,
  Alert,
  Switch,
  Upload,
  Image,
  Descriptions,
  Rate,
  Calendar,
  List,
  Dropdown,
  Menu,
  message,
  Spin,
  Empty,
  Drawer,
  Steps,
  Tooltip,
  Popconfirm
} from 'antd';
import {
  UserOutlined,
  ShopOutlined,
  DollarOutlined,
  CalendarOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  TeamOutlined,
  CrownOutlined,
  SafetyOutlined,
  BellOutlined,
  MessageOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined,
  CameraOutlined,
  FileImageOutlined,
  StarOutlined,
  MoneyCollectOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Step } = Steps;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller';
  verificationStatus: 'verified' | 'pending' | 'rejected';
  joinDate: string;
  avatar?: string;
  phone?: string;
  country?: string;
  totalPurchases?: number;
  totalSales?: number;
  rating?: number;
  documentsSubmitted?: string[];
  lastLogin?: string;
}

interface Meeting {
  id: string;
  buyerName: string;
  sellerName: string;
  gemName: string;
  date: string;
  time: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  type: 'verification' | 'transaction';
  notes?: string;
  amount?: number;
}

interface Commission {
  id: string;
  transactionId: string;
  buyerName: string;
  sellerName: string;
  gemName: string;
  transactionAmount: number;
  commissionRate: number;
  commissionAmount: number;
  date: string;
  status: 'pending' | 'paid' | 'disputed';
}

interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  submittedBy: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
  startDate?: string;
  endDate?: string;
  cost?: number;
  views?: number;
  clicks?: number;
}

const AdminDashboardNew: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [meetingModalVisible, setMeetingModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [adModalVisible, setAdModalVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'buyer',
      verificationStatus: 'pending',
      joinDate: '2024-01-15',
      phone: '+1234567890',
      country: 'USA',
      totalPurchases: 5,
      rating: 4.5,
      documentsSubmitted: ['passport', 'selfie'],
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'seller',
      verificationStatus: 'verified',
      joinDate: '2024-01-10',
      phone: '+1234567891',
      country: 'UK',
      totalSales: 12,
      rating: 4.8,
      documentsSubmitted: ['driving_license', 'selfie'],
      lastLogin: '2024-01-21'
    }
  ]);

  const [meetings, setMeetings] = useState<Meeting[]>([
    {
      id: '1',
      buyerName: 'John Doe',
      sellerName: 'Jane Smith',
      gemName: 'Blue Sapphire',
      date: '2024-01-25',
      time: '14:00',
      location: 'Colombo Office',
      status: 'scheduled',
      type: 'verification',
      amount: 25000
    },
    {
      id: '2',
      buyerName: 'Mike Johnson',
      sellerName: 'Sarah Wilson',
      gemName: 'Ruby',
      date: '2024-01-26',
      time: '10:00',
      location: 'Kandy Office',
      status: 'pending',
      type: 'transaction',
      amount: 18000
    }
  ]);

  const [commissions, setCommissions] = useState<Commission[]>([
    {
      id: '1',
      transactionId: 'TXN001',
      buyerName: 'John Doe',
      sellerName: 'Jane Smith',
      gemName: 'Blue Sapphire',
      transactionAmount: 25000,
      commissionRate: 5,
      commissionAmount: 1250,
      date: '2024-01-20',
      status: 'paid'
    },
    {
      id: '2',
      transactionId: 'TXN002',
      buyerName: 'Mike Johnson',
      sellerName: 'Sarah Wilson',
      gemName: 'Ruby',
      transactionAmount: 18000,
      commissionRate: 5,
      commissionAmount: 900,
      date: '2024-01-21',
      status: 'pending'
    }
  ]);

  const [advertisements, setAdvertisements] = useState<Advertisement[]>([
    {
      id: '1',
      title: 'Premium Gemstone Collection',
      description: 'Discover our exclusive collection of certified gemstones',
      image: 'https://via.placeholder.com/400x200',
      submittedBy: 'GemCorp Ltd',
      submissionDate: '2024-01-15',
      status: 'pending',
      cost: 500,
      views: 0,
      clicks: 0
    },
    {
      id: '2',
      title: 'Ruby Sale Event',
      description: 'Special discounts on ruby gemstones this month',
      image: 'https://via.placeholder.com/400x200',
      submittedBy: 'Ruby Masters',
      submissionDate: '2024-01-12',
      status: 'approved',
      startDate: '2024-01-20',
      endDate: '2024-01-31',
      cost: 750,
      views: 1250,
      clicks: 85
    }
  ]);

  // Statistics calculations
  const totalUsers = users.length;
  const totalBuyers = users.filter(u => u.role === 'buyer').length;
  const totalSellers = users.filter(u => u.role === 'seller').length;
  const pendingVerifications = users.filter(u => u.verificationStatus === 'pending').length;
  const totalMeetings = meetings.length;
  const scheduledMeetings = meetings.filter(m => m.status === 'scheduled').length;
  const totalCommissions = commissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const pendingCommissions = commissions.filter(c => c.status === 'pending').length;
  const totalAds = advertisements.length;
  const pendingAds = advertisements.filter(a => a.status === 'pending').length;

  // User table columns
  const userColumns: ColumnsType<User> = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar size="large" icon={<UserOutlined />} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.email}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'seller' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'verificationStatus',
      key: 'verificationStatus',
      render: (status: string) => {
        const config = {
          verified: { color: 'success', icon: <CheckCircleOutlined /> },
          pending: { color: 'warning', icon: <ClockCircleOutlined /> },
          rejected: { color: 'error', icon: <CloseCircleOutlined /> }
        };
        return (
          <Tag color={config[status as keyof typeof config]?.color} icon={config[status as keyof typeof config]?.icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsVisible(true);
            }}
          >
            View
          </Button>
          {record.verificationStatus === 'pending' && (
            <>
              <Button 
                size="small" 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleUserVerification(record.id, 'verified')}
              >
                Approve
              </Button>
              <Button 
                size="small" 
                danger 
                icon={<CloseCircleOutlined />}
                onClick={() => handleUserVerification(record.id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Meeting table columns
  const meetingColumns: ColumnsType<Meeting> = [
    {
      title: 'Meeting Details',
      key: 'details',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.gemName}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            {record.buyerName} & {record.sellerName}
          </div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <div>
          <div>{dayjs(record.date).format('MMM DD, YYYY')}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <Tag color={type === 'verification' ? 'purple' : 'blue'}>
          {type.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          scheduled: { color: 'blue', icon: <CalendarOutlined /> },
          completed: { color: 'success', icon: <CheckCircleOutlined /> },
          cancelled: { color: 'error', icon: <CloseCircleOutlined /> },
          pending: { color: 'warning', icon: <ClockCircleOutlined /> }
        };
        return (
          <Tag color={config[status as keyof typeof config]?.color} icon={config[status as keyof typeof config]?.icon}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedMeeting(record);
              setMeetingModalVisible(true);
            }}
          >
            View
          </Button>
          {record.status === 'pending' && (
            <Button 
              size="small" 
              type="primary"
              onClick={() => handleMeetingApproval(record.id)}
            >
              Approve
            </Button>
          )}
        </Space>
      ),
    },
  ];

  // Commission table columns
  const commissionColumns: ColumnsType<Commission> = [
    {
      title: 'Transaction',
      key: 'transaction',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.transactionId}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.gemName}</div>
        </div>
      ),
    },
    {
      title: 'Parties',
      key: 'parties',
      render: (_, record) => (
        <div>
          <div>Buyer: {record.buyerName}</div>
          <div>Seller: {record.sellerName}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      key: 'amount',
      render: (_, record) => (
        <div>
          <div>${record.transactionAmount.toLocaleString()}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>
            Commission: ${record.commissionAmount.toLocaleString()} ({record.commissionRate}%)
          </div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          paid: { color: 'success' },
          pending: { color: 'warning' },
          disputed: { color: 'error' }
        };
        return (
          <Tag color={config[status as keyof typeof config]?.color}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  // Advertisement table columns
  const adColumns: ColumnsType<Advertisement> = [
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
          />
          <div>
            <div style={{ fontWeight: 500 }}>{record.title}</div>
            <div style={{ color: '#666', fontSize: '12px' }}>{record.submittedBy}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Submission Date',
      dataIndex: 'submissionDate',
      key: 'submissionDate',
      render: (date: string) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          approved: { color: 'success', icon: <CheckCircleOutlined /> },
          pending: { color: 'warning', icon: <ClockCircleOutlined /> },
          rejected: { color: 'error', icon: <CloseCircleOutlined /> }
        };
        return (
          <Tag color={config[status as keyof typeof config]?.color} icon={config[status as keyof typeof config]?.icon}>
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
            <div>Views: {record.views?.toLocaleString()}</div>
            <div>Clicks: {record.clicks?.toLocaleString()}</div>
          </div>
        ) : '-'
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedAd(record);
              setAdModalVisible(true);
            }}
          >
            View
          </Button>
          {record.status === 'pending' && (
            <>
              <Button 
                size="small" 
                type="primary" 
                icon={<CheckCircleOutlined />}
                onClick={() => handleAdApproval(record.id, 'approved')}
              >
                Approve
              </Button>
              <Button 
                size="small" 
                danger 
                icon={<CloseCircleOutlined />}
                onClick={() => handleAdApproval(record.id, 'rejected')}
              >
                Reject
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  // Event handlers
  const handleUserVerification = (userId: string, status: 'verified' | 'rejected') => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, verificationStatus: status } : user
    ));
    message.success(`User ${status} successfully`);
  };

  const handleMeetingApproval = (meetingId: string) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId ? { ...meeting, status: 'scheduled' as const } : meeting
    ));
    message.success('Meeting approved and scheduled');
  };

  const handleAdApproval = (adId: string, status: 'approved' | 'rejected') => {
    setAdvertisements(prev => prev.map(ad => 
      ad.id === adId ? { ...ad, status } : ad
    ));
    message.success(`Advertisement ${status} successfully`);
  };

  // Render overview tab
  const renderOverview = () => (
    <div>
      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <Progress percent={Math.round((totalUsers / 100) * 100)} size="small" showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Verifications"
              value={pendingVerifications}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <Text type="secondary">{Math.round((pendingVerifications / totalUsers) * 100)}% of total users</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Commissions"
              value={totalCommissions}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              precision={0}
              formatter={(value) => `$${value?.toLocaleString()}`}
            />
            <Text type="secondary">{pendingCommissions} pending</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Meetings"
              value={scheduledMeetings}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <Text type="secondary">{totalMeetings} total</Text>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent User Registrations" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={users.slice(0, 5)}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={user.name}
                    description={`${user.role} • Joined ${dayjs(user.joinDate).fromNow()}`}
                  />
                  <Tag color={user.verificationStatus === 'verified' ? 'success' : user.verificationStatus === 'pending' ? 'warning' : 'error'}>
                    {user.verificationStatus}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Upcoming Meetings" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={meetings.filter(m => m.status === 'scheduled').slice(0, 5)}
              renderItem={(meeting) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<CalendarOutlined />} />}
                    title={meeting.gemName}
                    description={`${meeting.buyerName} & ${meeting.sellerName} • ${dayjs(meeting.date).format('MMM DD')} at ${meeting.time}`}
                  />
                  <Tag color="blue">{meeting.type}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );

  // Render users tab
  const renderUsers = () => (
    <div>
      <Row style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <Space>
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: 300 }}
            />
            <Select
              placeholder="Filter by status"
              value={filterStatus}
              onChange={setFilterStatus}
              style={{ width: 150 }}
            >
              <Option value="all">All Status</Option>
              <Option value="verified">Verified</Option>
              <Option value="pending">Pending</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Space>
        </Col>
      </Row>
      <Table
        columns={userColumns}
        dataSource={users.filter(user => {
          const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               user.email.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesFilter = filterStatus === 'all' || user.verificationStatus === filterStatus;
          return matchesSearch && matchesFilter;
        })}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );

  // Render meetings tab
  const renderMeetings = () => (
    <div>
      <Row style={{ marginBottom: 16 }}>
        <Col flex="auto">
          <Button type="primary" icon={<PlusOutlined />} style={{ marginBottom: 16 }}>
            Schedule New Meeting
          </Button>
        </Col>
      </Row>
      <Table
        columns={meetingColumns}
        dataSource={meetings}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );

  // Render commissions tab
  const renderCommissions = () => (
    <div>
      <Table
        columns={commissionColumns}
        dataSource={commissions}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        summary={(pageData) => {
          const totalCommissionAmount = pageData.reduce((sum, commission) => sum + commission.commissionAmount, 0);
          return (
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <Text strong>Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text strong>${totalCommissionAmount.toLocaleString()}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3} />
              <Table.Summary.Cell index={4} />
            </Table.Summary.Row>
          );
        }}
      />
    </div>
  );

  // Render advertisements tab
  const renderAdvertisements = () => (
    <div>
      <Table
        columns={adColumns}
        dataSource={advertisements}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: 24 }}>
        <CrownOutlined style={{ marginRight: 8 }} />
        Admin Dashboard
      </Title>

      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        <TabPane tab={<span><BarChartOutlined />Overview</span>} key="overview">
          {renderOverview()}
        </TabPane>
        <TabPane tab={<span><TeamOutlined />Users ({totalUsers})</span>} key="users">
          {renderUsers()}
        </TabPane>
        <TabPane tab={<span><CalendarOutlined />Meetings ({totalMeetings})</span>} key="meetings">
          {renderMeetings()}
        </TabPane>
        <TabPane tab={<span><MoneyCollectOutlined />Commissions</span>} key="commissions">
          {renderCommissions()}
        </TabPane>
        <TabPane tab={<span><FileTextOutlined />Advertisements ({pendingAds})</span>} key="advertisements">
          {renderAdvertisements()}
        </TabPane>
      </Tabs>

      {/* User Details Modal */}
      <Modal
        title={<span><UserOutlined style={{ marginRight: 8 }} />User Details</span>}
        open={userDetailsVisible}
        onCancel={() => setUserDetailsVisible(false)}
        footer={null}
        width={600}
      >
        {selectedUser && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">{selectedUser.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedUser.email}</Descriptions.Item>
              <Descriptions.Item label="Role">
                <Tag color={selectedUser.role === 'seller' ? 'blue' : 'green'}>
                  {selectedUser.role.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Verification Status">
                <Tag color={selectedUser.verificationStatus === 'verified' ? 'success' : 
                           selectedUser.verificationStatus === 'pending' ? 'warning' : 'error'}>
                  {selectedUser.verificationStatus.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedUser.phone}</Descriptions.Item>
              <Descriptions.Item label="Country">{selectedUser.country}</Descriptions.Item>
              <Descriptions.Item label="Join Date">
                {dayjs(selectedUser.joinDate).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Last Login">
                {selectedUser.lastLogin ? dayjs(selectedUser.lastLogin).format('MMMM DD, YYYY HH:mm') : 'Never'}
              </Descriptions.Item>
              {selectedUser.rating && (
                <Descriptions.Item label="Rating">
                  <Rate disabled value={selectedUser.rating} />
                  <span style={{ marginLeft: 8 }}>({selectedUser.rating})</span>
                </Descriptions.Item>
              )}
            </Descriptions>
            
            {selectedUser.documentsSubmitted && selectedUser.documentsSubmitted.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <Title level={5}>Submitted Documents</Title>
                <Space wrap>
                  {selectedUser.documentsSubmitted.map((doc, index) => (
                    <Tag key={index} icon={<FileImageOutlined />}>
                      {doc.replace('_', ' ').toUpperCase()}
                    </Tag>
                  ))}
                </Space>
              </div>
            )}

            {selectedUser.verificationStatus === 'pending' && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Space>
                  <Button 
                    type="primary" 
                    icon={<CheckCircleOutlined />}
                    onClick={() => {
                      handleUserVerification(selectedUser.id, 'verified');
                      setUserDetailsVisible(false);
                    }}
                  >
                    Approve Verification
                  </Button>
                  <Button 
                    danger 
                    icon={<CloseCircleOutlined />}
                    onClick={() => {
                      handleUserVerification(selectedUser.id, 'rejected');
                      setUserDetailsVisible(false);
                    }}
                  >
                    Reject Verification
                  </Button>
                </Space>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Meeting Details Modal */}
      <Modal
        title={<span><CalendarOutlined style={{ marginRight: 8 }} />Meeting Details</span>}
        open={meetingModalVisible}
        onCancel={() => setMeetingModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedMeeting && (
          <div>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Gem">{selectedMeeting.gemName}</Descriptions.Item>
              <Descriptions.Item label="Buyer">{selectedMeeting.buyerName}</Descriptions.Item>
              <Descriptions.Item label="Seller">{selectedMeeting.sellerName}</Descriptions.Item>
              <Descriptions.Item label="Date">
                {dayjs(selectedMeeting.date).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Time">{selectedMeeting.time}</Descriptions.Item>
              <Descriptions.Item label="Location">{selectedMeeting.location}</Descriptions.Item>
              <Descriptions.Item label="Type">
                <Tag color={selectedMeeting.type === 'verification' ? 'purple' : 'blue'}>
                  {selectedMeeting.type.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={selectedMeeting.status === 'scheduled' ? 'blue' : 
                           selectedMeeting.status === 'completed' ? 'success' : 
                           selectedMeeting.status === 'cancelled' ? 'error' : 'warning'}>
                  {selectedMeeting.status.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              {selectedMeeting.amount && (
                <Descriptions.Item label="Transaction Amount">
                  ${selectedMeeting.amount.toLocaleString()}
                </Descriptions.Item>
              )}
              {selectedMeeting.notes && (
                <Descriptions.Item label="Notes">{selectedMeeting.notes}</Descriptions.Item>
              )}
            </Descriptions>

            {selectedMeeting.status === 'pending' && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Button 
                  type="primary" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => {
                    handleMeetingApproval(selectedMeeting.id);
                    setMeetingModalVisible(false);
                  }}
                >
                  Approve Meeting
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Advertisement Details Modal */}
      <Modal
        title={<span><FileTextOutlined style={{ marginRight: 8 }} />Advertisement Details</span>}
        open={adModalVisible}
        onCancel={() => setAdModalVisible(false)}
        footer={null}
        width={700}
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
                  <Descriptions.Item label="Submitted By">{selectedAd.submittedBy}</Descriptions.Item>
                  <Descriptions.Item label="Submission Date">
                    {dayjs(selectedAd.submissionDate).format('MMMM DD, YYYY')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={selectedAd.status === 'approved' ? 'success' : 
                               selectedAd.status === 'pending' ? 'warning' : 'error'}>
                      {selectedAd.status.toUpperCase()}
                    </Tag>
                  </Descriptions.Item>
                  {selectedAd.cost && (
                    <Descriptions.Item label="Cost">${selectedAd.cost}</Descriptions.Item>
                  )}
                  {selectedAd.status === 'approved' && (
                    <>
                      <Descriptions.Item label="Views">{selectedAd.views?.toLocaleString()}</Descriptions.Item>
                      <Descriptions.Item label="Clicks">{selectedAd.clicks?.toLocaleString()}</Descriptions.Item>
                      <Descriptions.Item label="CTR">
                        {selectedAd.views && selectedAd.clicks ? 
                          `${((selectedAd.clicks / selectedAd.views) * 100).toFixed(2)}%` : 'N/A'}
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

            {selectedAd.status === 'pending' && (
              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Space>
                  <Button 
                    type="primary" 
                    icon={<CheckCircleOutlined />}
                    onClick={() => {
                      handleAdApproval(selectedAd.id, 'approved');
                      setAdModalVisible(false);
                    }}
                  >
                    Approve Advertisement
                  </Button>
                  <Button 
                    danger 
                    icon={<CloseCircleOutlined />}
                    onClick={() => {
                      handleAdApproval(selectedAd.id, 'rejected');
                      setAdModalVisible(false);
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
    </div>
  );
};

export default AdminDashboardNew;
