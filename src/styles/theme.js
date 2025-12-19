export const lightTheme = {
  mode: 'light',
  primary: '#2C5F8D',
  secondary: '#4A90E2',
  accent: '#FF8C42',
  success: '#52C997',
  surface: '#FFFFFF',
  background: '#F8FAFB',
  textPrimary: '#2D3748',
  textSecondary: '#718096',
  border: '#E2E8F0',
  borderLight: '#EDF2F7',
  error: '#E53E3E',
  white: '#FFFFFF',
  statusBar: 'dark-content',
};

export const darkTheme = {
  mode: 'dark',
  primary: '#4A90E2', // Lighter blue for dark mode
  secondary: '#2C5F8D',
  accent: '#FF8C42',
  success: '#52C997',
  surface: '#1A202C', // Dark gray
  background: '#171923', // Very dark gray
  textPrimary: '#F7FAFC', // White-ish
  textSecondary: '#A0AEC0', // Light gray
  border: '#2D3748',
  borderLight: '#4A5568',
  error: '#FB8181', // Lighter red
  white: '#FFFFFF',
  statusBar: 'light-content',
};

export const colors = lightTheme; // Default export for backwards compatibility


export const typography = {
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 18,
  h5: 16,
  body: 14,
  caption: 12,
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  // Added missing values
  lineHeightNormal: 1.5,
  bodySmall: 12, // Alias/Value for small body text
};

export const spacing = {
  xs: 4,
  s: 8,
  sm: 8, // Alias for s
  m: 16,
  md: 16, // Alias for m
  l: 24,
  lg: 24, // Alias for l
  xl: 32,
  xxl: 40,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

export const shadows = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
};
// Aliases for shadows
shadows.sm = shadows.small;
shadows.md = shadows.medium;
