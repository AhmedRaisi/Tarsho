/* eslint-disable prettier/prettier */
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    jest: true,
    browser: true,
    amd: true,
    node: true,
    "es6": true      // For ES6 globals like Promise
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
