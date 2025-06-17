import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Input, 
  Select, 
  Button, 
  Tag, 
  Space, 
  Pagination,
  Typography,
  Slider,
  Checkbox,
  Drawer,
  Badge,
  Tooltip,
  Modal,
  InputNumber,
  Progress,
  message
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Meta } = Card;
const { Option } = Select;

// Helper function to calculate days until auction end
const calculateDaysRemaining = (endDateStr: string): number => {
  const endDate = new Date(endDateStr);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Bid Win Prediction Algorithm
const calculateWinPrediction = (gem: any, bidAmount: number): number => {
  const bidRatio = bidAmount / gem.currentBid;
  const popularityIndex = gem.views > 0 ? gem.watchlists / gem.views : 0;
  const daysRemaining = calculateDaysRemaining(gem.auctionEndsAt);
  const competitiveIndex = gem.bids / Math.max(1, daysRemaining);
  
  let winChance = 0;
  winChance += (bidRatio >= 1.2) ? 30 : (bidRatio >= 1.1) ? 25 : (bidRatio > 1.0) ? 20 : 10;
  const popScore = 25 * (1 - Math.min(popularityIndex * 2, 0.9));
  winChance += popScore;
  const timeScore = daysRemaining <= 1 ? 20 : daysRemaining <= 3 ? 15 : daysRemaining <= 7 ? 10 : 5;
  winChance += timeScore;
  const compScore = 25 * (1 - Math.min(competitiveIndex / 2, 0.9));
  winChance += compScore;
  
  return Math.min(Math.max(Math.round(winChance), 5), 95);
};

const getPredictionColor = (score: number): string => {
  if (score >= 80) return "#52c41a";
  if (score >= 60) return "#faad14";
  if (score >= 40) return "#fa8c16";
  if (score >= 20) return "#f5222d";
  return "#a8071a";
};

interface GemData {
  id: number;
  name: string;
  image: string;
  currentBid: number;
  minimumBid: number;
  category: string;
  certified: boolean;
  auctionEndsAt: string;
  views: number;
  watchlists: number;
  bids: number;
  description: string;
  carat: string;
  color: string;
  origin: string;
  cut: string;
  clarity: string;
  seller: string;
  sellerRating: number;
}

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [gems, setGems] = useState<GemData[]>([]);
  const [filteredGems, setFilteredGems] = useState<GemData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);
  const [bidModalVisible, setBidModalVisible] = useState(false);
  const [selectedGem, setSelectedGem] = useState<GemData | null>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [winPrediction, setWinPrediction] = useState(50);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [certifiedOnly, setCertifiedOnly] = useState(false);

  const categories = ['All', 'Sapphire', 'Ruby', 'Emerald', 'Topaz', 'Amethyst', 'Aquamarine'];

  // Mock data
  useEffect(() => {
    setTimeout(() => {
      const mockGems: GemData[] = [
        {
          id: 1,
          name: "Premium Blue Sapphire",
          image: "https://via.placeholder.com/300x200?text=Blue+Sapphire",
          currentBid: 4500,
          minimumBid: 4650,
          category: "Sapphire",
          certified: true,
          description: "A stunning blue sapphire with exceptional clarity and vibrant color.",
          auctionEndsAt: "2025-08-15",
          views: 127,
          watchlists: 18,
          bids: 8,
          carat: "3.5",
          color: "Blue",
          origin: "Ratnapura, Sri Lanka",
          cut: "Oval",
          clarity: "VS",
          seller: "GemStar Traders",
          sellerRating: 4.8
        },
        {
          id: 2,
          name: "Natural Ruby",
          image: "https://via.placeholder.com/300x200?text=Ruby",
          currentBid: 5800,
          minimumBid: 5950,
          category: "Ruby",
          certified: true,
          description: "Vibrant red ruby with minimal inclusions and brilliant luster.",
          auctionEndsAt: "2025-08-12",
          views: 156,
          watchlists: 23,
          bids: 12,
          carat: "2.8",
          color: "Red",
          origin: "Elahera, Sri Lanka",
          cut: "Cushion",
          clarity: "VVS",
          seller: "Ceylon Gems",
          sellerRating: 4.9
        },
        // Add more gems...
        {
          id: 3,
          name: "Yellow Topaz",
          image: "https://via.placeholder.com/300x200?text=Yellow+Topaz",
          currentBid: 2100,
          minimumBid: 2250,
          category: "Topaz",
          certified: false,
          description: "Golden yellow topaz with exceptional brilliance.",
          auctionEndsAt: "2025-08-18",
          views: 86,
          watchlists: 9,
          bids: 4,
          carat: "5.2",
          color: "Yellow",
          origin: "Balangoda, Sri Lanka",
          cut: "Round",
          clarity: "SI",
          seller: "Gem Paradise",
          sellerRating: 4.5
        },
        {
          id: 4,
          name: "Green Emerald",
          image: "https://via.placeholder.com/300x200?text=Emerald",
          currentBid: 6200,
          minimumBid: 6400,
          category: "Emerald",
          certified: true,
          description: "Rich green emerald with perfect cut and clarity.",
          auctionEndsAt: "2025-08-14",
          views: 176,
          watchlists: 27,
          bids: 15,
          carat: "1.75",
          color: "Green",
          origin: "Colombo, Sri Lanka",
          cut: "Emerald",
          clarity: "VVS",
          seller: "Royal Gems",
          sellerRating: 5.0
        }
      ];
      
      setGems(mockGems);
      setFilteredGems(mockGems);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = gems;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(gem =>
        gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gem.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(gem => gem.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    // Price range filter
    filtered = filtered.filter(gem => 
      gem.currentBid >= priceRange[0] && gem.currentBid <= priceRange[1]
    );

    // Certified only filter
    if (certifiedOnly) {
      filtered = filtered.filter(gem => gem.certified);
    }

    setFilteredGems(filtered);
    setCurrentPage(1);
  }, [gems, searchQuery, categoryFilter, priceRange, certifiedOnly]);

  const handleGemClick = (gem: GemData) => {
    navigate(`/gem/${gem.id}`);
  };

  const handleWatchlistToggle = (gemId: number) => {
    if (!isAuthenticated) {
      message.warning('Please login to add items to watchlist');
      return;
    }

    if (watchlist.includes(gemId)) {
      setWatchlist(watchlist.filter(id => id !== gemId));
      message.success('Removed from watchlist');
    } else {
      setWatchlist([...watchlist, gemId]);
      message.success('Added to watchlist');
    }
  };

  const handleBidClick = (gem: GemData) => {
    if (!isAuthenticated) {
      message.warning('Please login to place bids');
      navigate('/login');
      return;
    }

    if (user?.role !== 'buyer') {
      message.error('Only buyers can place bids');
      return;
    }

    setSelectedGem(gem);
    setBidAmount(gem.minimumBid);
    setWinPrediction(calculateWinPrediction(gem, gem.minimumBid));
    setBidModalVisible(true);
  };

  const handleBidAmountChange = (value: number | null) => {
    if (value && selectedGem) {
      setBidAmount(value);
      setWinPrediction(calculateWinPrediction(selectedGem, value));
    }
  };

  const handlePlaceBid = () => {
    if (selectedGem && bidAmount >= selectedGem.minimumBid) {
      message.success(`Bid of $${bidAmount.toLocaleString()} placed successfully!`);
      setBidModalVisible(false);
      // Update gem data with new bid
      const updatedGems = gems.map(gem => 
        gem.id === selectedGem.id 
          ? { ...gem, currentBid: bidAmount, bids: gem.bids + 1 }
          : gem
      );
      setGems(updatedGems);
    }
  };

  const paginatedGems = filteredGems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const filterDrawer = (
    <Drawer
      title="Filter Gems"
      placement="left"
      onClose={() => setFilterDrawerVisible(false)}
      open={filterDrawerVisible}
      width={320}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Category Filter */}
        <div>
          <Text strong>Category</Text>
          <Select
            style={{ width: '100%', marginTop: 8 }}
            value={categoryFilter}
            onChange={setCategoryFilter}
          >
            <Option value="all">All Categories</Option>
            {categories.slice(1).map(category => (
              <Option key={category} value={category.toLowerCase()}>
                {category}
              </Option>
            ))}
          </Select>
        </div>

        {/* Price Range */}
        <div>
          <Text strong>Price Range ($)</Text>
          <Slider
            range
            min={0}
            max={50000}
            step={500}
            value={priceRange}
            onChange={setPriceRange}
            style={{ marginTop: 16 }}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Certified Only */}
        <div>
          <Checkbox
            checked={certifiedOnly}
            onChange={(e) => setCertifiedOnly(e.target.checked)}
          >
            Certified gems only
          </Checkbox>
        </div>
      </Space>
    </Drawer>
  );

  const bidModal = (
    <Modal
      title={`Place Bid - ${selectedGem?.name}`}
      open={bidModalVisible}
      onCancel={() => setBidModalVisible(false)}
      footer={[
        <Button key="cancel" onClick={() => setBidModalVisible(false)}>
          Cancel
        </Button>,
        <Button 
          key="bid" 
          type="primary" 
          onClick={handlePlaceBid}
          disabled={!bidAmount || bidAmount < (selectedGem?.minimumBid || 0)}
        >
          Place Bid
        </Button>
      ]}
    >
      {selectedGem && (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Text>Current Bid: <strong>${selectedGem.currentBid.toLocaleString()}</strong></Text>
            <br />
            <Text>Minimum Bid: <strong>${selectedGem.minimumBid.toLocaleString()}</strong></Text>
          </div>
          
          <div>
            <Text strong>Your Bid Amount</Text>
            <InputNumber
              style={{ width: '100%', marginTop: 8 }}
              min={selectedGem.minimumBid}
              max={selectedGem.currentBid * 5}
              value={bidAmount}
              onChange={handleBidAmountChange}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value!.replace(/\$\s?|(,*)/g, '') as any}
            />
          </div>

          <div>
            <Text strong>Win Prediction</Text>
            <div style={{ marginTop: 8 }}>
              <Progress
                percent={winPrediction}
                strokeColor={getPredictionColor(winPrediction)}
                format={() => `${winPrediction}%`}
              />
              <Text type="secondary" style={{ fontSize: '12px', marginTop: 4, display: 'block' }}>
                {winPrediction >= 80 ? "Excellent chance!" : 
                 winPrediction >= 60 ? "Good chance" : 
                 winPrediction >= 40 ? "Moderate chance" : 
                 "Low chance"}
              </Text>
            </div>
          </div>
        </Space>
      )}
    </Modal>
  );

  return (
    <Layout className="min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="container mx-auto">
          <Row justify="space-between" align="middle">
            <Col>
              <Title level={2} className="mb-0">Marketplace</Title>
              <Text type="secondary">{filteredGems.length} gems available</Text>
            </Col>
            <Col>
              <Button onClick={() => navigate('/')}>
                Back to Home
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      <Content className="container mx-auto p-4">
        {/* Search and Filter Bar */}
        <Card className="mb-6">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={12}>
              <Input
                size="large"
                placeholder="Search gems..."
                prefix={<SearchOutlined />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col xs={24} md={8}>
              <Select
                size="large"
                style={{ width: '100%' }}
                placeholder="Select category"
                value={categoryFilter}
                onChange={setCategoryFilter}
              >
                <Option value="all">All Categories</Option>
                {categories.slice(1).map(category => (
                  <Option key={category} value={category.toLowerCase()}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={4}>
              <Button
                size="large"
                icon={<FilterOutlined />}
                onClick={() => setFilterDrawerVisible(true)}
                style={{ width: '100%' }}
              >
                Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Gems Grid */}
        <Row gutter={[24, 24]}>
          {paginatedGems.map((gem) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={gem.id}>
              <Card
                hoverable
                loading={loading}
                cover={
                  <div className="relative">
                    <img
                      alt={gem.name}
                      src={gem.image}
                      className="h-48 w-full object-cover"
                      onClick={() => handleGemClick(gem)}
                    />
                    {gem.certified && (
                      <Tag
                        color="green"
                        icon={<SafetyCertificateOutlined />}
                        className="absolute top-2 right-2"
                      >
                        Certified
                      </Tag>
                    )}
                    <Tag color="blue" className="absolute bottom-2 left-2">
                      {gem.category}
                    </Tag>
                    <Button
                      type="text"
                      icon={
                        watchlist.includes(gem.id) ? (
                          <HeartFilled style={{ color: '#f5222d' }} />
                        ) : (
                          <HeartOutlined />
                        )
                      }
                      className="absolute top-2 left-2 bg-white shadow-sm"
                      onClick={() => handleWatchlistToggle(gem.id)}
                    />
                  </div>
                }
                actions={[
                  <Tooltip title="Views">
                    <Space>
                      <EyeOutlined />
                      {gem.views}
                    </Space>
                  </Tooltip>,
                  <Tooltip title="Days left">
                    <Space>
                      <ClockCircleOutlined />
                      {calculateDaysRemaining(gem.auctionEndsAt)}d
                    </Space>
                  </Tooltip>,
                  <Button
                    type="primary"
                    size="small"
                    icon={<DollarOutlined />}
                    onClick={() => handleBidClick(gem)}
                  >
                    Bid
                  </Button>
                ]}
              >
                <Meta
                  title={
                    <Tooltip title={gem.name}>
                      <div className="truncate">{gem.name}</div>
                    </Tooltip>
                  }
                  description={
                    <Space direction="vertical" size="small" style={{ width: '100%' }}>
                      <div className="flex justify-between">
                        <Text type="secondary">Current Bid</Text>
                        <Text strong className="text-blue-600">
                          ${gem.currentBid.toLocaleString()}
                        </Text>
                      </div>
                      <div className="flex justify-between">
                        <Text type="secondary">Min Next Bid</Text>
                        <Text strong>
                          ${gem.minimumBid.toLocaleString()}
                        </Text>
                      </div>
                      <div className="flex justify-between text-sm">
                        <Badge count={gem.bids} showZero>
                          <Text type="secondary">Bids</Text>
                        </Badge>
                        <Text type="secondary">{gem.carat} ct</Text>
                      </div>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        {filteredGems.length > pageSize && (
          <div className="text-center mt-8">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredGems.length}
              onChange={setCurrentPage}
              showSizeChanger={false}
              showQuickJumper
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} gems`
              }
            />
          </div>
        )}

        {/* No results */}
        {filteredGems.length === 0 && !loading && (
          <div className="text-center py-12">
            <Title level={4} type="secondary">No gems found</Title>
            <Paragraph type="secondary">
              Try adjusting your search criteria or filters
            </Paragraph>
          </div>
        )}
      </Content>

      {filterDrawer}
      {bidModal}
    </Layout>
  );
};

export default MarketplacePage;
