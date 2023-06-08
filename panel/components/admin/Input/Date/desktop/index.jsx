import Styles from "./date.module.scss"
import { useContext, useEffect, useRef, useState } from "react"
import moment from "jalali-moment"
import Button from "@admin/Button"
import { TranslationContext } from "~/app/Context"

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
  label,
  locale,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  top,
}) {
  const translation = useContext(TranslationContext)

  if (typeof value == 'string')
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
      inputBox.current?.focus()
    } else {
      document.removeEventListener("click", clickRemove)
      inputBox.current?.blur()
    }
  }, [focused])

  return (
    <div className={Styles.container}>
      <label>{label}</label>
      <div
        ref={inputBox}
        onClick={(e) => {
          e.stopPropagation()
          setFocused(true)
        }}
        className={Styles.formControl}
      >
        {Boolean(focused && value) && (
          <i
            onClick={(e) => {
              e.stopPropagation()
              onChange(null)
            }}
            className={`fas fa-times-circle ${Styles.close}`}
          />
        )}
        <span
          onClick={() => {
            onChange(today)
          }}
          className={Styles.now}
        >
          {translation("today", "date_component")}
          <i className="fas fa-clock fa-sm" />
        </span>
        <input
          type="text"
          onBlur={onBlur}
          value={value ? value.format("YYYY/MM/DD") : ""}
          // onChange={(e) => onChange(moment.unix(e.target.value))}
          readOnly
        />
        <div
          className={`${Styles.dropDown} ${top ? Styles.top : ""} ${
            focused ? Styles.active : ""
          }`}
        >
          <div className={Styles.calendar}>
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
                    onChange(startOf.clone())
                  }}
                  className={`${startOf === today ? Styles.today : ""} ${
                    startOf.format("YYYYMMDD") === value?.format("YYYYMMDD")
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
                        onChange(startOf.clone().add(item + 1, "days"))
                      }}
                      className={`${
                        startOf
                          .clone()
                          .add(item + 1, "days")
                          .format("YYYYMMDD") === today.format("YYYYMMDD")
                          ? Styles.today
                          : ""
                      } ${
                        startOf
                          .clone()
                          .add(item + 1, "days")
                          .format("YYYYMMDD") ===
                        value?.clone().format("YYYYMMDD")
                          ? Styles.active
                          : ""
                      }`}
                    >
                      {startOf
                        .clone()
                        .add(item + 1, "days")
                        .format("DD")}
                    </span>
                  )
                )}
              </div>
              {restOfWeeks(Array(7 - days.length).length)}
            </div>
            <Button
              type="success"
              disabled={
                value?.format("YYYY/MM/DD") === today.format("YYYY/MM/DD")
              }
              onClick={() => onChange(today)}
              className={`${Styles.footerBtn} mt-2 w-100`}
            >
              {translation("today", "date_component")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
