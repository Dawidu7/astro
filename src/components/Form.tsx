"use client"

import type { ComponentProps } from "react"

export default function Form({ children, ...props }: ComponentProps<"form">) {
  return <form {...props}>{children}</form>
}
