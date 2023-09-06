import { Box, Button, Form, Input } from "~/components"

export default function Table({ params }: { params: { table: string } }) {
  if (!params.table) return "No Table Found."

  return <Box className="w-fit">{params.table}</Box>
}
