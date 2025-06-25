// metro.config.js
// eslint-disable @typescript-eslint/no-var-requires
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure TypeScript files are handled properly
config.resolver.sourceExts = [...config.resolver.sourceExts, 'ts', 'tsx', 'cjs'];
config.resolver.unstable_enablePackageExports = false;
module.exports = config;
