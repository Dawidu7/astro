import Base from "./Base"
import { Input } from ".."
import type { InsertFlattReduc } from "~/db/schema"

export default function FlattReduc({
  id,
  redirectUrl,
}: {
  id: number | undefined
  redirectUrl: string
}) {
  return (
    <Base<InsertFlattReduc>
      defaultId={id}
      redirectUrl={redirectUrl}
      schema="flattReducs"
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
