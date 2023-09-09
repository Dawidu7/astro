import Base from "./Base"
import { Select } from ".."
import type { InsertOption } from "~/db/schema"

export default function Option({ id }: { id: number | undefined }) {
  return (
    <Base<InsertOption> defaultId={id} schema="options">
      <Select
        label="Type"
        items={[
          "angle",
          "camera",
          "catalog",
          "constellation",
          "filter",
          "telescope",
        ]}
        name="type"
      />
    </Base>
  )
}
