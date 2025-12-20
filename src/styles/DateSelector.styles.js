import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from './theme';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  dateItem: {
    width: 60,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.sm,
    borderWidth: 1,
    borderColor: colors.border, // Subtle border for unselected
  },
  dateItemSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.purple,
  },
  dayText: {
    fontSize: typography.caption, // Small text
    color: colors.textSecondary,
    marginBottom: 8,
    textTransform: 'uppercase', // Make it crisp
    fontWeight: '600',
  },
  dateText: {
    fontSize: 20, // Larger for the number
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  textSelected: {
    color: colors.white,
  },
});
