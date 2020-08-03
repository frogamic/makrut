module.exports = {
  env: {
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'import/extensions': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'no-console': 'off',
  },
};
