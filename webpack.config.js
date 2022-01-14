
const nodeExternals = require('webpack-node-externals');

module.exports = {
  externalsPresets: {
    node: true
  },
  externals: [nodeExternals()],
  entry: './bin/www',
  output: {
    filename: 'bundle.js'
  }
};
