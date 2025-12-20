import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from './theme';

export default StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    marginHorizontal: spacing.md,
    ...shadows.md, // Enhanced shadow on container
  },
  cardContent: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden', // For priority strip
    minHeight: 100,
    alignItems: 'center',
    paddingRight: spacing.md,
  },
  priorityStrip: {
    width: 6,
    height: '100%',
    marginRight: spacing.md,
  },
  contentWrapper: {
    flex: 1,
    paddingVertical: spacing.md,
    paddingRight: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeBackground: {
    backgroundColor: colors.background,
  },
  categoryText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    lineHeight: 24,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textTertiary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  checkboxCompleted: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
