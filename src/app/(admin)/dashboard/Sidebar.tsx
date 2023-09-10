"use client"

import clsx from "clsx"
import { usePathname, useSearchParams } from "next/navigation"
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
import { Box, Input, Link } from "~/components"

const LINKS = {
  calculator: ["camera", "flattReduc", "telescope"],
  gallery: ["image"],
  generator: ["catalog"],
  planner: [
    "angle",
    "camera",
    "catalog",
    "constellation",
    "filter",
    "telescope",
  ],
}

export default function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const _app = pathname.split("/")[2]
  const _tables = searchParams.get("tables")?.split(",")

  function getSearchParams(table: string) {
    const tables = _tables?.includes(table)
      ? _tables.filter(_table => _table !== table)
      : _tables
      ? [..._tables, table]
      : [table]

    return new URLSearchParams({ tables: tables.join(",") })
  }

  return (
    <Box as="aside" className="h-min w-fit space-y-4 pt-8">
      <Input label="Search" />
      <ul className="space-y-2 capitalize">
        {Object.entries(LINKS).map(([app, tables]) => (
          <li key={app}>
            <Link
              className={clsx(
                "flex items-center justify-between text-xl",
                _app === app && "font-semibold text-white",
              )}
              href={_app === app ? "/dashboard" : `/dashboard/${app}`}
            >
              {app}
              <span className="text-base">
                {_app === app ? <AiFillCaretUp /> : <AiFillCaretDown />}
              </span>
            </Link>
            <div
              className={clsx(
                "grid grid-rows-[0fr] pl-4 transition-[grid-template-rows] duration-300",
                _app === app && "grid-rows-[1fr]",
              )}
            >
              <ul className="overflow-hidden">
                {tables.map(table => (
                  <li key={table}>
                    <Link
                      className={clsx(
                        _tables?.includes(table) && "font-semibold text-white",
                      )}
                      href={`/dashboard/${app}?${getSearchParams(table)}`}
                    >{`${table}s`}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Box>
  )
}
