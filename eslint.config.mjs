import next from "eslint-config-next";

/**
 * Flat config. eslint-config-next ships a native flat export in Next 16, so
 * the FlatCompat shim is unnecessary here (and hits a circular reference in
 * the shared React settings when used).
 */
const eslintConfig = [
  ...next,
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
