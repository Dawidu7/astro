"use client"

import clsx from "clsx"
import { Children, cloneElement } from "react"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Separator } from "."

type BoxProps = {
  as?: keyof JSX.IntrinsicElements
  noPadding?: boolean
} & ComponentProps<"div">

export default function Box({
  as,
  children,
  className,
  noPadding,
  ...props
}: BoxProps) {
  const Element = as || "div"
  const count = Children.count(children)

  return (
    // @ts-expect-error
    <Element
      {...props}
      className={twMerge(
        clsx(
          "w-full rounded bg-zinc-900 shadow-lg shadow-black",
          !noPadding && "p-4",
          className,
        ),
      )}
    >
      {children}
    </Element>
  )
}
