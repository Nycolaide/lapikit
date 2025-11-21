import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
  // Ignore patterns
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      "**/node_modules/**",
      "**/.svelte-kit/**",
      "**/dist/**",
      "**/build/**",
      "**/*.tsbuildinfo",
      "**/coverage/**",
      "eslint.config.js", // Ignore le fichier de config lui-même
    ],
  },

  // Base config for all JS/TS files
  {
    files: ["**/*.js", "**/*.ts", "**/*.mjs"],
    extends: [js.configs.recommended, ...ts.configs.recommended, prettier],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: null, // Désactive le type-checking basé sur tsconfig
        ecmaVersion: 2022,
        sourceType: "module",
      },
    },
    rules: {
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Config files - disable type checking
  {
    files: ["**/*.config.js", "**/*.config.ts", "**/*.config.mjs"],
    extends: [ts.configs.disableTypeChecked],
  }
);
