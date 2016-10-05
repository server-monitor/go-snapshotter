// https://semaphoreci.com/community/tutorials/testing-react-components-with-enzyme-and-mocha
// +
// http://andrewhfarmer.com/build-your-own-starter/#4-webpack
// +
// https://github.com/webpack/webpack/issues/1151

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const env = require('./env');

// TODO...
// const doNotMangleNames = 'do_not_mangle_names';

const preProc = 'less';
const lessLoader = ExtractTextPlugin.extract(
  // Use this if you don't want to add [name, local, hash...] to class names.
  // 'css?sourceMap!less?sourceMap' // names aren't mangled.

  'css?sourceMap?modules&importLoaders=1&' +
    `localIdentName=${preProc}_[name]__[local]___[hash:base64:5]!${preProc}?sourceMap`

  // 'localIdentName=[name]__[local]___[hash:base64:5]!less?sourceMap'

  // Also works...
  // 'css?module&localIdentName=less_[name]__[local]___[hash:base64:5]!less'
  // 'css?sourceMap!less?sourceMap' // names aren't mangled.

  // I don't know... this...
  // module&localIdentName
  // or this...
  // modules&importLoaders=1&localIdentName
);

const srcDir = path.resolve(__dirname, 'src');
const wwwDir = path.resolve(__dirname, 'www');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');

module.exports = {
  context: srcDir,

  // context: path.join(__dirname, 'src'),
  // entry: [
  //   'babel-polyfill',
  //   './index.js',
  // ],

  entry: [
    // I don't know about these two. HMR seems to work without them.
    // https://stackoverflow.com/questions/24581873/what-exactly-is-hot-module-replacement-in-webpack
    // 'webpack/hot/dev-server',

    'webpack-dev-server/client?http://localhost:8080',
    // For React Hot Loader
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'react-hot-loader/patch',
    './index.js'
  ],

  output: {
    path: wwwDir,
    // path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    // publicPath: 'http://localhost:8080/www',
  },

  // Apparently, some options are available for config here and some are not. STJS.
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: wwwDir,
    // contentBase: path.join(__dirname, 'www'),
    // port: 8081,

    proxy: {
      '*': env.backend,
      // OR...
      // '*': env.prod_test_fixture_backend
      // '*': 'http://localhost:5000'
    },
  },

  // File/line number info missing if this is not enabled.
  devtool: 'source-map',

  resolveLoader: {
    root: [
      nodeModulesDir,
      // path.join(__dirname, 'node_modules'),
    ],
  },
  resolve: {
    root: [
      nodeModulesDir,
      // path.join(__dirname, 'node_modules'),
    ],
    extensions: ['', '.js', '.jsx'],
  },

  // https://stackoverflow.com/questions/30568796/how-to-store-configuration-file-and-read-it-using-react
  // https://stackoverflow.com/questions/36065832/webpack-include-configuration-file-as-external-resource?noredirect=1#comment59778282_36065832
  externals: {
    cheerio: 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: [srcDir],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },

      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: [srcDir],
        loader: lessLoader,
      },

      // // TODO, less regular and hack, stricter scoping...
      // { test: /\.less$/,
      //   exclude: /(node_modules|do_not_mangle_names)/,
      //   loader: lessLoader, },
      // { test: /do_not_mangle_names.*\.less$/,
      //   exclude: /node_modules/,
      //   loader: 'css?sourceMap!less?sourceMap', },

      // // ... temporary (???) for rc-slider...
      // { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },

      // ... temporary (???) for semantic-ui-css, rc-slider, others...
      {
        // test: /\.css$/,
        test: /(semantic\-ui\-css|rc-slider).+?\.css$/,
        // include key originally not present.
        // include: [nodeModulesDir],
        loader: ExtractTextPlugin.extract('css'),
      },

      // ... if it breaks Semantic UI CSS and others, just use ExtractTextPlugin.extract('css').
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: [srcDir],
        loader: ExtractTextPlugin.extract(
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
        ),
      },

      // { test: /\.(woff|png|jpg|gif)$/, loader: 'url-loader?limit=10000' },
      // ... add woff2, svg, eot, ttf => for Semantic UI
      { test: /\.(woff|woff2|png|jpg|gif|svg|eot|ttf)$/, loader: 'url-loader?limit=10000' },

      // ???
      // { test: /\.(eot|svg|ttf|woff|woff2)$/, exclude: /node_modules/, loader: "file" },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('bundle.css', { allChunks: true }),
  ],
};
