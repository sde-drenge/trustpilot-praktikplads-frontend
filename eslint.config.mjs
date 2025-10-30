import eslintPluginNext from '@next/eslint-plugin-next'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import typescriptEslint from 'typescript-eslint'

const eslintIgnore = [
  '.git/',
  '.next/',
  'node_modules/',
  'dist/',
  'build/',
  'coverage/',
  'playwright-report/',
  '.npm-only-allow',
  'test-results',
  '*.min.js',
  'next-env.d.ts',
]

const config = typescriptEslint.config(
  {
    ignores: eslintIgnore,
  },

  typescriptEslint.configs.recommended,

  {
    plugins: {
      '@next/next': eslintPluginNext,
      'jsx-a11y': eslintPluginJsxA11y,
      'react-hooks': pluginReactHooks,
    },

    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs['core-web-vitals'].rules,

      ...eslintPluginJsxA11y.configs.recommended.rules,

      ...pluginReactHooks.configs.recommended.rules,
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn'],

      'react/prefer-destructuring-assignment': 'off',
      'node/prefer-global/process': 'off',
    },
  },
)

export default config
