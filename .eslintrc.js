module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'prettier'],
  // Remove the "parser" key
  parserOptions: {
    // Update the parser to use the built-in parser instead of babel-eslint
    parser: '@babel/eslint-parser',
  },
  rules: {
    // Add any additional rules or overrides here
  },
};
