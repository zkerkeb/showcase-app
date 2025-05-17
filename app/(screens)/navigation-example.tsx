import { Stack } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/expo/ThemedText';
import { ThemedView } from '@/components/expo/ThemedView';
import NavigationButton from '@/components/navigationButton';

export default function NavigationExample() {
  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: 'Navigation Exemple', headerShown: true }} />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText type="title" style={styles.header}>Mes Applications</ThemedText>
        
        <NavigationButton 
          title="AKHI" 
          subtitle="Application de versets quotidiens" 
          route="/(screens)/loading"
          delay={100}
          image={
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.image} 
            />
          }
        />
        
        <NavigationButton 
          title="Nutria" 
          subtitle="Suivi de nutrition" 
          route="/(screens)/loading"
          delay={200}
          image={
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.image} 
            />
          }
        />
        
        <NavigationButton 
          title="Fitness+" 
          subtitle="Entraînement personnalisé" 
          route="/(screens)/loading"
          delay={300}
          image={
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.image} 
            />
          }
        />
        
        <NavigationButton 
          title="Méditation" 
          subtitle="Pleine conscience" 
          route="/(screens)/loading"
          delay={400}
          image={
            <Image 
              source={require('@/assets/images/icon.png')} 
              style={styles.image} 
            />
          }
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    marginTop: 12,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
}); 