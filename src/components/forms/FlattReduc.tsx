import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Base from "./Base"
import { Input } from ".."
import db from "~/db"
import { flattReducs } from "~/db/schema"
import type { InsertFlattReduc } from "~/db/schema"

export default async function FlattReduc({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const defaultValue = searchParams.id
    ? (
        await db
          .select()
          .from(flattReducs)
          .where(eq(flattReducs.id, parseInt(searchParams.id)))
      )[0]
    : undefined

  async function create(formData: InsertFlattReduc) {
    "use server"

    await db.insert(flattReducs).values(formData)

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function update(formData: InsertFlattReduc) {
    "use server"

    await db
      .update(flattReducs)
      .set(formData)
      .where(eq(flattReducs.id, parseInt(searchParams.id!)))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function remove() {
    "use server"

    await db
      .delete(flattReducs)
      .where(eq(flattReducs.id, parseInt(searchParams.id!)))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  return (
    <Base<InsertFlattReduc>
      action={searchParams.id ? update : create}
      defaultValues={defaultValue}
      onDelete={remove}
    >
      <Input
        label="Times"
        name="times"
        type="number"
        minValue={0}
        step={0.01}
      />
    </Base>
  )
}
