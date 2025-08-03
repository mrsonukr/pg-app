import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';


interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApplyFilters: (filters: FilterOptions) => void;
    currentFilters: FilterOptions;
}

export interface FilterOptions {
    minPrice: number;
    maxPrice: number;
    selectedFacilities: string[];
}

const availableFacilities = [
    'AC', 'WiFi', 'Laundry', 'Geyser', '2 Meals', 'TV',
    'Attached Washroom', 'Food', 'Parking', 'Security'
];

export default function FilterModal({
    visible,
    onClose,
    onApplyFilters,
    currentFilters
}: FilterModalProps) {
    const [minPrice, setMinPrice] = useState(currentFilters.minPrice);
    const [maxPrice, setMaxPrice] = useState(currentFilters.maxPrice);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>(currentFilters.selectedFacilities);

    const handleFacilityToggle = (facility: string) => {
        setSelectedFacilities(prev =>
            prev.includes(facility)
                ? prev.filter(f => f !== facility)
                : [...prev, facility]
        );
    };

    const handleApply = () => {
        onApplyFilters({
            minPrice,
            maxPrice,
            selectedFacilities
        });
        onClose();
    };

    const handleReset = () => {
        setMinPrice(0);
        setMaxPrice(10000);
        setSelectedFacilities([]);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-white">
                {/* Header */}
                <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-black">Filters</Text>
                    <TouchableOpacity onPress={handleReset}>
                        <Text className="text-blue-600 font-medium">Reset</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 p-4">
                    {/* Price Range */}
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-black mb-4">Price Range</Text>

                        <View className="mb-4">
                            <Text className="text-gray-600 mb-2">Minimum Price: ₹{minPrice}</Text>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={10000}
                                value={minPrice}
                                onValueChange={setMinPrice}
                                step={500}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#d3d3d3"
                
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-gray-600 mb-2">Maximum Price: ₹{maxPrice}</Text>
                            <Slider
                                style={{ width: '100%', height: 40 }}
                                minimumValue={0}
                                maximumValue={10000}
                                value={maxPrice}
                                onValueChange={setMaxPrice}
                                step={500}
                                minimumTrackTintColor="#000"
                                maximumTrackTintColor="#d3d3d3"
                               
                            />
                        </View>

                        <View className="bg-gray-100 rounded-lg p-3">
                            <Text className="text-center text-gray-700 font-medium">
                                ₹{minPrice} - ₹{maxPrice} per month
                            </Text>
                        </View>
                    </View>

                    {/* Facilities */}
                    <View className="mb-6">
                        <Text className="text-lg font-bold text-black mb-4">Facilities</Text>
                        <View className="flex-row flex-wrap">
                            {availableFacilities.map((facility) => (
                                <TouchableOpacity
                                    key={facility}
                                    onPress={() => handleFacilityToggle(facility)}
                                    className={`rounded-full px-4 py-2 mr-2 mb-2 border ${selectedFacilities.includes(facility)
                                            ? 'bg-black border-black'
                                            : 'bg-white border-gray-300'
                                        }`}
                                >
                                    <Text
                                        className={`font-medium ${selectedFacilities.includes(facility)
                                                ? 'text-white'
                                                : 'text-gray-700'
                                            }`}
                                    >
                                        {facility}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>

                {/* Apply Button */}
                <View className="p-4 border-t border-gray-200 ios:pb-10 ">
                    <Button
                        mode="contained"
                        onPress={handleApply}
                        buttonColor="black"
                        contentStyle={{ paddingVertical: 8 }}
                        labelStyle={{ fontSize: 16, fontWeight: 'bold' }}
                    >
                        Apply Filters
                    </Button>
                </View>
            </View>
        </Modal>
    );
}