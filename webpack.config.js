const { resolve } = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const cwd = process.cwd();

const publicDir = resolve(cwd, 'public');

const isDev = process.env.NODE_ENV === 'development';

// 本地启动了 mock 服务，视项目情况填写
const serverUrl = 'http://localhost:4040';

// function clearConsole() {
//   process.stdout.write(
//     process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
//   );
// }

module.exports = {
  mode: 'development',
  devtool: isDev ? 'source-map' : false,
  entry: {
    index: resolve(cwd, 'src/index.js'),
  },
  output: {
    path: resolve(cwd, 'dist'),
    publicPath: '/',
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    // assetModuleFilename: 'media/[name].[hash][ext]',
  },
  devServer: {
    static: {
      directory: publicDir, // 指定静态资源的路径
      publicPath: publicDir,
    },
    compress: true, // 是否压缩
    port: 3000, // 指定使用端口
    hot: true, // 是否热更新，那肯定啦...
    open: true, // 编译完成打开浏览器
    client: {
      logging: 'error', // 终端显示错误即可
      overlay: { // warnings 类型不要挡着页面，error才展示为浏览器页面
        errors: true,
        warnings: false,
      },
    },
    historyApiFallback: { disableDotRule: true, index: '/' },
    // proxy: { // 配置代理
    //   '/api': {
    //     target: serverUrl,
    //     changeOrigin: true,
    //   },
    // },
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //     // minChunks: 3,
  //     // minSize: 0,
  //     cacheGroups: {
  //       default: {
  //         priority: 1,
  //         reuseExistingChunk: true,
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  stats: {
    preset: 'minimal',
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 解析 js 文件
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      // https://webpack.docschina.org/plugins/mini-css-extract-plugin/
      // 推荐 production 环境的构建将 CSS 从你的 bundle 中分离出来，
      // 这样可以使用 CSS/JS 文件的并行加载。 
      // 这可以通过使用 mini-css-extract-plugin 来实现，因为它可以创建单独的 CSS 文件。 
      // 对于 development 模式（包括 webpack-dev-server），
      // 你可以使用 style-loader，因为它可以使用多个 标签将 CSS 插入到 DOM 中，并且反应会更快。
      {
        test: /\.css$/, // 添加对样式表的处理
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.less$/, // 使用 less sass 这些要额外声明处理规则
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              // 新版本的file-loader选项esModule默认为true，
              // 需要将其设置为false，否则打包后src为[object Module]
              esModule: false,
              limit: 8192,
              name: 'media/[name].[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': resolve(cwd, 'src'),
    },
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // 编译时替换全局变量
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'BASE_URL': isDev ? JSON.stringify(serverUrl + '/api') : JSON.stringify('/api'),
    }),
    new ESLintPlugin({
      extensions: ['.js', '.ts'],
    }), // https://eslint.org/docs/latest/integrate/nodejs-api#-new-eslintoptions
    !isDev && new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    // 用来将打包的 js 注入到 index.html
    new HtmlWebpackPlugin({
      inject: 'body',
      template: resolve(publicDir, 'index.html'),
      templateParameters: {
        'PUBLIC_URL': '',
      },
    }),
    // 把 public 的文件拷贝过去 dist 文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: publicDir,
          globOptions: {
            ignore: [
              '**/index.html', // html 由 HtmlWebpackPlugin 生成，不需要拷贝
              '**/.DS_Store',
              '**/Thumbs.db',
            ],
          },
        },
      ],
    }),
    function(compiler) {
      compiler.hooks.done.tapAsync('end', ({ startTime, endTime }, callback) => {
        console.info(chalk.greenBright(chalk.bold(`===> Cost Time: ${endTime - startTime}ms`)));
        callback();
      });
    },
  ].filter(Boolean),
};
