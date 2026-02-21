import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    rules: js.configs.recommended.rules, 
    languageOptions: { globals: globals.browser, ecmaVersion: "latest" } 
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
      globals: globals.browser
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended[0].rules
    }
  }
];
