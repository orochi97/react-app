// 这里不适用了 prettier，可酌情使用
module.exports = {
  env: {
    // 关键字指定你想启用的环境
    browser: true,
    es2021: true,
  },
  extends: [
    // 一个配置文件可以被基础配置中的已启用的规则继承
    'react-app',
    'react-app/jest',
  ],
  parserOptions: {
    // 允许你指定你想要支持的 JavaScript 语言选项
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    // 支持使用第三方插件，检查自定义的语法
    // 'prettier', // 省略了 eslint-plugin- 前缀，插件全称为 eslint-plugin-vue
  ],
  rules: {
    // 直接声明的 eslint 规则
    semi: ['error', 'always'], // 规则为：需要结束分号，优先级为 error，即抛错
    // 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号
    // 当在 同一行时，禁止使用拖尾逗号。https://eslint.bootcss.com/docs/rules/comma-dangle
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    'no-unused-vars': ['error', { args: 'after-used' }],
    // "plugin1/rule1": "error" 配置定义在插件中的一个规则的时候，必须使用 插件名/规则ID 的形式
    // 'prettier/prettier': 'error',
  },
  // globals: {
  //   var1: 'writable', // 对 var1 这个全局变量允许重写
  //   var2: 'readonly', // 对 var2 这个全局变量只允许读取
  //   var3: 'off', // 不支持 var3 这个全局变量
  // },
};
