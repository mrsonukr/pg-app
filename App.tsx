import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';

// Enable screens for better performance
enableScreens();

import SearchBar from './components/SearchBar';
import PgCard from './components/PgCard';
import BannerSlider from './components/BannerSlider';
import PgDetailsScreen from './components/PgDetailsScreen';
import { PgData } from './data/pgData';
import { fetchSuggestions, fetchNearestPgs } from './api/pgApi';
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
  const [suggestions, setSuggestions] = useState<PgData[]>([]);
  const [nearestPg, setNearestPg] = useState<PgData[]>([]);
  const [loading, setLoading] = useState(true);

  const scrollViewRef = useRef<ScrollView>(null);

  // Convert API data to PgData format
  const convertApiToPgData = (apiData: any[]) => {
    if (!Array.isArray(apiData)) {
      return [];
    }
    
    return apiData.map(item => ({
      id: item.id || '',
      title: item.title || 'PG Accommodation',
      price: item.price || '0',
      location: item.location || 'Location not available',
      image: Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : '',
      images: Array.isArray(item.images) ? item.images : [],
      facilities: Array.isArray(item.facilities) ? item.facilities : [],
      description: item.description || 'No description available',
      distance: item.distance || 'Distance not available',
      phone: item.phone || '',
      owner: item.owner || ''
    }));
  };

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Add a small delay to show the loading screen
        await new Promise(resolve => setTimeout(resolve, 1500));
        
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
    
    // Remove duplicates based on ID
    const uniqueResults = results.filter((pg, index, self) => 
      index === self.findIndex(p => p.id === pg.id)
    );
    
    setSearchResults(uniqueResults);
  };

  // Clear search function
  const handleClearSearch = () => {
    setSearchText('');
    setIsSearching(false);
    setSearchResults([]);
  };

  // Show loading state
  if (loading) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-8">
        <View className="items-center">
          {/* Location icon with black round background */}
          <View className="w-16 h-16 bg-black rounded-full items-center justify-center mb-6">
            <Ionicons name="location" size={32} color="white" />
          </View>
          
          <Text className="text-xl font-semibold text-gray-800 text-center mb-2">
            Finding your nearest PGs
          </Text>
          
          <Text className="text-gray-600 text-center text-base">
            Discovering the best accommodations around you...
          </Text>
          
          {/* Default platform spinner */}
          <View className="mt-6">
            <ActivityIndicator 
              size="large" 
              color="#000000" 
              animating={true}
            />
          </View>
        </View>
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
  const bannerData = isSearching 
    ? searchResults.slice(0, 3).map(item => ({
        id: item.id,
        title: item.title,
        subtitle: item.description || '',
        price: item.price,
        location: item.location,
        image: item.image,
        images: item.images,
        facilities: item.facilities
      }))
    : suggestions.map(item => ({
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
          onClear={handleClearSearch}
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
        contentContainerStyle={{ 
          paddingTop: 10,
          paddingBottom: 20
        }}
      >
        {isSearching ? (
          /* Search Results */
          <View className="mt-4 pb-6">
            <Text className="text-lg font-bold text-black px-4 mb-3">
              Search Results ({searchResults.length})
            </Text>
            {searchResults.length > 0 ? (
              <View className="flex-row flex-wrap justify-between px-4">
                {searchResults.map((item, index) => (
                  <TouchableOpacity
                    key={`search_${item.id}_${index}`}
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
                Featured PGs
              </Text>
              {suggestions.length > 0 ? (
                <BannerSlider 
                  data={bannerData}
                  autoScroll={true}
                  scrollInterval={4000}
                  onBannerPress={handleBannerPress}
                />
              ) : (
                <View className="px-4 py-8 items-center">
                  <Text className="text-gray-500 text-center text-base">
                    No featured PGs available
                  </Text>
                </View>
              )}
            </View>

            {/* Nearest PG Available section */}
            <View className="mt-6 pb-6">
              <Text className="text-lg font-bold text-black px-4 mb-3">
                Nearest PG Available
              </Text>
              {nearestPg.length > 0 ? (
                <View className="flex-row flex-wrap justify-between px-4">
                  {nearestPg.map((item, index) => (
                    <TouchableOpacity
                      key={`nearest_${item.id}_${index}`}
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
                    No nearby PGs available
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>
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
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Set navigation bar style for Android
      NavigationBar.setBackgroundColorAsync('#E4E2DF');
    }
  }, []);

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}