import { compare } from "bcrypt"
import { getServerSession } from "next-auth"
import type { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "~/db"

export const options: NextAuthOptions = {
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  providers: [
    Credentials({
      credentials: {
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.password) return null

        const admin = await db.query.admin.findFirst()

        if (!admin) return null

        const isPasswordValid = await compare(
          credentials.password,
          admin.password,
        )

        if (!isPasswordValid) return null

        return { id: admin.id.toString() }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
}

export async function isAuthenticated() {
  return !!(await getServerSession(options))
}
