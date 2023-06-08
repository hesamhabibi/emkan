import { useContext, useEffect, useRef, useState } from "react"
import Styles from "./day.module.scss"
import MPopup from "@admin/Popup"
import { useForm } from "react-hook-form"
import { useApolloClient } from "~/app/Hooks/Api"
import queries from "../../queries"
import moment from "jalali-moment"
import { useDispatch } from "react-redux"
import { LoadingContext, TranslationContext } from "~/app/Context"
import Button from "@admin/Button"
import { increment, decrement } from "~/app/State/badges"
import { closePopup, openPopup } from "~/app/State/popups"
import Modal from "@admin/Modal"
import Input from "@admin/Input"
import { closeModal, openModal } from "~/app/State/modal"
import Shield from "@admin/Shield"

export default function Day({ day, setAction, setEvents, setAdd }) {
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
  const [state, setState] = useState("")

  const { query, mutate, setErrors } = useApolloClient()

  const calendar = useRef(null)

  const setEnd = (e) => {
    e.preventDefault()
    const rect = calendar.current.getBoundingClientRect()
    const x = rect.right - e.clientX - 750
    setReminder((prev) => ({ ...prev, end: -x }))
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
    dispatch(openModal("calendar-manager"))
    document.removeEventListener("mousemove", setEnd)
    document.removeEventListener("mouseup", addRemind)
  }

  const addRemindTitle = (title) => {
    setState(translation("add Reminder"))
    setReminder((prev) => ({
      showPopup: true,
      data: { title, description: "" },
    }))
    setCallback(() => submitAdd)
    dispatch(openModal("calendar-manager"))
  }

  const openReminder = (e) => {
    e.preventDefault()
    document.addEventListener("mousemove", setEnd)
    document.addEventListener("mouseup", addRemind)
    const rect = calendar.current.getBoundingClientRect()
    const start = e.clientX - rect.left
    const y = e.clientY - rect.top
    setReminder({
      start: -start + 800,
      top: y,
      focus: true,
      end: null,
      title: "عنوان",
    })
  }

  useEffect(() => {
    if (!reminder.showPopup) return
    setReminder((prev) => ({ ...prev, showPopup: false }))
    const ended = time2Moment(end)
    const started = time2Moment(start)
    reset({
      can_edit: true,
      is_owner: true,
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
      setEvents(res.data.events)
      setLoading(false)
    })
    setAdd(() => addRemindTitle)
    return () => {
      isMounted = false
    }
  }, [day])

  useEffect(() => {
    if (!calendar.current) return

    setAction(
      <Button onClick={addRemind} type="success">
        <i className="fas fa-plus-circle ml-1" />
        {translation("add Reminder")}
      </Button>
    )
  }, [])

  const startDate = (time) => {
    const hour = (time / 2640) * 24 - 0.25

    const decimal = Math.round(hour * 100) / 100
    if (0 <= decimal < 0.3) return `${hour.toFixed(0)}:15`
    if (0.3 <= decimal < 0.6) return `${hour.toFixed(0)}:30`
    if (0.6 <= decimal <= 0.9) return `${hour.toFixed(0)}:45`

    return `${Math.round(hour)}:00`
  }

  const endDate = (time) => {
    const hour = Math.max(
      reminder.start / 54,
      Math.min(23, 24 - ((time / 2592) * 24 + 18))
    )
    const decimal = (hour % 1).toFixed(1)
    if (0 < decimal <= 0.3) return `${hour.toFixed(0)}:15`
    if (0.3 < decimal <= 0.5) return `${hour.toFixed(0)}:30`
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
    else dispatch(closeModal("calendar-manager"))

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
    dispatch(openModal("calendar-manager"))
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
    else dispatch(closeModal("calendar-manager"))

    if (res.status) {
      dispatch(increment("calender_reminder_badge"))
      const res = await getMeetings()
      setData(res.data)
    }

    setLoading(false)
  }

  const isOwner = watch("is_owner")

  return (
    <>
      <div className={`${Styles.today} font-weight-bold`}>
        {day.format("dddd DD MMMM YYYY")}
      </div>
      <div
        // style={{ minWidth: data.reminders?.length * 110 + 20 || "auto" }}
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
                data-tooltip={item.description}
                data-tooltip-location="left"
                style={{
                  right: `${
                    ((date_start.hour() * 60 + date_start.minute()) / 1440) *
                    2640
                  }px`,
                  width: `${
                    (date_end.hour() * 60 +
                      date_end.minute() -
                      date_start.hour() * 60 -
                      date_start.minute()) *
                    1.833333333333333
                  }px`,
                  top: `${key * 110 + 100}px`,
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
        <span className={Styles.workbox} ref={calendar}>
          {Array.from(Array(24).keys()).map((item, index) => (
            <span className={Styles.hour} key={index}>
              <span>
                <hr />
                <span>{item + 1}:00</span>
              </span>
              <div className={index === 0 ? Styles.firstHour : ""}>
                <hr />
              </div>
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
      <Modal
        size="sm"
        actions={[
          {
            name: translation("Cancel"),
            disabled: false,
            onClick: (close) => close(),
          },
          {
            name: translation("Submit"),
            onClick: handleSubmit(callback),
          },
        ]}
        id="calendar-manager"
        title={state}
      >
        <div className="m-4 text-right">
          <div className="mt-3">
            <Input
              name="title"
              control={control}
              label={translation("title")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="textarea"
              control={control}
              name="description"
              label={translation("description")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="time"
              control={control}
              name="start_date"
              label={translation("start_date")}
            />
          </div>
          <div className="mt-3">
            <Input
              type="time"
              control={control}
              name="end_date"
              label={translation("end_date")}
            />
          </div>
          {isOwner && getValues().is_owner && (
            <>
              <div className="mt-3">
                <Input
                  type="select-multiple"
                  data={data.users || []}
                  name="access_user_ids"
                  control={control}
                  label={translation("users")}
                />
              </div>
              <div className="mt-3">
                <Input
                  type="toggle"
                  label={translation("can_edit")}
                  control={control}
                  data={[
                    {
                      name: translation("True"),
                      color: "#3ECF8E",
                      id: true,
                    },
                    {
                      name: translation("False"),
                      color: "#EC6060",
                      id: false,
                    },
                  ]}
                  name="can_edit"
                />
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
