import Tabs from "./Tabs"

export default function Layout({ children }: Children) {
  return (
    <main className="space-y-8 sm:flex sm:space-y-0">
      <Tabs />
      <div className="flex flex-1 justify-center">{children}</div>
    </main>
  )
}
