import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { flat_tree } from "~/app/Tree"

// TODO: shield not completed

const Shield = ({ id, children, route, action }) => {
  const router = useRouter()

  const [perms, setPerms] = useState([])

  const getPermissions = () => {
    try {
      let perms

      if (route)
        perms = flat_tree(JSON.parse(localStorage.getItem("menuAccess"))).find(
          (item) => item.route === route
        )
      else
        perms = flat_tree(JSON.parse(localStorage.getItem("menuAccess"))).find(
          (item) => item.route === router.pathname
        )

      if (!perms) return

      if (action) {
        setPerms(perms.actions.concat(perms.child_access_components_keys))
      } else {
        setPerms(
          Object.values(perms.columns).concat(
            perms.child_access_components_keys
          )
        )
      }
    } catch (e) {}
  }

  useEffect(() => {
    getPermissions()
    window.addEventListener("storage", getPermissions)

    return () => {
      window.removeEventListener("storage", getPermissions)
    }
  }, [])

  if (!id) return children

  // return perms?.includes(id) ? children : null
  return children;
}

export default Shield
