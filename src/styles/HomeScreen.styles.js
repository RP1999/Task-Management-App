import { StyleSheet } from 'react-native';
import { colors, typography, spacing, shadows, borderRadius } from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  scrollViewContent: { 
    paddingBottom: 120, // More padding for bottom nav
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xxl, // More top breathing room
    paddingBottom: spacing.lg,
  },
  dashboardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textTertiary,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  greeting: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.textPrimary,
  },
  userName: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    borderRadius: 20, // Softer roundness
    paddingHorizontal: spacing.lg,
    height: 60, // Taller touch target
    ...shadows.md,
  },
  searchIcon: {
    marginRight: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    height: '100%',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
    gap: 12,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  tabActive: {
    backgroundColor: colors.primary,
    transform: [{scale: 1.05}], // Subtle scale for active
    ...shadows.purple,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.white,
    fontWeight: '700',
  },
  listContainer: {
    minHeight: 200,
    paddingTop: spacing.xs,
  },
  sectionHeader: { // Restored for potential future use or section titles
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: spacing.xxl,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.textPrimary,
    fontSize: 16,
    marginTop: spacing.sm,
  },
  bottomSpacing: { // Added based on usage in component not present in original style block but used in render
    height: 100,
  }
});
