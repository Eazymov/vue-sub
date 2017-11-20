require('dotenv').config()

const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const resolve = (src) => path.resolve(__dirname, src)
const config = {
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      "package": resolve('./'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
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
}
const NODE_ENV = process.env.NODE_ENV || 'production'

switch (NODE_ENV) {
  case 'test':
    config.entry = './test/e2e/src/index.ts'
    config.output = {
      filename: 'index.js',
      path: resolve('test/e2e/dist'),
    }
    break;

  case 'production':
    config.entry = './lib/index.js'
    config.output = {
      filename: 'vue-sub.min.js',
      path: resolve('dist')
    }
    config.target = 'web'
    config.plugins = [
      new UglifyJSPlugin(),
    ];
    break;

  default:
    break;
}

module.exports = config
