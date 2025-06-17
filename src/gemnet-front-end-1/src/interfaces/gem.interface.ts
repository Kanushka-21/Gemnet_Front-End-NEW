export interface Gem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  sellerId: string;
  sellerName: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'available' | 'sold' | 'pending';
}