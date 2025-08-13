export interface PgData {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  images?: string[]; // Multiple images for slider
  facilities: string[];
  description?: string;
  distance?: string;
  phone?: string;
  owner?: string;
  type?: 'suggestion' | 'nearest';
} 