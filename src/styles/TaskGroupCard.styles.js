import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from './theme';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.xl,
    ...shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  progressContainer: {
    marginLeft: spacing.md,
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 10,
    fontWeight: typography.bold,
  },
});
