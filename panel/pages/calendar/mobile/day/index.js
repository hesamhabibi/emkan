import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./day.module.scss"
import MPopup from "@admin/Popup"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "../../queries"
import moment from "jalali-moment"
import { useDispatch } from "react-redux"
import { LoadingContext, TranslationContext } from "~/app/Context"
import { increment, decrement } from "~/app/State/badges"
import { closePopup, openPopup } from "~/app/State/popups"
import Fields from "./fields"
import ModalForms from "@admin/Forms"
import { closeModal, openModal } from "~/app/State/modal"
import Button from "@admin/Button"
import Collapse from "@admin/Collapse"
import { toggle } from "~/app/State/collapse"
import Info from "@admin/Input/Info"
import Shield from "@admin/Shield"

export default function Day({ day, setCallback: setFn }) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const setLoading = useContext(LoadingContext)

  const [reminder, setReminder] = useState({
    start: 0,
    end: 0,
    focus: false,
    title: "عنوان",
    showPopup: false,
  })
  const [data, setData] = useState({})
  const [delId, setDelId] = useState(null)
  const [callback, setCallback] = useState(null)
  const [collapsed, setCollapsed] = useState(false)
  const [state, setState] = useState("")

  const { query, mutate, setErrors } = useApolloClient()

  const calendar = useRef(null)

  const setEnd = (e) => {
    e.preventDefault()
    const rect = calendar.current.getBoundingClientRect()
    const y = rect.bottom - e.clientY
    setReminder((prev) => ({ ...prev, end: y }))
  }

  const addRemind = (e) => {
    e.preventDefault()
    setState(translation("add Reminder"))
    setReminder((prev) => ({
      ...prev,
      focus: false,
      showPopup: true,
      data: { title: "", description: "" },
    }))
    setCallback(() => submitAdd)
    dispatch(openModal("editForms"))
    document.removeEventListener("mousemove", setEnd)
    document.removeEventListener("mouseup", addRemind)
  }

  const openReminder = (e) => {
    e.preventDefault()
    document.addEventListener("mousemove", setEnd)
    document.addEventListener("mouseup", addRemind)
    const rect = calendar.current.getBoundingClientRect()
    const y = e.clientY - rect.top
    setReminder({ start: y, focus: true, end: null, title: "عنوان" })
  }

  useEffect(() => {
    if (!reminder.showPopup) return
    setReminder((prev) => ({ ...prev, showPopup: false }))
    const ended = time2Moment(end)
    const started = time2Moment(start)
    reset({
      is_owner: true,
      can_edit: true,
      end_date: `${ended.hours()}:${ended.minutes()}`,
      start_date: `${started.hours()}:${started.minutes()}`,
      ...reminder.data,
    })
  }, [reminder])

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
      dispatch(decrement("calender_reminder_badge"))
      const res = await getMeetings()
      setData(res.data)
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
    let isMounted = true
    setLoading(true)

    getMeetings().then((res) => {
      if (!isMounted) return
      setData(res.data)
      setLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [day])

  useEffect(() => {
    if (!calendar.current) return

    calendar.current.addEventListener("mousedown", openReminder)
    setFn(() => addRemind)

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
    return await query({
      query: queries.all,
      variables: {
        date_start: (day.clone().startOf("day").unix() * 1000).toString(),
        date_end: (day.clone().endOf("day").unix() * 1000).toString(),
        type: 1,
      },
    })
  }

  const time2Moment = (timer) => {
    const time = timer.split(":")
    const st = day.clone()
    st.set({ hour: time[0], minute: time[1] })
    return st
  }

  const { control, reset, handleSubmit, setError, watch, getValues } = useForm()

  const isOwner = watch("is_owner")

  const updateReminder = async (data) => {
    const { id } = data
    delete data.id
    delete data.editable
    delete data.is_owner
    setLoading(true)
    data.end_date = time2moment(data.end_date).toString()
    data.start_date = time2moment(data.start_date).toString()
    const res = await mutate({ input: data, id }, queries.updateReminder)

    if (Object.keys(res.errors).length) setErrors(res.errors, setError)
    else dispatch(closeModal("editForms"))

    if (res.status) {
      const res = await getMeetings()
      setData(res.data)
    }

    setLoading(false)
  }

  const editReminder = (item) => {
    setState(translation("edit Reminder"))
    setReminder((prev) => ({
      ...prev,
      focus: false,
      showPopup: true,
      data: {
        ...item,
        end_date: moment(parseInt(item.end_date, 10)).format("HH:mm"),
        start_date: moment(parseInt(item.start_date, 10)).format("HH:mm"),
      },
    }))
    setCallback(() => updateReminder)
    dispatch(openModal("editForms"))
  }

  const time2moment = (time) => {
    const data = time.split(":")
    const current = day.clone()
    current.set({ hour: data[0], minute: data[1] })
    return current.unix() * 1000
  }

  const submitAdd = async (data) => {
    delete data.is_owner
    setLoading(true)
    data.end_date = time2moment(data.end_date).toString()
    data.start_date = time2moment(data.start_date).toString()

    const res = await mutate(
      { input: { ...data, type: 1 } },
      queries.createReminder
    )

    if (Object.keys(res.errors).length) setErrors(res.errors, setError)
    else dispatch(closeModal("editForms"))

    if (res.status) {
      dispatch(increment("calender_reminder_badge"))
      const res = await getMeetings()
      setData(res.data)
    }

    setLoading(false)
  }

  const addBtn = (title) => {
    setState(translation("add Reminder"))
    setReminder((prev) => ({
      showPopup: true,
      data: { title, description: "" },
    }))
    setCallback(() => submitAdd)
    dispatch(openModal("editForms"))
  }

  return (
    <>
      <div className={Styles.events}>
        <Button
          className="w-100 mt-3 d-flex justify-content-between"
          type="primary"
          onClick={() => {
            dispatch(toggle("events"))
            setCollapsed(!collapsed)
          }}
        >
          {translation("Events")}
          <i
            className={`fas fa-angle-down ${collapsed ? "fa-rotate-180" : ""}`}
          />
        </Button>
        <Collapse id="events" className="bg-white">
          <div className={Styles.collapsed}>
            {(() => {
              const items = (data.events || []).reduce((prev, item) => {
                prev[item.type_title_panel] = prev[item.type_title_panel]
                  ? [...prev[item.type_title_panel], item]
                  : [item]
                return prev
              }, {})

              return Object.keys(items).map((item, key) => (
                <div className={Styles.card} key={key}>
                  <div className={Styles.header}>{item}</div>
                  <div className={Styles.body}>
                    {items[item].map((e, index) => (
                      <div onClick={() => addBtn(e.title)} key={index}>
                        <i className="far fa-paperclip" />
                        {e.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        </Collapse>
        <Info
          text={translation(
            "for better experience scroll horizontally",
            "calendar"
          )}
        />
      </div>
      <div
        style={{ minWidth: data.reminders?.length * 230 + 20 || "auto" }}
        className={`${Styles.container} ${reminder.focus ? Styles.focus : ""}`}
      >
        {Boolean(data.reminders?.length) &&
          data.reminders.map((item, key) => {
            const date_start = moment(parseInt(item.start_date, 10))
            const date_end = moment(parseInt(item.end_date, 10))
            return (
              <span
                data-tooltip={item.description}
                data-tooltip-location="left"
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
                  right: `${key * 210 + 45}px`,
                }}
              >
                <span className={Styles.reminder}>
                  <p>{item.title}</p>
                  {item.editable && (
                    <p className={Styles.actions}>
                      <Shield id="calendar_edit_action" action>
                        <i
                          onClick={editReminder.bind(this, item)}
                          className="far fa-edit"
                        />
                      </Shield>
                      <Shield id="calendar_delete_action" action>
                        <i
                          onClick={deleteOption.bind(this, item.id)}
                          className="far fa-trash-alt mr-2"
                        />
                      </Shield>
                    </p>
                  )}
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
            }}
          >
            <div className={Styles.reminder}>
              <p>{reminder.title}</p>
              <p>
                از {start} تا {end}
              </p>
            </div>

            <span />
          </span>
        )}
        <span className={Styles.workbox} ref={calendar}>
          {Array.from(Array(24).keys()).map((item, index) => (
            <span className={Styles.hour} key={index}>
              <span>
                <span>{item + 1}:00</span>
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
      <ModalForms
        state={state}
        control={control}
        section="calendar"
        id="editForms"
        form={Fields.form(data.users || [], translation, isOwner, getValues)}
        callback={handleSubmit(callback)}
      />
    </>
  )
}
