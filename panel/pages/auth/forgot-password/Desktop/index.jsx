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
            <h5>{translation("Forgot Password", "auth")}</h5>
            <Input
              size="lg"
              rules={{ required: true }}
              name="email"
              control={control}
              placeholder={translation("email", "auth")}
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
