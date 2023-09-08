import { Box, Link, Separator } from "~/components"
import db from "~/db"
import type { SelectOption } from "~/db/schema"

export default async function Dashboard() {
  const data = await getData()

  return (
    <div className="grid w-full gap-8 capitalize grid-auto-fit-xl">
      {Object.entries(data).map(([app, tables]) => (
        <Box className="p-0" key={app}>
          <h3 className="p-4 text-2xl font-semibold">{app}</h3>
          <Separator />
          <div className="grid gap-4 p-4 grid-auto-fit-xs">
            {Object.entries(tables).map(([table, values]) => (
              <div className="" key={table}>
                <h4 className="flex justify-between font-semibold">
                  {table}
                  <Link href={`/dashboard/${table}`}>+</Link>
                </h4>
                <ul>
                  {values.map((value: any) => (
                    <li key={value.id}>
                      <Link href={`/dashboard/${table}?id=${value.id}`}>
                        {value.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Box>
      ))}
    </div>
  )
}

async function getData() {
  const [cameras, catalogs, flattReducs, images, options, telescopes] =
    await Promise.all([
      db.query.cameras.findMany(),
      db.query.catalogs.findMany(),
      db.query.flattReducs.findMany(),
      db.query.images.findMany(),
      db.query.options.findMany(),
      db.query.telescopes.findMany(),
    ])

  return {
    calculator: { cameras, flattReducs, telescopes },
    gallery: { images },
    generator: { catalogs },
    planner: options.reduce((acc, option) => {
      const types = acc[option.type as keyof typeof acc]

      return {
        ...acc,
        [option.type]: types ? [...types, option] : [types],
      }
    }, {}) as {
      [K in SelectOption["type"]]: {
        id: number
        name: string
        type: K
      }[]
    },
  }
}
