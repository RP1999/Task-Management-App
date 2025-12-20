import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';
import styles from '../styles/FilterButtons.styles';
import { FILTER_OPTIONS } from '../utils/constants';

const FilterButtons = ({ activeFilter, onFilterChange, taskStats }) => {
  return (
    <View style={styles.container}>
      {Object.values(FILTER_OPTIONS).map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[
            styles.button,
            activeFilter === filter && styles.activeButton
          ]}
          onPress={() => onFilterChange(filter)}
        >
          <Text style={[
            styles.text,
            activeFilter === filter && styles.activeText
          ]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};



export default FilterButtons;
