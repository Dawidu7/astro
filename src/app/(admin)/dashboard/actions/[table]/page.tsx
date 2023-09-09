import { Box, Separator } from "~/components"
import forms from "~/components/forms"

export default function Table({
  params,
  searchParams,
}: {
  params: { table: keyof typeof forms }
  searchParams: { callbackApp?: string; id?: string }
}) {
  const Form = forms[params.table]

  if (!Form) return "No Form Found."

  return (
    <Box className="w-fit p-0">
      <h3 className="p-4 text-center text-4xl font-semibold capitalize">
        Create {params.table}
      </h3>
      <Separator />
      <Form
        id={
          searchParams.id && /^\d+$/.test(searchParams.id)
            ? parseInt(searchParams.id)
            : undefined
        }
        redirectUrl={`/dashboard/${searchParams.callbackApp || ""}`}
      />
    </Box>
  )
}
