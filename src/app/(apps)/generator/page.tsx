import Client from "./Client"
import db from "~/db"

export default async function Generator() {
  const catalogs = await db.query.catalogs.findMany()

  return <Client catalogs={catalogs} />
}
