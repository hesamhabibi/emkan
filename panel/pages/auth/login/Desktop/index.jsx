import { useContext } from "react"
import { TranslationContext } from "~/app/Context/Translation"
import { useForm } from "react-hook-form"
import Styles from "./login.module.scss"
import Input from "@admin/Input"
import Alert from "@admin/Alert"
import Button from "@admin/Button"
import Link from "next/link"

export default function Desktop({ attemptLogin, loading, error }) {
  const translation = useContext(TranslationContext)
  const { control, handleSubmit } = useForm()

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <form onSubmit={handleSubmit(attemptLogin)}>
          <i className="fad fa-globe-europe fa-3x" />
          <h4>آسان تکمیل</h4>
          <div className={Styles.body}>
            <h5>{translation("login to admin panel", "auth")}</h5>
            {Boolean(error) && (
              <Alert className="mb-2" type="info">
                {error}
              </Alert>
            )}
            <Input
              size="lg"
              name="username"
              control={control}
              placeholder={translation("username", "auth")}
            />
            <Input
              type="password"
              size="lg"
              control={control}
              name="password"
              placeholder={translation("password", "auth")}
            />
            <Button
              submit
              loading={loading}
              type="primary"
              className={Styles.submit}
            >
              {translation("login", "auth")}
            </Button>
            <Link href="/auth/forgot-password">
              <a>{translation("forgot password", "auth")}</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
