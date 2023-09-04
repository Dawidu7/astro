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
          "fixed bottom-0 z-40 w-full bg-zinc-900 py-4 text-center font-semibold transition duration-300",
          isVisible && "translate-y-full",
        )}
      >
        <Button
          className="text-2xl text-zinc-400 data-[hovered]:text-white md:text-4xl"
          onPress={() => scrollTo({ top: 0, behavior: "smooth" })}
          plain
        >
          Astrophotography by Patryk Tomalik
        </Button>
      </footer>
    )
  )
}
