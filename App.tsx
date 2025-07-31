import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import SearchBar from './components/SearchBar';
import PgCard from './components/PgCard';
import BannerSlider from './components/BannerSlider';
import PgDetailsScreen from './components/PgDetailsScreen';
import { getSuggestions, getNearestPg, PgData } from './data/pgData';
import './global.css';

export default function App() {
  const [searchText, setSearchText] = useState('');
  const [selectedPg, setSelectedPg] = useState<PgData | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSearch = (text: string) => {
    console.log('Searching for:', text);
    // Add your search logic here
  };

  const handleFilterPress = () => {
    console.log('Filter button pressed');
    // Add your filter logic here
  };

  const handlePgCardPress = (pg: PgData) => {
    setSelectedPg(pg);
  };

  const handleBannerPress = (bannerItem: any) => {
    // Convert banner item to PgData format
    const pgData: PgData = {
      id: bannerItem.id,
      title: bannerItem.title,
      price: bannerItem.price,
      location: bannerItem.location,
      image: bannerItem.image,
      facilities: bannerItem.facilities,
      description: bannerItem.subtitle,
      distance: '2.5 km',
      type: 'suggestion'
    };
    setSelectedPg(pgData);
  };

  const handleBackPress = () => {
    setSelectedPg(null);
  };

  const handleBookNow = () => {
    console.log('Booking PG:', selectedPg?.title);
    // Add your booking logic here
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
    facilities: item.facilities
  }));

  // Show details screen if a PG is selected
  if (selectedPg) {
    return (
      <PgDetailsScreen
        id={selectedPg.id}
        title={selectedPg.title}
        price={selectedPg.price}
        location={selectedPg.location}
        image={selectedPg.image}
        facilities={selectedPg.facilities}
        description={selectedPg.description}
        distance={selectedPg.distance}
        phone={selectedPg.phone}
        owner={selectedPg.owner}
        onBack={handleBackPress}
        onBookNow={handleBookNow}
      />
    );
  }

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
      </ScrollView>
    </View>
  );
}
