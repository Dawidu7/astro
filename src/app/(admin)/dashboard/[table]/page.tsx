import { Box, Separator } from "~/components"
import forms from "~/components/forms"

export default async function Table({
  params,
  searchParams,
}: {
  params: { table: keyof typeof forms }
  searchParams: {
    id?: string
    type?: string
  }
}) {
  const Form = forms[params.table]

  if (!Form) return "No Form Found."

  return (
    <Box className="w-fit p-0">
      <h3 className="p-4 text-center text-4xl font-semibold">
        Create {params.table}
      </h3>
      <Separator />
      <Form searchParams={searchParams} />
    </Box>
  )
}
