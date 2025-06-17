import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

// Components
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

// Utilities
import { getPlaceholderImage, handleImageError } from '@/utils/placeholderImages';

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
  // Base factors
  const bidRatio = bidAmount / gem.currentBid;
  const popularityIndex = gem.views > 0 ? gem.watchlists / gem.views : 0;
  const daysRemaining = calculateDaysRemaining(gem.auctionEndsAt);
  const competitiveIndex = gem.bids / Math.max(1, daysRemaining);
  
  // Calculate weighted score
  let winChance = 0;
  
  // Bid ratio - higher bid gives better chance (30% weight)
  winChance += (bidRatio >= 1.2) ? 30 : (bidRatio >= 1.1) ? 25 : (bidRatio > 1.0) ? 20 : 10;
  
  // Popularity - more watchlists compared to views means more competition (25% weight)
  const popScore = 25 * (1 - Math.min(popularityIndex * 2, 0.9)); // Inverse - lower is better
  winChance += popScore;
  
  // Timing - less time means less competition could appear (20% weight)
  const timeScore = daysRemaining <= 1 ? 20 : daysRemaining <= 3 ? 15 : daysRemaining <= 7 ? 10 : 5;
  winChance += timeScore;
  
  // Competition level - more bids per remaining day means more competition (25% weight)
  const compScore = 25 * (1 - Math.min(competitiveIndex / 2, 0.9)); // Inverse - lower is better
  winChance += compScore;
  
  // Adjust final score
  const finalScore = Math.min(Math.max(Math.round(winChance), 5), 95);
  return finalScore;
};

// Generate prediction message based on score
const getPredictionMessage = (score: number): string => {
  if (score >= 80) {
    return "Excellent chance of winning! Your bid is competitive.";
  } else if (score >= 60) {
    return "Good chance of winning. Consider increasing your bid for a better chance.";
  } else if (score >= 40) {
    return "Moderate chance of winning. This item is getting attention.";
  } else if (score >= 20) {
    return "Low chance of winning. Consider increasing your bid significantly.";
  } else {
    return "Very low chance of winning. This item is highly competitive.";
  }
};

// Generate prediction color based on score
const getPredictionColor = (score: number): string => {
  if (score >= 80) {
    return "#10b981"; // green-500
  } else if (score >= 60) {
    return "#f59e0b"; // amber-500
  } else if (score >= 40) {
    return "#f97316"; // orange-500
  } else if (score >= 20) {
    return "#ef4444"; // red-500
  } else {
    return "#b91c1c"; // red-700
  }
};

interface GemCardProps {
  gem: any;
  onViewDetails: (gem: any) => void;
  onToggleWatchlist: (gem: any) => void;
  inWatchlist: boolean;
}

