import { useContext, useEffect, useReducer, useState } from "react"
import { TranslationContext } from "~/app/Context"
import Modal from "@admin/Modal"
import Attributes from "./attributes"
import Categories from "./categories"
import Tags from "./tags"
import TagGroups from "./tag_groups"
import Styles from "./create.module.scss"

const reducer = (state, action) => {
  switch (action.type) {
    case "attributes":
      return Attributes

    case "categories":
      return Categories

    case "tags":
      return Tags

    case "tag_groups":
      return TagGroups

    default:
      return () => <h4>Not Found</h4>
  }
}

export default function Create({ model, title, setData, data, size, type }) {
  const translation = useContext(TranslationContext)

  const [Section, setSection] = useReducer(reducer, Attributes)
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
      return { ...prev }
    })
  }

  return (
    <Modal
      title={title}
      size={size}
      id="create-form"
      actions={actions}
      full_screen={size !== "sm"}
    >
      <div className={Styles[model]}>
        <Section
          type={type}
          data={data}
          callback={updateData}
          setAction={(act) =>
            setActions((prev) => {
              prev[1] = act
              return [...prev]
            })
          }
        />
      </div>
    </Modal>
  )
}
