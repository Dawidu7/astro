"use client"

import clsx from "clsx"
import { useState } from "react"
import type { ComponentProps } from "react"
import {
  DateField,
  DateInput,
  DateSegment,
  Group,
  Input as AriaInput,
  Label,
  NumberField,
  Text as AriaText,
  TextField,
  TextArea as AriaTextArea,
} from "react-aria-components"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { BsFillExclamationTriangleFill } from "react-icons/bs"
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
  | ({ type: "date" } & ComponentProps<typeof Date>)
  | ({ type: "number" } & ComponentProps<typeof Number>)
  | ({ type: "textarea" } & ComponentProps<typeof TextArea>)
  | ComponentProps<typeof Text>

const GROUP_CLASSNAME = "relative z-10"

export default function Input({ type, ...props }: InputProps) {
  switch (type) {
    case "date":
      return <Date {...(props as ComponentProps<typeof Date>)} />
    case "number":
      return <Number {...(props as ComponentProps<typeof Number>)} />
    case "textarea":
      return <TextArea {...(props as ComponentProps<typeof TextArea>)} />
    default:
      return <Text {...(props as ComponentProps<typeof Text>)} />
  }
}

function Date({
  className,
  defaultValue,
  description,
  error,
  label,
  ...props
}: Omit<DefaultInputProps, "matcher"> &
  Omit<ComponentProps<typeof DateField>, "className" | "onChange" | "value">) {
  return (
    <DateField
      {...props}
      className={GROUP_CLASSNAME}
      defaultValue={defaultValue}
    >
      <DateInput
        className={clsx(
          "peer flex border-b transition duration-300",
          error
            ? "border-red-600"
            : "border-zinc-400 focus-within:border-white",
        )}
      >
        {segment => (
          <DateSegment
            className={({ isPlaceholder }) =>
              clsx(
                "rounded outline-none transition duration-200 focus-within:bg-indigo-600",
                isPlaceholder ? "text-zinc-400" : "text-white",
              )
            }
            segment={segment}
          />
        )}
      </DateInput>
      <Label
        className={clsx(
          "absolute top-1 -translate-y-5 text-sm transition duration-300",
          error ? "text-red-600" : "text-zinc-400 peer-focus-within:text-white",
        )}
      >
        {label}
      </Label>
      {error && (
        <span className="absolute right-0 top-2 text-red-600">
          <BsFillExclamationTriangleFill />
        </span>
      )}
      <Info description={description} error={error} />
    </DateField>
  )
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
    <NumberField
      {...props}
      className={GROUP_CLASSNAME}
      defaultValue={defaultValue}
    >
      <Group className="relative">
        <AriaInput className={inputClass} placeholder=" " />
        <Label className={labelClass}>{label}</Label>
        <Group className="absolute right-0 top-0 flex h-full items-center">
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
          {error && (
            <span className="text-red-600">
              <BsFillExclamationTriangleFill />
            </span>
          )}
        </Group>
      </Group>
      <Info description={description} error={error} />
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
      {error && (
        <span className="absolute right-0 top-2 text-red-600">
          <BsFillExclamationTriangleFill />
        </span>
      )}
      <Info description={description} error={error} />
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
      {error && (
        <span className="absolute right-0 top-2 text-red-600">
          <BsFillExclamationTriangleFill />
        </span>
      )}
      <Info description={description} error={error} />
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

function Info({
  description,
  error,
}: {
  description: React.ReactNode | undefined
  error: React.ReactNode | undefined
}) {
  return (
    (error || description) && (
      <Group className="flex flex-col">
        {error && (
          <AriaText className="text-sm text-red-600" slot="errorMessage">
            {error}
          </AriaText>
        )}
        {description && (
          <AriaText className="text-sm text-zinc-400" slot="description">
            {description}
          </AriaText>
        )}
      </Group>
    )
  )
}
