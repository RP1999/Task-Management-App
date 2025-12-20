import { StyleSheet } from 'react-native';
import { colors, spacing } from './theme';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 70,
    borderRadius: 35, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    // Simple sleek shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8, 
    borderWidth: 0,
  },
  leftGroup: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginRight: 40, 
  },
  rightGroup: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginLeft: 40,
  },
  centerSpace: {
    width: 0, 
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 30, 
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 4,
    borderColor: '#F8FAFC', // Match background
  },
});
