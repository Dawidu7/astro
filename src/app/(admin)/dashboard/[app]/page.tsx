import { Box, Link } from "~/components"
import db from "~/db"

export default async function App<T extends { id: number; name: string }>({
  params,
}: {
  params: { app: string }
}) {
  const data = await getData(params.app)

  if (!data) return "No Data Found."

  return (
    <Box as="ul" className="grid max-w-4xl gap-8 capitalize grid-auto-fit-lg">
      {Object.entries(data).map(([table, values]) => (
        <li key={table}>
          <h3 className="flex justify-between text-xl font-semibold">
            {table}
            <Link
              href={`/dashboard/actions/${table}?callbackApp=${params.app}`}
            >
              +
            </Link>
          </h3>
          <ul className="grid gap-4 grid-auto-fit-xs">
            {values.map((value: T) => (
              <li key={value.id}>
                <Link
                  href={`/dashboard/actions/${table}?callbackApp=${params.app}&id=${value.id}`}
                >
                  {value.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </Box>
  )
}

type Option<T extends string> = {
  id: number
  name: string
  type: T
}

async function getData(app: string) {
  switch (app) {
    case "calculator":
      const [camera, flattReduc, telescope] = await Promise.all([
        db.query.cameras.findMany({
          orderBy: (cameras, { asc }) => [asc(cameras.name)],
        }),
        db.query.flattReducs.findMany({
          orderBy: (flattReducs, { asc }) => [asc(flattReducs.name)],
        }),
        db.query.telescopes.findMany({
          orderBy: (telescopes, { asc }) => [asc(telescopes.name)],
        }),
      ])

      return { camera, flattReduc, telescope }
    case "gallery":
      const image = await db.query.images.findMany({
        orderBy: (images, { asc }) => [asc(images.name)],
      })

      return { image }
    case "generator":
      const catalog = await db.query.catalogs.findMany({
        orderBy: (catalogs, { asc }) => [asc(catalogs.name)],
      })

      return { catalog }
    case "planner":
      const options = await db.query.options.findMany({
        orderBy: (options, { asc }) => [asc(options.name)],
      })

      return options.reduce(
        (acc, option) => {
          const types = acc[option.type as keyof typeof acc]

          return {
            ...acc,
            [option.type]: types ? [...types, option] : [option],
          }
        },
        {
          angle: [] as Option<"angle">[],
          camera: [] as Option<"camera">[],
          catalog: [] as Option<"catalog">[],
          constellation: [] as Option<"constellation">[],
          filter: [] as Option<"filter">[],
          telescope: [] as Option<"telescope">[],
        },
      )
    default:
      return null
  }
}