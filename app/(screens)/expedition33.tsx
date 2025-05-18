import expedition from '@/assets/images/expedition/expedition.avif';
import { BlurView } from 'expo-blur';
import { Image } from "expo-image";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
// Composant pour un pétale individuel

const characters = [
    {
        id: '1',
        name: 'Lune',
        image: require('@/assets/images/expedition/lune.png'),
        quote: 'Faisons couler l\'encre'
    },
    {
        id: '2',
        name: 'Maelle',
        image: require('@/assets/images/expedition/maelle.avif'),
        quote: 'Demain Viendra'
    },
    {
        id: '3',
        name: 'Gustave',
        image: require('@/assets/images/expedition/gustave.png'),
        quote: 'Pour ceux qui viendront après'
    },
    {
        id: '4',
        name: 'Sciel',
        image: require('@/assets/images/expedition/sciel.avif'),
        quote: 'Ton sort est scellé'
    },
]

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Character {
    id: string;
    name: string;
    image: any; // Le type peut être plus précis si vous utilisez des URI ou des modules d'image spécifiques
    quote: string;
}

interface CharacterCardProps {
    character: Character;
    index: number;
    scrollY: Animated.SharedValue<number>;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, index, scrollY }) => {
    const positionStyle = index % 2 === 0 ? styles.characterRight : styles.characterLeft;
    const quoteBubblePositionStyle = index % 2 === 0 ? styles.quoteBubbleLeft : styles.quoteBubbleRight;
    const isThird = index === 2;

    const animatedStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * SCREEN_HEIGHT,
            index * SCREEN_HEIGHT,
            (index + 1) * SCREEN_HEIGHT,
        ];

        const opacity = interpolate(
            scrollY.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP
        );

        const translateY = interpolate(
            scrollY.value,
            inputRange,
            [SCREEN_HEIGHT / 3, 0, -SCREEN_HEIGHT / 3],
            Extrapolate.CLAMP
        );
        
        const scale = interpolate(
            scrollY.value,
            inputRange,
            [0.8, 1, 0.8],
            Extrapolate.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }, { scale }],
        };
    });

    return (
        <Animated.View style={[styles.characterPage, animatedStyle]}>
            {/* 1. Fond de la bulle (BlurView) - zIndex le plus bas */}
            <View style={[styles.quoteBackgroundWrapper, quoteBubblePositionStyle]}>
                <BlurView intensity={70} tint="dark" style={styles.quoteBlurEffect} />
            </View>

            {/* 2. Personnage - zIndex intermédiaire */}
            <View style={[styles.characterContainer, positionStyle, isThird && styles.characterPageThird]}>
                <Image source={character.image} style={[styles.characterImage, isThird && styles.characterImageThird]} contentFit="contain" />
            </View>

            {/* 3. Texte de la citation - zIndex le plus haut */}
            <View style={[styles.quoteTextWrapper, quoteBubblePositionStyle]}>
                <Text style={styles.characterName}>{character.name}</Text>
                <Text style={styles.characterQuote}>{`"${character.quote}"`}</Text>
            </View>
        </Animated.View>
    );
};

// Créer une version animatable du composant Image de expo-image
const AnimatedExpoImage = Animated.createAnimatedComponent(Image);

const Expedition33 = () => {
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const animatedLogoStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollY.value,
            characters.flatMap((_, index) => [
                (index - 0.5) * SCREEN_HEIGHT,
                index * SCREEN_HEIGHT,
                (index + 0.5) * SCREEN_HEIGHT,
            ]),
            characters.flatMap((_) => [
                1,    // Échelle normale
                1.03, // Légèrement zoomé (3%)
                1,    // Retour à l'échelle normale
            ]),
            Extrapolate.CLAMP
        );

        return {
            transform: [{ scale }],
        };
    });
  
    return (
        <SafeAreaView style={styles.container}>
            <AnimatedExpoImage 
                source={expedition} 
                style={[styles.expeditionImage, animatedLogoStyle]} 
                contentFit="contain" 
            />
            <Animated.FlatList
                data={characters}
                renderItem={({ item, index }) => <CharacterCard character={item} index={index} scrollY={scrollY} />}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT}
                decelerationRate="fast"
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                style={{flex: 1}}
                contentContainerStyle={{height: SCREEN_HEIGHT * characters.length}}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black', 
    },
    expeditionImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
    },
    characterPage: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',

    },
    characterPageThird: {
        bottom: 40,
        left: 350,
    },
    characterContainer: {
        borderRadius: 15,
        width: '100%',
        display: 'flex',
        zIndex: 10, // Au-dessus du fond de la bulle, en dessous du texte
    },
    characterRight: {
        width: '100%',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 0,
        left: 200,
    },
    characterLeft: {
        alignSelf: 'flex-start',
        position: 'absolute',

        bottom: 50,
        left: -200,
        right: 0,
    },
    characterImageThird: {
        transform: [{ scale: 1.4 }],
    },
    characterImage: {
        width: SCREEN_WIDTH ,
        height: SCREEN_HEIGHT,
    },
    quoteBackgroundWrapper: { // Conteneur pour la BlurView (fond de la bulle)
        width: 400,
        height: 400,
        position: 'absolute',
        zIndex: 5, // En dessous du personnage
    },
    quoteBlurEffect: { // Style pour la BlurView elle-même
        width: '100%',
        height: '100%',
        borderRadius: 200,
        overflow: 'hidden',
    },
    quoteTextWrapper: { // Conteneur pour le texte de la citation
        width: 400,
        height: 400,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30, // Padding pour le texte à l'intérieur de la zone de la bulle
        zIndex: 15, // Au-dessus du personnage
        // Les styles de positionnement (left/right/top) viendront de quoteBubblePositionStyle
    },
    quoteBubbleLeft: {
        left: 20,
        top: (SCREEN_HEIGHT - 400) / 2,
    },
    quoteBubbleRight: {
        right: 20,
        top: (SCREEN_HEIGHT - 400) / 2,
    },
    characterName: {
        fontSize: 42,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 15, // Augmentation de la marge
        textAlign: 'center',
        zIndex: 102, // Conservé depuis votre modification
        fontFamily: 'PlayfairDisplay',
        textShadowColor: 'rgba(0, 0, 0, 0.75)', // Couleur de l'ombre
        textShadowOffset: { width: 0, height: 2 }, // Décalage de l'ombre (légèrement vers le bas)
        textShadowRadius: 3, // Flou de l'ombre
    },
    characterQuote: {
        fontSize: 24,
        fontStyle: 'italic',
        color: '#f0f0f0',
        textAlign: 'center',

        fontFamily: 'Raleway',
        textShadowColor: 'rgba(0, 0, 0, 1)', // Couleur de l'ombre
        textShadowOffset: { width: 2, height: 2 }, // Décalage de l'ombre
        textShadowRadius: 2, // Flou de l'ombre
    },
});

export default Expedition33;