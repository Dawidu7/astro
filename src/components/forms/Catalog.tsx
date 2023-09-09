import Base from "./Base"
import { Input } from ".."
import type { InsertCatalog } from "~/db/schema"

export default function Catalog({ id }: { id: number | undefined }) {
  return (
    <Base<InsertCatalog> defaultId={id} schema="catalogs">
      <Input label="Value" name="value" />
    </Base>
  )
}
