"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from "react"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { validate } from "~/lib/actions"
import { getFormSchema } from "~/lib/utils"

type FormProps<T> = {
  action: (formData: T) => Promise<void>
  errors?: Record<string, string | undefined>
} & Omit<ComponentProps<"form">, "action" | "onSubmit">

export default function Form<T>({
  action: _action,
  children,
  className,
  errors: _errors,
  ...props
}: FormProps<T>) {
  const [formData, setFormData] = useState<T>({} as T)
  const [errors, setErrors] = useState(_errors || {})
  const schema = getFormSchema(children)

  async function action() {
    const result = await validate(schema, formData)

    if (!result.success) {
      setErrors(result.issues || {})
      return
    }

    setErrors({})

    await _action(formData)
  }

  useEffect(() => setErrors(prev => _errors || prev), [_errors])

  return (
    <form
      {...props}
      action={action}
      className={twMerge("flex flex-col gap-6", className)}
    >
      {getFormChildren(children, errors, setFormData)}
    </form>
  )
}

function getFormChildren<T>(
  children: React.ReactNode,
  errors: Record<string, string | undefined> | undefined,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
): React.ReactNode {
  return Children.map(children, child => {
    if (!isValidElement(child)) return

    const { props } = child

    // Is an Input
    if (props.name) {
      function onChange(_value: any) {
        setFormData(prev => ({
          ...prev,
          [props.name]: _value,
        }))
      }

      return cloneElement(child as JSX.Element, {
        error: errors ? errors[props.name] : undefined,
        onChange,
      })
    }

    if (props.role === "group") {
      return cloneElement(child as JSX.Element, {
        children: getFormChildren(props.children, errors, setFormData),
      })
    }

    if (props.type === "submit") {
      return cloneElement(child as JSX.Element)
    }

    return child
  })
}
