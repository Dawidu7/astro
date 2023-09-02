import type { Metadata } from "next"
import "~/globals.css"

export const metadata: Metadata = {
  title: "Astrophotography by Patryk Tomalik",
}

export default function RootLayout({ children }: Children) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-800 text-lg text-white">
        <main className="grid min-h-screen place-items-center">{children}</main>
      </body>
    </html>
  )
}
