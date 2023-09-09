import Base from "./Base"
import { Input } from ".."
import type { InsertFlattReduc } from "~/db/schema"

export default function FlattReduc({ id }: { id: number | undefined }) {
  return (
    <Base<InsertFlattReduc> defaultId={id} schema="flattReducs">
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
