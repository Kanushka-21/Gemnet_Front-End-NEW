import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Gem, Users, Globe, TrendingUp, Check } from 'lucide-react';

// Components
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';

// Helper function to calculate days until auction end
const calculateDaysRemaining = (endDateStr: string): number => {
  const endDate = new Date(endDateStr);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-secondary-200 h-full flex flex-col">
    <div className="mb-4 text-primary-600">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-secondary-900">{title}</h3>
    <p className="text-secondary-600 flex-grow">{description}</p>
  </div>
);

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, avatar }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-sm border border-secondary-200 h-full flex flex-col"
  >
    <p className="text-secondary-600 italic mb-4">"{content}"</p>
    <div className="flex items-center mt-auto">
      <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-medium text-secondary-900">{name}</h4>
        <p className="text-sm text-secondary-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

interface GemCardProps {
  id: number;
  name: string;
  image: string;
  currentBid: number;
  minimumBid: number;
  category: string;
  certified: boolean;
  auctionEndsAt: string;
}

const GemCard: React.FC<GemCardProps> = ({ id, name, image, currentBid, minimumBid, category, certified, auctionEndsAt }) => {
  const navigate = useNavigate();
  const daysRemaining = calculateDaysRemaining(auctionEndsAt);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-secondary-200"
    >
      {/* Image */}
      <div className="relative h-48 bg-secondary-100">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://via.placeholder.com/300x200?text=Gem+Image";
          }}
        />
        {certified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-2 rounded-full">
            Certified
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 text-xs py-1 px-2 rounded-full">
          {category}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">{name}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-secondary-600">Current Bid</p>
            <p className="text-lg font-bold text-primary-600">${currentBid}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-secondary-600">Min Next Bid</p>
            <p className="text-md font-semibold text-secondary-800">${minimumBid}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-secondary-500 mb-4">
          <span>{daysRemaining} days left</span>
        </div>
        
        <Button 
          onClick={() => navigate(`/gem/${id}`)}
          variant="primary"
          className="w-full"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  // Sample stats data
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
  
  // Featured gems data
  const featuredGems = [
    {
      id: 1,
      name: 'Premium Blue Sapphire',
      image: 'https://via.placeholder.com/300x200?text=Blue+Sapphire',
      currentBid: 4500,
      minimumBid: 4650,
      category: 'Sapphire',
      certified: true,
      description: 'A stunning blue sapphire with exceptional clarity and vibrant color. This gem has been certified by the Gemological Institute of Sri Lanka.',
      auctionEndsAt: '2025-07-15',
    },
    {
      id: 2,
      name: 'Natural Ruby',
      image: 'https://via.placeholder.com/300x200?text=Ruby',
      currentBid: 5800,
      minimumBid: 5950,
      category: 'Ruby',
      certified: true,
      description: 'Vibrant red ruby with minimal inclusions and brilliant luster. Perfect for premium jewelry creation.',
      auctionEndsAt: '2025-07-12',
    },
    {
      id: 3,
      name: 'Yellow Topaz',
      image: 'https://via.placeholder.com/300x200?text=Yellow+Topaz',
      currentBid: 2100,
      minimumBid: 2250,
      category: 'Topaz',
      certified: false,
      description: 'Golden yellow topaz with exceptional brilliance and excellent clarity. A rare find in this size.',
      auctionEndsAt: '2025-07-18',
    },
    {
      id: 4,
      name: 'Green Emerald',
      image: 'https://via.placeholder.com/300x200?text=Emerald',
      currentBid: 6200,
      minimumBid: 6400,
      category: 'Emerald',
      certified: true,
      description: 'Rich green emerald with perfect cut and clarity. Sourced from the famous mines of Sri Lanka.',
      auctionEndsAt: '2025-07-20',
    }
  ];
  
  // Testimonials data
  const testimonials = [
    {
      name: 'Anil Perera',
      role: 'Gem Seller',
      avatar: 'https://via.placeholder.com/64?text=AP',
      content: 'GemNet has transformed my business. The secure platform and verification system brings trust to online gem sales.'
    },
    {
      name: 'Priya Mendis',
      role: 'Collector',
      avatar: 'https://via.placeholder.com/64?text=PM',
      content: 'As a gem collector, I appreciate the detailed listings and certification information. GemNet makes it easy to find authentic stones.'
    },
    {
      name: 'Roshan Silva',
      role: 'Jewelry Designer',
      avatar: 'https://via.placeholder.com/64?text=RS',
      content: 'Finding quality gemstones for my designs used to be challenging. With GemNet, I can source verified gems with confidence.'
    }
  ];
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Secure Gem Trading with Identity Verification
              </h1>
              <p className="text-lg mb-8 text-primary-100">
                GemNet brings trust and transparency to online gem marketplace with advanced identity verification and secure transactions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="secondary" 
                  size="lg"
                  onClick={() => navigate('/marketplace')}
                >
                  Explore Marketplace
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/register')}
                  className="bg-white text-primary-800 hover:bg-primary-50"
                >
                  Register Now
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500 rounded-full opacity-20 blur-3xl"></div>
                <img 
                  src="https://via.placeholder.com/600x400?text=GemNet+Platform" 
                  alt="GemNet Platform" 
                  className="relative z-10 rounded-lg shadow-2xl max-w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stats.gems}+</div>
              <p className="text-secondary-600">Premium Gems</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stats.users}+</div>
              <p className="text-secondary-600">Verified Users</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">{stats.countries}</div>
              <p className="text-secondary-600">Countries</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">${stats.transactions}K+</div>
              <p className="text-secondary-600">Transaction Volume</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Gems Section */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-secondary-900 mb-4"
            >
              Featured Gems
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-secondary-600 max-w-2xl mx-auto"
            >
              Explore our curated selection of premium gems with verified authenticity and exceptional quality.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGems.map((gem, index) => (
              <motion.div
                key={gem.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <GemCard {...gem} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/marketplace')}
            >
              View All Gems
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-secondary-900 mb-4"
            >
              Why Choose GemNet
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-secondary-600 max-w-2xl mx-auto"
            >
              Our platform is designed to make gem trading secure, transparent and accessible for everyone.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<Shield size={24} />}
                title="Secure Identity Verification"
                description="Our multi-step verification process ensures all users are authenticated, bringing trust to online gem trading."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<Gem size={24} />}
                title="Gem Certification"
                description="All gems are certified and verified for authenticity, ensuring you only buy genuine products."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<Check size={24} />}
                title="Transparent Transactions"
                description="Every transaction is recorded and transparent, with secure payment processing and buyer protection."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<Users size={24} />}
                title="Vetted Community"
                description="Our community consists of verified buyers, sellers, and gem experts who maintain high standards."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<Globe size={24} />}
                title="Global Marketplace"
                description="Access gems from around the world and connect with international buyers and sellers."
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <FeatureCard 
                icon={<TrendingUp size={24} />}
                title="Market Insights"
                description="Get access to market trends, pricing insights, and expert evaluations to make informed decisions."
              />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-secondary-900 mb-4"
            >
              What Our Users Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-secondary-600 max-w-2xl mx-auto"
            >
              Hear from our community of buyers and sellers who use GemNet to trade gems securely.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Testimonial {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-4"
          >
            Ready to Start Trading Gems Securely?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg mb-8 text-primary-100 max-w-2xl mx-auto"
          >
            Join our verified community of gem enthusiasts, collectors, and traders today. 
            Get started with secure identity verification.
          </motion.p>          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button 
              variant="secondary" 
              size="lg"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
              className="bg-white text-primary-800 hover:bg-primary-50"
            >
              Sign In
            </Button>
          </motion.div>
          
          {/* Developer Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/backend-test')}
              className="bg-transparent border-primary-300 text-primary-200 hover:bg-primary-800 text-sm"
            >
              🔧 Backend Connection Test
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
