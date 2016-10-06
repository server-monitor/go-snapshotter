
const path = require('path');

const srcDir = path.resolve(__dirname, 'src');

module.exports = {
  srcDir,

  production: false,

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
