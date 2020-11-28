'use strict'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const packageConfig = require('../package.json')

function _resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './example/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../example/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  externals: {
    'pollex': 'pollex'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [_resolve('example')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: _resolve('src'),
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.css$/,
        include: [_resolve('example'), _resolve('src'), _resolve('dist')],
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('../example/', 'index.html') }
      ]
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: '0.0.0.0',
    port: '8000',
    open: false,
    overlay: { warnings: false, errors: true },
    proxy: {
      '/tapi': {
        target: 'https://act.imusic.cn/tapi',
        changeOrigin: true,
        pathRewrite: { '^/vapi': '/' }
      },
      '/vapi': {
        target: 'https://act.imusic.cn/vapi',
        changeOrigin: true,
        pathRewrite: { '^/vapi': '/' }
      }
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env': require('../config/dev.env')
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './example/index.html',
      inject: true,
      chunksSortMode: 'dependency'
    })
  ]
}

const createNotifierCallback = () => {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    console.log(severity)
    if (severity !== 'error') return

    const error = errors[0]
    // console.log(error.webpackError)
    // console.log(devWebpackConfig.output.path)
    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name
    })
  }
}

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = 8000
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      // process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host === '0.0.0.0' ? '127.0.0.1' : devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: createNotifierCallback()
      }))

      resolve(devWebpackConfig)
    }
  })
})
