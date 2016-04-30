var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: [path.join(__dirname, 'src'), path.join(__dirname, '..', '..', 'src')],
    }],
  },
  resolve: {
    root: [path.join(__dirname, 'node_modules'), path.join(__dirname, '..', '..', 'node_modules')],
    alias: {
      'react-seamstress': path.join(__dirname, '..', '..', 'src', 'index.js'),
    },
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
};
