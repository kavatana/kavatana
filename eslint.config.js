import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["node_modules/**", ".nuxt/**", ".output/**", ".vercel/**", "dist/**", "venv/**"],
  },
  js.configs.recommended,
  {
    rules: {
      "no-undef": "off",
    },
  },
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/attributes-order": "off",
      "vue/html-closing-bracket-spacing": "off",
      "vue/html-self-closing": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multiline-html-element-content-newline": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
  },
];
