import Base from "./Base"
import { Select } from ".."
import type { InsertOption } from "~/db/schema"

export default function Option({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  return (
    <Base<InsertOption> defaultId={searchParams.id} schema="options">
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
