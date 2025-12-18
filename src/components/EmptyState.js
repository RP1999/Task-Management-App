import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../styles/theme';

const EmptyState = ({ filter }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No tasks found</Text>
      <Text style={styles.subtitle}>
        {filter === 'Completed' 
          ? "You haven't completed any tasks yet." 
          : "You don't have any tasks pending. Great job!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.s,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  }
});

export default EmptyState;
