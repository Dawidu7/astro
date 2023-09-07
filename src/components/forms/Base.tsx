import type { ComponentProps } from "react"
import { Button, Form, Input, Link, Group, Modal } from ".."

export default function Base({
  children,
  hasDefault,
  onDelete,
  ...props
}: ComponentProps<typeof Form> & {
  hasDefault: boolean
  onDelete: () => Promise<void>
}) {
  return (
    <Form {...props}>
      {children}
      <Group>
        <Button type="submit">{hasDefault ? "Update" : "Create"}</Button>
      </Group>
    </Form>
  )
}
