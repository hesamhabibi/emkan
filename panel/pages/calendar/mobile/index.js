import { useEffect, useReducer, useState } from "react"
import { useForm } from "react-hook-form"
import { Grid, GridContainer } from "@admin/Grid"
import Day from "./day"
import Month from "./month"
import Styles from "./calendar.module.scss"
import CalendarDetail from "./calendar"
import moment from "jalali-moment"
import Button from "@admin/Button"
import Tag from "@admin/Tag"
import AddBtn from "@admin/CrudLayout/Add"
import Shield from "@admin/Shield"

moment.locale("fa")

const reducer = (state, action) => {
  switch (action.type) {
    case 1:
      return Day

    case 2:
      return Month

    case 3:
      return
  }
}

export default function Calendar() {
  const [View, setView] = useReducer(reducer, Day)
  const [date, setDate] = useState(moment())
  const [hierarchy, setHierarchy] = useState(moment())
  const [callback, setCallback] = useState(() => {})

  const { watch, getValues } = useForm({
    defaultValues: { view: 1 },
  })

  const watchView = watch("view")

  useEffect(() => {
    setView({ type: getValues().view })
  }, [watchView])

  return (
    <GridContainer gap="Md" className={Styles.container}>
      <Grid size={12} className={Styles.header}>
        <div className="w-100 d-flex justify-content-between">
          <div className={Styles.input}>
            <Button
              onClick={() => setDate((prev) => prev.clone().add(1, "days"))}
              type="white"
              className="ml-1"
            >
              <i className="far fa-angle-right ml-1" />
              روز بعد
            </Button>
            <Button
              type="white"
              onClick={() =>
                setDate((prev) => prev.clone().subtract(1, "days"))
              }
            >
              روز قبل
              <i className="far fa-angle-left mr-1" />
            </Button>
          </div>
        </div>
      </Grid>
      <Grid size={12}>
        <CalendarDetail
          view={hierarchy}
          day={date}
          setDay={setDate}
          setView={setHierarchy}
        />
      </Grid>

      <Shield id="calendar_create_action" action>
        <AddBtn callback={callback} title="اضافه کردن رویداد" />
      </Shield>
      <Grid size={12} className={Styles.view}>
        <Tag className={Styles.today} type="purple">
          {date.format("dddd DD MMMM YYYY")}
        </Tag>
        <View setCallback={setCallback} day={date} />
      </Grid>
    </GridContainer>
  )
}
