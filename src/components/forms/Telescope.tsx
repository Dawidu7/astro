import Base from "./Base"
import { Input } from ".."
import type { InsertTelescope } from "~/db/schema"

export default function Telescope({
  id,
  redirectUrl,
}: {
  id: number | undefined
  redirectUrl: string
}) {
  return (
    <Base<InsertTelescope>
      defaultId={id}
      redirectUrl={redirectUrl}
      schema="telescopes"
    >
      <Input
        label="Focal Length"
        name="focalLength"
        type="number"
        minValue={0}
      />
      <Input label="Diameter" name="diameter" type="number" minValue={0} />
      <Input
        label="Focal Ratio"
        name="focalRatio"
        type="number"
        minValue={0}
        step={0.01}
      />
    </Base>
  )
}
