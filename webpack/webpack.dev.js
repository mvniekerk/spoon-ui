const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const sass = require('sass');
var DuplicatePackageCheckerPlugin = require("duplicate-package-checker-webpack-plugin");

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const ENV = 'development';

module.exports = {
  plugins: [new DuplicatePackageCheckerPlugin()]
};

module.exports = (options) => webpackMerge(commonConfig({ env: ENV }), {
  devtool: 'cheap-module-source-map', // https://reactjs.org/docs/cross-origin-errors.html
  mode: ENV,
  entry: [
    'react-hot-loader/patch',
    './app/index'
  ],
  output: {
    path: utils.root('target/www'),
    filename: 'app/[name].bundle.js',
    chunkFilename: 'app/[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', {
          loader: 'sass-loader',
          options: { implementation: sass }
        }
        ]
      },
    ]
  },
  devServer: {
    stats: options.stats,
    hot: true,
    contentBase: './target/www',
    proxy: [{
      context: [
        '/api',
        '/management',
        '/v2/api-docs',
        '/h2-console',
        '/auth'
      ],
      target: `http${options.tls ? 's' : ''}://127.0.0.1:8080`,
      secure: false,
      changeOrigin: options.tls,
      headers: { host: 'localhost:9000' }
    }, {
      context: [
        '/websocket'
      ],
      target: 'ws://127.0.0.1:8080',
      ws: true
    }],
    watchOptions: {
      ignored: /node_modules/
    }
  },
  stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
  plugins: [
    process.env.JHI_DISABLE_WEBPACK_LOGS
      ? null
      : new SimpleProgressWebpackPlugin({
        format: options.stats === 'minimal' ? 'compact' : 'expanded'
      }),
    new FriendlyErrorsWebpackPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 9000,
      proxy: {
        target: 'http://localhost:9060',
        ws: true
      },
      socket: {
        clients: {
          heartbeatTimeout: 60000
        }
      }
    }, {
      reload: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new writeFilePlugin(),
    new webpack.WatchIgnorePlugin([
      utils.root('test'),
    ]),
    new WebpackNotifierPlugin({
      title: 'spoon-ui',
      contentImage: path.join(__dirname, 'spoon-ui.png')
    })
    // new BundleAnalyzerPlugin()
  ].filter(Boolean),
});
