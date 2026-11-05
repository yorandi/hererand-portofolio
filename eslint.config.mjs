import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";

// Next.js 15 exposes legacy configs; adapt them to ESLint 9's flat format.
const compat = new FlatCompat({
    baseDirectory: fileURLToPath(new URL(".", import.meta.url)),
});

const config = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        ignores: [
            ".next/**",
            "out/**",
            "build/**",
            "test-results/**",
            "playwright-report/**",
            "next-env.d.ts",
        ],
    },
];

export default config;
