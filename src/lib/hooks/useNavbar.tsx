"use client"

import { createContext, useContext, useState } from "react"

const NavbarContext = createContext<{
  isVisible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}>({
  isVisible: true,
  setVisible: () => {},
})

export function NavbarProvider({ children }: Children) {
  const [isVisible, setVisible] = useState(true)

  return (
    <NavbarContext.Provider value={{ isVisible, setVisible }}>
      {children}
    </NavbarContext.Provider>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => useContext(NavbarContext)
