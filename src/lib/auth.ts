import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const databaseUrl =
  process.env.DATABASE_URL ?? "mongodb://127.0.0.1:27017/bazaar-dor";
const client = new MongoClient(databaseUrl);
const db = client.db("bazaar-dor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  emailAndPassword: { enabled: true },
});
