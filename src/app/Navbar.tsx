"use client"

import clsx from "clsx"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { RxCross1, RxHamburgerMenu } from "react-icons/rx"
import ResizeObserver from "resize-observer-polyfill"
import { Button, Link, Modal } from "~/components"
import { useNavbar } from "~/lib/hooks"

export default function Navbar({
  isAuthenticated,
}: {
  isAuthenticated: boolean
}) {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [isOpen, setOpen] = useState(false)
  const { setVisible } = useNavbar()

  const links = [
    { route: "/", text: "Gallery" },
    { route: "/calculator", text: "Calculator" },
    { route: "/generator", text: "Generator" },
    { route: "/planner", text: "Planner" },
    { route: isAuthenticated ? "/dashboard" : "/login", text: "Admin" },
  ]

  useEffect(() => {
    const nav = navRef.current
    const ul = listRef.current

    if (!nav || !ul) return

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
    })

    const resizeObserber = new ResizeObserver(() => {
      if (nav.clientWidth >= 768) {
        setOpen(false)
      }
    })

    intersectionObserver.observe(nav)
    resizeObserber.observe(nav)

    function handleMouseUp(e: MouseEvent) {
      if (!listRef.current?.contains(e.target as HTMLElement)) {
        setOpen(false)
      }
    }

    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      intersectionObserver.disconnect()
      resizeObserber.disconnect()
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [setVisible])

  useEffect(() => setOpen(false), [pathname])

  function List() {
    return (
      <>
        {links.map(({ route, text }) => (
          <li key={route}>
            <Link
              className={
                pathname.split("/")[1] === route.split("/")[1]
                  ? "font-semibold text-white"
                  : "data-[hovered]:text-[#365793]"
              }
              href={route}
            >
              {text}
            </Link>
          </li>
        ))}
        {isAuthenticated && (
          <Modal
            title="Confirm Logout"
            trigger={
              <Button
                className="text-zinc-400 data-[hovered]:text-[#365793]"
                plain
              >
                Logout
              </Button>
            }
          >
            {({ onClose }) => (
              <>
                Are you sure you want to logout?
                <div className="mt-4 flex gap-4">
                  <Button
                    className="flex-1"
                    onPress={onClose}
                    variant="destructive"
                  >
                    Cancel
                  </Button>
                  <Button className="flex-1" onPress={() => signOut()}>
                    Logout
                  </Button>
                </div>
              </>
            )}
          </Modal>
        )}
      </>
    )
  }

  return (
    <nav
      className="mb-12 flex items-center justify-between bg-zinc-900 p-4 shadow-md shadow-black"
      ref={navRef}
    >
      <Link href="/" className="text-xl font-semibold text-white lg:text-3xl">
        Astrophotography by Patryk Tomalik
      </Link>
      <Button
        className="text-3xl text-zinc-400 data-[hovered]:text-white md:hidden"
        onPress={() => setOpen(true)}
        plain
      >
        <RxHamburgerMenu />
      </Button>
      <div
        className={clsx(
          "fixed inset-0 z-30 bg-black/80 transition-opacity duration-200",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <ul
        className={clsx(
          "fixed right-0 top-0 z-30 h-full space-y-4 bg-zinc-800 pl-20 pr-8 pt-6 text-right text-3xl transition duration-300 ease-in-out md:hidden",
          !isOpen && "translate-x-full",
        )}
        ref={listRef}
      >
        <li>
          <Button
            className="text-zinc-400 data-[hovered]:text-white md:hidden"
            onPress={() => setOpen(false)}
            plain
          >
            <RxCross1 />
          </Button>
        </li>
        <List />
      </ul>
      <ul className="hidden gap-4 text-base md:flex">
        <List />
      </ul>
    </nav>
  )
}
