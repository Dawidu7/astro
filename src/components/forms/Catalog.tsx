import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import Base from "./Base"
import { Input } from ".."
import db from "~/db"
import { catalogs } from "~/db/schema"
import type { InsertCatalog, SelectCatalog } from "~/db/schema"

export default function Catalog({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  async function create(formData: InsertCatalog) {
    "use server"

    await db.insert(catalogs).values(formData)

    redirect("/dashboard")
  }

  async function update(formData: InsertCatalog) {
    "use server"

    await db
      .update(catalogs)
      .set(formData)
      .where(eq(catalogs.id, parseInt(searchParams.id!)))

    redirect("/dashboard")
  }

  return (
    <Base<InsertCatalog, SelectCatalog>
      action={searchParams.id ? update : create}
    >
      <Input label="Value" name="value" />
    </Base>
  )
}
