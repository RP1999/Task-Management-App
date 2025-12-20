export const colors = {
  // Primary Colors - Purple/Violet Theme
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  primaryDark: '#5B21B6',
  primaryGradientStart: '#8B5CF6',
  primaryGradientEnd: '#6366F1',
  
  // Accent Colors
  accent: '#F97316',
  accentLight: '#FDBA74',
  accentPink: '#EC4899',
  accentCyan: '#06B6D4',
  
  // Status Colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  // Progress Colors
  progressPurple: '#7C3AED',
  progressOrange: '#F97316',
  progressPink: '#EC4899',
  progressGreen: '#10B981',
  
  // Status Badge Colors
  done: '#10B981',
  doneBackground: '#D1FAE5',
  inProgress: '#F97316',
  inProgressBackground: '#FFEDD5',
  todo: '#3B82F6',
  todoBackground: '#DBEAFE',
  
  // Neutral Colors
  white: '#FFFFFF',
  background: '#F8FAFC',
  backgroundPurple: '#F5F3FF',
  surface: '#FFFFFF',
  surfaceLight: '#F1F5F9',
  
  // Text Colors
  textPrimary: '#1E293B',
  textSecondary: '#64748B',
  textTertiary: '#94A3B8',
  textInverse: '#FFFFFF',
  textPurple: '#7C3AED',
  
  // Border Colors
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  borderPurple: '#DDD6FE',
  
  // Shadow Colors
  shadow: 'rgba(124, 58, 237, 0.1)',
  shadowDark: 'rgba(124, 58, 237, 0.2)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  
  // Gradient
  gradientPurple: ['#8B5CF6', '#7C3AED', '#6366F1'],
  gradientOrange: ['#FB923C', '#F97316'],
  gradientPink: ['#F472B6', '#EC4899'],
};

export const typography = {
  // Font Families
  fontPrimary: 'System',
  fontSecondary: 'System',
  
  // Font Sizes
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  h6: 16,
  body: 16,
  bodySmall: 14,
  caption: 12,
  tiny: 10,
  
  // Font Weights
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  
  // Line Heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.75,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
  circle: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadowDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  purple: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};
