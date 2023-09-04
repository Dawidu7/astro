"use client"

import { signIn } from "next-auth/react"
import { Box, Button, Form, Input } from "~/components"

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
    <Box className="w-fit" isSeparated>
      <h2 className="text-center text-3xl font-semibold">Login</h2>
      <Form action={login} className="mt-4" errors={errors}>
        <Input label="Password" name="password" type="password" />
        <Button type="submit">Login</Button>
      </Form>
    </Box>
  )
}
