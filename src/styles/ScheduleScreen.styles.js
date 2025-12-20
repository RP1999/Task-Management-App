import { StyleSheet } from 'react-native';
import { colors, typography, spacing } from './theme';

export default StyleSheet.create({
  loaderContainer: {
    marginTop: spacing.xl,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 80, // Add padding for bottom nav
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.h4,
    fontWeight: typography.bold,
    color: colors.textPrimary,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h6,
    fontWeight: typography.semiBold,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: spacing.xl * 2,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: typography.body,
  },
});
