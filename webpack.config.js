const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src',
  devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/index.html', to: 'index.html' },
    ]),
    new webpack.EnvironmentPlugin({ // expose NODE_ENV from webpack to the build
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  performance: {
    assetFilter: assetFilename => !/(\.map$)|(^(foreground\.|favicon\.))/.test(assetFilename),
  },
};
