const { resolve } = require('path');
const { DefinePlugin } = require('webpack');
const { getPlugin, pluginByName } = require('@craco/craco');

const isDev = process.env.NODE_ENV === 'development';

// 本地启动了 mock 服务，视项目情况填写
const serverUrl = 'http://localhost:4040';

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 默认配置没有处理 PUBLIC_URL，会导致处理 index.html 模板里的变量出错
      const { isFound, match: htmlWebpackPlugin } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin'),
      );
      isFound &&
        (htmlWebpackPlugin.userOptions.templateParameters = { 'PUBLIC_URL': '' });
      return webpackConfig;
    },
    alias: {
      '@': resolve(process.cwd(), 'src'),
    },
    plugins: [
      new DefinePlugin({
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'BASE_URL': isDev ? JSON.stringify(serverUrl + '/api') : JSON.stringify('/api'),
      }),
    ],
  },
};
