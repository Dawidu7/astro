import { Children, isValidElement } from "react"
import { date, minLength, minValue, number, object, string } from "valibot"

export function createSchema(schema: Record<string, string>) {
  return object(
    Object.entries(schema).reduce((acc, [key, value]) => {
      if (value === "date") {
        return { ...acc, [key]: date("Must be a valid date.") }
      }

      if (value === "number") {
        return {
          ...acc,
          [key]: number("Must be a number.", [minValue(0, "Must be >= 0.")]),
        }
      }

      if (value === "select") {
        return { ...acc, [key]: object({}, "Must be a valid option.") }
      }

      return {
        ...acc,
        [key]: string([minLength(1, "Must be >= 1 characters long.")]),
      }
    }, {}),
  )
}

export function getFormSchema(
  children: React.ReactNode,
): Record<string, string> {
  return Children.toArray(children).reduce((acc, child) => {
    if (!isValidElement(child)) return acc

    const { props } = child as JSX.Element

    if (props.role === "group") {
      return { ...acc, ...getFormSchema(props.children) }
    }

    if (!props.name) return acc

    if (props.type) {
      return { ...acc, [props.name]: props.type }
    }

    if (props.items) {
      if (props.items[0]) {
        return { ...acc, [props.name]: "string" }
      }

      return { ...acc, [props.name]: "select" }
    }

    return { ...acc, [props.name]: "string" }
  }, {})
}
