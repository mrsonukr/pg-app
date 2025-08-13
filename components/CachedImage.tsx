import React, { useState } from 'react';
import { Image, ImageStyle, View, ActivityIndicator } from 'react-native';

interface CachedImageProps {
  source: { uri: string };
  style: ImageStyle;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

export default function CachedImage({
  source,
  style,
  resizeMode = 'cover'
}: CachedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Check if source and uri are valid
  if (!source || !source.uri || typeof source.uri !== 'string') {
    return (
      <View style={[style, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  }

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <View style={[style, { backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="small" color="#666" />
      </View>
    );
  }

  return (
    <View style={style}>
      <Image
        source={source}
        style={[style, { position: 'absolute' }]}
        resizeMode={resizeMode}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
      />
      {isLoading && (
        <View style={[style, { position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }]}>
          <ActivityIndicator size="small" color="#666" />
        </View>
      )}
    </View>
  );
} 