import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import { Grid, GridContainer } from "@admin/Grid";
import Day from "./day";
import Month from "./month";
import Styles from "./calendar.module.scss";
import CalendarDetail from "./calendar";
import moment from "jalali-moment";

moment.locale("fa");

const reducer = (state, action) => {
  switch (action.type) {
    case 1:
      return Day;

    case 2:
      return Month;

    case 3:
      return;
  }
};

export default function Calendar({ setAction }) {
  const [View, setView] = useReducer(reducer, Day);
  const [date, setDate] = useState(moment());
  const [hierarchy, setHierarchy] = useState(moment());
  const [events, setEvents] = useState([]);
  const [popup, setPopup] = useState(false);
  const [addBtn, setAdd] = useState(null);

  const { control, watch, getValues } = useForm({
    defaultValues: { view: 1 },
  });

  const watchView = watch("view");

  useEffect(() => {
    setView({ type: getValues().view });
  }, [watchView]);

  return (
    <GridContainer gap="Lg" className={Styles.container}>
      <Grid size={12}>
        <div className={Styles.view}>
          <View
            setPopup={setPopup}
            popup={popup}
            setEvents={setEvents}
            setAction={setAction}
            day={date}
            setAdd={setAdd}
          />
        </div>
        <div className={Styles.calendar}>
          <CalendarDetail
            view={hierarchy}
            setPopup={setPopup}
            events={events}
            day={date}
            addBtn={addBtn}
            setDay={setDate}
            setView={setHierarchy}
          />
        </div>
      </Grid>
    </GridContainer>
  );
}
