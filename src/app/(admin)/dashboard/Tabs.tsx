"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Box, Link } from "~/components"

const APPS = [
  "gallery",
  "calculator",
  "generator",
  "planner",
  "change-password",
]

export default function Tabs() {
  const app = usePathname().split("/")[2]

  return (
    <Box as="aside" className="fixed left-0 h-min w-52 px-4">
      <ul className="space-y-4 capitalize">
        {APPS.map(_app => (
          <li
            className={clsx("rounded p-2", app === _app && "bg-zinc-700")}
            key={_app}
          >
            <Link
              className={clsx(
                "transition-all",
                app === _app && "font-semibold text-white",
              )}
              href={`/dashboard/${_app}`}
            >
              {_app}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}
