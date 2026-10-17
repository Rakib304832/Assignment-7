import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
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