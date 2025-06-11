import { Dimensions, PixelRatio } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const BASE_WIDTH = 375 // Reference width (iPhone 8)

const scale = (size: number) => (SCREEN_WIDTH / BASE_WIDTH) * size
const normalize = (size: number) => Math.round(PixelRatio.roundToNearestPixel(scale(size)))
const scaleFont = (size: number) => normalize(size) * PixelRatio.getFontScale()

// Font Sizes (responsive and accessible)
export const fontSizes = {
  xs: scaleFont(10),
  sm: scaleFont(12),
  md: scaleFont(16),
  lg: scaleFont(20),
  xl: scaleFont(24),
  xxl: scaleFont(32),
  xxxl: scaleFont(40),
}

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
}

// Border Radii
export const borderRadius = {
  sm: normalize(4),
  md: normalize(8),
  lg: normalize(16),
  pill: 9999,
  full: 99999,
}

// Icon Sizes
export const iconSizes = {
  sm: normalize(16),
  md: normalize(24),
  lg: normalize(32),
  xl: normalize(48),
}

// Button Heights
export const buttonHeights = {
  sm: normalize(32),
  md: normalize(40),
  lg: normalize(48),
  xl: normalize(56),
}
