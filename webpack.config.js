const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './lib/index.js',
  output: {
    filename: 'vue-sub.min.js',
    path: path.resolve(__dirname, 'dist'),
    /*library: "VueSub",
    libraryTarget: "var"*/
  },
  resolve: {
    extensions: ['.js'],
  },
  /*target: 'node',
  externals: [
    nodeExternals(),
  ],*/
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin(),
  ],
};
