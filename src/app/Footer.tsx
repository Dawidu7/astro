"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Button } from "~/components"
import { useNavbar } from "~/lib/hooks"

export default function Footer() {
  const { isVisible } = useNavbar()
  const pathname = usePathname()

  return (
    !pathname.startsWith("/dashboard") && (
      <footer
        className={clsx(
          "fixed bottom-0 z-40 w-full bg-zinc-900 py-4 text-center text-4xl font-semibold transition duration-300",
          isVisible && "translate-y-full",
        )}
      >
        <Button
          className="text-zinc-400 data-[hovered]:text-white"
          onPress={() => scrollTo({ top: 0, behavior: "smooth" })}
          plain
        >
          Astrophotography by Patryk Tomalik
        </Button>
      </footer>
    )
  )
}
