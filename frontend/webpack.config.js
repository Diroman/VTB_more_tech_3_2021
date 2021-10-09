/* eslint-disable */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
      filename: 'bundle.js',
      pathinfo: false,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-modules-typescript-loader?modules',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                  auto: /\.module\.\w+$/i,
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          use: ['url-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: "src/favicon.ico",
        template: path.resolve(__dirname, `src/index.html`),
      }),
    ],
    devtool: 'source-map',
    devServer: {
      port: 8080,
      open: true,
      hot: true,
      contentBase: ['./src', './public'],
      historyApiFallback: true,
      disableHostCheck: true,
      host: '0.0.0.0',
      proxy: {
        '/api/storage/': {
          context: () => true,
          target: 'http://[::1]:8082',
          secure: false,
          changeOrigin: true,
          headers: {
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',

          },
      },
        '/api/': {
          context: () => true,
          target: 'http://[::1]:8888',
          secure: false,
          changeOrigin: true,
          headers: {
            Connection: 'keep-alive',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-id, Content-Length, X-Requested-With',
          },
        },
      },
    },
    stats: 'errors-only',
  };

}
