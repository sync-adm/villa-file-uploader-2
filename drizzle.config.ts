// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle/pg",
  dbCredentials: {
    // drizzle-kit lê da env se você passar a URL aqui
    url: process.env.DATABASE_URL!, // ex: postgres://user:pass@host:5432/db
  },
  // opcional: melhora logs
  // verbose: true,
});
