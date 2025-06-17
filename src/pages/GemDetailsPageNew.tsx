import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Space,
  Tag,
  Divider,
  Modal,
  Form,
  InputNumber,
  Input,
  Tabs,
  Avatar,
  Rate,
  List,
  Progress,
  Statistic,
  Timeline,
  Badge,
  Image,
  Descriptions,
  Alert,
  message,
  Tooltip,
  Carousel,
  Steps,
  Empty,
  Comment,
  Breadcrumb
} from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TrophyOutlined,
  SafetyOutlined,
  FireOutlined,
  GiftOutlined,
  StarOutlined,
  CrownOutlined,
  ThunderboltOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MessageOutlined,
  DollarOutlined,
  BarChartOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;

interface Gem {
  id: string;
  name: string;
  category: string;
  price: number;
  currentBid: number;
  highestBid: number;
  minimumBid: number;
  images: string[];
  description: string;
  specifications: {
    carat: number;
    clarity: string;
    color: string;
    cut: string;
    origin: string;
    treatment: string;
    certification: string;
    certificateNumber: string;
  };
  seller: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    totalSales: number;
    responseTime: string;
    verificationStatus: 'verified' | 'pending';
    location: string;
    joinDate: string;
  };
  auction: {
    startDate: string;
    endDate: string;
    totalBids: number;
    watchers: number;
    views: number;
    status: 'active' | 'ended' | 'upcoming';
  };
  features: string[];
  condition: 'new' | 'excellent' | 'good' | 'fair';
  shipping: {
    methods: string[];
    cost: number;
    estimatedDays: string;
  };
}

