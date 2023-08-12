import { HikesContext } from "../context/HikeContext"
import { useContext } from "react"

export const useHikesContext = () => {
  const context = useContext(HikesContext)

  if (!context) {
    throw Error("Use HikesContext must be used inside a HikesContextProvider")
  }

  return context
}
