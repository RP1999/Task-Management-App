import { StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from './theme';

export default StyleSheet.create({
  container: {
    width: 200,
    padding: spacing.lg,
    borderRadius: borderRadius.xxl,
    marginRight: spacing.md,
    justifyContent: 'space-between',
    height: 200,
  },
  iconContainer: {
    width: 48, 
    height: 48,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  iconContainerWhite: {
    backgroundColor: 'white',
  },
  icon: { fontSize: 24 },
  content: { marginBottom: spacing.md },
  label: { fontSize: typography.caption, color: colors.textSecondary, marginBottom: 4, fontWeight: '500' },
  title: { fontSize: typography.h5, fontWeight: 'bold', color: colors.textPrimary, lineHeight: 24 },
  progressContainer: { marginTop: 'auto' },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontSize: typography.caption, color: colors.textSecondary },
  percentage: { fontSize: typography.caption, fontWeight: 'bold' },
  progressBarBg: { height: 6, backgroundColor: 'white', borderRadius: 3 },
  progressBarFill: { height: 6, borderRadius: 3 },
});
