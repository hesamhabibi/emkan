import Filter from "@admin/Filter"
import Fields from "./fields"

const Components = ({ filterPage, fireLoading, setData }) => {
  const data = JSON.parse(localStorage.getItem("web_languages"))

  return (
    <Filter
      // section="blog"
      defaultValues={{
        title: {
          fields: data.map((item) => item.code),
          value: "",
        },
      }}
      callback={(data) => {
        if (!data.title?.value) {
          delete data.title
        }
        filterPage(data)
      }}
      id="filter"
      inputs={Fields.filterFields}
    />
  )
}

export default Components
