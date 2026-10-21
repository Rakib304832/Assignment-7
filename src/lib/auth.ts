import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// MongoClient parses the URI eagerly but only connects on first use, so fall
// back to a placeholder when MONGODB_URI is missing (e.g. during `next build`)
// instead of crashing at import time.
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.warn(
    "MONGODB_URI is not set. Auth requests will fail until it is configured.",
  );
}
const client = new MongoClient(mongoUri ?? "mongodb://127.0.0.1:27017");
const db = client.db("better-auth");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  logger: { level: "debug" },
  socialProviders: {
    google: {
      clientId:
        process.env.BETTER_AUTH_GOOGLE_CLIENT_ID ??
        process.env.GOOGLE_CLIENT_ID ??
        "",
      clientSecret:
        process.env.BETTER_AUTH_GOOGLE_SECRET ??
        process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET ??
        process.env.GOOGLE_CLIENT_SECRET ??
        "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },
});