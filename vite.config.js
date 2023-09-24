import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isDev = process.env.NODE_ENV === 'development';

// 本地启动了 mock 服务，视项目情况填写
const serverUrl = 'http://localhost:4040';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(process.cwd(), '/src'),
      },
    ],
  },
  define: {
    'BASE_URL': isDev ? JSON.stringify(serverUrl + '/api') : JSON.stringify('/api'),
  },
  plugins: [
    react(),
  ],
  server: {
    port: 3000,
    open: 'http://localhost:3000', // 或 true
    // proxy: {
    //   '/api': {
    //     target: serverUrl,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
  // 解决在 js 文件里写 jsx
  // How to use .js instead of .jsx https://github.com/vitejs/vite/discussions/3448
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    // loader: 'tsx',
    // include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
              loader: 'jsx',
              contents: fs.readFileSync(args.path, 'utf8'),
            }));
          },
        },
      ],
    },
  },
});