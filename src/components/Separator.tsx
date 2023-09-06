import type { ComponentProps } from "react"
import { Separator as AriaSeparator } from "react-aria-components"
import { twMerge } from "tailwind-merge"

export default function Separator({
  className,
  ...props
}: ComponentProps<typeof AriaSeparator>) {
  return (
    <AriaSeparator
      {...props}
      className={twMerge(props.orientation === "vertical" && "mx-4", className)}
    />
  )
}
