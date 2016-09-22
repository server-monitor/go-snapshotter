
// https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
// +
// http://andrewhfarmer.com/build-your-own-starter/#4-webpack
// +
// https://github.com/webpack/webpack/issues/1151

// F*** this
//   "scripts": {
//     dev:hot": "webpack-dev-server \
//       --hot --inline --progress --colors --watch \
//       --display-error-details --display-cached --content-base ./"

const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    './index.js',
  ],

  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',

    // publicPath: 'http://localhost:8080/www',
  },

  // Apparently, some options are available for config here and some are not. STJS.
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'www'),

    // port: 8080,
  },

  // ... file/line number info missing if this is not enabled.
  devtool: 'source-map',

  resolveLoader: {
    root: [
    path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['', '.js', '.jsx'],
  },

  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },

  // module: {
  //   loaders: [{
  //     test: /\.jsx?$/,
  //     exclude: /(node_modules|bower_components)/,
  //     loader: 'babel',
  //     query: {
  //       presets: ['react', 'es2015', 'stage-0'],
  //     },
  //   }],
  // },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

// ...

// var path = require('path');

// var config = {
//   context: path.join(__dirname, 'src'),
//   entry: [
//     './index.js',
//   ],

//   devtool: 'source-map',

//   output: {
//     path: path.join(__dirname, 'www'),
//     filename: 'bundle.js',
//   },

//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loaders: ['babel'],
//       },
//     ],
//   },
//   resolveLoader: {
//     root: [
//       path.join(__dirname, 'node_modules'),
//     ],
//   },
//   resolve: {
//     root: [
//       path.join(__dirname, 'node_modules'),
//     ],
//   },
// };

// module.exports = config;
