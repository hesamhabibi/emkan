import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import Styles from "./prepend.module.scss"
import { useContext, useEffect, useRef, useState } from "react"

export default function Prepend({
  name,
  select_name,
  input_name,
  control,
  label,
  select_size,
  input_size,
  select_data,
  select_placeholder,
  component,
}) {
  const inputRef = useRef(null)
  const [focus, setFocus] = useState(false)

  const clickRemove = (e) => {
    if (!inputRef.current?.contains(e.target)) {
      setFocus(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", clickRemove)

    return () => {
      document.removeEventListener("click", clickRemove)
    }
  }, [])

  return (
    <>
      {Boolean(label) && <label>{label}</label>}
      <GridContainer
        forwardRef={inputRef}
        onClick={() => setFocus(true)}
        className={`${Styles.container} ${focus ? Styles.active : ""}`}
      >
        <Grid size={input_size}>
          <Input
            className={Styles.text}
            control={control}
            name={`${name}.${input_name}`}
          />
        </Grid>
        <Grid size={select_size}>
          <Input
            placeholder={select_placeholder}
            className={Styles.select}
            control={control}
            data={select_data}
            type={component || "select"}
            name={`${name}.${select_name}`}
          />
        </Grid>
      </GridContainer>
    </>
  )
}

Prepend.defaultProps = {
  component: "select",
}
