import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer,RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

import SearchBar from './components/SearchBar';
import PgCard from './components/PgCard';
import BannerSlider from './components/BannerSlider';
import PgDetailsScreen from './components/PgDetailsScreen';
import { getSuggestions, getNearestPg, PgData } from './data/pgData';
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
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSearch = (text: string) => {
    console.log('Searching for:', text);
    if (text.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Search in all PG data
    const allData = [...suggestions, ...nearestPg];
    const results = allData.filter(pg => 
      pg.title.toLowerCase().includes(text.toLowerCase()) ||
      pg.location.toLowerCase().includes(text.toLowerCase()) ||
      pg.facilities.some(facility => facility.toLowerCase().includes(text.toLowerCase()))
    );
    
    setSearchResults(results);
  };

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    if (text.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const handleFilterPress = () => {
    console.log('Filter button pressed');
    // Add your filter logic here
  };

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

  const suggestions = getSuggestions();
  const nearestPg = getNearestPg();

  // Transform suggestions data for banner slider
  const bannerData = suggestions.map(item => ({
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
          onChangeText={setSearchText}
          onSearch={handleSearch}
          onFilterPress={handleFilterPress}
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
              Search Results ({searchResults.length})
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
              <Text className="text-lg font-bold text-black px-4 mb-3">Featured PGs</Text>
              <BannerSlider 
                data={bannerData}
                autoScroll={true}
                scrollInterval={4000}
                onBannerPress={handleBannerPress}
              />
            </View>

            {/* Nearest PG Available section */}
            <View className="mt-6 pb-6">
              <Text className="text-lg font-bold text-black px-4 mb-3">Nearest PG Available</Text>
              <View className="flex-row flex-wrap justify-between px-4">
                {nearestPg.map((item, index) => (
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
