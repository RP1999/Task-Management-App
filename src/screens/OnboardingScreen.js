import React from 'react';
import styles from '../styles/OnboardingScreen.styles';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      
      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
      <View style={styles.decorativeCircle3} />
      <View style={styles.decorativeDot1} />
      <View style={styles.decorativeDot2} />
      
      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        {/* Placeholder for 3D illustration - you can replace with actual image */}
        <View style={styles.illustrationWrapper}>
          <LottieView
            source={{ uri: 'https://lottie.host/dbf1460a-200d-4995-bab3-792f660695a3/PXDccGTvb2.lottie' }}
            autoPlay
            loop
            style={styles.illustration}
          />
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>MediTask</Text>
        <Text style={styles.titleHighlight}>To-Do List</Text>
        
        <Text style={styles.subtitle}>
          This productive tool is designed to help you better manage your task project-wise conveniently!
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Home')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Let's Start</Text>
          <View style={styles.buttonArrow}>
            <Icon name="arrow-forward" size={20} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Page Indicator */}
      <View style={styles.pageIndicator}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default OnboardingScreen;

