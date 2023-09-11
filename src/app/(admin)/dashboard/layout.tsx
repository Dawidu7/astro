import Sidebar from "./Sidebar"

export default function Layout({ children }: Children) {
  return (
    <main className="sm:flex">
      <Sidebar />
      <div className="mx-8 flex h-min flex-1 justify-center">{children}</div>
    </main>
  )
}
