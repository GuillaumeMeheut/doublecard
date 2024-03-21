const noRestrictedImports = require('./config/eslintCreateNoRestrictedImports');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
    'jsx-a11y',
    'react-hooks',
    'import',
    'simple-import-sort',
    '@forsta/eslint-plugin',
  ],

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    'jest/globals': true,
    mocha: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended',
    'prettier',
    './config/confirmit.eslint.rules.js',
  ],

  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
    },
    'import/core-modules': ['../gateway/server.js'],
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },

  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    eqeqeq: ['error', 'allow-null'],
    '@forsta/formatted-todo-comments': 'error',
    'guard-for-in': 'error',
    'no-array-constructor': 'error',
    'no-caller': 'error',
    'no-cond-assign': ['error', 'always'],
    'no-const-assign': 'error',
    'no-control-regex': 'error',
    'no-debugger': 'error',
    'no-delete-var': 'error',
    'no-dupe-args': 'error',
    'no-dupe-class-members': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty-pattern': 'error',
    'no-eval': 'error',
    'no-ex-assign': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-func-assign': 'error',
    'no-implied-eval': 'error',
    'no-invalid-regexp': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': ['error', {allowLoop: false, allowSwitch: false}],
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-mixed-operators': [
      'error',
      {
        groups: [
          ['&', '|', '^', '~', '<<', '>>', '>>>'],
          ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
          ['&&', '||'],
          ['in', 'instanceof'],
        ],
        allowSamePrecedence: false,
      },
    ],
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
    'no-negated-in-lhs': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-symbol': 'error',
    'no-new-wrappers': 'error',
    'no-obj-calls': 'error',
    'no-octal': 'error',
    'no-octal-escape': 'error',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],
    'no-regex-spaces': 'error',
    ...noRestrictedImports(),
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-script-url': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-sparse-arrays': 'error',
    'no-this-before-super': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-unused-labels': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-rename': [
      'error',
      {
        ignoreDestructuring: false,
        ignoreImport: false,
        ignoreExport: false,
      },
    ],
    'no-else-return': ['error', {allowElseIf: false}],
    'no-with': 'error',
    'one-var': ['error', 'never'],
    'operator-assignment': ['error', 'always'],
    radix: 'error',
    strict: ['error', 'never'],
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'react/jsx-no-duplicate-props': ['error', {ignoreCase: true}],
    'react/jsx-no-undef': 'error',
    'react/jsx-pascal-case': [
      'error',
      {
        allowAllCaps: true,
        ignore: [],
      },
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/no-deprecated': 'error',
    'react/no-direct-mutation-state': 'error',
    'react/no-is-mounted': 'error',
    'react/react-in-jsx-scope': 'error',
    'react/require-render-return': 'error',

    'jsx-a11y/aria-role': 'error',
    // 'jsx-a11y/img-has-alt': 'error',
    'jsx-a11y/img-redundant-alt': 'error',
    'jsx-a11y/no-access-key': 'error',

    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {target: './src/client', from: './src/gateway'},
          {target: './src/gateway', from: './src/client'},
          {target: './src/shared', from: './src/client'},
          {target: './src/shared', from: './src/gateway'},
        ],
      },
    ],
    'sort-imports': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Style imports.
          ['^.+\\.s?css$'],
          // Side effect imports.
          ['^\\u0000'],
          // Packages.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^@?\\w'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
    'prefer-const': ['error', {destructuring: 'all'}],
    'object-shorthand': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        ignoreRestSiblings: true,
        varsIgnorePattern: '(?:[iI]gnored)|(?:^_)',
        argsIgnorePattern: '(?:[iI]gnored)|(?:^_)',
      },
    ],
    'jest/consistent-test-it': ['error', {fn: 'it', withinDescribe: 'it'}],
    '@forsta/no-data-test-id': 'error',
  },

  overrides: [
    {
      files: ['**/*.spec.ts', '**/*.spec.tsx', '**/__tests__/*.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
    {
      files: ['src/**/index.js', 'src/**/index.jsx', 'src/**/index.ts', 'src/**/index.tsx'],
      rules: {
        '@forsta/no-declarations': 'error',
        'import/no-default-export': 'error',
      },
    },
    {
      files: ['src/client/**/*.+([jt]s)?(x)'],
      excludedFiles: ['*.spec*', 'src/client/common/redux/hooks.ts'],
      rules: noRestrictedImports({
        paths: [
          {
            name: 'react-redux',
            importNames: ['useDispatch', 'useSelector'],
            message: 'Please use useApp(Selector|Dispatch) from src/client/common/redux/hooks instead.',
          },
        ],
      }),
    },
  ],
};
