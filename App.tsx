import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import SearchBar from './components/SearchBar';
import PgCard from './components/PgCard';
import BannerSlider from './components/BannerSlider';
import PgDetailsScreen from './components/PgDetailsScreen';
import FilterModal, { FilterOptions } from './components/FilterModal';
import { PgData } from './data/pgData';
import { fetchSuggestions, fetchNearestPgs } from './api/mockApi';
import './global.css';

type RootStackParamList = {
  Home: undefined;
  PgDetails: { pg: PgData };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PgDetails'>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'PgDetails'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

// Home Screen Component
function HomeScreen({ navigation }: { navigation: HomeScreenNavigationProp }) {
  const [searchText, setSearchText] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<PgData[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [suggestions, setSuggestions] = useState<PgData[]>([]);
  const [nearestPg, setNearestPg] = useState<PgData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: 0,
    maxPrice: 10000,
    selectedFacilities: []
  });

  const scrollViewRef = useRef<ScrollView>(null);

  // Convert API data to PgData format
  const convertApiToPgData = (apiData) => {
    return apiData.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      location: item.location,
      image: item.images[0] || '',
      images: item.images,
      facilities: item.facilities,
      description: item.description,
      distance: item.distance,
      phone: item.phone,
      owner: item.owner
    }));
  };

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch data from API
        const [suggestionsResponse, nearestResponse] = await Promise.all([
          fetchSuggestions(),
          fetchNearestPgs()
        ]);

        if (suggestionsResponse.success) {
          setSuggestions(convertApiToPgData(suggestionsResponse.data));
        }

        if (nearestResponse.success) {
          setNearestPg(convertApiToPgData(nearestResponse.data));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const allData = [...suggestions, ...nearestPg];

  // Apply filters function
  const applyFilters = (data: PgData[]) => {
    let filtered = data.filter(pg => {
      const price = parseInt(pg.price);
      
      // Price range filter
      if (price < filters.minPrice || price > filters.maxPrice) {
        return false;
      }
      
      // Facilities filter
      if (filters.selectedFacilities.length > 0) {
        const hasRequiredFacilities = filters.selectedFacilities.every(facility =>
          pg.facilities.includes(facility)
        );
        if (!hasRequiredFacilities) {
          return false;
        }
      }
      
      return true;
    });

    return filtered;
  };

  // Enhanced search function with live search
  const handleSearch = (text: string) => {
    setSearchText(text);
    
    if (text.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Enhanced search across multiple fields
    const results = allData.filter(pg => {
      const searchTerm = text.toLowerCase();
      return (
        // Search in title/name
        pg.title.toLowerCase().includes(searchTerm) ||
        // Search in location
        pg.location.toLowerCase().includes(searchTerm) ||
        // Search in facilities
        pg.facilities.some(facility => facility.toLowerCase().includes(searchTerm)) ||
        // Search in description
        (pg.description && pg.description.toLowerCase().includes(searchTerm)) ||
        // Search in owner name
        (pg.owner && pg.owner.toLowerCase().includes(searchTerm)) ||
        // Search in price
        pg.price.includes(searchTerm)
      );
    });
    
    // Apply current filters to search results
    const filteredResults = applyFilters(results);
    setSearchResults(filteredResults);
  };

  // Update filtered data when filters change
  useEffect(() => {
    // If currently searching, re-apply search with new filters
    if (isSearching && searchText.trim() !== '') {
      handleSearch(searchText);
    }
  }, [filters]);

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleFilterPress = () => {
    setShowFilterModal(true);
  };

  // Get data to display based on current state
  const getDisplayData = () => {
    if (isSearching) {
      return { 
        suggestions: searchResults.slice(0, 3), // First 3 for banner
        nearest: searchResults // All for nearest section
      };
    }
    
    const filteredSuggestions = applyFilters(suggestions);
    const filteredNearest = applyFilters(nearestPg);
    
    return { suggestions: filteredSuggestions, nearest: filteredNearest };
  };

  const displayData = getDisplayData();

  const hasActiveFilters = filters.minPrice > 0 || filters.maxPrice < 10000 || filters.selectedFacilities.length > 0;

  // Show loading state
  if (loading) {
    return (
      <View className="flex-1 bg-[#E4E2DF] justify-center items-center">
        <Text className="text-lg text-gray-600">Loading PG data...</Text>
      </View>
    );
  }

  const handlePgCardPress = (pg: PgData) => {
    navigation.navigate('PgDetails', { pg });
  };

  const handleBannerPress = (bannerItem: any) => {
    // Convert banner item to PgData format
    const pgData: PgData = {
      id: bannerItem.id,
      title: bannerItem.title,
      price: bannerItem.price,
      location: bannerItem.location,
      image: bannerItem.image,
      images: bannerItem.images,
      facilities: bannerItem.facilities,
      description: bannerItem.subtitle,
      distance: '2.5 km',
      type: 'suggestion'
    };
    navigation.navigate('PgDetails', { pg: pgData });
  };

  // Transform suggestions data for banner slider
  const bannerData = displayData.suggestions.map(item => ({
    id: item.id,
    title: item.title,
    subtitle: item.description || '',
    price: item.price,
    location: item.location,
    image: item.image,
    images: item.images,
    facilities: item.facilities
  }));

  return (
    <View className="flex-1 bg-[#E4E2DF]">
      <StatusBar style="dark" />
      <SafeAreaView className="h-10" />

      {/* Fixed Search Bar with enhanced fade */}
      <View className="relative z-20">
        <SearchBar
          value={searchText}
          onChangeText={handleSearch}
          onSearch={handleSearch}
          onFilterPress={handleFilterPress}
          filterButtonStyle={hasActiveFilters ? { backgroundColor: '#ccc' } : {}}
        />
        
        {/* Additional fade overlay for better visibility */}
        <LinearGradient
          colors={['rgba(228,226,223,0.8)', 'rgba(228,226,223,0.4)', 'rgba(228,226,223,0)']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '100%',
            height: 20,
            zIndex: 15,
          }}
          pointerEvents='none'
        />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingTop: 10 }}
      >
        {isSearching ? (
          /* Search Results */
          <View className="mt-4 pb-6">
            <Text className="text-lg font-bold text-black px-4 mb-3">
              Search Results ({searchResults.length}) {hasActiveFilters && '(Filtered)'}
            </Text>
            {searchResults.length > 0 ? (
              <View className="flex-row flex-wrap justify-between px-4">
                {searchResults.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handlePgCardPress(item)}
                    style={{ width: '48%' }}
                    activeOpacity={0.9}
                  >
                    <PgCard
                      image={item.image}
                      title={item.title}
                      price={item.price}
                      location={item.location}
                      facilities={item.facilities}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View className="px-4 py-8 items-center">
                <Text className="text-gray-500 text-center mt-4 text-base">
                  No PGs found for "{searchText}"
                </Text>
                <Text className="text-gray-400 text-center mt-2 text-sm">
                  Try searching with different keywords
                </Text>
              </View>
            )}
          </View>
        ) : (
          <>
            {/* Banner Slider Section */}
            <View className="mt-4">
              <Text className="text-lg font-bold text-black px-4 mb-3">
                Featured PGs {hasActiveFilters && '(Filtered)'}
              </Text>
              {displayData.suggestions.length > 0 ? (
                <BannerSlider 
                  data={bannerData}
                  autoScroll={true}
                  scrollInterval={4000}
                  onBannerPress={handleBannerPress}
                />
              ) : (
                <View className="px-4 py-8 items-center">
                  <Text className="text-gray-500 text-center text-base">
                    No featured PGs match your filters
                  </Text>
                </View>
              )}
            </View>

            {/* Nearest PG Available section */}
            <View className="mt-6 pb-6">
              <Text className="text-lg font-bold text-black px-4 mb-3">
                Nearest PG Available {hasActiveFilters && '(Filtered)'}
              </Text>
              {displayData.nearest.length > 0 ? (
                <View className="flex-row flex-wrap justify-between px-4">
                  {displayData.nearest.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => handlePgCardPress(item)}
                      style={{ width: '48%' }}
                      activeOpacity={0.9}
                    >
                      <PgCard
                        image={item.image}
                        title={item.title}
                        price={item.price}
                        location={item.location}
                        facilities={item.facilities}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View className="px-4 py-8 items-center">
                  <Text className="text-gray-500 text-center text-base">
                    No nearby PGs match your filters
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
    </View>
  );
}

// Details Screen Component
function DetailsScreen({ route, navigation }: { route: DetailsScreenRouteProp; navigation: DetailsScreenNavigationProp }) {
  const { pg } = route.params;

  return (
    <PgDetailsScreen pg={pg} />
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PgDetails" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}