import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from './theme';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  backIcon: {
    fontSize: 24,
    color: colors.textPrimary,
    lineHeight: 26,
  },
  headerTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
    marginBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.h3,
    fontWeight: typography.bold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    lineHeight: 32,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.round,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: typography.caption,
    fontWeight: typography.bold,
    textTransform: 'uppercase',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  detailItem: {
    flex: 1,
  },
  detailSection: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: typography.medium,
  },
  description: {
    fontSize: typography.body,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  statusFooter: {
    marginTop: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
  },
  actionContainer: {
    gap: spacing.md,
  },
  button: {
    padding: 16,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: spacing.sm,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    ...shadows.purple,
  },
  deleteButton: {
    backgroundColor: colors.surface,
    borderColor: colors.danger,
  },
  buttonText: {
    fontSize: typography.body,
    fontWeight: typography.bold,
  },
  buttonTextWhite: {
    color: colors.white,
  },
  buttonTextDanger: {
    color: colors.danger,
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
