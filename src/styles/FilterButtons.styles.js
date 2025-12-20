import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from './theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md, // Corrected from m
    marginBottom: spacing.md,      // Corrected from m
    gap: spacing.sm,               // Corrected from s
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
