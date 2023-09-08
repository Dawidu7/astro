import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Button, Form, Input, Group, Modal } from ".."

export default function Base<T extends { id?: number; name: string }>({
  children,
  className,
  onDelete,
  ...props
}: Omit<ComponentProps<typeof Form>, "action" | "defaultValue"> & {
  action: (formData: T) => Promise<void>
  defaultValues?: T
  onDelete: () => Promise<void>
}) {
  return (
    <Form {...props} className={twMerge("mt-2 p-4", className)}>
      <Input label="Name" name="name" />
      {children}
      <Group>
        {props.defaultValues && (
          <Modal
            title="Confirm Delete"
            trigger={
              <Button className="flex-1" variant="destructive">
                Delete
              </Button>
            }
          >
            <p>
              Are you sure you want to delete <b>{props.defaultValues.name}</b>?
            </p>
            <form action={onDelete}>
              <Button
                className="mt-4 w-full"
                type="submit"
                variant="destructive"
              >
                Delete
              </Button>
            </form>
          </Modal>
        )}
        <Button type="submit">
          {props.defaultValues ? "Update" : "Create"}
        </Button>
      </Group>
    </Form>
  )
}
