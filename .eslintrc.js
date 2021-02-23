const { resolve } = require('path')

module.exports = {
  root: true,
  parserOptions: {
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  env: { browser: true },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:vue/vue3-essential',
    'standard'
  ],
  plugins: ['@typescript-eslint', 'vue'],
  globals: {
    ga: true, // Google Analytics
    cordova: true,
    __statics: true,
    __QUASAR_SSR__: true,
    __QUASAR_SSR_SERVER__: true,
    __QUASAR_SSR_CLIENT__: true,
    __QUASAR_SSR_PWA__: true,
    process: true,
    Capacitor: true,
    chrome: true
  },
  rules: {
    'dot-notation': 'off',
    'space-before-function-paren': 'off',
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',

    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',

    // TypeScript
    quotes: ['warn', 'single', { avoidEscape: true }],
    '@typescript-eslint/explicit-function-return-type': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
