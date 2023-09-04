import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/planetscale-serverless"
import { connect } from "@planetscale/database"
import * as schema from "./schema"

dotenv.config({ path: ".env.local" })

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing.")
}

const connection = connect({
  url: process.env.DATABASE_URL,
})

const db = drizzle(connection, { schema })

export default db
