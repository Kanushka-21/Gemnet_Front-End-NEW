import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Plus, 
  DollarSign, 
  FileText, 
  History, 
  Calendar, 
  Upload, 
  Tag, 
  Bell, 
  CheckCircle, 
  XCircle,
  Settings,
  TrendingUp,
  Package,
  PieChart,
  ChevronRight,
  Clock,
  Users,
  Eye,
  ThumbsUp
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

// Gem Listing Card
const GemListingCard: React.FC<{
  id: string;
  name: string;
  category: string;
  price: number;
  certified: boolean;
  status: string;
  views: number;
  bids: number;
  dateAdded: string;
  images: string[];
}> = ({ id, name, category, price, certified, status, views, bids, dateAdded, images }) => {
  const navigate = useNavigate();
  
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    pending: 'bg-amber-100 text-amber-700',
    sold: 'bg-blue-100 text-blue-700',
    expired: 'bg-secondary-100 text-secondary-600',
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 overflow-hidden"
    >
      <div className="flex">
        <div className="w-32 h-32 bg-secondary-100 flex-shrink-0">
          <img
            src={images[0] || "https://via.placeholder.com/100?text=Gem"}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/100?text=Gem";
            }}
          />
        </div>
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium text-secondary-900">{name}</h3>
              <p className="text-sm text-secondary-600 mb-1">{category}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[status as keyof typeof statusColors] || 'bg-secondary-100 text-secondary-600'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div>
              <p className="text-xs text-secondary-500">Listed Price</p>
              <p className="font-medium text-secondary-900">${price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-500">Views</p>
              <p className="font-medium text-secondary-900">{views}</p>
            </div>
            <div>
              <p className="text-xs text-secondary-500">Bids</p>
              <p className="font-medium text-secondary-900">{bids}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {certified && (
                <span className="inline-flex items-center px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Certified
                </span>
              )}
              <span className="inline-flex items-center px-2 py-1 bg-secondary-50 text-secondary-600 rounded-full text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(dateAdded).toLocaleDateString()}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/gem/${id}`)}
              >
                View
              </Button>
              <Button 
                size="sm"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Bid Item
const BidItem: React.FC<{
  id: string;
  gemName: string;
  bidAmount: number;
  bidderName: string;
  status: string;
  bidTime: string;
  gemImage: string;
}> = ({ id, gemName, bidAmount, bidderName, status, bidTime, gemImage }) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4 flex"
    >
      <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden mr-4">
        <img
          src={gemImage}
          alt={gemName}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/50?text=Gem";
          }}
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-secondary-900">{gemName}</h4>
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            status === 'pending' ? 'bg-amber-100 text-amber-700' : 
            status === 'accepted' ? 'bg-green-100 text-green-700' :
            'bg-red-100 text-red-700'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-secondary-600">Bid by {bidderName}</p>
          <p className="text-sm text-secondary-500">{new Date(bidTime).toLocaleString()}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <p className="font-bold text-primary-600">${bidAmount.toLocaleString()}</p>
          
          {status === 'pending' && (
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-50"
              >
                Decline
              </Button>
              <Button size="sm">
                Accept
              </Button>
            </div>
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
  buyerName: string;
  date: string;
  time: string;
  location: string;
  status: string;
}> = ({ id, gemName, buyerName, date, time, location, status }) => {
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
          <p className="text-sm text-secondary-600">Meeting with {buyerName}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-xs text-secondary-500">Date & Time</p>
          <p className="text-secondary-900 font-medium">{date} at {time}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-500">Location</p>
          <p className="text-secondary-900 font-medium">{location}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-500">Status</p>
          <p className={`text-secondary-900 font-medium ${
            status === 'confirmed' ? 'text-green-600' : 'text-amber-600'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline">
          Reschedule
        </Button>
        <Button size="sm">
          Confirm
        </Button>
      </div>
    </motion.div>
  );
};

// Add Gem Modal
const AddGemModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleSubmit = () => {
    // Handle form submission
    onClose();
  };
  
  const steps = [
    { title: 'Basic Details', icon: <Tag /> },
    { title: 'Specifications', icon: <FileText /> },
    { title: 'Pricing & Options', icon: <DollarSign /> },
    { title: 'Images & Media', icon: <Upload /> },
  ];
  
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity ${
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: visible ? 1 : 0.9, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden"
      >
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">Add New Gem</h2>
        </div>
        
        <div className="p-6">
          {/* Stepper */}
          <div className="flex mb-8 justify-between">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col items-center"
              >
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                  currentStep > index + 1 ? 'bg-green-500 text-white' :
                  currentStep === index + 1 ? 'bg-primary-600 text-white' :
                  'bg-secondary-200 text-secondary-500'
                }`}>
                  {currentStep > index + 1 ? <CheckCircle className="h-5 w-5" /> : React.cloneElement(step.icon, { className: "h-5 w-5" })}
                </div>
                <p className={`text-xs mt-2 ${
                  currentStep === index + 1 ? 'text-secondary-900 font-medium' : 'text-secondary-500'
                }`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
          
          {/* Form content based on current step */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Gem Name
                </label>
                <input 
                  type="text"
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g. Ceylon Blue Sapphire"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Category
                </label>
                <select className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Select a category</option>
                  <option value="sapphire">Sapphire</option>
                  <option value="ruby">Ruby</option>
                  <option value="emerald">Emerald</option>
                  <option value="diamond">Diamond</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Description
                </label>
                <textarea 
                  className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="Describe your gem..."
                />
              </div>
            </div>
          )}
          
          {/* More steps content would go here */}
        </div>
        
        <div className="p-4 border-t border-secondary-200 bg-secondary-50 flex justify-between">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          <div className="flex space-x-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Back
              </Button>
            )}
            
            <Button
              onClick={() => {
                if (currentStep < steps.length) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {currentStep < steps.length ? 'Continue' : 'Submit'}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SellerDashboard: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddGemModalVisible, setIsAddGemModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gemListings, setGemListings] = useState<any[]>([]);
  const [pendingBids, setPendingBids] = useState<any[]>([]);
  const [confirmedSales, setConfirmedSales] = useState<any[]>([]);
  const [upcomingMeetings, setUpcomingMeetings] = useState<any[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setGemListings([
        {
          id: '1',
          name: 'Blue Sapphire',
          category: 'Sapphire',
          price: 25000,
          certified: true,
          status: 'active',
          views: 120,
          bids: 3,
          dateAdded: '2025-04-15',
          images: ['https://via.placeholder.com/200'],
        },
        {
          id: '2',
          name: 'Ceylon Ruby',
          category: 'Ruby',
          price: 35000,
          certified: false,
          status: 'active',
          views: 85,
          bids: 1,
          dateAdded: '2025-04-20',
          images: ['https://via.placeholder.com/200'],
        },
        {
          id: '3',
          name: 'Green Emerald',
          category: 'Emerald',
          price: 42000,
          certified: true,
          status: 'sold',
          views: 210,
          bids: 5,
          dateAdded: '2025-03-30',
          images: ['https://via.placeholder.com/200'],
        },
      ]);

      setPendingBids([
        {
          id: '1',
          gemName: 'Blue Sapphire',
          bidAmount: 22000,
          bidderName: 'John D.',
          status: 'pending',
          bidTime: '2025-04-28T10:30:00',
          gemImage: 'https://via.placeholder.com/100',
        },
        {
          id: '2',
          gemName: 'Ceylon Ruby',
          bidAmount: 32000,
          bidderName: 'Jane S.',
          status: 'pending',
          bidTime: '2025-04-29T15:45:00',
          gemImage: 'https://via.placeholder.com/100',
        }
      ]);

      setConfirmedSales([
        {
          id: '1',
          gemName: 'Green Emerald',
          salePrice: 40000,
          buyerName: 'Mark T.',
          saleDate: '2025-04-25',
          status: 'meeting_scheduled',
          gemImage: 'https://via.placeholder.com/100',
        }
      ]);

      setUpcomingMeetings([
        {
          id: '1',
          gemName: 'Green Emerald',
          buyerName: 'Mark T.',
          date: '2025-05-10',
          time: '14:00',
          location: 'GemNet Office, Colombo',
          status: 'pending',
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
      case 'listings':
        return renderListings();
      case 'bids':
        return renderBids();
      case 'sales':
        return renderSales();
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
          title="Active Listings" 
          value={gemListings.filter(g => g.status === 'active').length}
          icon={<Package />}
          trend={{ value: 10, label: "this month" }}
        />
        <StatCard 
          title="Pending Bids" 
          value={pendingBids.length}
          icon={<Clock />}
        />
        <StatCard 
          title="Total Sales" 
          value={confirmedSales.length}
          icon={<ShoppingBag />}
          trend={{ value: 15, label: "this month" }}
        />
        <StatCard 
          title="Revenue" 
          value={`$${confirmedSales.reduce((acc, sale) => acc + sale.salePrice, 0).toLocaleString()}`}
          icon={<DollarSign />}
          trend={{ value: 8, label: "this month" }}
        />
      </div>

      {/* Pending Bids */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Pending Bids</h2>
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
        
        {pendingBids.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {pendingBids.slice(0, 2).map(bid => (
              <BidItem
                key={bid.id}
                id={bid.id}
                gemName={bid.gemName}
                bidAmount={bid.bidAmount}
                bidderName={bid.bidderName}
                status={bid.status}
                bidTime={bid.bidTime}
                gemImage={bid.gemImage}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
            <Clock className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 mb-1">No Pending Bids</h3>
            <p className="text-secondary-600 mb-4">You don't have any bids pending approval.</p>
            <Button
              onClick={() => setIsAddGemModalVisible(true)}
              className="inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Gem
            </Button>
          </div>
        )}
      </div>

      {/* Recent Listings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Recent Listings</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab('listings')}
            className="flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {gemListings.slice(0, 2).map(gem => (
            <GemListingCard
              key={gem.id}
              id={gem.id}
              name={gem.name}
              category={gem.category}
              price={gem.price}
              certified={gem.certified}
              status={gem.status}
              views={gem.views}
              bids={gem.bids}
              dateAdded={gem.dateAdded}
              images={gem.images}
            />
          ))}
          
          <motion.div
            whileHover={{ y: -5, opacity: 0.95 }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl shadow-sm border border-secondary-200 p-8 flex flex-col items-center justify-center"
          >
            <div className="p-4 rounded-full bg-primary-100 mb-3">
              <Plus className="h-6 w-6 text-primary-600" />
            </div>
            <h3 className="text-lg font-medium text-secondary-900 mb-1">Add New Gem</h3>
            <p className="text-secondary-600 text-center mb-4">List your precious gems for auction</p>
            <Button
              onClick={() => setIsAddGemModalVisible(true)}
              className="inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Gem
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-secondary-900 mb-4">Upcoming Meetings</h2>
          <div className="grid grid-cols-1 gap-4">
            {upcomingMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                gemName={meeting.gemName}
                buyerName={meeting.buyerName}
                date={meeting.date}
                time={meeting.time}
                location={meeting.location}
                status={meeting.status}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
  
  // Listings tab content
  const renderListings = () => (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-secondary-900">Your Gem Listings</h2>
        <Button
          onClick={() => setIsAddGemModalVisible(true)}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Gem
        </Button>
      </div>
      
      {gemListings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {gemListings.map(gem => (
            <GemListingCard
              key={gem.id}
              id={gem.id}
              name={gem.name}
              category={gem.category}
              price={gem.price}
              certified={gem.certified}
              status={gem.status}
              views={gem.views}
              bids={gem.bids}
              dateAdded={gem.dateAdded}
              images={gem.images}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <Package className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">No Gem Listings</h3>
          <p className="text-secondary-600 mb-4">You haven't added any gems yet.</p>
          <Button
            onClick={() => setIsAddGemModalVisible(true)}
            className="inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Gem
          </Button>
        </div>
      )}
    </>
  );
  
  // Bids tab content
  const renderBids = () => (
    <>
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Bid Management</h2>
      
      {pendingBids.length > 0 ? (
        <div>
          <h3 className="text-lg font-medium text-secondary-900 mb-3">Pending Bids</h3>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {pendingBids.map(bid => (
              <BidItem
                key={bid.id}
                id={bid.id}
                gemName={bid.gemName}
                bidAmount={bid.bidAmount}
                bidderName={bid.bidderName}
                status={bid.status}
                bidTime={bid.bidTime}
                gemImage={bid.gemImage}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center mb-8">
          <Clock className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">No Pending Bids</h3>
          <p className="text-secondary-600">You don't have any bids that require your action.</p>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-3">Recent Bid History</h3>
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
          <div className="p-4 border-b border-secondary-200">
            <div className="grid grid-cols-6 gap-4 text-sm font-medium text-secondary-500">
              <div className="col-span-2">Gem</div>
              <div>Bidder</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Status</div>
            </div>
          </div>
          
          <div className="divide-y divide-secondary-100">
            <div className="p-4 hover:bg-secondary-50">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-2 flex items-center">
                  <div className="w-10 h-10 bg-secondary-100 rounded-md overflow-hidden mr-3">
                    <img src="https://via.placeholder.com/40" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Blue Sapphire</p>
                    <p className="text-xs text-secondary-500">Sapphire</p>
                  </div>
                </div>
                <div>Emily R.</div>
                <div className="font-medium text-secondary-900">$21,500</div>
                <div className="text-secondary-600">Apr 22, 2025</div>
                <div>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Accepted
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4 hover:bg-secondary-50">
              <div className="grid grid-cols-6 gap-4 items-center">
                <div className="col-span-2 flex items-center">
                  <div className="w-10 h-10 bg-secondary-100 rounded-md overflow-hidden mr-3">
                    <img src="https://via.placeholder.com/40" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-secondary-900">Blue Sapphire</p>
                    <p className="text-xs text-secondary-500">Sapphire</p>
                  </div>
                </div>
                <div>Robert K.</div>
                <div className="font-medium text-secondary-900">$20,800</div>
                <div className="text-secondary-600">Apr 21, 2025</div>
                <div>
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Rejected
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
  // Sales tab content
  const renderSales = () => (
    <>
      <h2 className="text-xl font-bold text-secondary-900 mb-6">Sales & Meetings</h2>
      
      {upcomingMeetings.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-secondary-900 mb-3">Upcoming Meetings</h3>
          <div className="grid grid-cols-1 gap-4">
            {upcomingMeetings.map(meeting => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                gemName={meeting.gemName}
                buyerName={meeting.buyerName}
                date={meeting.date}
                time={meeting.time}
                location={meeting.location}
                status={meeting.status}
              />
            ))}
          </div>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium text-secondary-900 mb-3">Confirmed Sales</h3>
        {confirmedSales.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200">
            <div className="p-4 border-b border-secondary-200">
              <div className="grid grid-cols-6 gap-4 text-sm font-medium text-secondary-500">
                <div className="col-span-2">Gem</div>
                <div>Buyer</div>
                <div>Price</div>
                <div>Date</div>
                <div>Status</div>
              </div>
            </div>
            
            <div className="divide-y divide-secondary-100">
              {confirmedSales.map(sale => (
                <div key={sale.id} className="p-4 hover:bg-secondary-50">
                  <div className="grid grid-cols-6 gap-4 items-center">
                    <div className="col-span-2 flex items-center">
                      <div className="w-10 h-10 bg-secondary-100 rounded-md overflow-hidden mr-3">
                        <img src={sale.gemImage} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-secondary-900">{sale.gemName}</p>
                      </div>
                    </div>
                    <div>{sale.buyerName}</div>
                    <div className="font-medium text-secondary-900">${sale.salePrice.toLocaleString()}</div>
                    <div className="text-secondary-600">{new Date(sale.saleDate).toLocaleDateString()}</div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        sale.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {sale.status === 'completed' ? 'Completed' : 'Meeting Scheduled'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
            <ShoppingBag className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 mb-1">No Sales Yet</h3>
            <p className="text-secondary-600 mb-4">You haven't completed any sales yet.</p>
            <Button
              onClick={() => setIsAddGemModalVisible(true)}
              className="inline-flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Gem
            </Button>
          </div>
        )}
      </div>
    </>
  );
  if (loading) {
    return (
      <Layout>
        {/* Breadcrumbs */}
        <Breadcrumbs 
          items={[
            { label: 'Home', path: '/' },
            { label: 'Seller Dashboard' }
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
          { label: 'Seller Dashboard' }
        ]}
      />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900 mb-2">Seller Dashboard</h1>
            <p className="text-secondary-600">
              Manage your gem listings, bids, and sales.
            </p>
          </div>
          
          <Button
            onClick={() => setIsAddGemModalVisible(true)}
            className="mt-4 sm:mt-0 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Gem
          </Button>
        </div>
      </motion.div>
      
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-secondary-200">
        <div className="flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'dashboard'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'listings'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Gem Listings
          </button>
          <button
            onClick={() => setActiveTab('bids')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'bids'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Bids
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'sales'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Sales & Meetings
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
      
      {/* Add Gem Modal */}
      <AddGemModal 
        visible={isAddGemModalVisible} 
        onClose={() => setIsAddGemModalVisible(false)}
      />
    </Layout>
  );
};

export default SellerDashboard;
