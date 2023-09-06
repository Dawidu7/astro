"use client"

import { signIn } from "next-auth/react"
import { Box, Button, Form, Input, Separator } from "~/components"

async function login(data: { password: string }) {
  signIn("credentials", { password: data.password, callbackUrl: "/dashboard" })
}

export default function Login({
  searchParams,
}: {
  searchParams: { error?: "CredentialsSignin" }
}) {
  const errors = searchParams.error
    ? { password: "Invalid Password" }
    : undefined
  return (
    <Box className="w-fit space-y-6 p-0">
      <h2 className="pt-4 text-center text-3xl font-semibold">Login</h2>
      <Separator />
      <Form action={login} className="mt-4 px-4 pb-4" errors={errors}>
        <Input label="Password" name="password" type="password" />
        <Button type="submit">Login</Button>
      </Form>
    </Box>
  )
}
