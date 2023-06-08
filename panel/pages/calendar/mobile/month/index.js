import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./week.module.scss"
import Popup from "../popup"
import MPopup from "@admin/Popup"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "../../queries"
import moment from "jalali-moment"
import { LoadingContext, RootElement, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { closePopup, openPopup } from "~/app/State/popups"

export default function Week({ reminders, day, setCallback: setFn }) {
  const translation = useContext(TranslationContext)

  const dispatch = useDispatch()
  const setLoading = useContext(LoadingContext)

  const [reminder, setReminder] = useState({
    start: 0,
    end: 0,
    focus: false,
    title: "عنوان",
    firstClick: null,
  })
  const [data, setData] = useState({})
  const [popup, setPopup] = useState(false)
  const [delId, setDelId] = useState(null)
  const [callback, setCallback] = useState(null)

  const { query, mutate, setErrors } = useApolloClient()

  const calendar = useRef(null)

  const setEnd = (e) => {
    e.preventDefault()
    // const rect = calendar.current.getBoundingClientRect();
    // const x = reminder.firstClick - e.clientX;
    setReminder((prev) => ({ ...prev, end: y }))
  }

  const addRemind = (e) => {
    setReminder((prev) => ({ ...prev, focus: false }))
    setCallback(() => submitAdd)
    setPopup(true)
    if (!e) return

    e.preventDefault()
    document?.removeEventListener("mousemove", setEnd)
    document?.removeEventListener("mouseup", addRemind)
  }

  const openReminder = (e) => {
    e.preventDefault()
    document?.addEventListener("mousemove", setEnd)
    document?.addEventListener("mouseup", addRemind)
    setReminder({
      start: e.clientY,
      focus: true,
      end: null,
      title: "عنوان",
      firstClick: e.clientX,
    })
  }

  useEffect(() => {
    if (!popup)
      reset({
        title: "",
        description: "",
        end_date: time2Moment(end),
        start_date: time2Moment(start),
      })
  }, [popup])

  const deleteRow = async () => {
    setLoading(true)
    dispatch(closePopup("delete-action"))
    const res = await mutate(
      {
        id: delId,
      },
      queries.deleteReminder
    )
    if (res.status) {
      await getMeetings()
      setLoading(false)
    }
  }

  const deleteActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("delete-action")),
    },
    {
      background: "#e40031",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: deleteRow,
    },
  ]

  const deleteOption = (id) => {
    setDelId(id)
    dispatch(openPopup("delete-action"))
  }

  useEffect(() => {
    setLoading(true)

    getMeetings().then(() => {
      setLoading(false)
    })
  }, [day])

  useEffect(() => {
    if (!calendar.current) return

    setFn(() => addRemind)

    calendar.current.addEventListener("mousedown", openReminder)

    return () => {
      document?.removeEventListener("mousemove", setEnd)
      document?.removeEventListener("mouseup", addRemind)

      if (!calendar.current) return
      calendar.current.removeEventListener("mousedown", openReminder)
    }
  }, [])

  const startDate = (time) => {
    const hour = time / 54
    const decimal = (hour % 1).toFixed(1)
    if (0 < decimal <= 0.3) return `${hour.toFixed(0)}:15`
    if (0.3 < decimal < 0.5) return `${hour.toFixed(0)}:30`
    if (0.5 < decimal < 0.75) return `${hour.toFixed(0)}:45`

    return `${Math.round(hour)}:00`
  }

  const endDate = (time) => {
    const hour = Math.max(
      reminder.start / 54,
      Math.min(23, 24 - (time / 1440) * 24)
    )
    const decimal = (hour % 1).toFixed(1)
    if (0 < decimal <= 0.3) return `${hour.toFixed(0)}:15`
    if (0.3 < decimal < 0.5) return `${hour.toFixed(0)}:30`
    if (0.5 < decimal < 0.75) return `${hour.toFixed(0)}:45`

    return `${Math.round(hour)}:00`
  }

  const start = startDate(reminder.start)
  const end = endDate(reminder.end)

  const getMeetings = async () => {
    const res = await query({
      query: queries.all,
      variables: {
        date_start: (day.startOf("day").unix() * 1000).toString(),
        date_end: (day.endOf("day").unix() * 1000).toString(),
        type: 2,
      },
    })
    setData(res.data)
  }

  const time2Moment = (timer) => {
    const time = timer.split(":")
    const st = day.clone()
    st.set({ hour: time[0], minute: time[1] })
    return st.unix() * 1000
  }

  const { control, reset, handleSubmit, setError } = useForm()

  const updateReminder = async (data) => {
    const { id } = data
    delete data.id
    setLoading(true)
    data.end_date = data.end_date.toString()
    data.start_date = data.start_date.toString()

    const res = await mutate({ input: data, id }, queries.updateReminder)

    if (Object.keys(res.errors).length) setErrors(res.errors, setError)
    else setPopup(false)

    if (res.status) {
      await getMeetings()
    }

    setLoading(false)
  }

  const editReminder = (item) => {
    reset(item)
    setCallback(() => updateReminder)
    setPopup(true)
  }

  const submitAdd = async (data) => {
    delete data.id
    setLoading(true)
    data.end_date = data.end_date.toString()
    data.start_date = data.start_date.toString()

    const res = await mutate(
      { input: { ...data, type: 2 } },
      queries.createReminder
    )

    if (Object.keys(res.errors).length) setErrors(res.errors, setError)
    else setPopup(false)

    if (res.status) {
      await getMeetings()
    }

    setLoading(false)
  }

  const monthStart = day.clone().startOf("month")
  const td = moment().format("YYYYMMDD")

  return (
    <>
      <div
        style={{ minWidth: data.reminders?.length * 110 + 20 }}
        className={`${Styles.container} ${reminder.focus ? Styles.focus : ""}`}
      >
        {Boolean(data.reminders?.length) &&
          data.reminders.map((item, key) => {
            const date_start = moment(parseInt(item.start_date, 10))
            const date_end = moment(parseInt(item.end_date, 10))
            return (
              <span
                key={key}
                className={Styles.reminders}
                style={{
                  top: `${
                    ((date_start.hour() * 60 + date_start.minute()) / 1440) *
                    100
                  }%`,
                  bottom: `${
                    1440 - (date_end.hour() * 60 + date_end.minute())
                  }px`,
                  right: `${key * 110 + 45}px`,
                }}
              >
                <span className={Styles.reminder}>
                  <p>{item.title}</p>
                  <p className={Styles.actions}>
                    <i
                      onClick={editReminder.bind(this, item)}
                      className="far fa-edit"
                    />
                    <i
                      onClick={deleteOption.bind(this, item.id)}
                      className="far fa-trash-alt mr-2"
                    />
                  </p>
                </span>
              </span>
            )
          })}
        {reminder.focus && (
          <span
            className={Styles.remindCursor}
            style={{
              top: `${reminder.start}px`,
              bottom: `${reminder.end}px`,
              left: `${reminder.right}px`,
            }}
          >
            <div className={Styles.reminder}>
              <p>{reminder.title}</p>
              <p>
                {" "}
                از {start} تا {end}
              </p>
            </div>

            <span />
          </span>
        )}
        <span className={Styles.workbox} ref={calendar}>
          {Array.from(Array(day.daysInMonth()).keys()).map((item, index) => (
            <span className={Styles.hour} key={index}>
              <span>
                {(() => {
                  const date = monthStart.clone().add(item, "days")

                  return (
                    <>
                      <h6>{date.format("ddd")}</h6>
                      <span
                        className={
                          date.format("YYYYMMDD") === td ? Styles.active : ""
                        }
                      >
                        {item + 1}
                      </span>
                    </>
                  )
                })()}
              </span>
              <div />
            </span>
          ))}
        </span>
      </div>
      <MPopup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </MPopup>
      <Popup
        control={control}
        errors={errors}
        callback={handleSubmit(callback)}
        popup={popup}
        setPopup={setPopup}
      />
    </>
  )
}
