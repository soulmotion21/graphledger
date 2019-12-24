const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  // 가장 처음 읽을 스크립트파일
  // 여기서부터 import 되어있는 다른 스크립트를 불러온다.
  entry: './src/js/index.js',

  // 파일을 합치고 ./public/bundle.js 에 저장한다.
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public'
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  // babel
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src/js'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/env", {
                "targets": {
                  "browsers": ["last 2 versions"]
                }
              }]
            ]
          }
        }
    }, {
     test: /\.css$/,
     use: [
       {
         loader: MiniCssExtractPlugin.loader
       },
       {
         loader: 'css-loader',
         options: {

         }
       }
     ]
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'url-loader',
        options: {
        limit: 8192
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html', // public/index.html 파일을 읽는다.
      filename: 'index.html' // output으로 출력할 파일은 index.html 이다.
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
};