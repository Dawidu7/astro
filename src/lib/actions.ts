"use server"

import { safeParse } from "valibot"
import { createSchema } from "./utils"

export async function validate<T>(
  _schema: Record<string, string>,
  formData: T,
) {
  const schema = createSchema(_schema)

  const result = safeParse(schema, formData)

  if (result.success) {
    return { success: true }
  }

  return {
    success: false,
    issues: result.issues.reduce(
      (acc, { message, path }) => ({
        ...acc,
        [path![0].key]: message,
      }),
      {},
    ),
  }
}
