"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import type { ComponentProps } from "react"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { BsFillExclamationTriangleFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"
import { Listbox, Transition } from "@headlessui/react"
import Info from "./Info"

type SelectProps<T> = ComponentProps<typeof Listbox> & {
  defaultValue?: T
  description?: React.ReactNode
  error?: React.ReactNode
  label: React.ReactNode
  items: T[] | Promise<T[]>
}

export default function Select<
  T extends
    | string
    | {
        id: number
        name: string
      },
>({
  description,
  defaultValue,
  error,
  label,
  items: _items,
  ...props
}: SelectProps<T>) {
  const [selected, setSelected] = useState<T | null>(null)
  const items = useItems(_items)

  useEffect(() => defaultValue && setSelected(defaultValue), [defaultValue])

  return (
    <div className="relative">
      <Listbox value={selected} onChange={setSelected} {...props}>
        {({ open }) => (
          <>
            <Transition
              className="absolute"
              enter="transition duration-300"
              enterFrom="opacity-0 -translate-y-3"
              enterTo="opacity-1 -translate-y-5"
              show={!!selected}
            >
              <Listbox.Label
                className={twMerge(
                  clsx(
                    "text-sm transition duration-300",
                    open ? "text-white" : "text-zinc-400",
                    error && "text-red-600",
                  ),
                )}
              >
                {label}
              </Listbox.Label>
            </Transition>
            <Listbox.Button
              className={twMerge(
                clsx(
                  "flex w-full items-center justify-between border-b py-1 capitalize outline-none transition focus-visible:ring-2",
                  open ? "border-white" : "border-zinc-400",
                  open || selected ? "text-white" : "text-zinc-400",
                  error && "border-red-600",
                ),
              )}
            >
              {typeof selected === "string"
                ? selected
                : selected?.name || `Select ${label}`}
              <div className="flex gap-0.5">
                <span className={open ? "text-white" : "text-zinc-400"}>
                  {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </span>
                {error && (
                  <span className="text-red-600">
                    <BsFillExclamationTriangleFill />
                  </span>
                )}
              </div>
            </Listbox.Button>
            <Transition
              className="relative z-50"
              enter="transition ease-in duration-200"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-1"
              leave="transition ease-out duration-200"
              leaveFrom="opacity-1"
              leaveTo="opacity-0 -translate-y-2"
            >
              <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto rounded bg-stone-800 shadow-md shadow-black outline-none">
                {items.map((item, i) => (
                  <Listbox.Option
                    className={({ active, selected }) =>
                      clsx(
                        "px-1.5 capitalize",
                        active && "bg-stone-900",
                        selected && "bg-stone-900 font-semibold",
                        active && !selected && "cursor-pointer",
                      )
                    }
                    key={i}
                    value={item}
                  >
                    {typeof item === "string" ? item : item.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
      <Info description={description} error={error} />
    </div>
  )
}

function useItems<
  T extends
    | string
    | {
        id: number
        name: string
      },
>(_items: T[] | Promise<T[]>) {
  const [items, setItems] = useState<T[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!(_items instanceof Promise)) {
      return setItems(_items)
    }

    async function getData() {
      setLoading(true)
      const _data = await _items
      setLoading(false)

      setItems(_data)
    }

    getData()
  }, [_items])

  return items
}
