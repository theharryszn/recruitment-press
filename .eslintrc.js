module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    // Prettier
    "@react-native-community/eslint-config",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
};
