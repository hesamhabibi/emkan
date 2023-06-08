import Styles from "./info.module.scss";
import { useContext } from "react";
import { InfoContext } from "~/app/Context";

export default function Info({ text }) {
  const activated = useContext(InfoContext);

  if (!activated) return null;

  return text ? (
    <small className={Styles.text}>
      <i className="fad fa-info-circle ml-2" />
      {text}
    </small>
  ) : null;
}
