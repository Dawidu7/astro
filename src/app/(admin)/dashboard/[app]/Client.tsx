"use client"

import clsx from "clsx"
import { useState } from "react"
import { useParams } from "next/navigation"
import { Box, Button, Input, Link } from "~/components"

export default function Client<T extends { id: number; name: string }>({
  data: _data,
}: {
  data: { [table: string]: T[] }
}) {
  const [selectedTables, setTables] = useState<string[]>([])
  const [query, setQuery] = useState("")
  const params = useParams()

  const data = filterData(_data, selectedTables, query)

  return (
    <>
      <Box className="flex items-center justify-between">
        <Input label="Search" onChange={value => setQuery(value)} />
        <ul className="flex gap-4">
          {Object.keys(_data).map(table => (
            <li key={table}>
              <Button
                className={clsx(
                  "capitalize",
                  selectedTables.includes(table)
                    ? "font-semibold text-white"
                    : "text-zinc-400",
                )}
                onPress={() =>
                  setTables(prev =>
                    selectedTables.includes(table)
                      ? prev.filter(_table => _table !== table)
                      : [...prev, table],
                  )
                }
                plain
              >
                {table}
              </Button>
            </li>
          ))}
        </ul>
      </Box>
      <div className="grid w-full gap-8 capitalize grid-auto-fill-lg">
        {Object.entries(data).map(([table, values]) => (
          <Box key={table}>
            <h3 className="flex justify-between text-xl font-semibold">
              {table}
              <Link
                href={`/dashboard/${params.app}/${
                  params.app === "planner" ? "option" : table
                }${params.app === "planner" ? `?type=${table}` : ""}`}
              >
                +
              </Link>
            </h3>
            <ul className="grid grid-auto-fit-[150px]">
              {values.map(value => (
                <li key={value.id}>
                  <Link
                    href={`/dashboard/${params.app}/${table}?id=${value.id}`}
                  >
                    {value.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
        ))}
      </div>
    </>
  )
}

function filterData<T extends { id: number; name: string }>(
  _data: {
    [table: string]: T[]
  },
  tables: string[],
  q: string,
) {
  const data =
    tables.length !== 0
      ? Object.fromEntries(
          Object.entries(_data).filter(([table]) => tables?.includes(table)),
        )
      : _data

  if (!q) return data

  return Object.fromEntries(
    Object.entries(data)
      .map(([table, values]) => [
        table,
        values.filter(({ name }: { name: string }) =>
          name.toLowerCase().includes(q.toLowerCase()),
        ),
      ])
      .filter(([, values]) => values.length !== 0),
  ) as { [table: string]: T[] }
}
