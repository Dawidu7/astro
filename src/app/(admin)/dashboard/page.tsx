import { Box, Link } from "~/components"

export default function Dashboard() {
  return (
    <Box>
      <ul className="grid grid-cols-2 gap-8 capitalize">
        {["calculator", "gallery", "generator", "planner"].map(app => (
          <li className="rounded-lg border text-center" key={app}>
            <Link className="" href={`/dashboard/${app}`}>
              {app}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  )
}
