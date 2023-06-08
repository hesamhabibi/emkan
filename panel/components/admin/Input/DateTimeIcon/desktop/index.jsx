import Styles from "./date.module.scss"
import { useContext, useEffect, useRef, useState } from "react"
import moment from "jalali-moment"
import Button from "@admin/Button"
import { TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import { useForm } from "react-hook-form"
import Tab from "@admin/Tab"
import Errors from "@admin/Input/Errors"

const faDays = [
  "شنبه",
  "یک‌شنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
]

const enDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const weekDaysLocale = {
  fa: faDays,
  en: enDays,
}

export default function Desktop({
  locale,
  label,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  top,
}) {
  const translation = useContext(TranslationContext)

  if (typeof value == 'string' && value.length > 0)
    value = moment(parseInt(value));

  moment.locale(locale || "fa")

  const weekDays = weekDaysLocale[locale || "fa"]

  const [focused, setFocused] = useState(false)

  const [month, setMonth] = useState(moment())
  const [today] = useState(moment())
  const inputBox = useRef(null)

  const startOf = month.clone().startOf("month")

  const days = Array.from(
    Array(weekDays.findIndex((item) => item === startOf.format("dddd"))).keys()
  )

  const { control, watch, getValues } = useForm({
    defaultValues: {
      zone: "AM",
    },
  })

  useEffect(() => {
    const time = (value || today).clone()
    const values = getValues()
    time.set("hour", values.zone === "AM" ? values.hours : values.hours + 12)
    time.set("minute", values.minutes)
    onChange(time)
  }, [watch("hours"), watch("minutes"), watch("zone")])

  const restOfWeeks = (index, notToday) => {
    const arr = Array.from(Array(Math.ceil((month.daysInMonth() - index) / 7)))
    const monthDays = month.daysInMonth()
    let weekDay = index
    const today = moment()

    return arr.map((item, key) => (
      <div key={key}>
        {Array.from(Array(7).keys()).map((item, key) => {
          const date = startOf.clone().add(weekDay++, "days")

          return weekDay <= monthDays ? (
            <span
              onClick={() => {
                onChange(date)
              }}
              className={`${
                date.format("YYYYMMDD") === today.format("YYYYMMDD") &&
                !notToday
                  ? Styles.today
                  : ""
              } ${
                value?.format("YYYYMMDD") === date.format("YYYYMMDD")
                  ? Styles.active
                  : ""
              }`}
              key={key}
            >
              {date.format("DD")}
            </span>
          ) : (
            <span key={key} aria-disabled>
              --
            </span>
          )
        })}
      </div>
    ))
  }

  const clickRemove = (e) => {
    if (inputBox.current && !inputBox.current.contains(e.target))
      setFocused(false)
  }

  useEffect(() => {
    if (focused) {
      document.addEventListener("click", clickRemove)
    } else {
      document.removeEventListener("click", clickRemove)
    }
    return () => {
      document.removeEventListener("click", clickRemove)
    }
  }, [focused])

  return (
    <>
      <label>{label}</label>
      <div
        ref={inputBox}
        className={`${Styles.container} ${top ? Styles.top : ""}`}
      >
        <span
          onClick={(e) => {
            setFocused(true)
            e.stopPropagation()
          }}
          className={`${Styles.formControl} d-flex justify-content-between align-items-center`}
        >
          <span>{value ? value?.format("HH:mm - YYYY/MM/DD") : ''}</span>
          <i className={`far fa-calendar-alt fa-lg ${Styles.icon}`} />
        </span>
        <div className={`${Styles.dropDown} ${focused ? Styles.active : ""}`}>
          <div className={Styles.calendar}>
            <Tab>
              <div title={translation("Date")}>
                <div className={Styles.header}>
                  <h6>{month.format("YYYY MMMM")}</h6>
                  <span className={Styles.action}>
                    <i
                      onClick={() =>
                        setMonth((prev) => prev.clone().add(1, "months"))
                      }
                      className="far fa-lg fa-angle-right"
                    />
                    <i
                      onClick={() =>
                        setMonth((prev) => prev.clone().subtract(1, "months"))
                      }
                      className="far fa-lg fa-angle-left"
                    />
                  </span>
                </div>
                <div className={Styles.body}>
                  <div className={Styles.tableHeader}>
                    {weekDays.map((item, key) => (
                      <span key={key} aria-disabled>
                        {item}
                      </span>
                    ))}
                  </div>
                  <div>
                    {days.map((item, key) => (
                      <span key={key} aria-disabled>
                        --
                      </span>
                    ))}
                    <span
                      onClick={(e) => {
                        onChange(startOf?.clone())
                      }}
                      className={`${startOf === today ? Styles.today : ""} ${
                       (value?.length > 0 && startOf?.format("YYYYMMDD") === value?.format("YYYYMMDD"))
                          ? Styles.active
                          : ""
                      }`}
                    >
                      {startOf.format("DD")}
                    </span>
                    {Array.from(Array(7 - days.length - 1).keys()).map(
                      (item, key) => (
                        <span
                          key={key}
                          onClick={() => {
                            onChange(startOf?.clone().add(item + 1, "days"))
                          }}
                          className={`${
                            startOf?.clone()?.add(item + 1, "days")?.format("YYYYMMDD") === today?.format("YYYYMMDD")
                              ? Styles.today
                              : ""
                          } ${
                            startOf?.clone()?.add(item + 1, "days")?.format("YYYYMMDD") === value?.clone()?.format("YYYYMMDD")
                              ? Styles.active
                              : ""
                          }`}
                        >
                          {startOf?.clone()?.add(item + 1, "days")?.format("DD")}
                        </span>
                      )
                    )}
                  </div>
                  {restOfWeeks(Array(7 - days?.length)?.length)}
                </div>
              </div>
              <div title={translation("Hour")}>
                <GridContainer gap="Lg" className={Styles.timeBody}>
                  <Grid size={12}>
                    <h6 className="text-right">
                      {value?.format("HH:mm")}{" "}
                      {translation(getValues().zone, "time_component")}
                    </h6>
                  </Grid>
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
                        if (getValues().zone === "AM")
                          return callback(Math.min(value, 12))

                        return callback(Math.min(value, 11))
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
                </GridContainer>
              </div>
            </Tab>
            <Button
              onClick={() => {
                onChange(moment())
                setFocused(false)
              }}
              className="w-100"
              type="success"
            >
              {translation("Now")}
            </Button>
          </div>
        </div>
      </div>
      <Errors errors={error} />
    </>
  )
}
