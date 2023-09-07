import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Button, Form, Input, Group, Link } from ".."

export default function Base<I, S extends { id: number; name: string }>({
  children,
  className,
  defaultValue,
  ...props
}: Omit<ComponentProps<typeof Form>, "action" | "defaultValue"> & {
  action: (formData: I) => Promise<void>
  defaultValue?: S
}) {
  return (
    <Form {...props} className={twMerge("mt-2 p-4", className)}>
      <Input label="Name" name="name" defaultValue={defaultValue?.name} />
      {children}
      <Group>
        {defaultValue && <Button></Button>}
        <Button type="submit">{defaultValue ? "Update" : "Create"}</Button>
      </Group>
    </Form>
  )
}
