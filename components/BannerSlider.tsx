import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  location: string;
  image: string;
  facilities: string[];
}

interface BannerSliderProps {
  data: BannerItem[];
  autoScroll?: boolean;
  scrollInterval?: number;
  onBannerPress?: (item: BannerItem) => void;
}

export default function BannerSlider({
  data,
  autoScroll = true,
  scrollInterval = 3000,
  onBannerPress
}: BannerSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }, scrollInterval);

    return () => clearInterval(interval);
  }, [currentIndex, data.length, autoScroll, scrollInterval]);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  const renderBannerItem = (item: BannerItem, index: number) => (
    <TouchableOpacity
      key={item.id}
      style={{ width }}
      onPress={() => onBannerPress?.(item)}
      activeOpacity={0.7}
    >
      <View className="mx-4 h-56 rounded-2xl overflow-hidden shadow-lg relative">
        {/* Full Banner Image */}
        <Image
          source={{ uri: item.image }}
          style={{
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}
        />

        {/* Gradient Overlay for Text Readability */}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.42)', 'rgba(0, 0, 0, 0.74)']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60%',
          }}
        />

        {/* Price Badge */}
        <View className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 ">
          <Text className="text-black font-bold text-sm">@ ₹{item.price}</Text>
        </View>

        {/* Content Overlay */}
        <View className="absolute bottom-0 left-0 right-0 p-4">
          {/* Facilities - Upper Section */}
          <View className="flex-row flex-wrap mb-1">
            {item.facilities.slice(0, 3).map((facility, idx) => (
              <View key={idx} className="bg-white bg-opacity-20 rounded-full px-3 py-1 mr-2 mb-1">
                <Text className="text-black text-xs font-medium">{facility}</Text>
              </View>
            ))}
            {item.facilities.length > 3 && (
              <View className="bg-white bg-opacity-20 rounded-full px-3 py-1">
                <Text className="text-white text-xs font-medium">+{item.facilities.length - 3} more</Text>
              </View>
            )}
          </View>

          {/* Title and Location - Lower Section */}
          <Text className="text-white text-xl font-bold mb-1" numberOfLines={1}>
            {item.title}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="location" size={14} color="#E5E7EB" />
            <Text className="text-gray-200 text-sm ml-1" numberOfLines={1}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={width}
        snapToAlignment="center"
      >
        {data.map((item, index) => renderBannerItem(item, index))}
      </ScrollView>
    </View>
  );
} 