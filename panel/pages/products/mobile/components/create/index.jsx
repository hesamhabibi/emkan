import { useContext, useEffect, useReducer, useState } from "react"
import { DeviceView, InfoContext, TranslationContext } from "~/app/Context"
import Modal from "@admin/Modal"
import Attributes from "~/pages/attributes/wrapper"
import Categories from "./categories"
import Tags from "./tags"
import Brands from "./brands"
import TagGroups from "./tag_groups"
import Styles from "./create.module.scss"

const reducer = (state, action) => {
  switch (action.type) {
    case "attributes":
      return Attributes

    case "categories":
      return Categories

    case "brands":
      return Brands

    case "tags":
      return Tags

    case "tag_groups":
      return TagGroups

    default:
      return () => <h4>Not Found</h4>
  }
}

export default function Create({ model, title, setData, data, size }) {
  const translation = useContext(TranslationContext)

  const [Section, setSection] = useReducer(reducer, Attributes)
  const [info, setInfo] = useState(false)
  const [actions, setActions] = useState([
    {
      name: translation("Close"),
      disabled: false,
      onClick: (close) => close(),
    },
  ])

  useEffect(() => {
    setActions([
      {
        name: translation("Close"),
        disabled: false,
        onClick: (close) => close(),
      },
    ])
    setSection({ type: model })
  }, [model])

  const updateData = (fieldData) => {
    setData((prev) => {
      prev[model] = fieldData
      return { ...data }
    })
  }

  return (
    <Modal
      title={title}
      size={size}
      // tag={
      //   <div
      //     onClick={setInfo.bind(null, !info)}
      //     className={`mr-2 ${Styles.info} ${!info ? Styles.active : ""}`}
      //   >
      //     <i className="fad fa-question-circle fa-lg" />
      //   </div>
      // }
      id="create-form"
      actions={actions}
      full_screen={size !== "sm"}
    >
      <DeviceView.Provider value={true}>
        <div className={Styles[model]}>
          <InfoContext.Provider value={info}>
            <Section
              data={data}
              callback={updateData}
              setAction={(act) =>
                setActions((prev) => {
                  prev[1] = act
                  return [...prev]
                })
              }
            />
          </InfoContext.Provider>
        </div>
      </DeviceView.Provider>
    </Modal>
  )
}
