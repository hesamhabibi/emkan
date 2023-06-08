import Styles from "./modals.module.scss"
import { useState } from "react"
import { InfoContext } from "~/app/Context"

export default function Mobile({
  children,
  actions,
  closing,
  closeModal,
  title,
  tag,
  hasInfo,
}) {
  const [info, setInfo] = useState(false)

  return (
    <div
      className={`${Styles.modal} ${
        closing ? Styles.closeModal : ""
      } text-center`}
    >
      {!actions.length && (
        <button
          type="button"
          className={`far fa-times fa-lg ${Styles.btnClose}`}
          onClick={closeModal}
        />
      )}
      <div className={Styles.body}>
        <div className="d-flex align-items-center justify-content-center mb-3 mt-4">
          <h4 className={Styles.title}>{title}</h4> {tag}
          {!!hasInfo && (
            <span
              onClick={setInfo.bind(null, !info)}
              className={`mr-2 ${Styles.info} ${!info ? Styles.active : ""}`}
            >
              <i className="fad fa-question-circle fa-lg" />
            </span>
          )}
        </div>
        <main>
          <InfoContext.Provider value={info}>{children}</InfoContext.Provider>
        </main>
        <footer className={Styles.footer}>
          {actions.map((item, key) => {
            return (
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
            )
          })}
        </footer>
      </div>
      <div className={Styles.backDrop} />
    </div>
  )
}
