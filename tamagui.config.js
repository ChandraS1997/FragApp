import { createTamagui, createTokens } from 'tamagui';
import { config as baseConfig } from '@tamagui/config/v2';

const tokens = createTokens({
  color: {
    // Base colors
    black: '#000000',
    white: '#ffffff',

    // Functional colors
    primary: '#267EF9',
    danger: '#ef4444',
    success: '#22c55e',
    warning: '#facc15',

    // Text colors
    textLight: '#1A1A1A',
    textDark: '#f5f5f5',

    //Secondary text colors
    textSecondaryLight: '#6E6E6E',
    textSecondaryDark: '#d1d1d1',

    // Backgrounds
    bgLight: '#F5F5F5',
    bgDark: '#121212',

    // Borders
    borderLight: '#e5e5e5',
    borderDark: '#333333',

    //hover colors
    hoverLight: '#DEECFF',
  },
});

const themes = {
  light: {
    background: tokens.color.bgLight,
    color: tokens.color.textLight,
    textSecondary: tokens.color.textSecondaryLight,
    borderColor: tokens.color.borderLight,
    primary: tokens.color.primary,
    danger: tokens.color.danger,
    hoverBackground: tokens.color.hoverLight,
  },
  dark: {
    background: tokens.color.bgDark,
    color: tokens.color.textDark,
    textSecondary: tokens.color.textSecondaryDark,
    borderColor: tokens.color.borderDark,
    primary: tokens.color.primary,
    danger: tokens.color.danger,
    hoverBackground: tokens.color.hoverLight,
  },
};

const config = createTamagui({
  ...baseConfig,
  tokens: {
    ...baseConfig.tokens,
    ...tokens,
  },
  themes: {
    ...baseConfig.themes,
    ...themes,
  },
  themeClassNameOnRoot: true,
});

export default config;
