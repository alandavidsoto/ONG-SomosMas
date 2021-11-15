module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  parser: "@babel/eslint-parser",
  plugins: ["react", "prettier"],
  rules: {
    semi: ["error", "always"],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        trailingComa: "es5",
        tabWidth: 2,
        semi: true,
        singleQuote: false,
        endOfLine: "auto",
      },
    ],
  },
};
