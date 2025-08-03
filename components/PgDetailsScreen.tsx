import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Linking,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import CachedImage from './CachedImage';
import { PgData } from '../data/pgData';

const { width } = Dimensions.get('window');

interface PgDetailsProps {
  pg: PgData;
}

export default function PgDetailsScreen({ pg }: PgDetailsProps) {
  const {
    title,
    price,
    location,
    image,
    images,
    facilities,
    description,
    distance,
    phone,
    owner,
  } = pg;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const imageList = images && images.length > 0 ? images : [image];
  const hasMultipleImages = imageList.length > 1;

  const handleCall = () => {
    if (phone) {
      Linking.openURL(`tel:${phone}`);
    }
  };

  const handleImageScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentImageIndex(index);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar hidden />

      {/* Image Slider */}
      <View className="relative h-80">
        {hasMultipleImages ? (
          <>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={handleImageScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={width}
              snapToAlignment="center"
            >
              {imageList.map((imageUri, index) => (
                <CachedImage
                  key={index}
                  source={{ uri: imageUri }}
                  style={{
                    width: width,
                    height: '100%',
                  }}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>

            {/* Dots */}
            <View className="absolute bottom-4 left-0 right-0 flex-row justify-center">
              {imageList.map((_, index) => (
                <View
                  key={index}
                  className={`w-2 h-2 rounded-full mx-1 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </View>
          </>
        ) : (
          <CachedImage
            source={{ uri: imageList[0] }}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Info Scroll */}
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {/* Title & Price */}
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

        {/* Distance & Owner */}
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
            {description ||
              'Experience comfortable and modern living in this well-maintained PG accommodation. Perfect for students and working professionals looking for a convenient and affordable housing solution.'}
          </Text>
        </View>

        {/* Facilities */}
        <View className="py-4 ">
          <Text className="text-lg font-bold text-gray-800 mb-3">Facilities</Text>
          <View className="flex-row flex-wrap">
            {facilities?.map((facility, index) => (
              <View
                key={index}
                className="bg-gray-100 rounded-full px-4 py-2 mr-3 mb-2"
              >
                <Text className="text-gray-700 font-medium">{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Extra Spacing */}
        <View className="h-8" />
      </ScrollView>

      {/* Call Now Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white ios:pb-10 android:pb-20 py-4 px-4">
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
          icon={() => (
            <Ionicons name="call" size={20} color="white" style={{ marginRight: 8 }} />
          )}
        >
          Call Now
        </Button>
      </View>
    </View>
  );
}
