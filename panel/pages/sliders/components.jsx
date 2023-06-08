import Filter from "@admin/Filter"
import Fields from "./fields"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"

const Components = ({ filterPage, fireLoading, setData }) => {
  const data = JSON.parse(localStorage.getItem("web_languages"))
  const translation = useContext(TranslationContext)

  return (
    <Filter
      section="sliders"
      defaultValues={{
        name: {
          fields: data.map((item) => item.code),
          value: "",
        },
      }}
      callback={(data) => {
        filterPage(data).then((res) => {
          setData(res.result)
          fireLoading(false)
        })
      }}
      id="filter"
      inputs={Fields.filterFields(translation)}
    />
  )
}

export default Components
