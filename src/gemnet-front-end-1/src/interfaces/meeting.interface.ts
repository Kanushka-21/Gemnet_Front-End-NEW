export interface Meeting {
  id: string;
  date: string;
  time: string;
  gem: string;
  buyer: string;
  seller: string;
  status: 'scheduled' | 'completed' | 'pending';
  location?: string;
  notes?: string;
}