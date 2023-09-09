import { Box, Link, Separator } from "~/components"
import db from "~/db"
import type { SelectOption } from "~/db/schema"

export default async function Dashboard() {
  const data = await getData()

  return (
    <div className="grid w-full gap-8 capitalize grid-auto-fit-xl">
      {Object.entries(data).map(([app, tables]) => (
        <Box
          as="section"
          className="h-min border border-zinc-900 p-0 transition-all duration-300 hover:cursor-pointer hover:border-zinc-700 hover:shadow-xl hover:shadow-black"
          key={app}
        >
          <h3 className="p-4 text-center text-3xl font-semibold">{app}</h3>
          <Separator />
          <ul className="grid gap-4 p-4 grid-auto-fit-[125px]">
            {Object.entries(tables).map(([table, values]) => (
              <li key={table}>
                <h4 className="flex justify-between font-semibold">
                  {table}
                  <Link
                    href={`/dashboard/${app === "planner" ? "options" : table}`}
                  >
                    +
                  </Link>
                </h4>
                <ul>
                  {values.map((value: any) => (
                    <li key={value.id}>
                      <Link
                        href={`/dashboard/${
                          app === "planner" ? "options" : table
                        }?id=${value.id}`}
                      >
                        {value.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </div>
  )
}

async function getData() {
  const [cameras, catalogs, flattReducs, images, options, telescopes] =
    await Promise.all([
      db.query.cameras.findMany({
        orderBy: (cameras, { asc }) => [asc(cameras.name)],
      }),
      db.query.catalogs.findMany({
        orderBy: (catalogs, { asc }) => [asc(catalogs.name)],
      }),
      db.query.flattReducs.findMany({
        orderBy: (flattReducs, { asc }) => [asc(flattReducs.name)],
      }),
      db.query.images.findMany({
        orderBy: (images, { asc }) => [asc(images.name)],
      }),
      db.query.options.findMany({
        orderBy: (options, { asc }) => [asc(options.name)],
      }),
      db.query.telescopes.findMany({
        orderBy: (telescopes, { asc }) => [asc(telescopes.name)],
      }),
    ])

  return {
    calculator: { cameras, flattReducs, telescopes },
    gallery: { images },
    generator: { catalogs },
    planner: options.reduce(
      (acc, option) => {
        const types = acc[option.type as keyof typeof acc]

        return {
          ...acc,
          [option.type]: types ? [...types, option] : [option],
        }
      },
      {
        angle: [] as SelectOption[],
        camera: [] as SelectOption[],
        catalog: [] as SelectOption[],
        constellation: [] as SelectOption[],
        filter: [] as SelectOption[],
        telescope: [] as SelectOption[],
      },
    ),
  }
}
