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
  List,
  Avatar,
  Rate,
  Modal,
  Input,
  Calendar,
  Badge,
  Tooltip,
  Progress,
  Divider,
  Alert
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartOutlined,
  TrophyOutlined,
  CalendarOutlined,
  EyeOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';
import type { ColumnsType } from 'antd/es/table';

const { Content, Sider } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

interface Bid {
  id: number;
  gemId: number;
  gemName: string;
  gemImage: string;
  currentBid: number;
  yourBid: number;
  status: 'highest' | 'outbid' | 'won' | 'lost';
  endTime: string;
  daysLeft: number;
}

interface Meeting {
  id: number;
  gemName: string;
  seller: string;
  date: string;
  location: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  amount: number;
}

interface Review {
  id: number;
  gemName: string;
  seller: string;
  rating: number;
  comment: string;
  date: string;
}

const BuyerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState('overview');
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Mock data
  const [stats, setStats] = useState({
    activeBids: 3,
    watchlistItems: 12,
    wonAuctions: 8,
    totalSpent: 45600
  });

  const [activeBids, setActiveBids] = useState<Bid[]>([
    {
      id: 1,
      gemId: 1,
      gemName: "Premium Blue Sapphire",
      gemImage: "https://via.placeholder.com/100?text=Sapphire",
      currentBid: 4500,
      yourBid: 4500,
      status: 'highest',
      endTime: "2025-08-15",
      daysLeft: 5
    },
    {
      id: 2,
      gemId: 2,
      gemName: "Natural Ruby",
      gemImage: "https://via.placeholder.com/100?text=Ruby",
      currentBid: 5800,
      yourBid: 5750,
      status: 'outbid',
      endTime: "2025-08-12",
      daysLeft: 2
    },
    {
      id: 3,
      gemId: 3,
      gemName: "Green Emerald",
      gemImage: "https://via.placeholder.com/100?text=Emerald",
      currentBid: 6200,
      yourBid: 6200,
      status: 'highest',
      endTime: "2025-08-14",
      daysLeft: 4
    }
  ]);

  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([
    {
      id: 1,
      gemName: "Yellow Topaz",
      seller: "Gem Paradise",
      date: "2025-06-20",
      location: "GemNet Office, Colombo",
      status: 'scheduled',
      amount: 2250
    },
    {
      id: 2,
      gemName: "Pink Sapphire",
      seller: "Royal Gems",
      date: "2025-06-22",
      location: "GemNet Office, Colombo",
      status: 'scheduled',
      amount: 3950
    }
  ]);

  const [recentReviews, setRecentReviews] = useState<Review[]>([
    {
      id: 1,
      gemName: "Blue Sapphire",
      seller: "GemStar Traders",
      rating: 5,
      comment: "Excellent quality gem and smooth transaction process.",
      date: "2025-06-10"
    }
  ]);

  const bidColumns: ColumnsType<Bid> = [
    {
      title: 'Gem',
      dataIndex: 'gemName',
      key: 'gemName',
      render: (text, record) => (
        <Space>
          <Avatar src={record.gemImage} size={40} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Current Bid',
      dataIndex: 'currentBid',
      key: 'currentBid',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      title: 'Your Bid',
      dataIndex: 'yourBid',
      key: 'yourBid',
      render: (value) => `$${value.toLocaleString()}`
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusConfig = {
          highest: { color: 'green', text: 'Highest Bid' },
          outbid: { color: 'red', text: 'Outbid' },
          won: { color: 'blue', text: 'Won' },
          lost: { color: 'default', text: 'Lost' }
        };
        const config = statusConfig[status];
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: 'Days Left',
      dataIndex: 'daysLeft',
      key: 'daysLeft',
      render: (days) => (
        <Space>
          <ClockCircleOutlined />
          {days}d
        </Space>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button size="small" onClick={() => navigate(`/gem/${record.gemId}`)}>
            View
          </Button>
          {record.status === 'outbid' && (
            <Button type="primary" size="small">
              Rebid
            </Button>
          )}
        </Space>
      )
    }
  ];

  const handleSubmitReview = () => {
    if (selectedMeeting) {
      const newReview: Review = {
        id: Date.now(),
        gemName: selectedMeeting.gemName,
        seller: selectedMeeting.seller,
        rating: reviewRating,
        comment: reviewComment,
        date: new Date().toISOString().split('T')[0]
      };
      
      setRecentReviews([newReview, ...recentReviews]);
      setReviewModalVisible(false);
      setSelectedMeeting(null);
      setReviewRating(5);
      setReviewComment('');
    }
  };

  const menuItems = [
    { key: 'overview', icon: <TrophyOutlined />, label: 'Overview' },
    { key: 'active-bids', icon: <DollarOutlined />, label: 'Active Bids' },
    { key: 'watchlist', icon: <HeartOutlined />, label: 'Watchlist' },
    { key: 'meetings', icon: <CalendarOutlined />, label: 'Meetings' },
    { key: 'reviews', icon: <StarOutlined />, label: 'Reviews' }
  ];

  const renderOverview = () => (
    <div>
      <Row gutter={[24, 24]} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Bids"
              value={stats.activeBids}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Watchlist Items"
              value={stats.watchlistItems}
              prefix={<HeartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Won Auctions"
              value={stats.wonAuctions}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Spent"
              value={stats.totalSpent}
              prefix="$"
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Bid Activity" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={activeBids.slice(0, 3)}
              renderItem={(bid) => (
                <List.Item
                  actions={[
                    <Tag color={bid.status === 'highest' ? 'green' : 'red'}>
                      {bid.status === 'highest' ? 'Leading' : 'Outbid'}
                    </Tag>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={bid.gemImage} />}
                    title={bid.gemName}
                    description={`Your bid: $${bid.yourBid.toLocaleString()} • ${bid.daysLeft} days left`}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Upcoming Meetings" extra={<Button type="link">View All</Button>}>
            <List
              dataSource={upcomingMeetings.slice(0, 3)}
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

  const renderActiveBids = () => (
    <div>
      <Card>
        <div className="mb-4">
          <Title level={4}>Your Active Bids</Title>
          <Text type="secondary">
            Track your current bids and their status. You'll be notified if you're outbid.
          </Text>
        </div>
        <Table
          columns={bidColumns}
          dataSource={activeBids}
          rowKey="id"
          pagination={false}
        />
      </Card>
      
      <Alert
        className="mt-4"
        message="Bidding Terms & Conditions"
        description="Remember: If you fail to complete purchases after winning bids twice, your account will be permanently restricted."
        type="warning"
        showIcon
      />
    </div>
  );

  const renderWatchlist = () => (
    <Card title="Your Watchlist" extra={<Button onClick={() => navigate('/marketplace')}>Browse More</Button>}>
      <Text type="secondary" className="block mb-4">
        Gems you're interested in. Get notified of price changes and auction endings.
      </Text>
      {/* Watchlist items would be rendered here */}
      <div className="text-center py-8">
        <Text type="secondary">Your watchlist is empty</Text>
        <br />
        <Button type="primary" className="mt-2" onClick={() => navigate('/marketplace')}>
          Explore Marketplace
        </Button>
      </div>
    </Card>
  );

  const renderMeetings = () => (
    <div>
      <Card title="Upcoming Meetings" className="mb-4">
        <List
          dataSource={upcomingMeetings}
          renderItem={(meeting) => (
            <List.Item
              actions={[
                <Button 
                  type="primary" 
                  size="small"
                  onClick={() => {
                    setSelectedMeeting(meeting);
                    setReviewModalVisible(true);
                  }}
                  disabled={meeting.status !== 'completed'}
                >
                  {meeting.status === 'completed' ? 'Leave Review' : 'Pending'}
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<CalendarOutlined />} />}
                title={
                  <Space>
                    {meeting.gemName}
                    <Tag color={meeting.status === 'scheduled' ? 'blue' : 'green'}>
                      {meeting.status}
                    </Tag>
                  </Space>
                }
                description={
                  <div>
                    <div>Seller: {meeting.seller}</div>
                    <div>Date: {meeting.date}</div>
                    <div>Location: {meeting.location}</div>
                    <div>Amount: ${meeting.amount.toLocaleString()}</div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>

      <Alert
        message="Meeting Guidelines"
        description="All transactions must be completed during scheduled meetings with admin oversight. Personal details are kept confidential between parties."
        type="info"
        showIcon
      />
    </div>
  );

  const renderReviews = () => (
    <Card title="Your Reviews">
      <List
        dataSource={recentReviews}
        renderItem={(review) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<StarOutlined />} />}
              title={
                <Space>
                  {review.gemName}
                  <Rate disabled defaultValue={review.rating} />
                </Space>
              }
              description={
                <div>
                  <div>Seller: {review.seller}</div>
                  <div>"{review.comment}"</div>
                  <div className="text-gray-500 text-sm">{review.date}</div>
                </div>
              }
            />
          </List.Item>
        )}
      />
      {recentReviews.length === 0 && (
        <div className="text-center py-8">
          <Text type="secondary">No reviews yet</Text>
        </div>
      )}
    </Card>
  );

  const renderContent = () => {
    switch (selectedMenu) {
      case 'overview':
        return renderOverview();
      case 'active-bids':
        return renderActiveBids();
      case 'watchlist':
        return renderWatchlist();
      case 'meetings':
        return renderMeetings();
      case 'reviews':
        return renderReviews();
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
              <Title level={2} className="mb-0">Buyer Dashboard</Title>
              <Text type="secondary">Welcome back, {user?.firstName}!</Text>
            </Col>
            <Col>
              <Space>
                <Button onClick={() => navigate('/marketplace')}>
                  Browse Marketplace
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
            <Avatar size={64} icon={<ShoppingCartOutlined />} className="mb-4" />
            <Title level={4} className="mb-0">{user?.firstName} {user?.lastName}</Title>
            <Text type="secondary">Verified Buyer</Text>
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

      {/* Review Modal */}
      <Modal
        title="Leave a Review"
        open={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setReviewModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmitReview}>
            Submit Review
          </Button>
        ]}
      >
        {selectedMeeting && (
          <div>
            <Title level={5}>{selectedMeeting.gemName}</Title>
            <Text>Seller: {selectedMeeting.seller}</Text>
            
            <div className="mt-4">
              <Text strong>Rating:</Text>
              <Rate 
                value={reviewRating} 
                onChange={setReviewRating}
                className="block mt-2"
              />
            </div>
            
            <div className="mt-4">
              <Text strong>Your Review:</Text>
              <TextArea
                rows={4}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Share your experience with this seller and transaction..."
                className="mt-2"
              />
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default BuyerDashboard;
