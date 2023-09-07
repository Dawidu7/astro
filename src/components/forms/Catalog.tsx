import { redirect } from "next/navigation"
import Base from "./Base"
import { Input } from ".."
import db from "~/db"
import { catalogs } from "~/db/schema"
import type { InsertCatalog, SelectCatalog } from "~/db/schema"

export default function Catalog() {
  async function create(formData: InsertCatalog) {
    "use server"

    const { insertId } = await db.insert(catalogs).values(formData)
  }

  async function update(formData: InsertCatalog) {
    "use server"
  }

  return (
    <Base<InsertCatalog, SelectCatalog> action={create}>
      <Input label="Value" name="value" />
    </Base>
  )
}
