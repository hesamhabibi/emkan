import { useContext } from "react"
import { TranslationContext } from "~/app/Context/Translation"
import Styles from "./login.module.scss"
import Input from "@admin/Input"
import Button from "@admin/Button"

export default function Desktop({ callback, control, loading }) {
  const translation = useContext(TranslationContext)

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <form onSubmit={callback}>
          <i className="fad fa-globe-europe fa-3x" />
          <h4>آسان تکمیل</h4>
          <div className={Styles.body}>
            <h5>{translation("Reset Password", "auth")}</h5>
            <Input
              size="lg"
              rules={{ required: true }}
              name="token"
              control={control}
              placeholder={translation("token", "auth")}
            />
            <Input
              size="lg"
              type="password"
              rules={{ required: true }}
              name="password"
              control={control}
              placeholder={translation("password")}
            />
            <Input
              size="lg"
              type="password"
              rules={{ required: true }}
              name="password_confirmation"
              control={control}
              placeholder={translation("password confirmation", "auth")}
            />
            <Button
              submit
              loading={loading}
              type="primary"
              className={Styles.submit}
            >
              {translation("Submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
