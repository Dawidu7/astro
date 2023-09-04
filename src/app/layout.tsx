import type { Metadata } from "next"
import "~/globals.css"
import Footer from "./Footer"
import Navbar from "./Navbar"
import Providers from "./Providers"
import { isAuthenticated } from "~/lib/auth"

export const metadata: Metadata = {
  title: "Astrophotography by Patryk Tomalik",
}

export default async function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-800 text-lg text-white">
        <Providers>
          <Navbar isAuthenticated={await isAuthenticated()} />
          <main className="flex justify-around">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
