
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

const ExtractTextPlugin = require('extract-text-webpack-plugin');

var lessLoader = ExtractTextPlugin.extract('css?sourceMap!less?sourceMap');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: [
    'babel-polyfill',
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

  // https://stackoverflow.com/questions/30568796/how-to-store-configuration-file-and-read-it-using-react
  // https://stackoverflow.com/questions/36065832/webpack-include-configuration-file-as-external-resource?noredirect=1#comment59778282_36065832
  externals: {
    config: JSON.stringify({
      // If true, prod_test_fixture_backend will be used.
      PRODUCTION: product,
      prod_test_fixture_backend: 'http://localhost:5000',

      // backend: 'https://snapshizzy.herokuapp.com',

      backend: 'http://localhost:5000',
    }),

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

      { test: /\.less$/, exclude: /node_modules/, loader: lessLoader },

      // ... temporary (???) for rc-slider...
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },

      // // ... temporary (???) for rc-slider... !!BREAKS Semantic UI!!
      // {
      //   test: /\.css/,
      //   loader: ExtractTextPlugin.extract(
      //     'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      //   ),
      // },

      // { test: /\.(woff|png|jpg|gif)$/, loader: 'url-loader?limit=10000' },
      // ... add woff2, svg, eot, ttf => for Semantic UI
      { test: /\.(woff|woff2|png|jpg|gif|svg|eot|ttf)$/, loader: 'url-loader?limit=10000' },

      // ???
      // { test: /\.(eot|svg|ttf|woff|woff2)$/, exclude: /node_modules/, loader: "file" },
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

    // new ExtractTextPlugin('bundle.css'),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
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
