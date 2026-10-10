// The BetterAuth CLI uses this configuration to create its database tables.
import { getAuth } from "./lib/auth";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
export const auth = getAuth();
