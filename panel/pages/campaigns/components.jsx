import Filter from "@admin/Filter";
import Fields from "./fields";

const Components = ({ filterPage, fireLoading, setData }) => {
    const data = JSON.parse(localStorage.getItem("web_languages"));

    return (
        <Filter
            section="campaigns"
            defaultValues={{
                extra_fields: {
                    show: "",
                },
            }}
            callback={(data) => {
                filterPage(data).then((res) => {
                    fireLoading(false)
                    setData(res.result)
                })
            }}
            id="filter"
            inputs={Fields.filterFields}
        />
    );
};

export default Components;
