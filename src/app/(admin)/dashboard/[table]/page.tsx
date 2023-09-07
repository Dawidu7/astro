import { eq } from "drizzle-orm"
import { Box } from "~/components"
import forms from "~/components/forms"
import db from "~/db"
import {
  cameras,
  catalogs,
  flattReducs,
  images,
  options,
  telescopes,
} from "~/db/schema"

export default async function Table<T>({
  params,
  searchParams,
}: {
  params: { table: string }
  searchParams: { id?: string }
}) {
  return <Box className="w-fit"></Box>
}
