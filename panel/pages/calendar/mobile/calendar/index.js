import moment from "jalali-moment";
import Styles from "./calendar.module.scss";
import Button from "@admin/Button";

moment.locale("fa");

const weekDays = moment.weekdays();

export default function CalendarDetail({ view, setView, setDay, day }) {
  const startOf = view.clone().startOf("month");
  const today = moment();
  const days = Array.from(
    Array(weekDays.findIndex((item) => item === startOf.format("dddd"))).keys()
  );

  const restOfWeeks = (index, notToday) => {
    const arr = Array.from(Array(Math.ceil((view.daysInMonth() - index) / 7)));
    const monthDays = view.daysInMonth();
    let weekDay = index;
    const today = moment();
    return arr.map((item, key) => (
      <div key={key}>
        {Array.from(Array(7).keys()).map((item, key) => {
          const date = startOf.clone().add(weekDay++, "days");

          return weekDay <= monthDays ? (
            <span
              onClick={() => {
                setDay(date);
              }}
              className={`${
                date.format("YYYYMMDD") === today.format("YYYYMMDD") &&
                !notToday
                  ? Styles.today
                  : ""
              } ${
                date.format("YYYYMMDD") === day.format("YYYYMMDD")
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
          );
        })}
      </div>
    ));
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h6>{view.format("YYYY MMMM")}</h6>
        <span className={Styles.action}>
          <i
            onClick={() => setView((date) => date.add(1, "months").clone())}
            className="far fa-lg fa-angle-right"
          />
          <i
            onClick={() =>
              setView((date) => date.subtract(1, "months").clone())
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
            onClick={() => {
              setDay(startOf.clone());
            }}
            className={`${startOf === today ? Styles.today : ""} ${
              startOf.format("YYYYMMDD") === day.format("YYYYMMDD")
                ? Styles.active
                : ""
            }`}
          >
            {startOf.format("DD")}
          </span>
          {Array.from(Array(7 - days.length - 1).keys()).map((item, key) => (
            <span
              key={key}
              onClick={() => {
                setDay(startOf.add(item + 1, "days").clone());
              }}
              className={`${
                startOf
                  .clone()
                  .add(item + 1, "days")
                  .format("YYYYMMDD") === moment().format("YYYYMMDD")
                  ? Styles.today
                  : ""
              } ${
                startOf
                  .clone()
                  .add(item + 1, "days")
                  .format("YYYYMMDD") === day.clone().format("YYYYMMDD")
                  ? Styles.active
                  : ""
              }`}
            >
              {startOf
                .clone()
                .add(item + 1, "days")
                .format("DD")}
            </span>
          ))}
        </div>
        {restOfWeeks(Array(7 - days.length).length)}
      </div>
    </div>
  );
}
