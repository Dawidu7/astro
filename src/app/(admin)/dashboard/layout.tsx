import Tabs from "./Tabs"
import { Box } from "~/components"

export default function Layout({ children }: Children) {
  return (
    <Box className="flex gap-4" isSeparated>
      <Tabs />
      <section className="p-4">{children}</section>
    </Box>
  )
}
