import { configDefaults, defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      "lives-service/**",
      "calendar-service/**",
    ],
  },
});
