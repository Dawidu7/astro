"use client"

import clsx from "clsx"
import { useEffect, useState } from "react"
import type { ComponentProps } from "react"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { BsFillExclamationTriangleFill } from "react-icons/bs"
import { twMerge } from "tailwind-merge"
import { Combobox, Listbox, Transition } from "@headlessui/react"
import Info from "./Info"

type DefaultSelectProps<T> = {
  defaultValue?: T
  description?: React.ReactNode
  error?: React.ReactNode
  label: React.ReactNode
  items: T[] | Promise<T[]>
}

type SelectProps =
  | ({ search?: never } & ComponentProps<typeof _Select>)
  | ({ search: true } & ComponentProps<typeof SearchSelect>)

export default function Select({ search, ...props }: SelectProps) {
  return search ? (
    <SearchSelect {...(props as ComponentProps<typeof SearchSelect>)} />
  ) : (
    <_Select {...(props as ComponentProps<typeof _Select>)} />
  )
}

function _Select<
  T extends
    | string
    | {
        name: string
      },
>({
  description,
  defaultValue,
  error,
  label,
  items: _items,
  ...props
}: DefaultSelectProps<T> & ComponentProps<typeof Listbox>) {
  const [selected, setSelected] = useState<T | null>(null)
  const items = useItems(_items)

  useEffect(() => setSelected(defaultValue || null), [defaultValue])

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

function SearchSelect<T extends string | { name: string }>({
  description,
  defaultValue,
  error,
  label,
  items: _items,
  ...props
}: DefaultSelectProps<T> & ComponentProps<typeof Combobox>) {
  const [selected, setSelected] = useState<T | null>(defaultValue || null)
  const [query, setQuery] = useState("")
  const items = useItems(_items)

  useEffect(() => defaultValue && setSelected(defaultValue), [defaultValue])

  const filteredItems =
    query !== ""
      ? items.filter(item =>
          typeof item === "string"
            ? item.toLowerCase().includes(query.toLowerCase())
            : item.name.toLowerCase().includes(query.toLowerCase()),
        )
      : items

  useEffect(() => setSelected(defaultValue || null), [defaultValue])

  return (
    <div className="relative mt-5">
      <Combobox {...props} value={selected} onChange={setSelected}>
        {({ open }) => (
          <>
            <Combobox.Button className="w-full">
              <Combobox.Input
                className={twMerge(
                  clsx(
                    "peer z-10 w-full border-b bg-inherit outline-none transition duration-300 focus-visible:text-white",
                    error
                      ? "border-red-600"
                      : "border-zinc-400 focus-visible:border-white",
                  ),
                )}
                displayValue={(item: typeof selected) =>
                  typeof item === "string" ? item : item?.name || ""
                }
                onChange={e => setQuery(e.currentTarget.value)}
                placeholder=" "
              />
              <Combobox.Label
                className={twMerge(
                  clsx(
                    "absolute left-0 -translate-y-5 text-sm capitalize transition-all duration-300",
                    "peer-focus-visible:-translate-y-5 peer-focus-visible:text-sm",
                    "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-lg",
                    error
                      ? "text-red-600"
                      : "text-zinc-400 peer-focus-visible:text-white",
                  ),
                )}
              >
                {label}
              </Combobox.Label>
              <div className="absolute right-0 top-1 flex gap-0.5">
                <span
                  className={twMerge(
                    clsx(
                      "transition duration-300",
                      open ? "text-white" : "text-zinc-400",
                    ),
                  )}
                >
                  {open ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </span>
                {error && (
                  <span className="text-red-600">
                    <BsFillExclamationTriangleFill />
                  </span>
                )}
              </div>
            </Combobox.Button>
            <Transition
              className="relative z-50"
              enter="transition ease-in duration-200"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-1"
              leave="transition ease-out duration-200"
              leaveFrom="opacity-1"
              leaveTo="opacity-0 -translate-y-2"
            >
              <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-y-auto rounded bg-stone-800 shadow-md shadow-black outline-none">
                {filteredItems.map((item, i) => (
                  <Combobox.Option
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
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Transition>
          </>
        )}
      </Combobox>
      <Info description={description} error={error} />
    </div>
  )
}

function useItems<
  T extends
    | string
    | {
        name: string
      },
>(_items: T[] | Promise<T[]>) {
  const [items, setItems] = useState<T[]>([])

  useEffect(() => {
    if (!(_items instanceof Promise)) {
      return setItems(_items)
    }

    async function getData() {
      const _data = await _items

      setItems(_data)
    }

    getData()
  }, [_items])

  return items
}
