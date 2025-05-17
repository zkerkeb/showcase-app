import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, LayoutChangeEvent, StyleSheet, View } from 'react-native';

const STAR_COLORS = ['#FFFFFF', '#FFFFAA', '#FFDDAA', '#AAAAFF'];

interface PreviewStarProps {
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  color: string;
  containerHeight: number;
}

const PreviewStar: React.FC<PreviewStarProps> = ({ size, initialX, initialY, duration, color, containerHeight }) => {
  const yPosition = useRef(new Animated.Value(initialY)).current;
  const scaleValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 400, // Durée de grossissement pour la preview
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(yPosition, {
          toValue: containerHeight + size * 2,
          duration: duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(yPosition, { toValue: initialY, duration: 0, useNativeDriver: true }),
          Animated.timing(scaleValue, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, [yPosition, scaleValue, duration, initialY, size, containerHeight]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: initialX,
        transform: [{ translateY: yPosition }, { scale: scaleValue }],
      }}
    >
      <MaterialCommunityIcons name="star" size={size} color={color} />
    </Animated.View>
  );
};

const StarryLoadingPreview: React.FC = () => {
  const [layout, setLayout] = useState<{width: number, height: number} | null>(null);
  const STAR_COUNT = 40; // Nombre réduit d'étoiles pour la preview

  const starsData = useRef<
    (PreviewStarProps & { id: string })[]
  >([]).current;

  if (layout && starsData.length === 0) {
    // Initialiser les étoiles une seule fois après avoir obtenu les dimensions
    for (let i = 0; i < STAR_COUNT; i++) {
      starsData.push({
        id: i.toString(),
        size: Math.random() * 7 + 3, // Étoiles plus petites (3 à 10)
        initialX: Math.random() * layout.width,
        initialY: Math.random() * -layout.height * 0.5, // Commence un peu au-dessus
        duration: Math.random() * 5000 + 7000, // Défilement plus rapide (7s à 12s)
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        containerHeight: layout.height,
      });
    }
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    // Mettre à jour le layout seulement si les dimensions changent significativement pour éviter des re-rendus inutiles
    // ou si c'est la première fois.
    if (!layout || layout.width !== width || layout.height !== height) {
        // Réinitialiser starsData si les dimensions changent pour recalculer les positions
        if (layout) starsData.length = 0; 
        setLayout({ width, height });
    }
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {layout && starsData.map(star => (
        <PreviewStar
          key={star.id}
          size={star.size}
          initialX={star.initialX}
          initialY={star.initialY}
          duration={star.duration}
          color={star.color}
          containerHeight={star.containerHeight}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Pour prendre la taille du parent dans NavigationButton
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0a3e', // Fond nuit pour la preview
    overflow: 'hidden', // Important pour clipper les étoiles
    // borderRadius est hérité du parent (buttonInnerContent dans NavigationButton)
  },
  title: {
    fontSize: 16, // Taille de texte adaptée à la preview
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    zIndex: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 4,
  },
});

export default StarryLoadingPreview; 