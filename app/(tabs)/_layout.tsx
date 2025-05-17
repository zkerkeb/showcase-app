import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, View } from 'react-native';

import { HapticTab } from '@/components/expo/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = Dimensions.get('window');
  
  // Remplaçons TabBarBackground par une implémentation directe avec BlurView
  const TabBarBackgroundCustom = () => (
    <BlurView 
      intensity={80} 
      tint={colorScheme === 'dark' ? 'dark' : 'light'} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        borderRadius: 24,
        height: 55,
        overflow: 'hidden',
      }} 
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF50',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackgroundCustom,
        tabBarShowLabel: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            bottom: 30,
            height: 45,
            left: 32,
            right: 32,
            marginHorizontal: 32,
            borderRadius: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 10,
            elevation: 10,
            backgroundColor: 'rgba(20,20,20,0.8)',
          },
          default: {
            position: 'absolute',
            bottom: 20,
            left: width * 0.15,
            right: width * 0.15,
            height: 55,
            borderRadius: 30,
            backgroundColor: 'rgba(30,30,30,0.9)',
            elevation: 15,
            borderWidth: 1,
            borderColor: '#333',
          },
        }),
        tabBarItemStyle: {
          height: 55,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Projets',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              marginTop: 10,
            }}>
              <IconSymbol size={24} name="square.grid.2x2.fill" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Mon Travail',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ 
              marginTop: 10,
            }}>
              <IconSymbol size={24} name="person.crop.square.fill" color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
