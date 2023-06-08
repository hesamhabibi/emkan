import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Modal from "@admin/Modal"
import Styles from "../modals.module.scss"
import Tag from "@admin/Tag"

export default function modalInfo({
  fields,
  title,
  section,
  tag,
  actions,
  id,
  render,
  hasInfo,
}) {
  const translation = useContext(TranslationContext)

  return (
    <Modal id={id} tag={tag} title={title} actions={actions} hasInfo={hasInfo}>
      <div className={`${Styles.column} ${Styles.block} mr-5 mt-5 text-center`}>
        <div
          className="text-right pl-3"
          style={{ borderLeft: "1px solid gray" }}
        >
          {Object.keys(fields).map((key, index) => (
            <p key={index}>{translation(key, section)}</p>
          ))}
        </div>
        <div className="pr-3 text-right">
          {Object.values(fields).map((value, key) => (
            <p key={key}>{value || "--"}</p>
          ))}
        </div>
      </div>
      {render}
    </Modal>
  )
}
