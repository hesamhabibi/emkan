import { flat_tree } from "~/app/Tree"
import { useRouter } from "next/router"

const HasPerm = ({ id, route, action, router }) => {
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

    if (!perms) return true

    if (!id) return true

    if (action) {
      perms.actions.concat(perms.child_access_components_keys)
    } else {
      return Object.values(perms.columns)
        .concat(perms.child_access_components_keys)
        ?.includes(id)
    }
  } catch (e) {}

  return true
}

export default HasPerm
