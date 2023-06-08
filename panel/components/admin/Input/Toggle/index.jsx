import { useContext } from "react";
import Mobile from "./mobile";
import Desktop from "./desktop";
import { DeviceView } from "~/app/Context";

export default function Toggle({
  data,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  ...extra
}) {
  const isDesktop = useContext(DeviceView);


  // console.log(extra);
  // console.log(!value , typeof extra.value == "boolean");
  // console.log(!value &&  typeof extra.value == "boolean");


  if (!value &&  typeof extra.value == "boolean") value = extra.value

  // console.log(value);
  // // data.find((item) => {
  // //   if (item.id === true){
  // //     value =
  // //   }
  // // })


  const styleToggle = {
    background: data.find((item) => item.id === value)?.color || "#5f6cec",
    color: "#fff",
  };

  const changeToggle = (item) => onChange(item.id);

  return isDesktop ? (
    <Desktop
      {...extra}
      onChange={changeToggle}
      error={error}
      value={value}
      data={data}
      styleToggle={styleToggle}
    />
  ) : (
    <Mobile
      {...extra}
      onChange={changeToggle}
      styleToggle={styleToggle}
      error={error}
      value={value}
      data={data}
    />
  );
}
