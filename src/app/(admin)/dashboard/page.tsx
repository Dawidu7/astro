import { Link } from "~/components"

export default function Dashboard() {
  return (
    <div className="space-x-4">
      {["calculator", "gallery", "generator", "planner"].map(app => (
        <Link href={`/dashboard/${app}`} key={app}>
          {app}
        </Link>
      ))}
    </div>
  )
}
