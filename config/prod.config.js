const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
  entry: {
    'vue-sub.min': './lib/index.js',
  },
  target: 'web',
  plugins: [
    new UglifyJSPlugin(),
  ],
});
