import Base from "./Base"
import { Input, Group } from ".."
import type { InsertCamera } from "~/db/schema"

export default async function Camera({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  return (
    <Base<InsertCamera> defaultId={searchParams.id} schema="cameras">
      <Group separator="x">
        <Input
          label="Resolution X"
          name="resolutionX"
          type="number"
          minValue={0}
        />
        <Input
          label="Resolution Y"
          name="resolutionY"
          type="number"
          minValue={0}
        />
      </Group>
      <Group separator="x">
        <Input
          label="Matrix X"
          name="matrixX"
          type="number"
          minValue={0}
          step={0.01}
        />
        <Input
          label="Matrix Y"
          name="matrixY"
          type="number"
          minValue={0}
          step={0.01}
        />
      </Group>
      <Input
        label="Pixel Size"
        name="pixelSize"
        type="number"
        minValue={0}
        step={0.01}
      />
    </Base>
  )
}
