import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['.next', 'out', 'coverage']),
  {
    files: ['**/*.{js,jsx,mjs}'],
    extends: [js.configs.recommended, reactHooks.configs.flat.recommended],
    plugins: { '@next/next': nextPlugin },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, process: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      // Tuck's art is small static SVG/PNG with fixed sizes; next/image adds nothing.
      '@next/next/no-img-element': 'off',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['**/*.test.{js,jsx}', 'src/test/**'],
    languageOptions: { globals: { ...globals.browser, ...globals.vitest } },
  },
  {
    files: ['*.config.{js,mjs}'],
    languageOptions: { globals: globals.node },
  },
  prettier,
])
