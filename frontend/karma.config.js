
const argv = require('yargs').argv;
const path = require('path');

// const extractTextPlugin = require('extract-text-webpack-plugin');

// const preProc = 'less';
// const lessLoader = extractTextPlugin.extract(
//   // Use this if you don't want to add [name, local, hash...] to class names.
//   // 'css?sourceMap!less?sourceMap' // names aren't mangled.

//   'css?sourceMap?modules&importLoaders=1&' +
//     `localIdentName=${preProc}_[name]__[local]___[hash:base64:5]!${preProc}?sourceMap`

//   // 'localIdentName=[name]__[local]___[hash:base64:5]!less?sourceMap'

//   // Also works...
//   // 'css?module&localIdentName=less_[name]__[local]___[hash:base64:5]!less'
//   // 'css?sourceMap!less?sourceMap' // names aren't mangled.

//   // I don't know... this...
//   // module&localIdentName
//   // or this...
//   // modules&importLoaders=1&localIdentName
// );

module.exports = (config) => {
  config.set({
    // only use PhantomJS for our 'test' browser
    browsers: ['PhantomJS'],

    // just run once by default unless --watch flag is passed
    singleRun: !argv.watch,

    // which karma frameworks do we want integrated
    frameworks: [
      'phantomjs-shim',
      'mocha',
      'chai'
    ],

    // displays tests in a nice readable format
    reporters: ['spec', 'notify'],

    // notifyReporter: {
    //   wait: true
    // },

    // include some polyfills for babel and phantomjs
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',

      // ...
      './spec/helpers/utilities.js',
      './spec/external_data_access/**/*.spec.js',
      // './spec/components/**/*.spec.js',
      // './spec/components/snapshot/**/*.spec.js',
      // './spec/components/snapshot/picture/*.spec.js',
      // './spec/components/snapshot/meta_data/title.spec.js',
      // './spec/**/*.spec.js' // specify files to watch for tests
    ],
    preprocessors: {
      // these files we want to be precompiled with webpack
      // also run tests through sourcemap for easier debugging
      './spec/**/*.js': ['webpack', 'sourcemap']
    },
    // A lot of people will reuse the same webpack config that they use
    // in development for karma but remove any production plugins like UglifyJS etc.
    // I chose to just re-write the config so readers can see what it needs to have
    webpack: {
      // https://github.com/pugjs/pug-loader/issues/8
      node: {
        fs: 'empty'
      },
      devtool: 'inline-source-map',
      resolve: {
        // allow us to import components in tests like:
        // import Example from 'components/Example';
        root: path.resolve(__dirname, './src'),

        // allow us to avoid including extension name
        extensions: ['', '.js', '.jsx'],

        // required for enzyme to work properly
        alias: {
          sinon: 'sinon/pkg/sinon'
        }
      },
      module: {
        // don't run babel-loader through the sinon module
        noParse: [
          /node_modules\/sinon\//
        ],
        // run babel loader for our tests
        loaders: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },

          // !!HACK!!
          // ... temporary (???) for semantic-ui-css, rc-slider, others...
          {
            // test: /\.css$/,
            test: /(semantic\-ui\-css|rc-slider).+?\.css$/,
            // include key originally not present.
            // include: [nodeModulesDir],
            loader: 'style-loader!css-loader',
          },

          {
            // !!Prob. apply filters later!!
            test: /\.less$/,
            // exclude: /node_modules/,
            // include: ['./src'],
            loader: 'style!css!less'
          },

          // { test: /\.(woff|png|jpg|gif)$/, loader: 'url-loader?limit=10000' },
          // ... add woff2, svg, eot, ttf => for Semantic UI
          { test: /\.(woff|woff2|png|jpg|gif|svg|eot|ttf)$/, loader: 'url-loader?limit=10000' },
          // !!END HACK!!
        ],
      },
      // required for enzyme to work properly
      externals: {
        jsdom: 'window',
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': 'window',

        // !!For... "enzyme... Error: Cannot resolve module 'react/addons'!!"
        // Error doesn't stop testing however you won't get the status...
        //   [karma]: No captured browser, open http://localhost:9876/
        // https://github.com/airbnb/enzyme/issues/47
        // Error from link is different but similar cure.
        //   Error: Cannot resolve module 'react/lib/ReactContext'
        //   Fix (already added by this Dixon source): 'react/lib/ReactContext': 'window'
        'react/addons': true
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    // tell karma all the plugins we're going to be using to prevent warnings
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-shim',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-notify-reporter',
      'karma-sourcemap-loader'
    ],

    context: path.resolve(__dirname, 'src')
  });
};
