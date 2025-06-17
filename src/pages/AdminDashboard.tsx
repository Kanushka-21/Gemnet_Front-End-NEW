import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Store, 
  DollarSign, 
  Calendar, 
  User, 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings,
  TrendingUp,
  Search,
  Filter,
  ChevronRight,
  Shield,
  Eye,
  Copy,
  ClipboardCheck,
  AlertCircle,
  UserCheck
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

// Purchase Item Component
const PurchaseItem: React.FC<{
  id: string;
  gemName: string;
  gemId: string;
  buyer: string;
  buyerId: string;
  seller: string;
  sellerId: string;
  price: number;
  purchaseDate: string;
  status: string;
  meetingStatus: string;
  image: string;
  onSchedule: () => void;
}> = ({ 
  id, 
  gemName, 
  gemId, 
  buyer, 
  buyerId, 
  seller, 
  sellerId, 
  price, 
  purchaseDate, 
  status, 
  meetingStatus, 
  image,
  onSchedule 
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4 flex"
    >
      <div className="w-16 h-16 bg-secondary-100 rounded-lg overflow-hidden mr-4">
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
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-secondary-900">{gemName} <span className="text-xs text-secondary-500">({gemId})</span></h4>
          <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
            meetingStatus === 'scheduled' ? 'bg-green-100 text-green-700' : 
            meetingStatus === 'pending' ? 'bg-amber-100 text-amber-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {meetingStatus === 'scheduled' ? 'Meeting Scheduled' : 
             meetingStatus === 'pending' ? 'Meeting Pending' : 
             'Completed'}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
          <div>
            <p className="text-xs text-secondary-500">Buyer</p>
            <p className="text-sm font-medium text-secondary-900">{buyer}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Seller</p>
            <p className="text-sm font-medium text-secondary-900">{seller}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Price</p>
            <p className="text-sm font-medium text-secondary-900">${price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Date</p>
            <p className="text-sm font-medium text-secondary-900">{new Date(purchaseDate).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          {meetingStatus === 'pending' && (
            <Button 
              size="sm"
              onClick={onSchedule}
            >
              Schedule Meeting
            </Button>
          )}
          
          {meetingStatus === 'scheduled' && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => navigate(`/admin/meetings/${id}`)}
            >
              View Meeting
            </Button>
          )}
          
          {meetingStatus === 'completed' && (
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => navigate(`/admin/transactions/${id}`)}
            >
              View Details
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
  buyer: string;
  seller: string;
  date: string;
  time: string;
  location: string;
  status: string;
}> = ({ id, gemName, buyer, seller, date, time, location, status }) => {
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
          <p className="text-sm text-secondary-600">Meeting between {buyer} and {seller}</p>
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
            status === 'confirmed' ? 'text-green-600' : 
            status === 'pending' ? 'text-amber-600' : 
            'text-blue-600'
          }`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button size="sm" variant="outline">
          Reschedule
        </Button>
        <Button size="sm" className={status === 'confirmed' ? 'bg-green-600 hover:bg-green-700' : ''}>
          {status === 'confirmed' ? 'Check In Parties' : 'Confirm'}
        </Button>
      </div>
    </motion.div>
  );
};

// User Card
const UserCard: React.FC<{
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  verificationStatus: string;
  registrationDate: string;
  avatar: string;
  handleVerify?: () => void;
}> = ({ 
  id, 
  name, 
  email, 
  role, 
  status, 
  verificationStatus, 
  registrationDate, 
  avatar,
  handleVerify 
}) => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-secondary-200 p-4 flex"
    >
      <div className="mr-4">
        <div className="w-14 h-14 bg-secondary-100 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/50?text=User";
            }}
          />
        </div>
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h4 className="font-medium text-secondary-900">{name}</h4>
            <p className="text-sm text-secondary-500">{email}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              role === 'buyer' ? 'bg-blue-100 text-blue-700' : 
              role === 'seller' ? 'bg-purple-100 text-purple-700' : 
              'bg-green-100 text-green-700'
            }`}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
            
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              status === 'active' ? 'bg-green-100 text-green-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
          <div>
            <p className="text-xs text-secondary-500">Registration Date</p>
            <p className="text-sm font-medium">{new Date(registrationDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-secondary-500">Verification Status</p>
            <p className={`text-sm font-medium ${
              verificationStatus === 'verified' ? 'text-green-600' : 
              verificationStatus === 'pending' ? 'text-amber-600' : 
              'text-secondary-500'
            }`}>
              {verificationStatus.charAt(0).toUpperCase() + verificationStatus.slice(1)}
            </p>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => navigate(`/admin/users/${id}`)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Profile
          </Button>
          
          {verificationStatus === 'pending' && (
            <Button 
              size="sm"
              onClick={handleVerify}
            >
              <UserCheck className="h-4 w-4 mr-2" />
              Verify User
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Schedule Meeting Modal
const ScheduleMeetingModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  purchase: any;
}> = ({ visible, onClose, purchase }) => {
  const handleSubmit = () => {
    // Submit meeting schedule
    onClose();
  };
  
  if (!purchase) return null;
  
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity ${
      visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: visible ? 1 : 0.9, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
      >
        <div className="p-6 border-b border-secondary-200">
          <h2 className="text-xl font-bold text-secondary-900">Schedule Verification Meeting</h2>
          <p className="text-secondary-600 text-sm mt-1">
            For {purchase.gemName} purchase by {purchase.buyer}
          </p>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Date
            </label>
            <input 
              type="date" 
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Time
            </label>
            <input 
              type="time" 
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Location
            </label>
            <select className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option value="">Select a location</option>
              <option value="colombo">GemNet Office, Colombo</option>
              <option value="kandy">GemNet Office, Kandy</option>
              <option value="galle">GemNet Office, Galle</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Additional Notes
            </label>
            <textarea 
              className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              placeholder="Any special instructions or notes"
            ></textarea>
          </div>
        </div>
        
        <div className="p-4 bg-secondary-50 border-t border-secondary-200 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Schedule Meeting
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  // State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [confirmedPurchases, setConfirmedPurchases] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scheduleModalVisible, setScheduleModalVisible] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<any>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      // Sample confirmed purchases
      setConfirmedPurchases([
        {
          id: '1',
          gemName: 'Blue Sapphire',
          gemId: 'GEM001',
          buyer: 'John Doe',
          buyerId: 'B001',
          seller: 'Ceylon Gems',
          sellerId: 'S001',
          price: 1200,
          purchaseDate: '2025-05-01',
          status: 'confirmed',
          meetingStatus: 'pending',
          image: 'https://via.placeholder.com/80'
        },
        {
          id: '2',
          gemName: 'Ruby Star',
          gemId: 'GEM002',
          buyer: 'Jane Smith',
          buyerId: 'B002',
          seller: 'Sri Lanka Gems',
          sellerId: 'S002',
          price: 950,
          purchaseDate: '2025-05-02',
          status: 'confirmed',
          meetingStatus: 'scheduled',
          image: 'https://via.placeholder.com/80'
        },
        {
          id: '3',
          gemName: 'Green Emerald',
          gemId: 'GEM003',
          buyer: 'Robert Johnson',
          buyerId: 'B003',
          seller: 'Gem Palace',
          sellerId: 'S003',
          price: 1500,
          purchaseDate: '2025-04-28',
          status: 'confirmed',
          meetingStatus: 'completed',
          image: 'https://via.placeholder.com/80'
        }
      ]);

      // Sample users
      setUsers([
        {
          id: 'U001',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'buyer',
          status: 'active',
          verificationStatus: 'verified',
          registrationDate: '2025-01-15',
          avatar: 'https://via.placeholder.com/150'
        },
        {
          id: 'U002',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'buyer',
          status: 'active',
          verificationStatus: 'verified',
          registrationDate: '2025-02-20',
          avatar: 'https://via.placeholder.com/150'
        },
        {
          id: 'S001',
          name: 'Ceylon Gems',
          email: 'info@ceylongems.com',
          role: 'seller',
          status: 'active',
          verificationStatus: 'verified',
          registrationDate: '2024-12-10',
          avatar: 'https://via.placeholder.com/150'
        },
        {
          id: 'U003',
          name: 'Robert Johnson',
          email: 'robert@example.com',
          role: 'buyer',
          status: 'pending',
          verificationStatus: 'pending',
          registrationDate: '2025-05-01',
          avatar: 'https://via.placeholder.com/150'
        }
      ]);

      // Sample meetings
      setMeetings([
        {
          id: 'M001',
          gemName: 'Ruby Star',
          buyer: 'Jane Smith',
          seller: 'Sri Lanka Gems',
          date: '2025-05-15',
          time: '10:00 AM',
          location: 'GemNet Office, Colombo',
          status: 'confirmed'
        },
        {
          id: 'M002',
          gemName: 'Blue Diamond',
          buyer: 'Robert Johnson',
          seller: 'Gem Palace',
          date: '2025-05-18',
          time: '2:00 PM',
          location: 'GemNet Office, Kandy',
          status: 'pending'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  const handleScheduleMeeting = (purchase: any) => {
    setSelectedPurchase(purchase);
    setScheduleModalVisible(true);
  };

  // Tab navigation
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'purchases':
        return renderPurchases();
      case 'users':
        return renderUsers();
      case 'meetings':
        return renderMeetings();
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
          title="Total Users" 
          value={users.length}
          icon={<Users />}
          trend={{ value: 12, label: "this month" }}
        />
        <StatCard 
          title="Pending Verifications" 
          value={users.filter(u => u.verificationStatus === 'pending').length}
          icon={<ClipboardCheck />}
        />
        <StatCard 
          title="Scheduled Meetings" 
          value={meetings.length}
          icon={<Calendar />}
          trend={{ value: 5, label: "this week" }}
        />
        <StatCard 
          title="Transaction Volume" 
          value={`$${confirmedPurchases.reduce((acc, purchase) => acc + purchase.price, 0).toLocaleString()}`}
          icon={<DollarSign />}
          trend={{ value: 8, label: "this month" }}
        />
      </div>

      {/* Recent Purchases */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Recent Purchases</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab('purchases')}
            className="flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {confirmedPurchases.slice(0, 2).map(purchase => (
            <PurchaseItem
              key={purchase.id}
              id={purchase.id}
              gemName={purchase.gemName}
              gemId={purchase.gemId}
              buyer={purchase.buyer}
              buyerId={purchase.buyerId}
              seller={purchase.seller}
              sellerId={purchase.sellerId}
              price={purchase.price}
              purchaseDate={purchase.purchaseDate}
              status={purchase.status}
              meetingStatus={purchase.meetingStatus}
              image={purchase.image}
              onSchedule={() => handleScheduleMeeting(purchase)}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Upcoming Meetings</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab('meetings')}
            className="flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {meetings.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {meetings.slice(0, 2).map(meeting => (
              <MeetingCard
                key={meeting.id}
                id={meeting.id}
                gemName={meeting.gemName}
                buyer={meeting.buyer}
                seller={meeting.seller}
                date={meeting.date}
                time={meeting.time}
                location={meeting.location}
                status={meeting.status}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
            <Calendar className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 mb-1">No Upcoming Meetings</h3>
            <p className="text-secondary-600 mb-4">You don't have any meetings scheduled.</p>
          </div>
        )}
      </div>

      {/* Pending Verifications */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary-900">Pending Verifications</h2>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setActiveTab('users')}
            className="flex items-center space-x-1"
          >
            <span>View All Users</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {users.filter(u => u.verificationStatus === 'pending').length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {users.filter(u => u.verificationStatus === 'pending').slice(0, 2).map(user => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                email={user.email}
                role={user.role}
                status={user.status}
                verificationStatus={user.verificationStatus}
                registrationDate={user.registrationDate}
                avatar={user.avatar}
                handleVerify={() => navigate(`/admin/users/${user.id}/verify`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
            <UserCheck className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-secondary-900 mb-1">No Pending Verifications</h3>
            <p className="text-secondary-600">All users are verified.</p>
          </div>
        )}
      </div>
    </>
  );
  
  // Purchases tab content
  const renderPurchases = () => (
    <>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-secondary-900 mb-2">Confirmed Purchases</h2>
        
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search purchases..."
              className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
            />
          </div>
          
          <Button size="sm" variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      {confirmedPurchases.length > 0 ? (
        <div className="space-y-4">
          {confirmedPurchases.map(purchase => (
            <PurchaseItem
              key={purchase.id}
              id={purchase.id}
              gemName={purchase.gemName}
              gemId={purchase.gemId}
              buyer={purchase.buyer}
              buyerId={purchase.buyerId}
              seller={purchase.seller}
              sellerId={purchase.sellerId}
              price={purchase.price}
              purchaseDate={purchase.purchaseDate}
              status={purchase.status}
              meetingStatus={purchase.meetingStatus}
              image={purchase.image}
              onSchedule={() => handleScheduleMeeting(purchase)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <AlertCircle className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">No Purchases Found</h3>
          <p className="text-secondary-600">There are no confirmed purchases in the system yet.</p>
        </div>
      )}
    </>
  );
  
  // Users tab content
  const renderUsers = () => (
    <>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-secondary-900 mb-2">User Management</h2>
        
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
            />
          </div>
          
          <select className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="">All Roles</option>
            <option value="buyer">Buyers</option>
            <option value="seller">Sellers</option>
            <option value="admin">Admins</option>
          </select>
          
          <Button size="sm" variant="outline" className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {users.map(user => (
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            role={user.role}
            status={user.status}
            verificationStatus={user.verificationStatus}
            registrationDate={user.registrationDate}
            avatar={user.avatar}
            handleVerify={() => navigate(`/admin/users/${user.id}/verify`)}
          />
        ))}
      </div>
    </>
  );
  
  // Meetings tab content
  const renderMeetings = () => (
    <>
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-secondary-900 mb-2">Verification Meetings</h2>
        
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search meetings..."
              className="pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full"
            />
          </div>
          
          <select className="px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
      
      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {meetings.map(meeting => (
            <MeetingCard
              key={meeting.id}
              id={meeting.id}
              gemName={meeting.gemName}
              buyer={meeting.buyer}
              seller={meeting.seller}
              date={meeting.date}
              time={meeting.time}
              location={meeting.location}
              status={meeting.status}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-secondary-200 p-8 text-center">
          <Calendar className="h-12 w-12 text-secondary-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-secondary-900 mb-1">No Meetings Scheduled</h3>
          <p className="text-secondary-600">No verification meetings have been scheduled yet.</p>
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
            { label: 'Admin Dashboard' }
          ]}
        />
        
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-secondary-600">Loading admin dashboard...</p>
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
          { label: 'Admin Dashboard' }
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
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary-600" />
              <h1 className="text-2xl font-bold text-secondary-900">Admin Dashboard</h1>
            </div>
            <p className="text-secondary-600 mt-1">
              Manage purchases, users, and verification meetings.
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => navigate('/admin/settings')}
            className="mt-4 sm:mt-0 flex items-center"
          >
            <Settings className="h-4 w-4 mr-2" />
            System Settings
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
            onClick={() => setActiveTab('purchases')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'purchases'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Purchases
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'users'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('meetings')}
            className={`pb-3 px-1 whitespace-nowrap ${activeTab === 'meetings'
              ? 'border-b-2 border-primary-600 text-primary-600 font-medium'
              : 'text-secondary-600 hover:text-secondary-900'}`}
          >
            Meetings
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
      
      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal 
        visible={scheduleModalVisible} 
        onClose={() => setScheduleModalVisible(false)}
        purchase={selectedPurchase}
      />
    </Layout>
  );
};

export default AdminDashboard;
