import Sidebar from "./Sidebar"

export default function Layout({ children }: Children) {
  return (
    <main className="sm:flex">
      <Sidebar />
      <div className="mx-8 h-min flex-1 space-y-8">{children}</div>
    </main>
  )
}
