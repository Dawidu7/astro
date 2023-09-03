"use client"

import { Children, cloneElement, isValidElement, useState } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import type { ComponentProps } from "react"

type FormProps<T> = {
  action: (formData: T) => Promise<void>
  errors?: Record<string, string>
} & Omit<ComponentProps<"form">, "action" | "onSubmit">

export default function Form<T>({
  action: _action,
  children,
  errors,
  ...props
}: FormProps<T>) {
  const [formData, setFormData] = useState<T>({} as T)

  async function action() {
    console.log(formData)
  }

  return (
    <form action={action} {...props}>
      {useFormChildren(children, setFormData, errors)}
    </form>
  )
}

function useFormChildren<T>(
  children: React.ReactNode,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  errors: Record<string, string> | undefined,
) {
  const { pending } = useFormStatus()

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

    if (props.type === "submit") {
      return cloneElement(child as JSX.Element, {
        isDisabled: pending || undefined,
      })
    }
  })
}
