import React, { useState, useEffect } from 'react';
import { Image, ImageSourcePropType, View, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

interface CachedImageProps {
  source: { uri: string };
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  onLoad?: () => void;
  onError?: () => void;
  fallbackSource?: ImageSourcePropType;
}

export default function CachedImage({
  source,
  style,
  resizeMode = 'cover',
  onLoad,
  onError,
  fallbackSource
}: CachedImageProps) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (source.uri) {
      loadCachedImage(source.uri);
    }
  }, [source.uri]);

  const loadCachedImage = async (uri: string) => {
    try {
      setIsLoading(true);
      setHasError(false);

      // Create a unique filename for the image
      const filename = uri.split('/').pop() || 'image.jpg';
      const cacheDir = FileSystem.cacheDirectory;
      const cachedImagePath = `${cacheDir}${filename}`;

      // Check if image exists in cache
      const fileInfo = await FileSystem.getInfoAsync(cachedImagePath);
      
      if (fileInfo.exists) {
        // Use cached image
        setImageUri(`file://${cachedImagePath}`);
        setIsLoading(false);
      } else {
        // Download and cache the image
        const downloadResult = await FileSystem.downloadAsync(uri, cachedImagePath);
        
        if (downloadResult.status === 200) {
          setImageUri(`file://${cachedImagePath}`);
        } else {
          throw new Error('Failed to download image');
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading cached image:', error);
      setHasError(true);
      setIsLoading(false);
      onError?.();
    }
  };

  if (isLoading) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  }

  if (hasError && fallbackSource) {
    return (
      <Image
        source={fallbackSource}
        style={style}
        resizeMode={resizeMode}
        onLoad={onLoad}
      />
    );
  }

  if (hasError) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
        <Ionicons name="image-outline" size={24} color="#999" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: imageUri! }}
      style={style}
      resizeMode={resizeMode}
      onLoad={onLoad}
    />
  );
} 