import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/ProgressCard.styles';

const ProgressCard = ({ percentage, title, subtitle, onPress, buttonText = "View Task" }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <View style={styles.container}>
      {/* Decorative Background Circles */}
      <View style={[styles.bgCircle, styles.bgCircle1]} />
      <View style={[styles.bgCircle, styles.bgCircle2]} />

      <View style={styles.content}>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.title}>{title}</Text>
        
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text style={styles.buttonText}>{buttonText}</Text>
          <View style={styles.buttonGlow} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.outerCircle}>
          <View style={[styles.innerBorder]} />
          <View style={styles.textContainer}>
             <Text style={styles.percentage}>{percentage}%</Text>
             <Text style={styles.percentSymbol}>Done</Text>
          </View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

export default ProgressCard;
