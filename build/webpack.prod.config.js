var webpack = require('webpack')
const packageJson = require('../package.json')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function _resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './src/index.js',
  output: {
    path: _resolve('dist'),
    filename: packageJson.name + '.min.js',
    library: packageJson.name,
    libraryTarget: 'umd'
  },
  externals: {
    'pollex': 'pollex'
  },
  // mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [_resolve('src')],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: false,
      parallel: true
    })
  ]
}
