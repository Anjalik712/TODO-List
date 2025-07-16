import nx from '@nx/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist'],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {
      'no-console': ['warn'],
      'no-duplicate-imports': 'error',
      'object-curly-spacing': ['error', 'always'],
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    plugins: {
      import: importPlugin,
    },
    rules: {
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'method',
          format: ['camelCase'],
        },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'type',
            'object',
            'unknown',
          ],
          pathGroups: [
            {
              pattern: '**/*.component',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/*.service',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/*.directives',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '**/*.pipe',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '{**/*.model}',
              group: 'type',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['@angular'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
