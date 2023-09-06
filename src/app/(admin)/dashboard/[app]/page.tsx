import { Box, Link } from "~/components"
import db from "~/db"

export default async function App({ params }: { params: { app: string } }) {
  const data = await getData(params.app)

  if (!data) return "No App Found."

  return (
    <Box className="grid-auto-fit-xs mx-12 grid h-min gap-8">
      {Object.entries(data).map(([table, values]) => (
        <div key={table}>
          <h3 className="flex justify-between font-semibold capitalize">
            {table}
            <Link href={`/dashboard/`}>+</Link>
          </h3>
          <ul>
            {(values as any).map((value: any) => (
              <li key={value.name}></li>
            ))}
          </ul>
        </div>
      ))}
    </Box>
  )
}

async function getData(app: string) {
  switch (app) {
    case "calculator": {
      const [cameras, flattReducs, telescopes] = await Promise.all([
        db.query.cameras.findMany(),
        db.query.flattReducs.findMany(),
        db.query.telescopes.findMany(),
      ])

      return { cameras, flattReducs, telescopes }
    }
    case "gallery": {
      const images = await db.query.images.findMany()

      return { images }
    }
    case "generator": {
      const catalogs = await db.query.catalogs.findMany()

      return { catalogs }
    }
    case "planner": {
      const options = await db.query.options.findMany()

      return options.reduce((acc, option) => {
        const typeArray = acc[option.type as keyof typeof acc]

        return {
          ...acc,
          [option.type]: typeArray ? [...typeArray, option] : [option],
        }
      }, {})
    }
    default:
      return null
  }
}
