import "server-only";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as dbSchema from "@/db/schema";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: dbSchema,
  }),
  plugins: [nextCookies()],
  emailAndPassword: { enabled: true },
  appName: "Boilerplate app",
  telemetry: { enabled: false, debug: false },
});
