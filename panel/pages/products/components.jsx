import Filter from "@admin/Filter";
import Fields from "~/pages/blogs/fields";

const Components = ({ filterPage, fireLoading, setData }) => {
  const data = JSON.parse(localStorage.getItem("web_languages"));

  return (
    <Filter
      section="products"
      defaultValues={{
        title: {
          fields: data.map((item) => item.code),
          value: "",
        },
        summary: {
          fields: data.map((item) => item.code),
          value: "",
        },
      }}
      callback={(data) => {
        if (!data.title?.value) {
          delete data.title;
        }
        if (!data.summary?.value) {
          delete data.summary;
        }
        filterPage(data).then((res) => {
          setData(res.result);
          fireLoading(false);
        });
      }}
      id="filter"
      inputs={Fields.filterFields}
    />
  );
};

export default Components;
