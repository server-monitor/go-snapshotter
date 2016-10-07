
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');

const prod = 'production';
const production = (JSON.stringify(
  process.env.APP_ENV === prod ||

  /* eslint-disable no-underscore-dangle */
  (typeof window !== 'undefined' &&
    window && window.__env__ &&
    window.__env__.APP_ENV === prod)
  /* eslint-enable */
));

module.exports = {
  srcDir,
  production,

  // backend: 'https://snapshizzy.herokuapp.com',
  backend: 'http://localhost:5000',

  loaders: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      // include: [srcDir],
      // query: {
      //   presets: ['es2015', 'react'],
      // },
    },

    {
      test: /\.(woff|woff2|png|jpg|gif|svg|eot|ttf)$/,
      loader: 'url-loader?limit=10000'
    }
  ]
};
