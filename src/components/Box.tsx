import clsx from "clsx"
import type { ComponentProps } from "react"
import { twMerge } from "tailwind-merge"

type BoxProps = {
  as?: keyof JSX.IntrinsicElements | React.ElementType
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

  return (
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
