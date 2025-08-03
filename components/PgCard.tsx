import { View, Text, ViewStyle } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import CachedImage from './CachedImage';

interface PgCardProps {
  image: string;
  price: string;
  location: string;
  title: string;
  facilities: string[];
  style?: ViewStyle; // Optional custom styling for width/margin
}

const PgCard = ({ image, price, location, title, facilities, style }: PgCardProps) => {
  const visibleItems = facilities.slice(0, 3); // only show first 3
  const hasMore = facilities.length > 3;

  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-md mb-4" style={style}>
      {/* Image with location overlay */}
      <View className="relative">
        <CachedImage
          source={{ uri: image }}
          style={{ width: '100%', height: 144 }}
          resizeMode="cover"
        />
        {/* Location overlay on top of image */}
        <View className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-lg px-2 py-1">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={12} color="white" />
            <Text className="text-white ml-1 text-xs font-medium" numberOfLines={1} style={{ maxWidth: 120 }}>
              {location}
            </Text>
          </View>
        </View>
      </View>

      {/* Content below image */}
      <View className="p-3">
        <Text className="text-base font-semibold text-black mb-1" numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text className="text-lg font-bold text-black mb-2">₹{price}/month</Text>

        {/* Facilities - single row with ellipsis */}
        <View className="flex-row items-center flex-nowrap overflow-hidden">
          {visibleItems.map((item, index) => (
            <View key={index} className="bg-gray-200 rounded-full px-2 py-0.5 mr-1">
              <Text className="text-[10px] text-gray-700">{item}</Text>
            </View>
          ))}
          {hasMore && (
            <View className="bg-gray-300 rounded-full px-2 py-0.5">
              <Text className="text-[10px] text-gray-700">...</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PgCard;
