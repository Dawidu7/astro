import { hash } from "bcrypt"
import { eq } from "drizzle-orm"
import db from "~/db"
import { admin } from "~/db/schema"

export default async function page() {
  console.log(await db.query.admin.findFirst())

  // await db.insert(admin).values({ password: await hash("admin", 10) })

  console.log(await db.query.admin.findFirst())

  return null
}
