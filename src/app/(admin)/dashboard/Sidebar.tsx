"use client"

import clsx from "clsx"
import { useParams, useRouter, useSearchParams } from "next/navigation"
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
  const params = useParams()
  const { replace } = useRouter()
  const searchParams = useSearchParams()

  const _tables = searchParams.get("tables")
  const selectedTables = _tables ? _tables.split(",") : []

  function getSearchParams(table: string) {
    const sp = new URLSearchParams(Array.from(searchParams.entries()))

    sp.set(
      "tables",
      (selectedTables?.includes(table)
        ? selectedTables.filter(_table => _table !== table)
        : [...selectedTables, table]
      ).join(","),
    )

    return sp
  }

  return (
    <Box as="aside" className="w-fit space-y-4 pt-8">
      <Input label="Search" />
      <ul className="space-y-2 capitalize">
        {Object.entries(LINKS).map(([app, tables]) => (
          <li key={app}>
            <Link
              className={clsx(
                "flex items-center justify-between",
                app === params.app && "font-semibold text-white",
              )}
              href={app === params.app ? "/dashboard" : `/dashboard/${app}`}
            >
              <span className="text-xl">{app}</span>
              {app === params.app ? <AiFillCaretUp /> : <AiFillCaretDown />}
            </Link>
            <div
              className={clsx(
                "grid pl-2.5 transition-[grid-template-rows] duration-300",
                app === params.app ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <ul className="overflow-hidden">
                {tables.map(table => (
                  <li key={table}>
                    <Link
                      className={clsx(
                        selectedTables?.includes(table) &&
                          "font-semibold text-white",
                      )}
                      href={`/dashboard/${app}?${getSearchParams(table)}`}
                    >
                      {table}
                    </Link>
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
