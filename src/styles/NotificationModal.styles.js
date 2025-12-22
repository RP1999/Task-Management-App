import { StyleSheet, Dimensions } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from './theme';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(20, 10, 40, 0.6)', // Themed dark overlay
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalView: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
    padding: spacing.lg,
    maxHeight: height * 0.8,
    ...shadows.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },
  summaryContainer: {
    backgroundColor: colors.dangerLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  summaryText: {
    fontSize: typography.body,
    color: colors.danger,
    lineHeight: 22,
  },
  highlightText: {
    fontWeight: typography.bold,
  },
  list: {
    maxHeight: 300,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  taskContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  taskTitle: {
    fontSize: typography.body,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  taskTime: {
    fontSize: typography.caption,
    color: colors.danger,
    fontWeight: typography.medium,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
    ...shadows.md,
  },
  buttonText: {
    color: colors.textInverse,
    fontSize: typography.body,
    fontWeight: typography.semiBold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyText: {
    fontSize: typography.h5,
    fontWeight: typography.semiBold,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
});
