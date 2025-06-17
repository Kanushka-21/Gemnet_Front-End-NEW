import React, { useState, useEffect } from 'react';

// Simple button component for standalone use
const SimpleButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}> = ({ children, onClick, variant = 'primary', size = 'md', className = '' }) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none cursor-pointer';
  
  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 border border-blue-600'
  };
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
};

// Simple layout component
const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-600">GemNet</h1>
            </div>
            <div className="flex items-center space-x-4">
              <SimpleButton variant="outline" size="sm">Login</SimpleButton>
              <SimpleButton variant="primary" size="sm">Register</SimpleButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Simple Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 GemNet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

// Helper function to calculate days until auction end
const calculateDaysRemaining = (endDateStr: string): number => {
  const endDate = new Date(endDateStr);
  const today = new Date();
  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};

// Simple feature card component
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 h-full flex flex-col">
    <div className="mb-4 text-blue-600 text-2xl">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 flex-grow">{description}</p>
  </div>
);

// Simple gem card component
const GemCard: React.FC<{
  id: number;
  name: string;
  image: string;
  currentBid: number;
  minimumBid: number;
  category: string;
  certified: boolean;
  auctionEndsAt: string;
}> = ({ id, name, image, currentBid, minimumBid, category, certified, auctionEndsAt }) => {
  const daysRemaining = calculateDaysRemaining(auctionEndsAt);
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-sm text-gray-600">Current Bid</p>
            <p className="text-lg font-bold text-blue-600">${currentBid}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Min Next Bid</p>
            <p className="text-md font-semibold text-gray-800">${minimumBid}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
          <span>{daysRemaining} days left</span>
        </div>
        
        <SimpleButton 
          onClick={() => alert(`Viewing details for ${name}`)}
          variant="primary"
          className="w-full"
        >
          View Details
        </SimpleButton>
      </div>
    </div>
  );
};

const SimpleHomePage: React.FC = () => {
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
      auctionEndsAt: '2025-07-20',
    }
  ];
  
  return (
    <SimpleLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                Secure Gem Trading with Identity Verification
              </h1>
              <p className="text-lg mb-8 text-blue-100">
                GemNet brings trust and transparency to online gem marketplace with advanced identity verification and secure transactions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <SimpleButton 
                  variant="secondary" 
                  size="lg"
                  onClick={() => alert('Navigate to marketplace')}
                >
                  Explore Marketplace
                </SimpleButton>
                <SimpleButton 
                  variant="outline"
                  size="lg"
                  onClick={() => alert('Navigate to register')}
                  className="bg-white text-blue-800 hover:bg-blue-50"
                >
                  Register Now
                </SimpleButton>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <img 
                  src="https://via.placeholder.com/600x400?text=GemNet+Platform" 
                  alt="GemNet Platform" 
                  className="relative z-10 rounded-lg shadow-2xl max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stats.gems}+</div>
              <p className="text-gray-600">Premium Gems</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stats.users}+</div>
              <p className="text-gray-600">Verified Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stats.countries}</div>
              <p className="text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">${stats.transactions}K+</div>
              <p className="text-gray-600">Transaction Volume</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Gems Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Gems
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our curated selection of premium gems with verified authenticity and exceptional quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGems.map((gem) => (
              <GemCard key={gem.id} {...gem} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <SimpleButton 
              variant="primary" 
              size="lg"
              onClick={() => alert('Navigate to marketplace')}
            >
              View All Gems
            </SimpleButton>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GemNet
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make gem trading secure, transparent and accessible for everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon="🛡️"
              title="Secure Identity Verification"
              description="Our multi-step verification process ensures all users are authenticated, bringing trust to online gem trading."
            />
            <FeatureCard 
              icon="💎"
              title="Gem Certification"
              description="All gems are certified and verified for authenticity, ensuring you only buy genuine products."
            />
            <FeatureCard 
              icon="✅"
              title="Transparent Transactions"
              description="Every transaction is recorded and transparent, with secure payment processing and buyer protection."
            />
            <FeatureCard 
              icon="👥"
              title="Vetted Community"
              description="Our community consists of verified buyers, sellers, and gem experts who maintain high standards."
            />
            <FeatureCard 
              icon="🌍"
              title="Global Marketplace"
              description="Access gems from around the world and connect with international buyers and sellers."
            />
            <FeatureCard 
              icon="📈"
              title="Market Insights"
              description="Get access to market trends, pricing insights, and expert evaluations to make informed decisions."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Trading Gems Securely?
          </h2>
          <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
            Join our verified community of gem enthusiasts, collectors, and traders today. 
            Get started with secure identity verification.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <SimpleButton 
              variant="secondary" 
              size="lg"
              onClick={() => alert('Navigate to register')}
            >
              Create Account
            </SimpleButton>
            <SimpleButton 
              variant="outline" 
              size="lg"
              onClick={() => alert('Navigate to login')}
              className="bg-white text-blue-800 hover:bg-blue-50"
            >
              Sign In
            </SimpleButton>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
};

export default SimpleHomePage;
