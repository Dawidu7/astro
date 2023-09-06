import Tabs from "./Tabs"
import { Box } from "~/components"

export default function Layout({ children }: Children) {
  return (
    <>
      <Tabs />
      <Box className="w-fit max-w-4xl">{children}</Box>
    </>
  )
}
