import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const lune = require('@/assets/images/expedition/lune.png');

const Expedition33Preview: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={lune}
        style={styles.image}
        contentFit="contain"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 24, // Assorti au borderRadius de NavigationButton
    overflow: 'hidden', // Important pour que l'image respecte le borderRadius
    backgroundColor: '#000', // Couleur de fond au cas où l'image ne chargerait pas
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
});

export default Expedition33Preview;
