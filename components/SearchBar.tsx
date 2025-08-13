import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (text: string) => void;
  onClear?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function SearchBar({
  placeholder = "Search nearest available pg",
  onSearch,
  onClear,
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View className="relative">
      <View className="flex-row items-center px-4 py-3">
        {/* Search Input with Icon */}
        <View className="flex-1 relative">
          <PaperInput
            mode="outlined"
            placeholder={placeholder}
            theme={{ roundness: 50 }}
            value={value}
            onChangeText={onChangeText}
            onSubmitEditing={() => onSearch?.(value || '')}
            style={{
              backgroundColor: 'white',
              paddingLeft: 45,
              paddingRight: value && value.length > 0 ? 45 : 10,
              height: 56,
              justifyContent: 'center',
              borderRadius: 999,
              fontWeight: '500', // Semi-bold text
              fontSize: 16,
            }}
            outlineStyle={{ borderWidth: 0 }}
          />
          <Ionicons
            name="search"
            size={24}
            color="gray"
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: [{ translateY: -12 }],
              zIndex: 1,
            }}
          />
          
          {/* Clear Button */}
          {value && value.length > 0 && (
            <TouchableOpacity
              onPress={onClear}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: [{ translateY: -12 }],
                zIndex: 1,
              }}
            >
              <Ionicons name="close-circle" size={24} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Enhanced Fade effect at bottom of SearchBar */}
      <LinearGradient
        colors={['rgba(228,226,223,1)', 'rgba(228,226,223,0.9)', 'rgba(228,226,223,0.6)', 'rgba(228,226,223,0.3)', 'rgba(228,226,223,0)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: -25,
          height: 25,
          zIndex: 10,
        }}
        pointerEvents='none'
      />
    </View>
  );
}