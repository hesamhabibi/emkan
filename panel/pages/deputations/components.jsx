import Filter from "@admin/Filter"

const Components = ({ callback, inputs }) => {
  const data = JSON.parse(localStorage.getItem("web_languages"))

  return (
    <Filter
      section="user"
      defaultValues={{
        title: {
          fields: data.map((item) => item.code),
          value: "",
        },
        label: {
          fields: data.map((item) => item.code),
          value: "",
        },
      }}
      callback={(data) => {
        if (!data.title?.value) {
          delete data.title
        }

        callback(data)
      }}
      id="filter"
      inputs={inputs}
    />
  )
}

export default Components