interface Bid {
  id: string;
  bidderId: string;
  bidderName: string;
  bidderAvatar?: string;
  amount: number;
  timestamp: string;
  isWinning: boolean;
}

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const GemDetailsPageNew: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [gem, setGem] = useState<Gem | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [contactModalVisible, setContactModalVisible] = useState(false);
  const [isWatching, setIsWatching] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [form] = Form.useForm();
  const [contactForm] = Form.useForm();

  // Mock data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setGem({
        id: id || '1',
        name: 'Ceylon Blue Sapphire',
        category: 'Sapphire',
        price: 25000,
        currentBid: 23500,
        highestBid: 23500,
        minimumBid: 24000,
        images: [
          'https://via.placeholder.com/600x400/4169E1/FFFFFF?text=Ceylon+Blue+Sapphire+1',
          'https://via.placeholder.com/600x400/1E90FF/FFFFFF?text=Ceylon+Blue+Sapphire+2',
          'https://via.placeholder.com/600x400/0000CD/FFFFFF?text=Ceylon+Blue+Sapphire+3',
          'https://via.placeholder.com/600x400/191970/FFFFFF?text=Ceylon+Blue+Sapphire+4'
        ],
        description: 'Exceptional Ceylon Blue Sapphire with magnificent cornflower blue color. This natural, unheated gemstone displays excellent clarity and brilliance. Perfect for fine jewelry or investment collection. Certified by GIA with detailed grading report.',
        specifications: {
          carat: 5.24,
          clarity: 'VVS1',
          color: 'Cornflower Blue',
          cut: 'Oval',
          origin: 'Sri Lanka (Ceylon)',
          treatment: 'Unheated',
          certification: 'GIA',
          certificateNumber: 'GIA-2234567890'
        },
        seller: {
          id: 'seller1',
          name: 'Gemstone Experts Ltd',
          avatar: 'https://via.placeholder.com/64x64/1890FF/FFFFFF?text=GE',
          rating: 4.9,
          totalSales: 147,
          responseTime: 'Within 2 hours',
          verificationStatus: 'verified',
          location: 'Colombo, Sri Lanka',
          joinDate: '2019-03-15'
        },
        auction: {
          startDate: '2024-01-20T10:00:00Z',
          endDate: '2024-01-27T18:00:00Z',
          totalBids: 24,
          watchers: 67,
          views: 1543,
          status: 'active'
        },
        features: [
          'Natural & Unheated',
          'GIA Certified',
          'Investment Grade',
          'Eye Clean',
          'Exceptional Color',
          'Sri Lankan Origin'
        ],
        condition: 'new',
        shipping: {
          methods: ['Express Shipping', 'Standard Shipping', 'Pickup Available'],
          cost: 50,
          estimatedDays: '3-5'
        }
      });

      setBids([
        {
          id: '1',
          bidderId: 'bidder1',
          bidderName: 'John D.',
          amount: 23500,
          timestamp: '2024-01-25T14:30:00Z',
          isWinning: true
        },
        {
          id: '2',
          bidderId: 'bidder2',
          bidderName: 'Sarah M.',
          amount: 23000,
          timestamp: '2024-01-25T12:15:00Z',
          isWinning: false
        },
        {
          id: '3',
          bidderId: 'bidder3',
          bidderName: 'Mike K.',
          amount: 22500,
          timestamp: '2024-01-25T10:45:00Z',
          isWinning: false
        }
      ]);

      setReviews([
        {
          id: '1',
          reviewerId: 'reviewer1',
          reviewerName: 'Emily Chen',
          rating: 5,
          comment: 'Outstanding quality sapphire! Exactly as described and beautifully packaged. Highly recommend this seller.',
          date: '2024-01-15',
          verified: true
        },
        {
          id: '2',
          reviewerId: 'reviewer2',
          reviewerName: 'David Wilson',
          rating: 5,
          comment: 'Perfect transaction. The gemstone is even more beautiful in person. Great communication throughout.',
          date: '2024-01-10',
          verified: true
        }
      ]);

      setLoading(false);
    }, 1000);
  }, [id]);

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!gem) return null;
    
    const now = dayjs();
    const endTime = dayjs(gem.auction.endDate);
    const diff = endTime.diff(now);
    
    if (diff <= 0) {
      return { ended: true };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { days, hours, minutes, ended: false };
  };

  const timeRemaining = getTimeRemaining();

  // Calculate win prediction
  const calculateWinPrediction = (bidAmount: number) => {
    if (!gem) return 0;
    
    const bidRatio = bidAmount / gem.highestBid;
    const competitionFactor = Math.max(0, 1 - (gem.auction.totalBids / 50));
    const timeFactor = timeRemaining?.ended ? 0 : 
      (timeRemaining?.days || 0) > 2 ? 0.7 : 
      (timeRemaining?.days || 0) > 1 ? 0.8 : 0.9;
    
    let prediction = Math.min(95, (bidRatio * 60) + (competitionFactor * 20) + (timeFactor * 15));
    return Math.max(5, prediction);
  };

  // Handle bid submission
  const handleBidSubmit = async (values: { amount: number; maxBid?: number }) => {
    if (!gem) return;
    
    if (values.amount <= gem.currentBid) {
      message.error('Your bid must be higher than the current bid');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newBid: Bid = {
        id: Date.now().toString(),
        bidderId: 'current-user',
        bidderName: 'You',
        amount: values.amount,
        timestamp: new Date().toISOString(),
        isWinning: true
      };
      
      setBids(prev => {
        const updated = prev.map(bid => ({ ...bid, isWinning: false }));
        return [newBid, ...updated];
      });
      
      setGem(prev => prev ? {
        ...prev,
        currentBid: values.amount,
        highestBid: values.amount,
        auction: {
          ...prev.auction,
          totalBids: prev.auction.totalBids + 1
        }
      } : null);
      
      setBidModalVisible(false);
      form.resetFields();
      message.success('Bid placed successfully!');
      setLoading(false);
    }, 1000);
  };

  // Handle contact seller
  const handleContactSeller = async (values: { message: string }) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setContactModalVisible(false);
      contactForm.resetFields();
      message.success('Message sent to seller successfully!');
      setLoading(false);
    }, 1000);
  };

  // Toggle watchlist
  const toggleWatchlist = () => {
    setIsWatching(!isWatching);
    message.success(isWatching ? 'Removed from watchlist' : 'Added to watchlist');
  };

  if (loading && !gem) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ display: 'inline-block' }}
        >
          <TrophyOutlined style={{ fontSize: 48, color: '#1890ff' }} />
        </motion.div>
        <div style={{ marginTop: 16 }}>Loading gem details...</div>
      </div>
    );
  }

  if (!gem) {
    return (
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <Empty description="Gem not found" />
        <Button type="primary" onClick={() => navigate('/marketplace')}>
          Back to Marketplace
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Breadcrumb */}
      <Breadcrumb style={{ marginBottom: 24 }}>
        <Breadcrumb.Item>
          <HomeOutlined />
          <span style={{ marginLeft: 4 }}>Home</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/marketplace">Marketplace</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{gem.category}</Breadcrumb.Item>
        <Breadcrumb.Item>{gem.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[24, 24]}>
        {/* Left Column - Images and Gallery */}
        <Col xs={24} lg={14}>
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Image.PreviewGroup>
                <Carousel 
                  beforeChange={(current, next) => setSelectedImageIndex(next)}
                  dots={false}
                  style={{ borderRadius: 8, overflow: 'hidden' }}
                >
                  {gem.images.map((image, index) => (
                    <div key={index}>
                      <Image
                        src={image}
                        alt={`${gem.name} ${index + 1}`}
                        style={{ width: '100%', height: 400, objectFit: 'cover' }}
                      />
                    </div>
                  ))}
                </Carousel>
              </Image.PreviewGroup>
            </div>
            
            {/* Thumbnail Gallery */}
            <Row gutter={[8, 8]}>
              {gem.images.map((image, index) => (
                <Col span={6} key={index}>
                  <div 
                    style={{ 
                      border: selectedImageIndex === index ? '2px solid #1890ff' : '1px solid #d9d9d9',
                      borderRadius: 4,
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      style={{ width: '100%', height: 80, objectFit: 'cover' }}
                      preview={false}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Specifications Card */}
          <Card title="Specifications" style={{ marginTop: 24 }}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Carat Weight">{gem.specifications.carat} ct</Descriptions.Item>
              <Descriptions.Item label="Clarity">{gem.specifications.clarity}</Descriptions.Item>
              <Descriptions.Item label="Color">{gem.specifications.color}</Descriptions.Item>
              <Descriptions.Item label="Cut">{gem.specifications.cut}</Descriptions.Item>
              <Descriptions.Item label="Origin">{gem.specifications.origin}</Descriptions.Item>
              <Descriptions.Item label="Treatment">{gem.specifications.treatment}</Descriptions.Item>
              <Descriptions.Item label="Certification" span={2}>
                <Space>
                  <SafetyOutlined style={{ color: '#52c41a' }} />
                  {gem.specifications.certification}
                  <Text type="secondary">#{gem.specifications.certificateNumber}</Text>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {/* Description */}
          <Card title="Description" style={{ marginTop: 24 }}>
            <Paragraph>{gem.description}</Paragraph>
            
            <div style={{ marginTop: 16 }}>
              <Text strong>Features:</Text>
              <div style={{ marginTop: 8 }}>
                <Space wrap>
                  {gem.features.map((feature, index) => (
                    <Tag key={index} color="blue" icon={<CheckCircleOutlined />}>
                      {feature}
                    </Tag>
                  ))}
                </Space>
              </div>
            </div>
          </Card>
        </Col>

        {/* Right Column - Bidding and Details */}
        <Col xs={24} lg={10}>
          {/* Main Gem Info Card */}
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Title level={3} style={{ margin: 0 }}>{gem.name}</Title>
              <Text type="secondary">{gem.category} • {gem.specifications.carat} carat</Text>
            </div>

            {/* Auction Status */}
            {gem.auction.status === 'active' && timeRemaining && !timeRemaining.ended && (
              <Alert
                message={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>
                      <ClockCircleOutlined style={{ marginRight: 8 }} />
                      Time Remaining
                    </span>
                    <span style={{ fontWeight: 'bold' }}>
                      {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m
                    </span>
                  </div>
                }
                type="warning"
                showIcon={false}
                style={{ marginBottom: 16 }}
              />
            )}

            {/* Current Bid */}
            <div style={{ marginBottom: 24 }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic
                    title="Current Bid"
                    value={gem.currentBid}
                    prefix={<DollarOutlined />}
                    valueStyle={{ color: '#1890ff', fontSize: 24 }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title="Total Bids"
                    value={gem.auction.totalBids}
                    valueStyle={{ fontSize: 24 }}
                  />
                </Col>
              </Row>
            </div>

            {/* Action Buttons */}
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Button
                type="primary"
                size="large"
                block
                icon={<TrophyOutlined />}
                onClick={() => setBidModalVisible(true)}
                disabled={gem.auction.status !== 'active' || (timeRemaining?.ended)}
              >
                Place Bid
              </Button>
              
              <Row gutter={8}>
                <Col span={12}>
                  <Button
                    size="large"
                    block
                    icon={isWatching ? <HeartFilled /> : <HeartOutlined />}
                    onClick={toggleWatchlist}
                    style={{ 
                      color: isWatching ? '#ff4d4f' : undefined,
                      borderColor: isWatching ? '#ff4d4f' : undefined
                    }}
                  >
                    {isWatching ? 'Watching' : 'Watch'}
                  </Button>
                </Col>
                <Col span={12}>
                  <Button
                    size="large"
                    block
                    icon={<MessageOutlined />}
                    onClick={() => setContactModalVisible(true)}
                  >
                    Contact
                  </Button>
                </Col>
              </Row>
            </Space>

            <Divider />

            {/* Auction Stats */}
            <Row gutter={16} style={{ textAlign: 'center' }}>
              <Col span={8}>
                <div>
                  <EyeOutlined style={{ fontSize: 20, color: '#1890ff' }} />
                  <div style={{ marginTop: 4 }}>
                    <Text strong>{gem.auction.views}</Text>
                    <div style={{ fontSize: 12, color: '#666' }}>Views</div>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <HeartOutlined style={{ fontSize: 20, color: '#ff4d4f' }} />
                  <div style={{ marginTop: 4 }}>
                    <Text strong>{gem.auction.watchers}</Text>
                    <div style={{ fontSize: 12, color: '#666' }}>Watchers</div>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <TrophyOutlined style={{ fontSize: 20, color: '#52c41a' }} />
                  <div style={{ marginTop: 4 }}>
                    <Text strong>{gem.auction.totalBids}</Text>
                    <div style={{ fontSize: 12, color: '#666' }}>Bids</div>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Seller Info Card */}
          <Card title="Seller Information" style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
              <Avatar size={64} src={gem.seller.avatar} icon={<UserOutlined />} />
              <div style={{ marginLeft: 16, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text strong style={{ fontSize: 16 }}>{gem.seller.name}</Text>
                  {gem.seller.verificationStatus === 'verified' && (
                    <Badge
                      count={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </div>
                <Rate disabled value={gem.seller.rating} style={{ fontSize: 14 }} />
                <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                  {gem.seller.totalSales} sales • Joined {dayjs(gem.seller.joinDate).format('MMM YYYY')}
                </Text>
              </div>
            </div>

            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Location">{gem.seller.location}</Descriptions.Item>
              <Descriptions.Item label="Response Time">{gem.seller.responseTime}</Descriptions.Item>
            </Descriptions>

            <Button
              block
              style={{ marginTop: 16 }}
              icon={<MessageOutlined />}
              onClick={() => setContactModalVisible(true)}
            >
              Contact Seller
            </Button>
          </Card>

          {/* Shipping Info */}
          <Card title="Shipping Information" style={{ marginTop: 24 }}>
            <Descriptions size="small" column={1}>
              <Descriptions.Item label="Shipping Cost">${gem.shipping.cost}</Descriptions.Item>
              <Descriptions.Item label="Estimated Delivery">{gem.shipping.estimatedDays} business days</Descriptions.Item>
              <Descriptions.Item label="Methods">
                <Space wrap>
                  {gem.shipping.methods.map((method, index) => (
                    <Tag key={index}>{method}</Tag>
                  ))}
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Bottom Section - Tabs */}
      <Card style={{ marginTop: 24 }}>
        <Tabs defaultActiveKey="bids">
          <TabPane tab={`Bid History (${bids.length})`} key="bids">
            <List
              dataSource={bids}
              renderItem={(bid) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} src={bid.bidderAvatar} />}
                    title={
                      <Space>
                        {bid.bidderName}
                        {bid.isWinning && <Tag color="gold" icon={<CrownOutlined />}>Winning Bid</Tag>}
                      </Space>
                    }
                    description={dayjs(bid.timestamp).format('MMM DD, YYYY HH:mm')}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <Text strong style={{ fontSize: 18 }}>${bid.amount.toLocaleString()}</Text>
                  </div>
                </List.Item>
              )}
            />
          </TabPane>

          <TabPane tab={`Reviews (${reviews.length})`} key="reviews">
            <List
              dataSource={reviews}
              renderItem={(review) => (
                <Comment
                  author={
                    <Space>
                      {review.reviewerName}
                      {review.verified && <Tag color="blue" icon={<CheckCircleOutlined />}>Verified Purchase</Tag>}
                    </Space>
                  }
                  avatar={<Avatar icon={<UserOutlined />} src={review.reviewerAvatar} />}
                  content={<Paragraph>{review.comment}</Paragraph>}
                  datetime={dayjs(review.date).format('MMM DD, YYYY')}
                  actions={[
                    <Rate disabled value={review.rating} style={{ fontSize: 14 }} />
                  ]}
                />
              )}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Bid Modal */}
      <Modal
        title={<span><TrophyOutlined style={{ marginRight: 8 }} />Place Your Bid</span>}
        open={bidModalVisible}
        onCancel={() => setBidModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form form={form} onFinish={handleBidSubmit} layout="vertical">
          <Alert
            message={`Current highest bid: $${gem.currentBid.toLocaleString()}`}
            description={`Minimum bid: $${gem.minimumBid.toLocaleString()}`}
            type="info"
            style={{ marginBottom: 24 }}
          />

          <Form.Item
            name="amount"
            label="Your Bid Amount"
            rules={[
              { required: true, message: 'Please enter your bid amount' },
              { 
                validator: (_, value) => {
                  if (value <= gem.currentBid) {
                    return Promise.reject(new Error('Bid must be higher than current bid'));
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              size="large"
              prefix="$"
              min={gem.currentBid + 1}
              step={100}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(value) => {
                if (value) {
                  const prediction = calculateWinPrediction(value);
                  form.setFieldsValue({ prediction });
                }
              }}
            />
          </Form.Item>

          <Form.Item dependencies={['amount']} noStyle>
            {({ getFieldValue }) => {
              const amount = getFieldValue('amount');
              if (amount && amount > gem.currentBid) {
                const prediction = calculateWinPrediction(amount);
                return (
                  <div style={{ marginBottom: 24 }}>
                    <Text type="secondary">Win Prediction:</Text>
                    <Progress
                      percent={Math.round(prediction)}
                      strokeColor={{
                        '0%': '#ff4d4f',
                        '50%': '#faad14',
                        '100%': '#52c41a',
                      }}
                      format={(percent) => `${percent}% chance to win`}
                    />
                  </div>
                );
              }
              return null;
            }}
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setBidModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Place Bid
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Contact Seller Modal */}
      <Modal
        title={<span><MessageOutlined style={{ marginRight: 8 }} />Contact Seller</span>}
        open={contactModalVisible}
        onCancel={() => setContactModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form form={contactForm} onFinish={handleContactSeller} layout="vertical">
          <div style={{ marginBottom: 16 }}>
            <Space>
              <Avatar size={48} src={gem.seller.avatar} icon={<UserOutlined />} />
              <div>
                <Text strong>{gem.seller.name}</Text>
                <div>
                  <Text type="secondary">Usually responds {gem.seller.responseTime.toLowerCase()}</Text>
                </div>
              </div>
            </Space>
          </div>

          <Form.Item
            name="message"
            label="Your Message"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Ask about the gemstone, request additional photos, or discuss terms..."
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Button onClick={() => setContactModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Message
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default GemDetailsPageNew;
