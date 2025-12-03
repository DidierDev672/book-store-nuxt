import { defineConfig } from 'eslint/config';

export default defineConfig([
    {
        rules: {
            semi: 'error',
            "prefer-const": 'error'
        }
    },
    {
        files: ["**/*.js", "**/*.ts", "**/*.cts", "**.*.mts"],
        ignores: ["__tests/**"],
        rules: {
            "no-console": "error"
        }
    }
])