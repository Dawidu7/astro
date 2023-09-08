import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
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

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function update(formData: InsertCatalog) {
    "use server"

    await db
      .update(catalogs)
      .set(formData)
      .where(eq(catalogs.id, parseInt(searchParams.id!)))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function remove() {
    "use server"

    await db.delete(catalogs).where(eq(catalogs.id, parseInt(searchParams.id!)))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  return (
    <Base<InsertCatalog>
      action={searchParams.id ? update : create}
      defaultValues={defaultValue}
      onDelete={remove}
    >
      <Input label="Value" name="value" />
    </Base>
  )
}
