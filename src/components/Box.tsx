"use client"

import clsx from "clsx"
import { Children, cloneElement } from "react"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"
import { Separator } from "."

type BoxProps = {
  isSeparated?: boolean
} & ComponentProps<"div">

export default function Box({
  children,
  className,
  isSeparated,
  ...props
}: BoxProps) {
  const count = Children.count(children)

  return (
    <div
      {...props}
      className={twMerge(
        clsx(
          "w-full rounded bg-zinc-900 shadow-lg shadow-black",
          !isSeparated && "p-4",
          className,
        ),
      )}
    >
      {!isSeparated
        ? children
        : Children.map(children, (child, i) => (
            <>
              {cloneElement(child as JSX.Element, {
                className: twMerge(
                  clsx((child as JSX.Element).props.className),
                  "p-4",
                ),
              })}
              {i < count - 1 && (
                <Separator
                  className={clsx(
                    "bg-zinc-400",
                    className?.includes("flex-col") ? "h-px" : "w-px",
                  )}
                  orientation={
                    className?.includes("flex-col") ? "horizontal" : "vertical"
                  }
                />
              )}
            </>
          ))}
    </div>
  )
}
