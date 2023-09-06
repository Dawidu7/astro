import Tabs from "./Tabs"

export default function Layout({ children }: Children) {
  return (
    <>
      <Tabs />
      <section className="flex flex-1 justify-center">{children}</section>
    </>
  )
}
