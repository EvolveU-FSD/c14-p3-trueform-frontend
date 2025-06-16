const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add fallbacks for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
  };

  // Add Buffer global and Dotenv plugin
  config.plugins.push(
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    }),
    new Dotenv({
      systemvars: true, // Load all system environment variables as well
    }),
  );

  return config;
};
