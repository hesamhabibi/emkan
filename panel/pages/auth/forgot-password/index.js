import { useContext, useState } from "react"
import { DeviceView } from "~/app/Context/Device"
import { useForm } from "react-hook-form"
import Mobile from "./Mobile"
import Desktop from "./Desktop"
import queries from "./queries"
import client from "~/app/apollo-client"
import { useRouter } from "next/router"
import { setErrors } from "~/app/Hooks/Api"

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const isDesktop = useContext(DeviceView)

  const { control, handleSubmit, setError } = useForm()

  const callback = async (data) => {
    setLoading(true)
    try {
      await client.mutate({
        mutation: queries.resetPassword,
        variables: { email: data.email, recaptcha_v3_token: "skip" },
      })
      await router.push(`/auth/reset-password?email=${data.email}`)
    } catch (e) {
      if (e.graphQLErrors?.length) setErrors(e.graphQLErrors[0], setError)
      console.log(e)
    }
    setLoading(false)
  }

  return isDesktop ? (
    <Desktop
      callback={handleSubmit(callback)}
      control={control}
      loading={loading}
    />
  ) : (
    <Mobile
      callback={handleSubmit(callback)}
      control={control}
      loading={loading}
    />
  )
}
