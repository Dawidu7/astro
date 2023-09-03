"use client"

import { useState } from "react"
import type { ComponentProps } from "react"
import {
  Item as AriaItem,
  Label,
  ListBox,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from "react-aria-components"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { useAsyncList } from "@react-stately/data"
import { Button } from "."
import Info from "./Info"

type SelectProps<T extends object | string> = {
  description?: React.ReactNode
  error?: React.ReactNode
  label: React.ReactNode
  items: T[] | Promise<T[]>
} & Omit<ComponentProps<typeof AriaSelect<T extends string ? {} : T>>, "items">

export default function Select<
  T extends (object & { id: number; name: string }) | string,
>({ children, description, error, label, items, ...props }: SelectProps<T>) {
  const [isOpen, setOpen] = useState(false)
  const list = useAsyncList<T>({
    async load() {
      return {
        items: items instanceof Promise ? await items : items,
      }
    },
  })

  return (
    <AriaSelect
      {...props}
      className="relative flex flex-col py-1"
      isOpen={isOpen}
      onOpenChange={setOpen}
    >
      <Button
        className="peer flex items-center justify-between border-b border-zinc-400 text-zinc-400 focus-within:border-white focus-within:text-white data-[pressed]:scale-100"
        plain
      >
        <SelectValue />
        <span aria-hidden="true">
          {isOpen ? <AiFillCaretUp /> : <AiFillCaretDown />}
        </span>
      </Button>
      <Label className="transtiion absolute top-1 -translate-y-5 text-sm text-zinc-400 duration-300 peer-focus-within:text-white">
        {label}
      </Label>
      <Info description={description} error={error} />
      <Popover>
        <ListBox>
          {list.items.map((item, i) => (
            <Item key={i}>{typeof item === "string" ? item : item.name}</Item>
          ))}
        </ListBox>
      </Popover>
    </AriaSelect>
  )
}

function Item(props: ComponentProps<typeof AriaItem>) {
  return <AriaItem {...props} />
}
