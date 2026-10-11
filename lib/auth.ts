import { betterAuth, type BetterAuthOptions } from "better-auth";
import { Pool } from "pg";
import { PostgresDialect } from "kysely";

let authInstance: ReturnType<typeof betterAuth> | undefined;

export function isAuthConfigured() {
  return Boolean(process.env.DATABASE_URL && process.env.BETTER_AUTH_SECRET && process.env.BETTER_AUTH_URL);
}

export function getAuth() {
  if (!isAuthConfigured()) throw new Error("Authentication environment variables are missing.");
  if (!authInstance) {
    authInstance = betterAuth<BetterAuthOptions>({
      appName: "BazarDor",
      baseURL: process.env.BETTER_AUTH_URL,
      secret: process.env.BETTER_AUTH_SECRET,
      database: {
        dialect: new PostgresDialect({ pool: new Pool({ connectionString: process.env.DATABASE_URL, max: 5 }) }),
        type: "postgres",
        schemaName: "bazardor_auth",
      },
      emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 8 },
      account: {
        accountLinking: { enabled: true, allowDifferentEmails: true },
      },
      socialProviders: {
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
          google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET },
        } : {}),
        ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
          github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET },
        } : {}),
      },
    });
  }
  return authInstance;
}
