module.exports = {
  root: true,
  extends: 'airbnb-typescript/base',
  plugins: ['import', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    '@typescript-eslint/no-empty-function': [
      'error',
      { allow: ['private-constructors'] },
    ], 
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['off'],
  },
};
