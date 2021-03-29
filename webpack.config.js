var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var extractCSS = new ExtractTextPlugin('./css/[name].css')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: 'index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './js/[name].js?[hash:8]',
  },
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/sass'),
      path.resolve('src/images'),
      path.resolve('src/assets'),
      path.resolve('src/pug'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js'],
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      assets: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      versions: false,
      warnings: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          { loader: 'file-loader', options: { name: '[path][name].[ext]' } },
        ],
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.(pug)$/,
        use: [
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true,
            },
          },
        ],
        include: path.resolve('src/pug'),
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader']),
        include: path.resolve('src/css'),
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.(sass|scss)$/,
        use: extractCSS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]),
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules'),
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve('.'),
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]?[hash:8]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
        include: path.resolve('src/images'),
        exclude: path.resolve('./node_modules'),
      },
    ],
  },
  plugins: [
    extractCSS,
    new CopyWebpackPlugin([{ from: 'assets', to: 'assets' }]),
  ],
}
