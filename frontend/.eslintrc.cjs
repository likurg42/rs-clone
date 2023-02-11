module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "react",
    "react-hooks",
    "jsx-a11y",
    "functional",
    "import",
    "@typescript-eslint"
  ],
  "extends": [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:functional/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
    tsconfigRootDir: __dirname,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "rules": {
    "jsx-a11y/label-has-associated-control": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "jsx-a11y/label-has-for": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": 0,
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "**/vite.config.ts"
        ]
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "import/no-unresolved": [
      2,
      {
        "ignore": [
          ".png$",
          ".webp$",
          ".jpg$"
        ]
      }
    ],
    "react/react-in-jsx-scope": 0,
    "functional/no-conditional-statement": 0,
    "functional/no-expression-statement": 0,
    "functional/immutable-data": 0,
    "functional/functional-parameters": 0,
    "functional/no-try-statement": 0,
    "functional/no-throw-statement": 0,
    "functional/no-return-void": 0,
    "functional/no-mixed-type": 0,
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "no-underscore-dangle": [
      2,
      {
        "allow": [
          "__filename",
          "__dirname"
        ]
      }
    ],
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function"
      }
    ]
  },
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [
        ".ts",
        ".tsx",
        ".d.ts"
      ]
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
        "project": "./"
      }
    }
  },
  "overrides": [
    {
      "files": [
        "**/*.{ts,tsx,js,jsx}"
      ],
      "rules": {
        "@typescript-eslint/no-var-requires": "off"
      }
    }
  ],
  "ignorePatterns": [
    ".eslintrc.cjs",
    "postcss.config.cjs"
  ]
};
