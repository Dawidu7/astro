import { compare, hash } from "bcrypt"
import { eq } from "drizzle-orm"
import { redirect } from "next/navigation"
import { Box, Button, Form, Input, Separator } from "~/components"
import db from "~/db"
import { admin as _admin } from "~/db/schema"

async function changePassword(data: {
  old: string
  new: string
  confirm: string
}) {
  "use server"

  const admin = await db.query.admin.findFirst()

  const isPasswordSame = await compare(data.old, admin!.password)

  if (!isPasswordSame) {
    console.log("old")
    redirect("/dashboard/change-password?error=old")
  }

  if (data.old === data.new) {
    redirect("/dashboard/change-password?error=new")
  }

  if (data.new !== data.confirm) {
    redirect("/dashboard/change-password?error=confirm")
  }

  const password = await hash(data.new, 10)

  await db.update(_admin).set({ password }).where(eq(_admin.id, admin!.id))

  redirect("/logout")
}

export default async function ChangePassword({
  searchParams,
}: {
  searchParams: { error?: "confirm" | "new" | "none" | "old" }
}) {
  if (!(await db.query.admin.findFirst())) return "No Admin found."

  const errors = searchParams.error
    ? {
        old:
          searchParams.error === "old"
            ? "Invalid Password"
            : searchParams.error === "new"
            ? "Passwords are the same."
            : undefined,
        new:
          searchParams.error === "new"
            ? "Passwords are the same."
            : searchParams.error === "confirm"
            ? "Passwords don't match."
            : undefined,
        confirm:
          searchParams.error === "confirm"
            ? "Passwords don't match."
            : undefined,
      }
    : undefined

  return (
    <Box className="w-fit">
      <h2 className="text-center text-3xl font-semibold">Change Password</h2>
      <Separator />
      <Form action={changePassword} className="mt-4" errors={errors}>
        <Input label="Old Password" name="old" type="password" />
        <Input label="New Password" name="new" type="password" />
        <Input label="Confirm Password" name="confirm" type="password" />
        <Button type="submit">Change</Button>
      </Form>
    </Box>
  )
}
