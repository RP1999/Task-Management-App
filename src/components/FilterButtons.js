import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../styles/theme';
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.m,
    marginBottom: spacing.m,
    gap: spacing.s,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  text: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: typography.medium,
  },
  activeText: {
    color: colors.white,
  }
});

export default FilterButtons;
