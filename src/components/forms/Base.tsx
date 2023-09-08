import { eq } from "drizzle-orm"
import type { MySqlTableWithColumns, TableConfig } from "drizzle-orm/mysql-core"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Button, Form, Input, Group, Modal } from ".."
import db from "~/db"

export default async function Base<T extends { id?: number; name: string }>({
  children,
  className,
  defaultId,
  schema,
  ...props
}: Omit<
  ComponentProps<typeof Form>,
  "action" | "defaultValue" | "defaultValues"
> & {
  defaultId?: string
  schema: MySqlTableWithColumns<TableConfig>
}) {
  const defaultValue = defaultId
    ? ((
        await db
          .select()
          .from(schema)
          .where(eq(schema.id, parseInt(defaultId)))
      )[0] as T)
    : undefined

  async function create(formData: T) {
    "use server"

    await db.insert(schema).values(formData)

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function update(formData: T) {
    "use server"

    await db.update(schema).set(formData).where(eq(schema.id, defaultValue!.id))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  async function remove() {
    "use server"

    await db.delete(schema).where(eq(schema.id, defaultValue!.id))

    revalidatePath("/dashboard")
    redirect("/dashboard")
  }

  return (
    <Form
      {...props}
      action={defaultId ? update : create}
      className={twMerge("mt-2 p-4", className)}
      defaultValues={defaultValue}
    >
      <Input label="Name" name="name" />
      {children}
      <Group>
        {defaultId && (
          <Modal
            title="Confirm Delete"
            trigger={
              <Button className="flex-1" variant="destructive">
                Delete
              </Button>
            }
          >
            <p>
              Are you sure you want to delete <b>{defaultValue!.name}</b>?
            </p>
            <form action={remove}>
              <Button
                className="mt-4 w-full"
                type="submit"
                variant="destructive"
              >
                Delete
              </Button>
            </form>
          </Modal>
        )}
        <Button type="submit">{defaultId ? "Update" : "Create"}</Button>
      </Group>
    </Form>
  )
}
