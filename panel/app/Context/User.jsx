import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext({})

export default function User({ children }) {
  const [data, setData] = useState(null)

  const handleChange = () => {
    const user = localStorage.getItem("user")
    try {
      setData(JSON.parse(user))
    } catch {
      setData(user)
    }
  }

  useEffect(() => {
    handleChange()
    document.addEventListener("storage", handleChange)
    return () => {
      document.removeEventListener("storage", handleChange)
    }
  }, [])

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}
