import moment from "jalali-moment";
import Styles from "./calendar.module.scss";
import Button from "@admin/Button";

moment.locale("fa");

const weekDays = moment.weekdays();

export default function CalendarDetail({
  view,
  setView,
  setDay,
  day,
  events,
  addBtn,
}) {
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
      <span className={Styles.input}>
        <Button
          onClick={() => setDay((prev) => prev.clone().add(1, "days"))}
          type="white"
          className="ml-1"
        >
          <i className="far fa-angle-right ml-1" />
          روز بعد
        </Button>
        <Button
          onClick={() => setDay((prev) => prev.clone().subtract(1, "days"))}
          type="white"
        >
          روز قبل
          <i className="far fa-angle-left mr-1" />
        </Button>
      </span>
      <div className={Styles.calendar}>
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
      <Button
        disabled={moment().format("YYYYMMDD") === day.format("YYYYMMDD")}
        onClick={() => {
          setDay(moment());
          setView(moment());
        }}
        type="white"
        className={`${Styles.bgPurple} mt-2 w-100`}
      >
        امروز
      </Button>
      <div className={Styles.events}>
        {(() => {
          const items = events.reduce((prev, item) => {
            prev[item.type_title_panel] = prev[item.type_title_panel]
              ? [...prev[item.type_title_panel], item]
              : [item];
            return prev;
          }, {});

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
          ));
        })()}
      </div>
    </div>
  );
}
