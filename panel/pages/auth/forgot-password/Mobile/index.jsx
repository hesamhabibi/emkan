import Styles from "./login.module.scss"
import { useForm } from "react-hook-form"
import Input from "@admin/Input"
import Button from "@admin/Button"
import Link from "next/link"
import Alert from "@admin/Alert"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context/Translation"

export default function Mobile({ callback, loading, control }) {
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
              control={control}
              name="email"
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
