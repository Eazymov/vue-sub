const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  entry: {
    'index': './test/e2e/src/index.ts',
  },
  output: {
    path: path.resolve(__dirname, '../test/e2e/dist'),
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      "package": path.resolve(__dirname, '..', './'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
    ],
  },
});
