import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 70, // Space for BottomNav
  },
  scrollContent: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  overviewCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    ...shadows.purple,
  },
  overviewHeader: {
    marginBottom: spacing.lg,
  },
  overviewTitle: {
    fontSize: typography.h5,
    fontWeight: typography.bold,
    color: colors.white,
    marginBottom: 4,
  },
  overviewSubtitle: {
    fontSize: typography.caption,
    color: 'rgba(255,255,255,0.8)',
  },
  graphContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    paddingTop: spacing.md,
  },
  graphColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    width: 8,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    justifyContent: 'flex-end',
    marginBottom: 8,
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 4,
    minHeight: 4, // Ensure at least a dot shows
  },
  dayLabel: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 10,
    fontWeight: typography.medium,
  },
  sectionTitle: {
    fontSize: typography.h6,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statCard: {
    width: '47%', 
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.sm,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statValue: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: 2,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
