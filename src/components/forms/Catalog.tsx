import Base from "./Base"
import { Button, Form, Input } from ".."
import { InsertCatalog, SelectCatalog } from "~/db/schema"

export default function Catalog({
  default: _default,
}: {
  default?: SelectCatalog
}) {
  async function create(formData: InsertCatalog) {
    "use server"
  }

  async function update(formData: InsertCatalog) {
    "use server"
  }

  return (
    <Base action={_default ? update : create} hasDefault={!!_default}>
      <Input label="Name" name="name" defaultValue={_default?.name} />
      <Input label="Value" name="value" defaultValue={_default?.value} />
    </Base>
  )
}
