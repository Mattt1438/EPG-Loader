module.exports = {
  root: true,
  extends: 'airbnb-typescript/base',
  plugins: ['import', 'prettier', 'simple-import-sort'],
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

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],

    'simple-import-sort/imports': 'error',
    
    'import/order': ['error'],
    
    'no-console': ['error'],
  },
};
