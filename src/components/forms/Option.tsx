import Base from "./Base"
import { Select } from ".."
import type { InsertOption } from "~/db/schema"

export default function Option({
  id,
  redirectUrl,
}: {
  id: number | undefined
  redirectUrl: string
}) {
  return (
    <Base<InsertOption>
      defaultId={id}
      redirectUrl={redirectUrl}
      schema="options"
    >
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
