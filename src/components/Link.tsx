"use client"

import { default as NextLink } from "next/link"
import type { ComponentProps } from "react"
import { Link as AriaLink } from "react-aria-components"
import { twMerge } from "tailwind-merge"

export default function Link({
  children,
  className,
  ...props
}: ComponentProps<typeof AriaLink> & ComponentProps<typeof NextLink>) {
  return (
    <AriaLink>
      <NextLink
        {...props}
        className={twMerge(
          "text-zinc-400 outline-none transition-all duration-200 data-[hovered]:text-white",
          className,
        )}
      >
        {children}
      </NextLink>
    </AriaLink>
  )
}
