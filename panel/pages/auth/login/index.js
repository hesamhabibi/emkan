import { useContext, useState } from "react"
import client from "~/app/apollo-client"
import queries from "./queries"
import Mobile from "./Mobile"
import Desktop from "./Desktop"
import { DeviceView } from "~/app/Context/Device"
import { useRouter } from "next/router"
import moment from "jalali-moment"
import { make_tree } from "~/app/Tree"

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isMobile = useContext(DeviceView)
  const router = useRouter()

  const attemptLogin = async (data) => {
    setError("")
    setLoading(true)
    try {
      const res = await client.query({
        query: queries.login,
        variables: {
          username: data.username,
          password: data.password,
        },
      })
      document.cookie = `token=${
        res.data.result.token
      } path=/ expires=${new moment().add("30", "days").toDate()}`
      localStorage.setItem(
        "menuAccess_flat",
        JSON.stringify(res.data.result.menu_items)
      )
      localStorage.setItem("settings", JSON.stringify(res.data.result.settings))
      localStorage.setItem(
        "menuAccess",
        JSON.stringify(make_tree(res.data.result.menu_items))
      )
      localStorage.setItem("user", JSON.stringify(res.data.result))
      if (router.query.redirect) {
        await router.push(router.query.redirect)
      } else {
        await router.push("/")
      }
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <>
      {!isMobile ? (
        <Mobile error={error} loading={loading} attemptLogin={attemptLogin} />
      ) : (
        <Desktop error={error} loading={loading} attemptLogin={attemptLogin} />
      )}
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  console.log(ctx)

  return {
    props: {},
  }
}
