// Mock data for development and testing
import { getPlaceholderImage } from '@/utils/placeholderImages';

export const mockUser = {
  userId: "user-123",
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  isVerified: true,
  verificationStatus: "SUCCESS",
  role: "buyer" // Can be 'buyer', 'seller', or 'admin'
};

export const mockGems = [
  {
    id: 1,
    name: "Blue Sapphire",
    description: "A stunning blue sapphire with excellent clarity and color.",
    category: "Sapphire",
    currentBid: 4500,
    minimumBid: 4650,
    image: getPlaceholderImage('blue sapphire'),
    certified: true,
    weight: 3.2, // carats
    dimensions: "8mm x 6mm",
    origin: "Sri Lanka",
    auctionEndsAt: "2025-07-15",
    sellerId: "seller-456",
    sellerName: "GemTraders Inc.",
    views: 245,
    watchlists: 32,
    bids: 8
  },
  {
    id: 2,
    name: "Ruby Star",
    description: "Premium ruby with vibrant red color and minimal inclusions.",
    category: "Ruby",
    currentBid: 5800,
    minimumBid: 5950,
    image: getPlaceholderImage('ruby'),
    certified: true,
    weight: 2.8, // carats
    dimensions: "7mm x 7mm",
    origin: "Myanmar",
    auctionEndsAt: "2025-07-12",
    sellerId: "seller-789",
    sellerName: "Royal Gems",
    views: 189,
    watchlists: 24,
    bids: 6
  },
  {
    id: 3,
    name: "Yellow Topaz",
    description: "Golden yellow topaz with exceptional brilliance.",
    category: "Topaz",
    currentBid: 2100,
    minimumBid: 2250,
    image: getPlaceholderImage('yellow topaz'),
    certified: false,
    weight: 4.5, // carats
    dimensions: "9mm x 7mm",
    origin: "Brazil",
    auctionEndsAt: "2025-07-18",
    sellerId: "seller-123",
    sellerName: "TopGems Co.",
    views: 132,
    watchlists: 15,
    bids: 3
  },
  {
    id: 4,
    name: "Green Emerald",
    description: "Rich green emerald with perfect cut and clarity.",
    category: "Emerald",
    currentBid: 6200,
    minimumBid: 6400,
    image: getPlaceholderImage('emerald'),
    certified: true,
    weight: 2.3, // carats
    dimensions: "6mm x 6mm",
    origin: "Colombia",
    auctionEndsAt: "2025-07-20",
    sellerId: "seller-456",
    sellerName: "GemTraders Inc.",
    views: 267,
    watchlists: 41,
    bids: 11
  }
];

export const mockBids = [
  {
    id: 1,
    gemId: 1,
    gemName: "Blue Sapphire",
    currentBid: 4500,
    yourBid: 4500,
    endTime: "2025-05-08",
    status: "highest",
    image: getPlaceholderImage('blue sapphire', '100x100')
  },
  {
    id: 2,
    gemId: 2,
    gemName: "Ruby Star",
    currentBid: 5800,
    yourBid: 5750,
    endTime: "2025-05-07",
    status: "outbid",
    image: getPlaceholderImage('ruby', '100x100')
  }
];
