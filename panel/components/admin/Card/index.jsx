import { useContext } from "react";
import { DeviceView } from "~/app/Context";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Card({ ...props }) {
  const isDesktop = useContext(DeviceView);

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />;
}
