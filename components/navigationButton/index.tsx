import { ThemedText } from '@/components/expo/ThemedText';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface NavigationButtonProps {
  title: string;
  subtitle?: string;
  route: any; // Le type de route compatible avec expo-router
  image?: React.ReactNode;
  previewContent?: React.ReactNode;
  delay?: number;
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  title,
  subtitle,
  route,
  image,
  previewContent,
  delay = 0,
}) => {
  const router = useRouter();
  
  // Animation values
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.9);
  
  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, { duration: 700, easing: Easing.bezier(0.16, 1, 0.3, 1) });
      translateY.value = withTiming(0, { duration: 800, easing: Easing.bezier(0.16, 1, 0.3, 1) });
      scale.value = withTiming(1, { duration: 700, easing: Easing.bezier(0.16, 1, 0.3, 1) });
    }, delay);
  }, [opacity, translateY, scale, delay]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value }
      ],
    };
  });
  
  const handlePress = () => {
    router.push(route);
  };
  
  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.buttonTouchable]} 
        onPress={handlePress}
      >
       <View style={[
         styles.buttonInnerContent,
         !previewContent && { backgroundColor: '#151718' } 
       ]}>
         {previewContent && (
           <View style={styles.previewContainer}>
             {previewContent}
           </View>
         )}
         <View style={styles.content}> 
            <View style={styles.textContainer}>
              <ThemedText type="title" style={styles.title}>{title}</ThemedText>
              {subtitle && <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>}
            </View>
            {image && <View style={styles.imageContainer}>{image}</View>}
          </View>
       </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
    height: 300,
  },
  buttonTouchable: {
    borderRadius: 24,
    overflow: 'visible',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 10,
    height: '100%',
  },
  buttonInnerContent: {
    height: '100%',
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  previewContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  content: {
    flexDirection: 'column',
    padding: 24,
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 2,
  },
  title: {
    marginBottom: 4,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    opacity: 0.7,
    fontSize: 16,
    marginTop: 4,
  },
  imageContainer: {
    position: 'absolute',
    right: 24,
    top: '50%',
    transform: [{ translateY: -40 }],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
});

export default NavigationButton; 