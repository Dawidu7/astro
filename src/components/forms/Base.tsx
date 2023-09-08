import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Button, Form, Input, Group, Link } from ".."

export default function Base<T>({
  children,
  className,
  ...props
}: Omit<
  ComponentProps<typeof Form>,
  "action" | "defaultValue"
> & {
  action: (formData: T) => Promise<void>
  defaultValues?: T
}) {
  return (
    <Form {...props} className={twMerge("mt-2 p-4", className)}>
      <Input label="Name" name="name" />
      {children}
      <Group>
        {props.defaultValues && <Button></Button>}
        <Button type="submit">
          {props.defaultValues ? "Update" : "Create"}
        </Button>
      </Group>
    </Form>
  )
}
