import { createContext, useContext, useMemo, useState } from "react";
import moment from "moment";
import * as jalali_moment from "jalali-moment";
import { useLanguageContext } from "./LanguagesContext";

export const TimeZoneContext = createContext(false);

export const TimeZoneContextProvider = ({ children }) => {
  const { language } = useLanguageContext();

  const [time_zone, set_time_zone] = useState({
    locale: "fa",
    UTC_offset: "+03:30",
    timezone: "Asia/Tehran",
  });

  const values = useMemo(
    () => ({
      time_zone,
      set_time_zone,
      convert_time_zone: (date) => {
        return jalali_moment(date).locale(language).format("YYYY/M/D HH:mm:ss");
      },
      convert_timestamp_time_zone: (timestamp) => {
        return jalali_moment
          .unix(timestamp / 1000)
          .locale(language)
          .format("YYYY/M/D HH:mm:ss");
      },
    }),
    [time_zone]
  );

  return (
    <TimeZoneContext.Provider value={{ ...values }}>
      {children}
    </TimeZoneContext.Provider>
  );
};

export const useTimeZoneContext = () => useContext(TimeZoneContext);
