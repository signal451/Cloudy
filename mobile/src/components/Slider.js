import React from 'react';
import {View, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import FeaturedCarousel from '../components/FeaturedCarousel';

const Slider = () => {
  return (
    <GestureHandlerRootView style={styles.header}>
      <FeaturedCarousel />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 190,
  },
});

export default Slider;
