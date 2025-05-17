import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const STAR_COUNT = 50; // Nombre d'étoiles
const STAR_COLORS = ['#FFFFFF', '#FFFFAA', '#FFDDAA', '#AAAAFF']; // Différentes couleurs pour les étoiles

interface StarProps {
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  color: string;
}

const Star: React.FC<StarProps> = ({ size, initialX, initialY, duration, color }) => {
  const yPosition = useRef(new Animated.Value(initialY)).current;
  const scaleValue = useRef(new Animated.Value(0)).current; // Commence avec une échelle de 0

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        // Animation de grossissement
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500, // Durée pour grossir
          easing: Easing.out(Easing.ease), // Effet de grossissement doux
          useNativeDriver: true,
        }),
        // Animation de chute
        Animated.timing(yPosition, {
          toValue: height + size * 2, // S'assurer que l'étoile sort complètement de l'écran
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Réinitialisation instantanée (pour la boucle)
        Animated.parallel([
          Animated.timing(yPosition, {
            toValue: initialY, // Réinitialiser à la position initiale Y
            duration: 0, // Instantanément
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 0, // Réinitialiser l'échelle à 0
            duration: 0, // Instantanément
            useNativeDriver: true,
          }),
        ])
      ])
    ).start();
  }, [yPosition, scaleValue, duration, initialY, size]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: initialX,
        transform: [{ translateY: yPosition }, { scale: scaleValue }], // Appliquer l'échelle
      }}
    >
      <MaterialCommunityIcons name="star" size={size} color={color} />
    </Animated.View>
  );
};

export default function LoadingScreen() {
  const stars = Array.from({ length: STAR_COUNT }).map((_, i) => ({
    id: i.toString(),
    size: Math.random() * 20 + 5, // Taille aléatoire entre 5 et 25
    initialX: Math.random() * width,
    initialY: Math.random() * -height, // Commence au-dessus de l'écran
    duration: Math.random() * 10000 + 15000, // Durée de défilement entre 15s et 25s
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }));

  return (
    <View style={styles.container}>
      {stars.map(star => (
        <Star
          key={star.id}
          size={star.size}
          initialX={star.initialX}
          initialY={star.initialY}
          duration={star.duration}
          color={star.color}
        />
      ))}
      <Text style={styles.title}>LOADING</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0a3e', // Bleu nuit profond
    overflow: 'hidden', // Pour s'assurer que les étoiles ne débordent pas visuellement avant d'être hors écran
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 5,
    zIndex: 1, // S'assurer que le texte est au-dessus des étoiles
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
});