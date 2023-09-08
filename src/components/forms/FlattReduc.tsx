import Base from "./Base"
import { Input } from ".."
import { flattReducs } from "~/db/schema"
import type { InsertFlattReduc } from "~/db/schema"

export default async function FlattReduc({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  return (
    <Base<InsertFlattReduc> defaultId={searchParams.id} schema={flattReducs}>
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
