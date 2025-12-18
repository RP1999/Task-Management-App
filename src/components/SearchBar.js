import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { colors, spacing, borderRadius, typography } from '../styles/theme';

const SearchBar = ({ value, onChangeText, onClear }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={colors.textSecondary}
      />
      {value ? (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <Text style={styles.clearText}>✕</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.s,
    paddingHorizontal: spacing.m,
    borderRadius: 8,
    fontSize: typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.l,
    top: spacing.s + 10, // Approximate centering
  },
  clearText: {
    fontSize: 16,
    color: colors.textSecondary,
  }
});

export default SearchBar;
