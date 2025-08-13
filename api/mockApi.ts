// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data that would come from your backend
const mockPgData = [
  {
    id: 'api_1',
    title: "Premium PG for Girls",
    price: "6500",
    location: "Sector 22, Noida",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['AC', 'WiFi', 'Laundry'],
    description: "Luxurious PG accommodation with modern amenities",
    distance: "2.5 km",
    phone: "+91 98765 43210",
    owner: "Mrs. Priya Sharma"
  },
  {
    id: 'api_2',
    title: "Comfort Zone PG",
    price: "7200",
    location: "Vijay Nagar, Delhi",
    images: [
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['Geyser', 'WiFi'],
    description: "Comfortable and affordable PG for students",
    distance: "1.8 km",
    phone: "+91 98765 43211",
    owner: "Mr. Rajesh Kumar"
  },
  {
    id: 'api_3',
    title: "Student Friendly PG",
    price: "6800",
    location: "Indira Nagar, Lucknow",
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['2 Meals', 'AC', 'TV'],
    description: "Perfect for students with meal facilities",
    distance: "3.1 km",
    phone: "+91 98765 43212",
    owner: "Mrs. Sunita Verma"
  },
  {
    id: 'api_4',
    title: "Luxury PG Accommodation",
    price: "8000",
    location: "GTB Nagar, Delhi",
    images: [
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg"
    ],
    facilities: ['Attached Washroom', 'Laundry'],
    description: "Premium accommodation with attached facilities",
    distance: "1.2 km",
    phone: "+91 98765 43213",
    owner: "Mr. Amit Singh"
  },
  {
    id: 'api_5',
    title: "Budget Friendly PG",
    price: "5500",
    location: "Dwarka, Delhi",
    images: [
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg"
    ],
    facilities: ['WiFi', 'Food'],
    description: "Affordable PG with basic amenities",
    distance: "4.5 km",
    phone: "+91 98765 43214",
    owner: "Mrs. Reena Patel"
  },
  {
    id: 'api_6',
    title: "Executive PG for Professionals",
    price: "9500",
    location: "Cyber City, Gurgaon",
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
    ],
    facilities: ['AC', 'WiFi', 'Housekeeping', 'Gym'],
    description: "Premium PG designed for working professionals",
    distance: "0.8 km",
    phone: "+91 98765 43215",
    owner: "Mr. Vikash Gupta"
  }
];

// Mock API functions that simulate real API calls

export const fetchSuggestions = async (limit = 3) => {
  await delay(600);
  
  // Get random PGs for banner/suggestions
  const shuffled = [...mockPgData].sort(() => 0.5 - Math.random());
  const suggestions = shuffled.slice(0, Math.min(limit, 3));
  
  return {
    success: true,
    data: suggestions,
    total: suggestions.length
  };
};

export const fetchNearestPgs = async (limit = 10) => {
  await delay(700);
  
  // Return all PGs as nearest
  const nearest = mockPgData.slice(0, limit);
  
  return {
    success: true,
    data: nearest,
    total: nearest.length
  };
};