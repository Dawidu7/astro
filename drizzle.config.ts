import dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({ path: ".env.local" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing.")
}

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  driver: "mysql2",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config
