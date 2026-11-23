
export default [
  {
    files: ['**/*.js'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        process: 'readonly',
        console: 'readonly'
      }
    },

    rules: {
      'no-undef': 'error',
      'no-unused-vars': 'warn'
    }
  }
];
