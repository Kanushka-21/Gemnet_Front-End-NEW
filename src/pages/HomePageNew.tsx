import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Button, 
  Card, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Statistic, 
  Tag,
  Carousel,
  Menu,
  Dropdown,
  Avatar
} from 'antd';
import {
  ShoppingCartOutlined,
  SafetyCertificateOutlined,
  GlobalOutlined,
  TrophyOutlined,
  UserOutlined,
  MenuOutlined,
  HeartOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

// Mock data for featured gems
const featuredGems = [
  {
    id: 1,
    name: 'Premium Blue Sapphire',
    image: 'https://via.placeholder.com/300x200?text=Blue+Sapphire',
    currentBid: 4500,
    minimumBid: 4650,
    category: 'Sapphire',
    certified: true,
    daysLeft: 5,
    bids: 8,
    views: 127,
    watchlists: 18
  },
  {
    id: 2,
    name: 'Natural Ruby',
    image: 'https://via.placeholder.com/300x200?text=Ruby',
    currentBid: 5800,
    minimumBid: 5950,
    category: 'Ruby',
    certified: true,
    daysLeft: 3,
    bids: 12,
    views: 156,
    watchlists: 23
  },
  {
    id: 3,
    name: 'Yellow Topaz',
    image: 'https://via.placeholder.com/300x200?text=Yellow+Topaz',
    currentBid: 2100,
    minimumBid: 2250,
    category: 'Topaz',
    certified: false,
    daysLeft: 7,
    bids: 4,
    views: 86,
    watchlists: 9
  },
  {
    id: 4,
    name: 'Green Emerald',
    image: 'https://via.placeholder.com/300x200?text=Emerald',
    currentBid: 6200,
    minimumBid: 6400,
    category: 'Emerald',
    certified: true,
    daysLeft: 2,
    bids: 15,
    views: 176,
    watchlists: 27
  }
];

// Blog posts about gems
const blogPosts = [
  {
    id: 1,
    title: "Understanding Sapphire Quality: The 4 C's",
    excerpt: "Learn about Color, Clarity, Cut, and Carat weight in sapphires...",
    image: "https://via.placeholder.com/400x250?text=Sapphire+Guide",
    category: "Education"
  },
  {
    id: 2,
    title: "Sri Lankan Ruby: The Pigeon Blood Phenomenon",
    excerpt: "Discover what makes Sri Lankan rubies so special and valuable...",
    image: "https://via.placeholder.com/400x250?text=Ruby+Guide",
    category: "Education"
  },
  {
    id: 3,
    title: "Investment Guide: Emeralds vs. Other Precious Stones",
    excerpt: "Compare investment potential of different gemstones...",
    image: "https://via.placeholder.com/400x250?text=Investment+Guide",
    category: "Investment"
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  
  // Sample stats with animation
  const [stats, setStats] = useState({
    gems: 0,
    users: 0,
    countries: 0,
    transactions: 0
  });

  useEffect(() => {
    // Animate stats counting up
    const interval = setInterval(() => {
      setStats(prev => ({
        gems: prev.gems < 500 ? prev.gems + 5 : 500,
        users: prev.users < 1200 ? prev.users + 12 : 1200,
        countries: prev.countries < 25 ? prev.countries + 1 : 25,
        transactions: prev.transactions < 3500 ? prev.transactions + 35 : 3500
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  const handleGemClick = (gemId: number) => {
    navigate(`/gem/${gemId}`);
  };

  const handleDashboardClick = () => {
    if (user?.role === 'buyer') {
      navigate('/buyer-dashboard');
    } else if (user?.role === 'seller') {
      navigate('/seller-dashboard');
    } else if (user?.role === 'admin') {
      navigate('/admin-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={handleDashboardClick}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="profile">
        Profile Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="min-h-screen">
      {/* Navigation Header */}
      <Header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <Row justify="space-between" align="middle" className="h-full">
            <Col>
              <Title level={3} className="mb-0 text-blue-600">
                GemNet
              </Title>
            </Col>
            <Col className="hidden md:block">
              <Space size="large">
                <Button type="text" onClick={() => navigate('/')}>
                  Home
                </Button>
                <Button type="text" onClick={() => navigate('/marketplace')}>
                  Marketplace
                </Button>
                {isAuthenticated && (
                  <Button type="text" onClick={handleDashboardClick}>
                    Dashboard
                  </Button>
                )}
              </Space>
            </Col>
            <Col>
              <Space>
                {isAuthenticated ? (
                  <Dropdown overlay={userMenu} placement="bottomRight">
                    <Button type="text" className="flex items-center">
                      <Avatar icon={<UserOutlined />} className="mr-2" />
                      {user?.firstName || 'User'}
                    </Button>
                  </Dropdown>
                ) : (
                  <>
                    <Button type="default" onClick={() => navigate('/login')}>
                      Login
                    </Button>
                    <Button type="primary" onClick={() => navigate('/register')}>
                      Register
                    </Button>
                  </>
                )}
              </Space>
            </Col>
          </Row>
        </div>
      </Header>

      <Content>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
          <div className="container mx-auto px-4">
            <Row gutter={[48, 48]} align="middle">
              <Col xs={24} lg={12}>
                <Title level={1} className="text-white mb-6">
                  Secure Gem Trading with Identity Verification
                </Title>
                <Paragraph className="text-xl mb-8 text-blue-100">
                  GemNet brings trust and transparency to online gem marketplace with 
                  advanced identity verification and secure transactions.
                </Paragraph>
                <Space size="large">
                  <Button 
                    size="large" 
                    type="default"
                    onClick={() => navigate('/marketplace')}
                  >
                    Explore Marketplace
                  </Button>
                  {!isAuthenticated && (
                    <Button 
                      size="large" 
                      type="primary" 
                      ghost
                      onClick={() => navigate('/register')}
                    >
                      Register Now
                    </Button>
                  )}
                </Space>
              </Col>
              <Col xs={24} lg={12}>
                <img 
                  src="https://via.placeholder.com/600x400?text=GemNet+Platform" 
                  alt="GemNet Platform" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </Col>
            </Row>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Row gutter={[32, 32]} justify="center">
              <Col xs={12} sm={6}>
                <Statistic
                  title="Premium Gems"
                  value={stats.gems}
                  suffix="+"
                  className="text-center"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Verified Users"
                  value={stats.users}
                  suffix="+"
                  className="text-center"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Countries"
                  value={stats.countries}
                  className="text-center"
                />
              </Col>
              <Col xs={12} sm={6}>
                <Statistic
                  title="Transaction Volume"
                  value={stats.transactions}
                  prefix="$"
                  suffix="K+"
                  className="text-center"
                />
              </Col>
            </Row>
          </div>
        </section>

        {/* Featured Gems Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2}>Featured Gems</Title>
              <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our curated selection of premium gems with verified authenticity 
                and exceptional quality.
              </Paragraph>
            </div>
            
            <Row gutter={[24, 24]}>
              {featuredGems.map((gem) => (
                <Col xs={24} sm={12} lg={6} key={gem.id}>
                  <Card
                    hoverable
                    cover={
                      <div className="relative">
                        <img 
                          alt={gem.name} 
                          src={gem.image}
                          className="h-48 w-full object-cover"
                        />
                        {gem.certified && (
                          <Tag 
                            color="green" 
                            className="absolute top-2 right-2"
                          >
                            Certified
                          </Tag>
                        )}
                        <Tag 
                          color="blue" 
                          className="absolute bottom-2 left-2"
                        >
                          {gem.category}
                        </Tag>
                      </div>
                    }
                    actions={[
                      <Space key="stats">
                        <EyeOutlined /> {gem.views}
                      </Space>,
                      <Space key="watchlist">
                        <HeartOutlined /> {gem.watchlists}
                      </Space>,
                      <span key="bids">{gem.bids} bids</span>
                    ]}
                    onClick={() => handleGemClick(gem.id)}
                  >
                    <Meta
                      title={gem.name}
                      description={
                        <div>
                          <div className="flex justify-between mb-2">
                            <span>Current Bid</span>
                            <strong className="text-blue-600">
                              ${gem.currentBid.toLocaleString()}
                            </strong>
                          </div>
                          <div className="flex justify-between">
                            <span>Min Next Bid</span>
                            <strong>${gem.minimumBid.toLocaleString()}</strong>
                          </div>
                          <div className="mt-2 text-sm text-gray-500">
                            {gem.daysLeft} days left
                          </div>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
            
            <div className="text-center mt-12">
              <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/marketplace')}
              >
                View All Gems
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2}>Why Choose GemNet</Title>
              <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform is designed to make gem trading secure, transparent 
                and accessible for everyone.
              </Paragraph>
            </div>
            
            <Row gutter={[32, 32]}>
              <Col xs={24} md={12} lg={8}>
                <Card className="text-center h-full">
                  <SafetyCertificateOutlined className="text-4xl text-blue-600 mb-4" />
                  <Title level={4}>Secure Identity Verification</Title>
                  <Paragraph>
                    Our multi-step verification process ensures all users are authenticated, 
                    bringing trust to online gem trading.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Card className="text-center h-full">
                  <TrophyOutlined className="text-4xl text-blue-600 mb-4" />
                  <Title level={4}>Gem Certification</Title>
                  <Paragraph>
                    All gems are certified and verified for authenticity, ensuring you 
                    only buy genuine products.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Card className="text-center h-full">
                  <ShoppingCartOutlined className="text-4xl text-blue-600 mb-4" />
                  <Title level={4}>Transparent Transactions</Title>
                  <Paragraph>
                    Every transaction is recorded and transparent, with secure payment 
                    processing and buyer protection.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Title level={2}>Gemstone Knowledge Hub</Title>
              <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
                Learn about different gemstones, their properties, and investment potential 
                from our expert guides.
              </Paragraph>
            </div>
            
            <Row gutter={[24, 24]}>
              {blogPosts.map((post) => (
                <Col xs={24} md={8} key={post.id}>
                  <Card
                    hoverable
                    cover={
                      <img 
                        alt={post.title} 
                        src={post.image}
                        className="h-48 w-full object-cover"
                      />
                    }
                  >
                    <Meta
                      title={post.title}
                      description={
                        <div>
                          <Tag color="blue" className="mb-2">
                            {post.category}
                          </Tag>
                          <Paragraph ellipsis={{ rows: 2 }}>
                            {post.excerpt}
                          </Paragraph>
                        </div>
                      }
                    />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <Title level={2} className="text-white mb-4">
              Ready to Start Trading Gems Securely?
            </Title>
            <Paragraph className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join our verified community of gem enthusiasts, collectors, and traders today. 
              Get started with secure identity verification.
            </Paragraph>
            {!isAuthenticated ? (
              <Space size="large">
                <Button 
                  size="large" 
                  type="default"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                </Button>
                <Button 
                  size="large" 
                  type="primary" 
                  ghost
                  onClick={() => navigate('/login')}
                >
                  Sign In
                </Button>
              </Space>
            ) : (
              <Button 
                size="large" 
                type="primary" 
                ghost
                onClick={() => navigate('/marketplace')}
              >
                Start Trading
              </Button>
            )}
          </div>
        </section>
      </Content>

      {/* Footer */}
      <Footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <Paragraph className="text-white mb-0">
            &copy; 2025 GemNet. All rights reserved. | Secure Identity Verification Platform
          </Paragraph>
        </div>
      </Footer>
    </Layout>
  );
};

export default HomePage;
