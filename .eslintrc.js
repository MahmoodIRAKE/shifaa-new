module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  env: {
    browser: true,
    es6: true,
    jquery: true // This allows $ to be used without ESLint errors
  },
  globals: {
    $: 'readonly',
    jQuery: 'readonly'
  },
  rules: {
    'no-undef': 'error',
    'no-unused-vars': 'warn'
  }
};
