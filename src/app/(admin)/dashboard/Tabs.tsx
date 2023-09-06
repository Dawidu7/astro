"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Box, Link } from "~/components"

const LINKS = [
  "gallery",
  "calculator",
  "generator",
  "planner",
  "change-password",
]

export default function Tabs() {
  const app = usePathname().split("/")[2]

  return (
    <Box as="aside" className="fixed left-0 h-min w-60">
      <nav className="p-4">
        <ul className="space-y-4 capitalize">
          {LINKS.map(link => (
            <li
              className={clsx("rounded p-2", app === link && "bg-zinc-700")}
              key={link}
            >
              <Link
                className={clsx(
                  "transition-all",
                  app === link && "font-semibold text-white",
                )}
                href={`/dashboard/${link}`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Box>
  )
}
