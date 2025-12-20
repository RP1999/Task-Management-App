import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, typography } from './theme';

export default StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md, // Corrected from m
    paddingVertical: spacing.sm,   // Corrected from s
    backgroundColor: colors.background,
  },
  input: {
    backgroundColor: colors.surface,
    padding: spacing.sm,           // Corrected from s
    paddingHorizontal: spacing.md, // Corrected from m
    borderRadius: 8,
    fontSize: typography.body,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  clearButton: {
    position: 'absolute',
    right: spacing.lg,             // Corrected from l
    top: spacing.sm + 10,          // Corrected from s
  },
  clearText: {
    fontSize: 16,
    color: colors.textSecondary,
  }
});
