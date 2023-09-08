import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import Base from "./Base"
import { Input } from ".."
import db from "~/db"
import { catalogs } from "~/db/schema"
import type { InsertCatalog } from "~/db/schema"

export default async function Catalog({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const defaultValue = searchParams.id
    ? (
        await db
          .select()
          .from(catalogs)
          .where(eq(catalogs.id, parseInt(searchParams.id)))
      )[0]
    : undefined

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
    <Base<InsertCatalog>
      action={searchParams.id ? update : create}
      defaultValues={defaultValue}
    >
      <Input label="Value" name="value" />
    </Base>
  )
}
