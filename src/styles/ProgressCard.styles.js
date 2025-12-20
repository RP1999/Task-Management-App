import { StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, shadows, typography } from './theme';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.primary, // Fallback
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    overflow: 'hidden', // Clip bg circles
    minHeight: 150,
    ...shadows.purple,
    elevation: 8,
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bgCircle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
  },
  bgCircle2: {
    width: 150,
    height: 150,
    bottom: -40,
    left: -20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.5,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  innerBorder: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
    borderTopColor: 'white', // Simulating progress
    borderRightColor: 'white',
    transform: [{ rotate: '-45deg' }],
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentage: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '800',
  },
  percentSymbol: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
