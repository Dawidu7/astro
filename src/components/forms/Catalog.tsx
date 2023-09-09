import { eq } from "drizzle-orm"
import Base from "./Base"
import { Input } from ".."
import db from "~/db"
import { catalogs } from "~/db/schema"
import type { InsertCatalog } from "~/db/schema"

export default function Catalog({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  return (
    <Base<InsertCatalog> defaultId={searchParams.id} schema="catalogs">
      <Input label="Value" name="value" />
    </Base>
  )
}
