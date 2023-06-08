import Sortable from "@admin/Table/sortable";
import Fields from "~/pages/attributes/fields";

export default function Table({
  setData,
  addModal,
  editModal,
  deleteOption,
  showAttributes,
  data,
  callback
}) {
  return (
    <Sortable
      callback={callback}
      title="title_panel"
      section="attribute"
      fields={Fields.tableFields}
      data={data}
      setData={setData}
      actions={Fields.tableActions({
        add: addModal,
        change: editModal,
        delete: deleteOption,
      })}
      onClick={showAttributes}
      headless
    />
  );
}
