// @typescript-eslint Doc Sample: https://typescript-eslint.io/docs/linting/typed-linting/monorepos/
module.exports = {
  root: true,
  plugins: [
    '@typescript-eslint',
    'import',
    'react',
    'prettier',
    'unused-imports',
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowAutomaticSingleRunInference: true,
  },
  rules: {
    // ==================================
    // TODO: align react import with library and fix it
    // No need for React global import https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ], // for redux-tookit immer use https://redux-toolkit.js.org/usage/immer-reducers#linting-state-mutations
    'no-param-reassign': ['error', { props: false }], // ==================================
    'react/jsx-no-duplicate-props': ['warn', { ignoreCase: false }],
    'react/function-component-definition': 0,
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0, // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off', // Temporary disabled needs an additional settings with eslint-import-resolver-typescript
    // https://github.com/import-js/eslint-import-resolver-typescript#readme
    // 'import/no-unused-modules': ['warn', { unusedExports: true }]
    'import/no-unused-modules': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'jsx-a11y/label-has-associated-control': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', // ==================================
    'no-unused-vars': [
      'off',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ], // Add exclude for variables starting with _
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ], // ==================================
    '@typescript-eslint/no-empty-interface': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
    react: {
      version: 'detect',
    },
  },
};
