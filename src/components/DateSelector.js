import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/DateSelector.styles';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const DateSelector = ({ selectedDate, onSelectDate }) => {
  const scrollViewRef = useRef(null);
  
  // Generate next 14 days
  const dates = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push(d);
  }

  const isSelected = (date) => {
    const d1 = new Date(date);
    const d2 = new Date(selectedDate);
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date, index) => {
          const selected = isSelected(date);
          return (
            <TouchableOpacity 
              key={index} 
              style={[styles.dateItem, selected && styles.dateItemSelected]}
              onPress={() => onSelectDate(date)}
            >
              <Text style={[styles.dayText, selected && styles.textSelected]}>
                {DAYS[date.getDay()]}
              </Text>
              <Text style={[styles.dateText, selected && styles.textSelected]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default DateSelector;

