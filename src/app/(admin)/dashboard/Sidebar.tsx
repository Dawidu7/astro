"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Box, Link } from "~/components"

export default function Sidebar() {
  const pathname = usePathname()
  const _app = pathname.split("/")[2]

  return (
    <Box as="aside" className="h-min w-fit p-4 text-xl capitalize">
      <ul className="space-y-4">
        {[
          "calculator",
          "gallery",
          "generator",
          "planner",
          "change-password",
        ].map(app => (
          <li key={app}>
            <Link
              className={clsx(app === _app && "font-semibold text-white")}
              href={`/dashboard/${app}`}
            >
              {app.replace("-", " ")}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}
