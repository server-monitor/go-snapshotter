
// http://spencerdixon.com/blog/test-driven-react-tutorial.html

const argv = require('yargs').argv;

const base = require('./base.config');
const injectGlobals = require('./spec/inject_globals');

module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: !argv.watch,
    frameworks: ['mocha', 'chai'],

    reporters: [
      'mocha',
      // 'spec',
      'notify'
    ],

    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',

      // ...
      injectGlobals,
      './spec/helpers/utilities.js',
      './spec/**/*.spec.js'
    ],

    preprocessors: {
      './spec/**/*.js': [
        'webpack',
        'sourcemap',
      ],
    },

    webpack: {
      // https://github.com/pugjs/pug-loader/issues/8
      node: { fs: 'empty' },

      devtool: 'inline-source-map',
      resolve: {
        // allow us to import components in tests like:
        // import Example from 'components/Example';
        root: base.srcDir,

        // allow us to avoid including extension name
        extensions: [
          '',
          '.js',
          '.jsx',

          // https://github.com/airbnb/enzyme/issues/309
          '.json'
        ],

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
        loaders: base.loaders.concat([
          // https://github.com/airbnb/enzyme/issues/309
          { test: /\.json$/, loader: 'json' },

          {
            test: /(semantic\-ui\-css|rc-slider).+?\.css$/,
            // include key originally not present.
            // include: [nodeModulesDir],
            loader: 'style-loader!css-loader',
          },

          {
            // !!Prob. apply filters later!!
            test: /\.less$/,
            // exclude: /node_modules/,
            // include: [base.srcDir],
            loader: 'style!css!less'
          },
        ]),
      },

      externals: {
        // https://github.com/airbnb/enzyme/issues/309
        // cheerio: 'window',

        'react/lib/ExecutionEnvironment': true,

        // https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
        'react/lib/ReactContext': true,
        // 'react/lib/ReactContext': 'window',

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

    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-webpack',
      'karma-phantomjs-launcher',

      // 'karma-spec-reporter',
      'karma-mocha-reporter',
      'karma-notify-reporter',

      'karma-sourcemap-loader',
    ],

    context: base.srcDir,
    urlRoot: base.backend,
    proxies: { '/': base.backend }
  });
};
