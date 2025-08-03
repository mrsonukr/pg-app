import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import CachedImage from './CachedImage';
const { width } = Dimensions.get('window');
import { StatusBar } from 'expo-status-bar';


interface PgDetailsProps {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  facilities: string[];
  description?: string;
  distance?: string;
  phone?: string;
  owner?: string;
  onBookNow: () => void;
}

export default function PgDetailsScreen({
  id,
  title,
  price,
  location,
  image,
  facilities,
  description,
  distance,
  phone,
  owner,
  onBookNow
}: PgDetailsProps) {
  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Header with Image */}
      <View className="relative h-80">
        <CachedImage
          source={{ uri: image }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Title, Location, and Price Section */}
        <View className="py-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-800 mb-2" numberOfLines={2}>
            {title}
          </Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="location" size={16} color="#6B7280" />
            <Text className="text-gray-600 ml-1 text-base" numberOfLines={1}>
              {location}
            </Text>
          </View>
          <Text className="text-2xl font-bold text-black">₹{price}/month</Text>
        </View>

        {/* Quick Info */}
        <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={20} color="#6B7280" />
            <Text className="text-gray-600 ml-1">{distance || '2.5 km'}</Text>
          </View>
          {owner && (
            <View className="flex-row items-center">
              <Ionicons name="person-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600 ml-1">{owner}</Text>
            </View>
          )}
        </View>

        {/* Description */}
        <View className="py-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-2">Description</Text>
          <Text className="text-gray-600 leading-6">
            {description || "Experience comfortable and modern living in this well-maintained PG accommodation. Perfect for students and working professionals looking for a convenient and affordable housing solution."}
          </Text>
        </View>

        {/* Facilities */}
        <View className="py-4 border-b border-gray-200">
          <Text className="text-lg font-bold text-gray-800 mb-3">Facilities</Text>
          <View className="flex-row flex-wrap">
            {facilities.map((facility, index) => (
              <View key={index} className="bg-gray-100 rounded-full px-4 py-2 mr-3 mb-2">
                <Text className="text-gray-700 font-medium">{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Additional Info */}
        <View className="py-4">
          <Text className="text-lg font-bold text-gray-800 mb-3">Additional Information</Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="bed-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600 ml-3">Single occupancy room</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="wifi-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600 ml-3">High-speed WiFi included</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="restaurant-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600 ml-3">Meals available (optional)</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="car-outline" size={20} color="#6B7280" />
              <Text className="text-gray-600 ml-3">Parking available</Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Call Now Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white pb-10 py-4 px-4">
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.3)',
            'rgba(255, 255, 255, 0.6)',
            'rgba(255, 255, 255, 0.9)',
            'rgb(255, 255, 255)',
          ]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -25,
            height: 25,
            zIndex: 10,
          }}
          pointerEvents="none"
        />

        <Button
          mode="contained"
          onPress={handleCall}
          buttonColor="black"
          contentStyle={{ paddingVertical: 8 }}
          labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
          icon={() => <Ionicons name="call" size={20} color="white" style={{ marginRight: 8 }} />}
        >
          Call Now
        </Button>
      </View>
    </View>
  );
} 