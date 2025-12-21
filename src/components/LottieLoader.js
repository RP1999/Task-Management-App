import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '../styles/theme';

const { width } = Dimensions.get('window');

const LottieLoader = ({ size = 200, style }) => {
  return (
    <View style={[styles.container, style]}>
      <LottieView
        source={{ uri: 'https://lottie.host/b7442a8a-d57d-49be-8436-43734a232803/RvRBOYChIP.lottie' }}
        autoPlay
        loop
        style={{ width: size, height: size }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LottieLoader;
