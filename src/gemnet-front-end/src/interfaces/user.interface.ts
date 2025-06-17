export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  registrationDate: string;
  status: 'active' | 'blocked';
  bidsCount?: number;
  purchasesCount?: number;
  listingsCount?: number;
  salesCount?: number;
  blockReason?: string;
}