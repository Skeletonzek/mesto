const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: { main: './src/pages/index.js' },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader?name=./images/[hash].[ext]'
      },

      {
        test: /\.(woff2|woff)$/,
        loader: 'file-loader?name=./vendor/[hash].[ext]'
      },
          
      {
        test: /\.html$/,
        loader: 'html-loader',
      },

      {
        test: /\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
          ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new MiniCssExtractPlugin()
  ]
};