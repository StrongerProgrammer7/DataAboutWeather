module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'public', 'vite.config.ts', '*.json'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  plugins: ['react-refresh', "@typescript-eslint", "simple-import-sort",
    "react",],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "indent": [
      "error",
      "tab",
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": 0,
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "eol-last": ["error", "always"],
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2,
        "maxEOF": 3
      }

    ],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"],
        "custom":
        {
          "regex": "^I[A-Z]",
          "match": false
        }
      },
      {
        "selector": ["variable"],
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "should", "has", "can", "did", "will"]
      }

    ],
    "brace-style": ["error", "allman"],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-mixed-spaces-and-tabs": ["off", "smart-tabs"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "comma-dangle": ["error", "never"],
    "semi-spacing": ["error", { "before": false, "after": true }]
  },
};
