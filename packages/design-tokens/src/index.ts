// Design Tokens - مرکز تمام استایل‌ها
export const colors = {
  // Primary brand colors
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  brown: {
    100: '#f5e6d3',
    200: '#e0c4a6',
    300: '#cda37a',
    400: '#b8834d',
    500: '#9e6b3a',
    600: '#a66f44',
  },
  gray: {
    100: '#f3f4f6',
    300: '#d1d5db',
    600: '#6b7280',
    800: '#111827',
  },
  white: '#ffffff',
  
  // Insurance-specific colors
  trust: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
  },
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    500: '#f59e0b',
    600: '#d97706',
  },
  danger: {
    50: '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
  }
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  '3xl': '3rem',
  '4xl': '4rem',
  '5xl': '5rem',
} as const;

export const borderRadius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.5rem',
} as const;

export const typography = {
  fontFamily: {
    sans: ['Vazirmatn', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  }
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
} as const;

// Component-specific tokens
export const button = {
  primary: {
    bg: colors.orange[500],
    bgHover: colors.orange[600],
    text: colors.brown[100],
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  secondary: {
    bg: colors.brown[200],
    bgHover: colors.brown[300],
    text: colors.orange[800],
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  trust: {
    bg: colors.trust[500],
    bgHover: colors.trust[600],
    text: colors.white,
    padding: `${spacing.md} ${spacing.xl}`,
    borderRadius: borderRadius.md,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  }
} as const;

export const input = {
  base: {
    bg: colors.white,
    border: colors.gray[300],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
  },
} as const;

// Insurance-specific components
export const insuranceCard = {
  base: {
    bg: colors.white,
    border: colors.gray[300],
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadow: shadows.md,
  },
  selected: {
    bg: colors.trust[50],
    border: colors.trust[500],
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    shadow: shadows.lg,
  }
} as const;

export const hero = {
  bg: colors.trust[50],
  titleColor: colors.trust[800],
  subtitleColor: colors.gray[600],
  padding: `${spacing['5xl']} 0`,
} as const; 