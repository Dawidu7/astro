import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Base from "./Base"
import { Input, Group } from ".."
import db from "~/db"
import { cameras } from "~/db/schema"
import type { InsertCamera } from "~/db/schema"

export default async function Camera({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  const defaultValue = searchParams.id
    ? (
        await db
          .select()
          .from(cameras)
          .where(eq(cameras.id, parseInt(searchParams.id)))
      )[0]
    : undefined

  async function create(formData: InsertCamera) {
    "use server"

    await db.insert(cameras).values(formData)

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function update(formData: InsertCamera) {
    "use server"

    await db
      .update(cameras)
      .set(formData)
      .where(eq(cameras.id, parseInt(searchParams.id!)))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function remove() {
    "use server"

    await db.delete(cameras).where(eq(cameras.id, parseInt(searchParams.id!)))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  return (
    <Base<InsertCamera>
      action={searchParams.id ? update : create}
      defaultValues={defaultValue}
      onDelete={remove}
    >
      <Group separator="x">
        <Input
          label="Resolution X"
          name="resolutionX"
          type="number"
          minValue={0}
        />
        <Input
          label="Resolution Y"
          name="resolutionY"
          type="number"
          minValue={0}
        />
      </Group>
      <Group separator="x">
        <Input
          label="Matrix X"
          name="matrixX"
          type="number"
          minValue={0}
          step={0.01}
        />
        <Input
          label="Matrix Y"
          name="matrixY"
          type="number"
          minValue={0}
          step={0.01}
        />
      </Group>
      <Input
        label="Pixel Size"
        name="pixelSize"
        type="number"
        minValue={0}
        step={0.01}
      />
    </Base>
  )
}
