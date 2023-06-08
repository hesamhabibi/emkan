import Styles from "./time.module.scss"
import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import moment from "jalali-moment"
import { TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import Button from "@admin/Button"

export default function Mobile({
  label,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
}) {
  const translation = useContext(TranslationContext)
  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: {
      zone: "AM",
    },
  })

  const [focused, setFocused] = useState(false)

  const inputBox = useRef(null)

  const clickRemove = (e) => {
    if (inputBox.current && !inputBox.current.contains(e.target))
      setFocused(false)
  }

  const setTime = (data) => {
    setFocused(false)
    onChange(
      `${data.zone === "AM" ? data.hours : data.hours + 12}:${
        data.minutes
      } ${translation(data.zone, "time_component")}`
    )
  }

  useEffect(() => {
    const now = moment()
    setValue("hours", now.hours())
    setValue("minutes", now.minutes())
    setValue("zone", now.hours() >= 12 ? "PM" : "AM")
  }, [])

  useEffect(() => {
    if (getValues("zone") === "AM") setValue("hours", getValues("hours") % 12)
    else setValue("hours", (getValues("hours") % 12) + 12)
  }, [watch("zone")])

  useEffect(() => {
    if (focused) {
      document.addEventListener("click", clickRemove)
      inputBox.current?.focus()
    } else {
      document.removeEventListener("click", clickRemove)
      inputBox.current?.blur()
    }
  }, [focused])

  return (
    <div className={Styles.container}>
      <div className={`${Styles.bg} ${focused ? Styles.focused : ""}`} />
      <label>{label}</label>
      <div
        ref={inputBox}
        onClick={(e) => {
          e.stopPropagation()
          setFocused(true)
        }}
        className={Styles.formControl}
      >
        <span
          onClick={() => {
            const now = moment()
            onChange(
              `${now.hours()}:${now.minutes()} ${translation(
                now.hours() >= 12 ? "PM" : "AM",
                "time_component"
              )}`
            )
          }}
          className={Styles.now}
        >
          {translation("Now", "time_component")}
          <i className="fas fa-clock fa-sm" />
        </span>
        <input type="text" onBlur={onBlur} value={value || ""} readOnly />
        <div className={`${Styles.dropDown} ${focused ? Styles.active : ""}`}>
          <div className={Styles.clock}>
            <div className={Styles.header}>
              {(() => {
                let val = value
                if (!val) {
                  const values = getValues()
                  val = `${values.hours}:${values.minutes} ${translation(
                    values.zone,
                    "time_component"
                  )}`
                }
                const time = val.split(" ")
                return (
                  <>
                    <h4>{time[0]}</h4>
                    <span>{time.slice(1).join(" ")}</span>
                  </>
                )
              })()}
            </div>
            <GridContainer gap="Lg" className={Styles.body}>
              <Grid size={5}>
                <Input
                  label={translation("Minutes", "time_component")}
                  control={control}
                  name="minutes"
                  validate={(callback, e) => {
                    const value = parseInt(e.target.value || "0", 10)
                    return callback(Math.min(value, 59))
                  }}
                />
              </Grid>
              <Grid size="2" className="mb-1 text-center">
                :
              </Grid>
              <Grid size="5">
                <Input
                  label={translation("Hour", "time_component")}
                  control={control}
                  name="hours"
                  validate={(callback, e) => {
                    const value = parseInt(e.target.value || "0", 10)
                    return callback(Math.min(value, 12))
                  }}
                />
              </Grid>
              <Grid size={12}>
                <Input
                  type="toggle"
                  control={control}
                  name="zone"
                  data={[
                    { name: translation("AM", "time_component"), id: "AM" },
                    { name: translation("PM", "time_component"), id: "PM" },
                  ]}
                />
              </Grid>
              <Grid size={12}>
                <Button
                  className="w-100"
                  onClick={handleSubmit(setTime)}
                  type="success"
                >
                  ثبت
                </Button>
              </Grid>
            </GridContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
