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
import { colors, typography, spacing, borderRadius, shadows } from '../styles/theme';

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
          <Text style={styles.illustrationEmoji}>👨‍💻</Text>
          <View style={styles.floatingIcon1}>
            <Text style={styles.floatingEmoji}>⏰</Text>
          </View>
          <View style={styles.floatingIcon2}>
            <Text style={styles.floatingEmoji}>📋</Text>
          </View>
          <View style={styles.floatingIcon3}>
            <Text style={styles.floatingEmoji}>📊</Text>
          </View>
          <View style={styles.floatingIcon4}>
            <Text style={styles.floatingEmoji}>🎯</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Task Management &</Text>
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
            <Text style={styles.arrowText}>→</Text>
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

