module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "env": {
    "browser": true,
    "jest": true,
    "node": true
  },
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true
    }],
    // https://github.com/typescript-eslint/typescript-eslint/issues/149#issuecomment-488555168
    // this will be default in next breaking relese of the plugin
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowTypedFunctionExpressions": true
    }]
  },
  "overrides": [
    // https://github.com/yannickcr/eslint-plugin-react/issues/1461#issuecomment-450820465
    {
      "files": ["**/*.tsx"],
      "rules": {
        "react/prop-types": "off"
      }
    }, {
      "files": ["webpack.config.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
        "no-console": "off"
      }
    }
  ],
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  },
  "parser": "@typescript-eslint/parser"
};
