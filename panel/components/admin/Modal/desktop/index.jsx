import Styles from "./modals.module.scss"
import { useState } from "react"
import { InfoContext } from "~/app/Context"
import Modal from "@admin/Modal"

export default function Desktop({
  children,
  actions,
  direction,
  closing,
  closeModal,
  full_screen,
  title,
  tag,
  size,
  hasInfo,
}) {
  const [info, setInfo] = useState(false)

  return (
    <div
      className={`${Styles.modal} ${size === "sm" ? Styles.sm : ""} ${
        size === "xs" ? Styles.xs : ""
      } ${closing ? Styles.closeModal : ""} text-center`}
    >
      <button
        type="button"
        className={`far fa-times fa-lg ${Styles.btnClose} ${
          direction === "rtl" ? Styles.btnCloseLTR : ""
        }`}
        onClick={closeModal}
      />

      <div className="d-flex align-items-center justify-content-center mb-3 mt-4">
        <h4 className={`ml-3 ${Styles.title}`}>{title}</h4> {tag}{" "}
        {!!hasInfo && (
          <span
            onClick={setInfo.bind(null, !info)}
            className={`mr-2 ${Styles.info} ${!info ? Styles.active : ""}`}
          >
            <i className="fad fa-question-circle fa-lg" />
          </span>
        )}
      </div>
      <div className={`${Styles.body} ${full_screen ? Styles.fullScreen : ""}`}>
        <main className={actions.length ? "" : Styles.noAction}>
          <InfoContext.Provider value={info}>{children}</InfoContext.Provider>
        </main>
        {size !== "xs" && !!actions.length && (
          <footer>
            {actions.map((item, key) => (
              <button
                type="button"
                key={key}
                onClick={
                  item.onClick ? item.onClick.bind(this, closeModal) : null
                }
                disabled={item.disabled}
              >
                {item.name}
              </button>
            ))}
          </footer>
        )}
      </div>
      <div className={Styles.backDrop} />
    </div>
  )
}

Modal.defaultProps = {
  hasInfo: false,
}