const GemCard: React.FC<GemCardProps> = ({ gem, onViewDetails, onToggleWatchlist, inWatchlist }) => {
  const daysRemaining = calculateDaysRemaining(gem.auctionEndsAt);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-secondary-200"
    >
      {/* Image */}
      <div className="relative h-48 bg-secondary-100">        <img 
          src={gem.image} 
          alt={gem.name}
          className="w-full h-full object-cover" 
          onError={(e) => handleImageError(e, 'gem', '300x200')}
        />
        {gem.certified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full">
            Certified
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 text-xs py-1 px-2 rounded-full">
          {gem.category}
        </div>
        <button 
          onClick={() => onToggleWatchlist(gem)}
          className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-sm hover:bg-secondary-100 transition-colors"
        >
          {inWatchlist ? (
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          )}
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">{gem.name}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-secondary-600">Current Bid</p>
            <p className="text-lg font-bold text-primary-600">${gem.currentBid.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-secondary-600">Min Next Bid</p>
            <p className="text-md font-semibold text-secondary-800">${gem.minimumBid.toLocaleString()}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-secondary-500 mb-4">
          <span>{daysRemaining} days left</span>
          <span>{gem.bids} bids</span>
        </div>
        
        <Button 
          onClick={() => onViewDetails(gem)}
          variant="primary"
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

interface FilterBarProps {
  categories: string[];
  priceRanges: { label: string; value: string }[];
  certificationOptions: { label: string; value: string }[];
  filters: {
    category: string;
    priceRange: string;
    certification: string;
  };
  onFilterChange: (type: string, value: string) => void;
  onSearch: (query: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  categories, 
  priceRanges, 
  certificationOptions, 
  filters, 
  onFilterChange, 
  onSearch 
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-secondary-200 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search gems..."
            className="w-full pl-10 pr-4 py-2 border border-secondary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch(searchQuery)}
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400">
            <Search size={16} />
          </div>
        </div>
        
        {/* Filter Toggle Button (visible on mobile) */}
        <div className="md:hidden">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="w-full flex justify-center items-center"
          >
            <Filter size={16} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        
        {/* Filter Options */}
        <div className={`flex flex-col md:flex-row gap-4 ${!showFilters && 'hidden md:flex'}`}>
          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <select
              className="w-full border border-secondary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.category}
              onChange={(e) => onFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Price Range Filter */}
          <div className="w-full md:w-auto">
            <select
              className="w-full border border-secondary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
            >
              <option value="all">Any Price</option>
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Certification Filter */}
          <div className="w-full md:w-auto">
            <select
              className="w-full border border-secondary-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filters.certification}
              onChange={(e) => onFilterChange('certification', e.target.value)}
            >
              {certificationOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <Button
            onClick={() => onSearch(searchQuery)}
            variant="primary"
            className="flex items-center justify-center"
          >
            <Search size={16} className="mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

const MarketplacePage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [gems, setGems] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: "all",
    certification: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGem, setSelectedGem] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [watchlist, setWatchlist] = useState<number[]>([]);
  const [winPrediction, setWinPrediction] = useState(50);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  const pageSize = 8;

  // Categories for filtering
  const categories = ["Sapphire", "Ruby", "Emerald", "Topaz", "Amethyst", "Aquamarine"];
  
  // Price ranges for filtering
  const priceRanges = [
    { label: "Under $1,000", value: "0-1000" },
    { label: "$1,000 - $5,000", value: "1000-5000" },
    { label: "$5,000 - $10,000", value: "5000-10000" },
    { label: "$10,000 - $25,000", value: "10000-25000" },
    { label: "Over $25,000", value: "25000-9999999" },
  ];
  
  // Certification options
  const certificationOptions = [
    { label: "All Gems", value: "all" },
    { label: "Certified Only", value: "certified" },
  ];

  // Mock data - replace with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockGems = [        {
          id: 1,
          name: "Premium Blue Sapphire",
          image: getPlaceholderImage('blue sapphire'),
          currentBid: 4500,
          minimumBid: 4650,
          carat: "3.5",
          category: "Sapphire",
          certified: true,
          description: "A stunning blue sapphire with exceptional clarity and vibrant color. This gem has been certified by the Gemological Institute of Sri Lanka.",
          auctionEndsAt: "2025-08-15",
          views: 127,
          watchlists: 18,
          bids: 8,
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
          image: getPlaceholderImage('ruby'),
          currentBid: 5800,
          minimumBid: 5950,
          carat: "2.8",
          category: "Ruby",
          certified: true,
          description: "Vibrant red ruby with minimal inclusions and brilliant luster. Perfect for premium jewelry creation.",
          auctionEndsAt: "2025-08-12",
          views: 156,
          watchlists: 23,
          bids: 12,
          color: "Red",
          origin: "Elahera, Sri Lanka",
          cut: "Cushion",
          clarity: "VVS",
          seller: "Ceylon Gems",
          sellerRating: 4.9
        },
        {
          id: 3,
          name: "Yellow Topaz",
          image: getPlaceholderImage('yellow topaz'),
          currentBid: 2100,
          minimumBid: 2250,
          carat: "5.2",
          category: "Topaz",
          certified: false,
          description: "Golden yellow topaz with exceptional brilliance and excellent clarity. A rare find in this size.",
          auctionEndsAt: "2025-08-18",
          views: 86,
          watchlists: 9,
          bids: 4,
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
          image: getPlaceholderImage('emerald'),
          currentBid: 6200,
          minimumBid: 6400,
          carat: "1.75",
          category: "Emerald",
          certified: true,
          description: "Rich green emerald with perfect cut and clarity. Sourced from the famous mines of Sri Lanka.",
          auctionEndsAt: "2025-08-14",
          views: 176,
          watchlists: 27,
          bids: 15,
          color: "Green",
          origin: "Colombo, Sri Lanka",
          cut: "Emerald",
          clarity: "VVS",
          seller: "Royal Gems",
          sellerRating: 5.0
        },
        {
          id: 5,
          name: "Pink Sapphire",
          image: getPlaceholderImage('gem'),
          currentBid: 3800,
          minimumBid: 3950,
          carat: "2.2",
          category: "Sapphire",
          certified: true,
          description: "Beautiful pink sapphire with excellent clarity and a vibrant color. Rare and highly sought after.",
          auctionEndsAt: "2025-08-20",
          views: 142,
          watchlists: 19,
          bids: 7,
          color: "Pink",
          origin: "Ratnapura, Sri Lanka",
          cut: "Round",
          clarity: "VS",
          seller: "GemStar Traders",
          sellerRating: 4.8
        },
        {
          id: 6,
          name: "Purple Amethyst",
          image: getPlaceholderImage('gem'),
          currentBid: 980,
          minimumBid: 1050,
          carat: "8.5",
          category: "Amethyst",
          certified: false,
          description: "Large purple amethyst with deep color and excellent transparency. Perfect for statement jewelry pieces.",
          auctionEndsAt: "2025-08-16",
          views: 92,
          watchlists: 7,
          bids: 3,
          color: "Purple",
          origin: "Matale, Sri Lanka",
          cut: "Cushion",
          clarity: "SI",
          seller: "Gem Paradise",
          sellerRating: 4.5
        },
        {
          id: 7,
          name: "Blue Aquamarine",
          image: getPlaceholderImage('gem'),
          currentBid: 2900,
          minimumBid: 3050,
          carat: "4.8",
          category: "Aquamarine",
          certified: true,
          description: "Stunning blue aquamarine with excellent clarity and color. A perfect gemstone for elegant jewelry.",
          auctionEndsAt: "2025-08-25",
          views: 118,
          watchlists: 15,
          bids: 6,
          color: "Blue",
          origin: "Matara, Sri Lanka",
          cut: "Oval",
          clarity: "VVS",
          seller: "Royal Gems",
          sellerRating: 5.0
        },
        {
          id: 8,
          name: "Star Ruby",
          image: getPlaceholderImage('ruby'),
          currentBid: 7500,
          minimumBid: 7700,
          carat: "3.2",
          category: "Ruby",
          certified: true,
          description: "Rare star ruby exhibiting a perfect six-ray star phenomenon. Exceptional quality and natural color.",
          auctionEndsAt: "2025-08-10",
          views: 195,
          watchlists: 32,
          bids: 18,
          color: "Red",
          origin: "Elahera, Sri Lanka",
          cut: "Cabochon",
          clarity: "VS",
          seller: "Ceylon Gems",
          sellerRating: 4.9
        }
      ];
      
      setGems(mockGems);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  const filteredGems = gems.filter(gem => {
    // Search query filter
    if (searchQuery && !gem.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !gem.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !gem.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter
    if (filters.category !== "all" && gem.category.toLowerCase() !== filters.category) {
      return false;
    }
    
    // Price range filter
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number);
      if (gem.currentBid < min || gem.currentBid > max) {
        return false;
      }
    }
    
    // Certification filter
    if (filters.certification === "certified" && !gem.certified) {
      return false;
    }
    
    return true;
  });

  // Pagination
  const paginatedGems = filteredGems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleViewDetails = (gem: any) => {
    setSelectedGem(gem);
    setBidAmount(gem.minimumBid);
    setShowDetailsModal(true);
    
    // Update win prediction
    if (gem.minimumBid) {
      setWinPrediction(calculateWinPrediction(gem, gem.minimumBid));
    }
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedGem(null);
  };

  const handleToggleWatchlist = (gem: any) => {
    if (watchlist.includes(gem.id)) {
      setWatchlist(watchlist.filter(id => id !== gem.id));
    } else {
      setWatchlist([...watchlist, gem.id]);
    }
  };

  // Update win prediction when bid amount changes
  const handleBidAmountChange = (value: number) => {
    setBidAmount(value);
    if (selectedGem) {
      setWinPrediction(calculateWinPrediction(selectedGem, value));
    }
  };

  const handlePlaceBid = () => {
    // In a real app, you would submit the bid to your API
    alert(`Bid of $${bidAmount} placed for ${selectedGem.name}`);
    handleCloseModal();
  };
  return (
    <Layout>
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Marketplace' }
          ]}
        />

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Gem Marketplace</h1>
          <p className="text-secondary-600">
            Explore our verified gem collection with secure bidding and authenticated sellers.
          </p>
        </div>
        
        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          priceRanges={priceRanges}
          certificationOptions={certificationOptions}
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
        />
        
        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-secondary-600">
            Showing <span className="font-semibold">{filteredGems.length}</span> gems
          </p>
          
          <div className="flex items-center">
            <SlidersHorizontal size={16} className="mr-2 text-secondary-500" />
            <select 
              className="border border-secondary-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              onChange={(e) => {
                // Sort logic would go here
                console.log(e.target.value);
              }}
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="ending-soon">Ending Soon</option>
              <option value="most-bids">Most Bids</option>
            </select>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        {/* No Results State */}
        {!loading && filteredGems.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-8 text-center border border-secondary-200">
            <div className="inline-block p-3 bg-secondary-100 rounded-full mb-4">
              <AlertCircle size={32} className="text-secondary-500" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">No gems found</h3>
            <p className="text-secondary-600 mb-6">
              We couldn't find any gems matching your criteria. Try adjusting your filters or search terms.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilters({ category: "all", priceRange: "all", certification: "all" });
                setSearchQuery("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
        
        {/* Gem Grid */}
        {!loading && filteredGems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {paginatedGems.map(gem => (
              <GemCard
                key={gem.id}
                gem={gem}
                onViewDetails={handleViewDetails}
                onToggleWatchlist={handleToggleWatchlist}
                inWatchlist={watchlist.includes(gem.id)}
              />
            ))}
          </div>
        )}
        
        {/* Pagination */}
        {filteredGems.length > pageSize && (
          <div className="flex justify-center mt-8">
            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === 1 
                    ? 'text-secondary-300 border-secondary-200 cursor-not-allowed'
                    : 'text-secondary-700 border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                Previous
              </button>
              
              {/* Page Numbers */}
              {[...Array(Math.ceil(filteredGems.length / pageSize))].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg ${
                    currentPage === i + 1
                      ? 'bg-primary-600 text-white'
                      : 'text-secondary-700 border border-secondary-300 hover:bg-secondary-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredGems.length / pageSize)))}
                disabled={currentPage === Math.ceil(filteredGems.length / pageSize)}
                className={`px-3 py-1.5 rounded-lg border ${
                  currentPage === Math.ceil(filteredGems.length / pageSize)
                    ? 'text-secondary-300 border-secondary-200 cursor-not-allowed'
                    : 'text-secondary-700 border-secondary-300 hover:bg-secondary-50'
                }`}
              >
                Next
              </button>
            </nav>
          </div>
        )}
        
        {/* Gem Details Modal */}
        {showDetailsModal && selectedGem && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center p-4 border-b border-secondary-200 bg-secondary-50 rounded-t-xl">
                <h3 className="text-lg font-semibold text-secondary-900">
                  {selectedGem.name}
                </h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 rounded-full hover:bg-secondary-200 transition-colors"
                >
                  <XCircle size={20} className="text-secondary-500" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                <div className="flex flex-col md:flex-row md:space-x-6">
                  {/* Left Side - Image and Bid Info */}
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    {/* Gem Image */}
                    <div className="relative rounded-lg overflow-hidden mb-6 border border-secondary-200">
                      <img 
                        src={selectedGem.image}                        alt={selectedGem.name} 
                        className="w-full h-64 object-cover"
                        onError={(e) => handleImageError(e, 'gem', '400x300')}
                      />
                      {selectedGem.certified && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
                          <CheckCircle size={12} className="mr-1" />
                          Certified
                        </div>
                      )}
                    </div>
                    
                    {/* Bid Section */}
                    <div className="bg-secondary-50 p-4 rounded-lg border border-secondary-200">
                      <div className="flex justify-between mb-3">
                        <div>
                          <p className="text-sm text-secondary-600">Current Bid</p>
                          <p className="text-xl font-bold text-primary-600">${selectedGem.currentBid.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-secondary-600">Minimum Bid</p>
                          <p className="text-lg font-semibold text-secondary-800">${selectedGem.minimumBid.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-secondary-600 mb-1">Your Bid Amount</p>
                        <div className="flex items-center">
                          <span className="bg-secondary-200 px-3 py-2 rounded-l-lg border border-secondary-300">$</span>
                          <input
                            type="number"
                            value={bidAmount}
                            onChange={(e) => handleBidAmountChange(Number(e.target.value))}
                            className="flex-1 px-3 py-2 border border-secondary-300 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <p className="text-sm text-secondary-600">Win Prediction</p>
                          <p className="text-sm font-medium" style={{ color: getPredictionColor(winPrediction) }}>
                            {winPrediction}%
                          </p>
                        </div>
                        <div className="w-full h-2 bg-secondary-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${winPrediction}%`, 
                              backgroundColor: getPredictionColor(winPrediction) 
                            }}
                          />
                        </div>
                        <p className="text-xs text-secondary-500 mt-1">
                          {getPredictionMessage(winPrediction)}
                        </p>
                      </div>
                      
                      <Button 
                        variant="primary"
                        size="lg"
                        className="w-full"
                        onClick={handlePlaceBid}
                        disabled={bidAmount < selectedGem.minimumBid}
                      >
                        Place Bid
                      </Button>
                    </div>
                  </div>
                  
                  {/* Right Side - Gem Details */}
                  <div className="md:w-1/2">
                    <h4 className="text-lg font-semibold text-secondary-900 mb-3">
                      About This Gem
                    </h4>
                    
                    <p className="text-secondary-600 mb-4">
                      {selectedGem.description}
                    </p>
                    
                    {/* Gem Characteristics */}
                    <div className="bg-white rounded-lg border border-secondary-200 mb-4">
                      <div className="grid grid-cols-2 divide-x divide-y divide-secondary-200">
                        <div className="p-3">
                          <p className="text-sm text-secondary-500">Category</p>
                          <p className="font-medium text-secondary-900">{selectedGem.category}</p>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-secondary-500">Carat</p>
                          <p className="font-medium text-secondary-900">{selectedGem.carat}</p>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-secondary-500">Color</p>
                          <p className="font-medium text-secondary-900">{selectedGem.color}</p>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-secondary-500">Cut</p>
                          <p className="font-medium text-secondary-900">{selectedGem.cut}</p>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-secondary-500">Clarity</p>
                          <p className="font-medium text-secondary-900">{selectedGem.clarity}</p>
                        </div>
                        <div className="p-3">
                          <p className="text-sm text-secondary-500">Origin</p>
                          <p className="font-medium text-secondary-900">{selectedGem.origin}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Seller Information */}
                    <div className="bg-white rounded-lg border border-secondary-200 p-4 mb-4">
                      <h5 className="font-medium text-secondary-900 mb-2">Seller Information</h5>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-secondary-200 flex items-center justify-center mr-3">
                          <span className="text-secondary-600 font-semibold">
                            {selectedGem.seller[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-secondary-900">{selectedGem.seller}</p>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg 
                                  key={i} 
                                  className={`w-4 h-4 ${i < Math.floor(selectedGem.sellerRating) ? 'text-yellow-400' : 'text-secondary-300'}`}
                                  fill="currentColor" 
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-secondary-600 ml-1">
                              {selectedGem.sellerRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Auction Info */}
                    <div className="bg-white rounded-lg border border-secondary-200 p-4">
                      <h5 className="font-medium text-secondary-900 mb-2">Auction Information</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Ends On</span>
                          <span className="font-medium text-secondary-900">
                            {new Date(selectedGem.auctionEndsAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Total Bids</span>
                          <span className="font-medium text-secondary-900">{selectedGem.bids}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">Total Views</span>
                          <span className="font-medium text-secondary-900">{selectedGem.views}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-600">In Watchlists</span>
                          <span className="font-medium text-secondary-900">{selectedGem.watchlists}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-secondary-200 bg-secondary-50 flex justify-end">
                <Button 
                  variant="outline"
                  className="mr-2"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => handleToggleWatchlist(selectedGem)}
                >
                  {watchlist.includes(selectedGem.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MarketplacePage;
