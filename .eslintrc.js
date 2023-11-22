const isBabelParser = process.env.PRODUCTION === 'True';
module.exports = isBabelParser ? {
  // parser: '@babel/eslint-parser', // If you're using Babel for parsing
  // plugins: ['react', 'react-hooks'],
  // extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
    // ...other rules...
    // 'no-unused-vars': 'error'
  }
} : {
  parser: '@babel/eslint-parser', // If you're using Babel for parsing
  // plugins: ['react', 'react-hooks'],
  // extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  rules: {
    // ...other rules...
    // 'no-unused-vars': 'error'
  }
};

