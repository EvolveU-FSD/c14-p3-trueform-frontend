import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BASE_WIDTH = 375; // Reference width (iPhone 8)

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size;
const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(scale(size)));
const scaleFont = (size: number) => normalize(size) * PixelRatio.getFontScale();

// Font Sizes (responsive and accessible)
export const fontSizes = {
  xs: scaleFont(10),
  sm: scaleFont(12),
  md: scaleFont(16),
  lg: scaleFont(20),
  xl: scaleFont(24),
  xxl: scaleFont(32),
  xxxl: scaleFont(40),
};

// Spacing (responsive to screen size)
export const spacing = {
  none: 0,
  xs: normalize(4),
  sm: normalize(8),
  md: normalize(16),
  lg: normalize(24),
  xl: normalize(32),
  xxl: normalize(40),
  xxxl: normalize(64),
};

// Border Radii
export const borderRadius = {
  sm: normalize(4),
  md: normalize(8),
  lg: normalize(16),
  pill: 9999,
  full: 99999,
};

// Icon Sizes
export const iconSizes = {
  sm: normalize(16),
  md: normalize(24),
  lg: normalize(32),
  xl: normalize(48),
};

// Button Heights
export const buttonHeights = {
  sm: normalize(32),
  md: normalize(40),
  lg: normalize(48),
  xl: normalize(56),
};

// Component Heights
export const componentHeights = {
  dropdown: spacing.xxxl * 5,
  modal: spacing.xxxl * 8,
  sheet: spacing.xxxl * 6,
};

// Modal Dimensions (percentage of screen)
export const modalSizes = {
  // Height percentages
  smallHeight: SCREEN_HEIGHT * 0.3,
  mediumHeight: SCREEN_HEIGHT * 0.5,
  largeHeight: SCREEN_HEIGHT * 0.7,
  fullHeight: SCREEN_HEIGHT * 0.9,

  // Width percentages (for centered modals)
  smallWidth: SCREEN_WIDTH * 0.8,
  mediumWidth: SCREEN_WIDTH * 0.9,
  largeWidth: SCREEN_WIDTH * 0.95,

  // Bottom sheet specific
  bottomSheet: {
    minHeight: SCREEN_HEIGHT * 0.25,
    maxHeight: SCREEN_HEIGHT * 0.75,
    defaultHeight: SCREEN_HEIGHT * 0.6,
  },

  // Picker specific
  picker: {
    minHeight: SCREEN_HEIGHT * 0.4,
    maxHeight: SCREEN_HEIGHT * 0.7,
    defaultHeight: SCREEN_HEIGHT * 0.5,
  },

  // Dropdown specific
  dropdown: {
    maxHeight: SCREEN_HEIGHT * 0.4,
    itemHeight: normalize(48),
  },
};
