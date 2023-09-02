"use client"

import clsx from "clsx"
import { useState } from "react"
import type { ComponentProps } from "react"
import {
  Group,
  Input as AriaInput,
  Label,
  NumberField,
  Text as AriaText,
  TextField,
  TextArea as AriaTextArea,
} from "react-aria-components"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { twMerge } from "tailwind-merge"
import { Button } from "."

type DefaultInputProps = {
  className?: string
  description?: React.ReactNode
  error?: React.ReactNode
  label: React.ReactNode
  matcher?: (value: string) => string
}

type InputProps =
  | ({ type: "number" } & ComponentProps<typeof Number>)
  | ({ type: "textarea" } & ComponentProps<typeof TextArea>)
  | ComponentProps<typeof Text>

const GROUP_CLASSNAME = "relative z-10"
const DESCRIPTION_CLASSNAME = "text-sm text-zinc-400"
const ERROR_MESSAGE_CLASSNAME = "text-sm text-red-600"

export default function Input({ type, ...props }: InputProps) {
  switch (type) {
    case "number":
      return <Number {...(props as ComponentProps<typeof Number>)} />
    case "textarea":
      return <TextArea {...(props as ComponentProps<typeof TextArea>)} />
    default:
      return <Text {...(props as ComponentProps<typeof Text>)} />
  }
}

function Number({
  className,
  defaultValue,
  description,
  error,
  label,
  ...props
}: Omit<DefaultInputProps, "matcher"> &
  Omit<
    ComponentProps<typeof NumberField>,
    "className" | "onChange" | "value"
  >) {
  const { inputClass, labelClass } = useClassNames(className, !!error)

  return (
    <NumberField {...props} className={GROUP_CLASSNAME}>
      <Group className="relative">
        <AriaInput className={inputClass} placeholder=" " />
        <Label className={labelClass}>{label}</Label>
        <div className="absolute right-0 top-0 flex h-full items-center">
          <Button
            className="text-zinc-400 data-[hovered]:text-white"
            slot="decrement"
            plain
          >
            <AiFillCaretDown />
          </Button>
          <Button
            className="text-zinc-400 data-[hovered]:text-white"
            slot="increment"
            plain
          >
            <AiFillCaretUp />
          </Button>
        </div>
      </Group>
    </NumberField>
  )
}

function Text({
  className,
  defaultValue,
  description,
  error,
  label,
  ...props
}: DefaultInputProps &
  Omit<ComponentProps<typeof TextField>, "className" | "value">) {
  const { inputClass, labelClass } = useClassNames(className, !!error)
  const [value, setValue] = useState(defaultValue || "")

  function onChange(value: string) {
    setValue(value)
  }

  return (
    <TextField
      {...props}
      className={GROUP_CLASSNAME}
      onChange={onChange}
      value={value}
    >
      <AriaInput className={inputClass} placeholder=" " />
      <Label className={labelClass}>{label}</Label>
    </TextField>
  )
}

function TextArea({
  className,
  defaultValue,
  description,
  error,
  label,
  ...props
}: DefaultInputProps &
  Omit<
    ComponentProps<typeof AriaTextArea>,
    "className" | "onChange" | "placeholder" | "value"
  >) {
  const { inputClass, labelClass } = useClassNames(className, !!error)
  const [value, setValue] = useState((defaultValue as string) || "")

  function onChange(value: string) {
    setValue(value)
  }

  return (
    <TextField className={GROUP_CLASSNAME} onChange={onChange} value={value}>
      <AriaTextArea {...props} className={inputClass} placeholder=" " />
      <Label className={labelClass}>{label}</Label>
    </TextField>
  )
}

function useClassNames(className: string | undefined, isError: boolean) {
  const inputClass = twMerge(
    clsx(
      "peer py-1 w-full border-b bg-inherit outline-none text-white transition duration-300",
      isError ? "border-red-600" : "border-zinc-400 focus:border-white",
      className,
    ),
  )

  const labelClass = clsx(
    "absolute left-0 top-1 -z-10 -translate-y-5 text-sm transition-all duration-300",
    "peer-focus:-translate-y-5 peer-focus:text-sm",
    "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg",
    isError ? "text-red-600" : "text-zinc-400 peer-focus:text-white",
  )

  return { labelClass, inputClass }
}
