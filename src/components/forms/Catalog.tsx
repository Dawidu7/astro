import Base from "./Base"
import { Input } from ".."
import type { InsertCatalog } from "~/db/schema"

export default function Catalog({
  id,
  redirectUrl,
}: {
  id: number | undefined
  redirectUrl: string
}) {
  return (
    <Base<InsertCatalog>
      defaultId={id}
      redirectUrl={redirectUrl}
      schema="catalogs"
    >
      <Input label="Value" name="value" />
    </Base>
  )
}
