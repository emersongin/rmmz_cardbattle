const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'rmmz_cardbattle.js',
    path: path.resolve(__dirname, 'plugins')
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/, // Aplica a regra para arquivos .js
        exclude: /node_modules/, // Ignora node_modules
        use: {
          loader: 'babel-loader', // Usa o Babel
          options: {
            presets: [['@babel/preset-env', { modules: 'commonjs' }]], // Transpilação para CommonJS
          }
        }
      }
    ]
  }
};