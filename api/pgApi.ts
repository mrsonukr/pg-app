// Real API base URL
const API_BASE_URL = 'https://pgapp.mssonukr.workers.dev';

// Helper function to parse JSON strings from API response
const parseJsonString = (jsonString: string | null | undefined) => {
  if (!jsonString || typeof jsonString !== 'string') {
    return [];
  }
  
  try {
    const parsed = JSON.parse(jsonString);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Error parsing JSON string:', error);
    return [];
  }
};

// Transform API data to match app's expected format
const transformPgData = (apiData: any) => {
  return {
    id: apiData.id || '',
    title: apiData.title || 'PG Accommodation',
    price: (apiData.price || '0').toString(),
    location: apiData.location || 'Location not available',
    images: parseJsonString(apiData.images),
    facilities: parseJsonString(apiData.facilities),
    description: apiData.description || 'No description available',
    distance: apiData.distance_km ? `${apiData.distance_km} km` : 'Distance not available',
    phone: apiData.phone || '',
    owner: apiData.owner || ''
  };
};

// Real API functions

export const fetchSuggestions = async (limit = 3) => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Get random PGs for banner/suggestions
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    const suggestions = shuffled.slice(0, Math.min(limit, 3));
    
    return {
      success: true,
      data: suggestions.map(transformPgData),
      total: suggestions.length
    };
  } catch (error: any) {
    console.error('Error fetching suggestions:', error);
    return {
      success: false,
      data: [],
      total: 0,
      error: error.message || 'Unknown error'
    };
  }
};

export const fetchNearestPgs = async (limit = 10) => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API');
    }
    
    // Return all PGs as nearest (sorted by distance)
    const nearest = data
      .sort((a: any, b: any) => (a.distance_km || 0) - (b.distance_km || 0))
      .slice(0, limit);
    
    return {
      success: true,
      data: nearest.map(transformPgData),
      total: nearest.length
    };
  } catch (error: any) {
    console.error('Error fetching nearest PGs:', error);
    return {
      success: false,
      data: [],
      total: 0,
      error: error.message || 'Unknown error'
    };
  }
};

// Function to fetch a single PG by ID
export const fetchPgById = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: transformPgData(data)
    };
  } catch (error: any) {
    console.error('Error fetching PG by ID:', error);
    return {
      success: false,
      data: null,
      error: error.message || 'Unknown error'
    };
  }
};