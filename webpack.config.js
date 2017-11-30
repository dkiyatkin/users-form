/* eslint-disable node/no-unpublished-require */

const p = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackBuildNotifierPlugin = require('webpack-build-notifier')

module.exports = {
  name: 'users-form',
  entry: {
    'users-form': './src/index.js',
  },
  output: {
    path: p.resolve(__dirname, 'public/assets'),
    filename: '[name].js',
    publicPath: '/assets/',
  },
  stats: { children: false }, // extract-text-webpack-plugin - disable logs
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(\/node_modules\/|\/src\/components\/)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', { 'modules': false }],
                'stage-0',
              ],
            },
          },
        ],
      }, {
        test: /\.js$/,
        include: /\/src\/components\//,
        exclude: /\/node_modules\//,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'react',
                ['es2015', { 'modules': false }],
                'stage-0',
              ],
            },
          },
        ],
      }, {
        // локально, sourceMap, включая postcss, без url
        test: /\.css$/,
        exclude: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]&url=false&sourceMap', {
            loader: 'postcss-loader', options: { sourceMap: true, },
          }],
        }),
      }, {
        // глобально, sourceMap, включая postcss, без url
        test: /\.css$/,
        include: /\.global\./,
        exclude: /\/node_modules\//,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&url=false&sourceMap', {
            loader: 'postcss-loader', options: { sourceMap: true, },
          }],
        }),
      }, {
        // глобально, без sourceMap, без postcss, без url
        test: /\.css$/,
        include: /\/node_modules\//,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=1&localIdentName=[local]&url=false'],
        }),
      }, {
        // локально, sourceMap, включая postcss, без url
        test: /\.scss$/,
        exclude: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[name]__[local]--[hash:base64:5]&url=false&sourceMap', {
            loader: 'postcss-loader', options: { sourceMap: true, },
          }, {
            loader: 'sass-loader', options: { sourceMap: true, },
          }],
        }),
      }, {
        // глобально, sourceMap, включая postcss, без url
        test: /\.scss$/,
        include: /(\/node_modules\/|\.global\.)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&importLoaders=2&localIdentName=[local]&url=false&sourceMap=true', {
            loader: 'postcss-loader', options: { sourceMap: true, },
          }, {
            loader: 'sass-loader', options: { sourceMap: true, },
          }],
        }),
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin('users-form.css'),
    new WebpackBuildNotifierPlugin({
      title: 'users-form Webpack Build',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: p.join(__dirname, 'public'),
    port: 3000,
  },
  resolve: {
    alias: {
      'ufSrc': p.resolve(__dirname, 'src'),
    },
  },
}
