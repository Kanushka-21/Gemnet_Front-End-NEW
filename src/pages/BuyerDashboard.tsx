import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  CheckCircle, 
  DollarSign, 
  Calendar, 
  Gem, 
  User, 
  ChevronRight, 
  AlertCircle,
  TrendingUp,
  Clock3,
  Award,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Components
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/layout/Breadcrumbs';

// Dashboard Components
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
  };
}> = ({ title, value, icon, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-xl shadow-sm border border-secondary-200 p-5"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-secondary-600 font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className={`h-4 w-4 mr-1 ${trend.value >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            <span className={`text-xs font-medium ${trend.value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend.value >= 0 ? '+' : ''}{trend.value}% {trend.label}
            </span>
          </div>
        )}
      </div>
      <div className="p-3 bg-primary-100 rounded-full">
        {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-primary-600" })}
      </div>
    </div>
  </motion.div>
);

// Active Bid Card
const ActiveBidCard: React.FC<{
  id: string;
  gemName: string;
  currentBid: number;
  yourBid: number;
  endTime: string;
  status: 'highest' | 'outbid';
  image: string;
}> = ({ id, gemName, currentBid, yourBid, endTime, status, image }) => {
  const navigate = useNavigate();
  const isHighest = status === 'highest';
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden flex"
    >
      <div className="w-24 h-24 bg-secondary-100 flex-shrink-0">
        <img
          src={image}
          alt={gemName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/100?text=Gem";
          }}
        />
      </div>
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-secondary-900">{gemName}</h3>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            isHighest ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
          }`}>
            {isHighest ? 'Highest Bidder' : 'Outbid'}
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-xs text-secondary-600">Current Bid</p>
            <p className="font-medium text-secondary-900">${currentBid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-600">Your Bid</p>
            <p className="font-medium text-secondary-900">${yourBid.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-600">Ends</p>
            <p className="font-medium text-secondary-900">{new Date(endTime).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button 
            size="sm"
            onClick={() => navigate(`/gem/${id}`)}
            className="mr-2"
            variant="outline"
          >
            View
          </Button>
          {!isHighest && (
            <Button size="sm">
              Increase Bid
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Won Bid Card
const WonBidCard: React.FC<{
  id: string;
  gemName: string;
  finalPrice: number;
  purchaseDate: string;
  status: string;
  image: string;
}> = ({ id, gemName, finalPrice, purchaseDate, status, image }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden flex"
    >
      <div className="w-24 h-24 bg-secondary-100 flex-shrink-0">
        <img
          src={image}
          alt={gemName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/100?text=Gem";
          }}
        />
      </div>
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-secondary-900">{gemName}</h3>
          <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            Won Auction
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-xs text-secondary-600">Final Price</p>
            <p className="font-medium text-secondary-900">${finalPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-600">Purchase Date</p>
            <p className="font-medium text-secondary-900">{new Date(purchaseDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-600">Status</p>
            <p className="font-medium text-secondary-900">
              {status === 'pending_meeting' ? 'Meeting Pending' : 'Completed'}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <Button
            size="sm"
            onClick={() => navigate(`/gem/${id}`)}
            className="mr-2"
            variant="outline"
          >
            Details
          </Button>
          {status === 'pending_meeting' && (
            <Button size="sm">
              Schedule Meeting
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Meeting Card
const MeetingCard: React.FC<{
  id: string;
  gemName: string;
  date: string;
  time: string;
  location: string;
  sellerStore: string;
}> = ({ id, gemName, date, time, location, sellerStore }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 p-5"
    >
      <div className="flex items-center mb-4">
        <div className="p-3 bg-blue-100 rounded-full mr-3">
          <Calendar className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h3 className="font-bold text-secondary-900">{gemName}</h3>
          <p className="text-sm text-secondary-600">Meeting with {sellerStore}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div>
          <p className="text-xs text-secondary-500">Date & Time</p>
          <p className="text-secondary-900 font-medium">{date} at {time}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-500">Location</p>
          <p className="text-secondary-900 font-medium">{location}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline">
          Reschedule
        </Button>
        <Button size="sm">
          Get Directions
        </Button>
      </div>
    </motion.div>
  );
};

// Watchlist Item
const WatchlistItem: React.FC<{
  id: string;
  gemName: string;
  currentBid: number;
  endTime: string;
  image: string;
}> = ({ id, gemName, currentBid, endTime, image }) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="flex items-center p-3 hover:bg-primary-50 rounded-lg cursor-pointer"
      onClick={() => navigate(`/gem/${id}`)}
    >
      <div className="w-14 h-14 bg-secondary-100 rounded-lg overflow-hidden mr-3">
        <img
          src={image}
          alt={gemName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/50?text=Gem";
          }}
        />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium text-secondary-900">{gemName}</h4>
        <p className="text-sm text-secondary-600">${currentBid.toLocaleString()}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-secondary-500">Ends</p>
        <p className="text-sm font-medium text-secondary-900">{new Date(endTime).toLocaleDateString()}</p>
      </div>
    </motion.div>
  );
};

const BuyerDashboard: React.FC = () => {
  // Sample data - replace with actual API calls
  const [activeBids, setActiveBids] = useState<any[]>([]);
  const [wonBids, setWonBids] = useState<any[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setActiveBids([
        {
          id: '1',
          gemName: 'Blue Sapphire',
          currentBid: 1200,
          yourBid: 1200,
          endTime: '2025-05-08',
          status: 'highest',
          image: 'https://via.placeholder.com/100'
        },
        {
          id: '2',
          gemName: 'Ruby Star',
          currentBid: 850,
          yourBid: 800,
          endTime: '2025-05-07',
          status: 'outbid',
          image: 'https://via.placeholder.com/100'
        }
      ]);

      setWonBids([
        {
          id: '3',
          gemName: 'Green Emerald',
          finalPrice: 1500,
          purchaseDate: '2025-04-30',
          status: 'pending_meeting',
          image: 'https://via.placeholder.com/100'
        }
      ]);

      setUpcomingMeetings([
        {
          id: '1',
          gemName: 'Green Emerald',
          date: '2025-05-10',
          time: '14:00',
          location: 'GemNet Office, Colombo',
          sellerStore: 'Ceylon Gems'
        }
      ]);

      setWatchlist([
        {
          id: '4',
          gemName: 'Yellow Topaz',
          currentBid: 650,
          endTime: '2025-05-15',
          image: 'https://via.placeholder.com/100'
        },
        {
          id: '5',
          gemName: 'Diamond Cluster',
          currentBid: 2100,
          endTime: '2025-05-12',
          image: 'https://via.placeholder.com/100'
        },
        {
          id: '6',
          gemName: 'Amethyst Round Cut',
          currentBid: 450,
          endTime: '2025-05-20',
          image: 'https://via.placeholder.com/100'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Tab navigation
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'bids':
        return renderBids();
      case 'purchases':
        return renderPurchases();
      case 'watchlist':
        return renderWatchlist();
      default:
        return renderDashboard();
    }
  };

  // Dashboard tab content
  const renderDashboard = () => (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Active Bids" 
          value={activeBids.length}
          icon={<Clock />}
          trend={{ value: 5, label: "this week" }}
        />
        <StatCard 
          title="Won Auctions" 
          value={wonBids.length}
          icon={<Award />}
          trend={{ value: 10, label: "this month" }}
        />
        <StatCard 
          title="Watchlist" 
          value={watchlist.length}
          icon={<Heart />}
          trend={{ value: 3, label: "this week" }}
        />
        <StatCard 
          title="Upcoming Meetings" 
          value={upcomingMeetings.length}
          icon={<Calendar />}
        />
      </div>

      {/* Active Bids */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Active Bids</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab('bids')}
            className="flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {activeBids.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {activeBids.slice(0, 2).map(bid => (
              <ActiveBidCard
                key={bid.id}
                id={bid.id}
                gemName={bid.gemName}
                currentBid={bid.currentBid}
                yourBid={bid.yourBid}
                endTime={bid.endTime}
                status={bid.status}
                image={bid.image}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
            <Clock3 className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 mb-1">No Active Bids</h3>
            <p className="text-secondary-600 mb-4">You don't have any active bids at the moment.</p>
            <Button
              onClick={() => window.location.href = '/marketplace'}
              className="inline-flex items-center"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Explore Marketplace
            </Button>
          </div>
        )}
      </div>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Upcoming Meetings</h2>
          <div className="grid grid-cols-1 gap-4">
            {upcomingMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                gemName={meeting.gemName}
                date={meeting.date}
                time={meeting.time}
                location={meeting.location}
                sellerStore={meeting.sellerStore}
              />
            ))}
          </div>
        </div>
      )}

      {/* Watchlist */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Watchlist</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab('watchlist')}
            className="flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {watchlist.length > 0 ? (
          <motion.div 
            className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {watchlist.slice(0, 3).map(item => (
              <WatchlistItem
                key={item.id}
                id={item.id}
                gemName={item.gemName}
                currentBid={item.currentBid}
                endTime={item.endTime}
                image={item.image}
              />
            ))}
            {watchlist.length > 3 && (
              <div className="p-3 text-center border-t border-secondary-200">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setActiveTab('watchlist')}
                  className="w-full"
                >
                  Show {watchlist.length - 3} more items
                </Button>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
            <Heart className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 mb-1">Your Watchlist is Empty</h3>
            <p className="text-secondary-600 mb-4">Add gems to your watchlist to track their auctions.</p>
            <Button
              onClick={() => window.location.href = '/marketplace'}
              className="inline-flex items-center"
            >
              <Eye className="h-4 w-4 mr-2" />
              Browse Gems
            </Button>
          </div>
        )}
      </div>
    </>
  );
  
  // Bids tab content
  const renderBids = () => (
    <>
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Your Bids</h2>
      
      {activeBids.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium text-secondary-900 mb-3">Active Bids</h3>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {activeBids.map(bid => (
              <ActiveBidCard
                key={bid.id}
                id={bid.id}
                gemName={bid.gemName}
                currentBid={bid.currentBid}
                yourBid={bid.yourBid}
                endTime={bid.endTime}
                status={bid.status}
                image={bid.image}
              />
            ))}
          </div>
          
          <h3 className="text-lg font-medium text-secondary-900 mb-3">Won Auctions</h3>
          <div className="grid grid-cols-1 gap-4">
            {wonBids.map(bid => (
              <WonBidCard
                key={bid.id}
                id={bid.id}
                gemName={bid.gemName}
                finalPrice={bid.finalPrice}
                purchaseDate={bid.purchaseDate}
                status={bid.status}
                image={bid.image}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <AlertCircle className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">No Bids Found</h3>
          <p className="text-secondary-600 mb-4">You haven't placed any bids yet.</p>
          <Button
            onClick={() => window.location.href = '/marketplace'}
            className="inline-flex items-center"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Start Bidding
          </Button>
        </div>
      )}
    </>
  );
  
  // Purchases tab content
  const renderPurchases = () => (
    <>
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Your Purchases</h2>
      
      {wonBids.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {wonBids.map(bid => (
            <WonBidCard
              key={bid.id}
              id={bid.id}
              gemName={bid.gemName}
              finalPrice={bid.finalPrice}
              purchaseDate={bid.purchaseDate}
              status={bid.status}
              image={bid.image}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <ShoppingBag className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">No Purchases Yet</h3>
          <p className="text-secondary-600 mb-4">You haven't won any auctions yet.</p>
          <Button
            onClick={() => window.location.href = '/marketplace'}
            className="inline-flex items-center"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Explore Marketplace
          </Button>
        </div>
      )}
    </>
  );
  
  // Watchlist tab content
  const renderWatchlist = () => (
    <>
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Your Watchlist</h2>
      
      {watchlist.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
          {watchlist.map(item => (
            <WatchlistItem
              key={item.id}
              id={item.id}
              gemName={item.gemName}
              currentBid={item.currentBid}
              endTime={item.endTime}
              image={item.image}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <Heart className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">Your Watchlist is Empty</h3>
          <p className="text-secondary-600 mb-4">Add gems to your watchlist to track their auctions.</p>
          <Button
            onClick={() => window.location.href = '/marketplace'}
            className="inline-flex items-center"
          >
            <Eye className="h-4 w-4 mr-2" />
            Browse Gems
          </Button>
        </div>
      )}
    </>
  );
  if (loading) {
    return (
      <Layout>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Buyer Dashboard' }
          ]}
        />
        
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Loading your dashboard...</p>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Home', path: '/' },
          { label: 'Buyer Dashboard' }
        ]}
      />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-secondary-900 mb-2">Buyer Dashboard</h1>
        <p className="text-secondary-600">
          Welcome back! Manage your bids, purchases, and saved items.
        </p>
      </motion.div>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-secondary-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 px-1 ${activeTab === 'dashboard'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('bids')}
            className={`pb-3 px-1 ${activeTab === 'bids'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Bids
          </button>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`pb-3 px-1 ${activeTab === 'purchases'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Purchases
          </button>
          <button
            onClick={() => setActiveTab('watchlist')}
            className={`pb-3 px-1 ${activeTab === 'watchlist'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Watchlist
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </Layout>
  );
};

export default BuyerDashboard;
