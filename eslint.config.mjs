import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default {
  files: ['**/*.{js,mjs,cjs,ts}'], // Apply to all JS/TS files

  languageOptions: {
    parserOptions: {
      ecmaVersion: 2020, // ECMAScript version
      sourceType: 'module', // Allow import/export
    },
    globals: globals.node, // Node.js globals
  },

  extends: [
    pluginJs.configs.recommended, // JS recommended rules
    ...tseslint.configs.recommended.map((config) => config), // TS recommended rules
  ],

  ignorePatterns: ['node_modules', 'dist'], // Files to ignore

  rules: {
    'no-unused-vars': 'error',
    'no-unused-expressions': 'error',
    'prefer-const': 'error',
    'no-console': 'warn',
    'no-undef': 'error',
  },
};
