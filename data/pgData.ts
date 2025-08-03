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

export const suggestionsData: PgData[] = [
  {
    id: 's1',
    title: "Premium PG for Girls",
    price: "6500",
    location: "Sector 22, Noida",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"
    ],
    facilities: ['AC', 'WiFi', 'Laundry'],
    description: "Luxurious PG accommodation with modern amenities",
    distance: "2.5 km",
    phone: "+91 98765 43210",
    owner: "Mrs. Priya Sharma",
    type: 'suggestion'
  },
  {
    id: 's2',
    title: "Comfort Zone PG",
    price: "7200",
    location: "Vijay Nagar, Delhi",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['Geyser', 'WiFi'],
    description: "Comfortable and affordable PG for students",
    distance: "1.8 km",
    phone: "+91 98765 43211",
    owner: "Mr. Rajesh Kumar",
    type: 'suggestion'
  },
  {
    id: 's3',
    title: "Student Friendly PG",
    price: "6800",
    location: "Indira Nagar, Lucknow",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568"
    ],
    facilities: ['2 Meals', 'AC', 'TV'],
    description: "Perfect for students with meal facilities",
    distance: "3.1 km",
    phone: "+91 98765 43212",
    owner: "Mrs. Sunita Verma",
    type: 'suggestion'
  },
  {
    id: 's4',
    title: "Luxury PG Accommodation",
    price: "8000",
    location: "GTB Nagar, Delhi",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['Attached Washroom', 'Laundry'],
    description: "Premium accommodation with attached facilities",
    distance: "1.2 km",
    phone: "+91 98765 43213",
    owner: "Mr. Amit Singh",
    type: 'suggestion'
  },
  {
    id: 's5',
    title: "Budget Friendly PG",
    price: "5500",
    location: "Dwarka, Delhi",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    ],
    facilities: ['WiFi', 'Food'],
    description: "Affordable PG with basic amenities",
    distance: "4.5 km",
    phone: "+91 98765 43214",
    owner: "Mrs. Reena Patel",
    type: 'suggestion'
  }
];

export const nearestPgData: PgData[] = [
  {
    id: 'n1',
    title: "Premium PG for Girls",
    price: "6500",
    location: "Sector 22, Noida",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"
    ],
    facilities: ['AC', 'WiFi', 'Laundry'],
    description: "Luxurious PG accommodation with modern amenities",
    distance: "0.8 km",
    phone: "+91 98765 43215",
    owner: "Mrs. Priya Sharma",
    type: 'nearest'
  },
  {
    id: 'n2',
    title: "Comfort Zone PG",
    price: "7200",
    location: "Vijay Nagar, Delhi",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568"
    ],
    facilities: ['Geyser', 'WiFi'],
    description: "Comfortable and affordable PG for students",
    distance: "1.1 km",
    phone: "+91 98765 43216",
    owner: "Mr. Rajesh Kumar",
    type: 'nearest'
  },
  {
    id: 'n3',
    title: "Student Friendly PG",
    price: "6800",
    location: "Indira Nagar, Lucknow",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['2 Meals', 'AC', 'TV'],
    description: "Perfect for students with meal facilities",
    distance: "1.5 km",
    phone: "+91 98765 43217",
    owner: "Mrs. Sunita Verma",
    type: 'nearest'
  },
  {
    id: 'n4',
    title: "Luxury PG Accommodation",
    price: "8000",
    location: "GTB Nagar, Delhi",
    image: "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
    images: [
      "https://mojoboutique.com/cdn/shop/articles/how_to_decorate_a_bedroom_japanese_style_1344x.jpg?v=1704393568",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['Attached Washroom', 'Laundry'],
    description: "Premium accommodation with attached facilities",
    distance: "0.5 km",
    phone: "+91 98765 43218",
    owner: "Mr. Amit Singh",
    type: 'nearest'
  }
];

// Combined data for easy access
export const allPgData: PgData[] = [...suggestionsData, ...nearestPgData];

// Helper functions
export const getSuggestions = () => suggestionsData;
export const getNearestPg = () => nearestPgData;
export const getPgById = (id: string) => allPgData.find(pg => pg.id === id); 