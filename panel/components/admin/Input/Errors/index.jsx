import Styles from "./errors.module.scss"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"

export default function Errors({ errors }) {
  const translation = useContext(TranslationContext)

  return errors ? (
    errors.message ? (
      <ul className={Styles.errors}>
        <li>{errors.message}</li>
      </ul>
    ) : (
      <ul className={Styles.errors}>
        {Object.values(errors).map((e, key) => {
          if (typeof e !== "string" || !e) return null
          return <li key={key}>{translation(e)}</li>
        })}
      </ul>
    )
  ) : null
}
