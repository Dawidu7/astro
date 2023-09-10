import Sidebar from "./Sidebar"

export default function Layout({ children }: Children) {
  return (
    <main className="flex">
      <Sidebar />
      <div className="flex h-min flex-1 justify-center">{children}</div>
    </main>
  )
}
