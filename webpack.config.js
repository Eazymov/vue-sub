const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'vue-sub.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'vue-sub',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({}),
  ]
};
