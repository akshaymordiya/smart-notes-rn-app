module.exports = {
  root: true,
  env: { es2021: true, node: true, jest: true },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['react'],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['dist', 'build', 'node_modules'],
  rules: { 'react/react-in-jsx-scope': 'off' }
};


