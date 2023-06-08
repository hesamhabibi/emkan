import { useContext } from "react";
import { TranslationContext } from "~/app/Context";
import Styles from "./settings.module.scss";
import AdminLayout from "@admin/Layout";
import Tab from "@admin/Tab";
import Card from "../components/mobile/card";
import EditableCard from "../components/mobile/editableCard";
import Modal from "@admin/Modal";
import Input from "@admin/Input";
import AddBtn from "@admin/CrudLayout/Add";

export default function Settings({
  modalButtons,
  control,
  formats,
  data,
  modalTitle,
  create,
  edit,
  del,
}) {
  const translation = useContext(TranslationContext);

  return (
    <AdminLayout title={translation("settings", "settings")}>
      <div className={Styles.container}>
        <Tab>
          <div title={translation("general", "settings")}>
            {data.map((item, key) =>
              item.is_main ? (
                <Card
                  default_value={item.value}
                  key={key}
                  type={item.format}
                  data_key={item.key}
                  extra_data={item.extra_data}
                  title={item.name_panel}
                  description={item.description_panel}
                  id={item.id}
                />
              ) : null
            )}
          </div>
          <div title={translation("public", "settings")}>
            {data.map((item, key) =>
              !item.is_main ? (
                <EditableCard
                  default_value={item.value}
                  key={key}
                  data_key={item.key}
                  type={item.format}
                  extra_data={item.extra_data}
                  title={item.name_panel}
                  description={item.description_panel}
                  id={item.id}
                  edit={edit}
                  del={del}
                />
              ) : null
            )}
          </div>
        </Tab>
      </div>
      <Modal
        size="sm"
        title={modalTitle}
        id="AddSettings"
        actions={modalButtons}
      >
        <div className="p-3 text-right">
          <Input
            label={translation("name", "settings")}
            name="name"
            type="multi-language-panel"
            component="text"
            gridSize={12}
            control={control}
          />
          <Input
            label={translation("key", "settings")}
            name="key"
            control={control}
          />
          <Input
            label={translation("description", "settings")}
            type="multi-language-panel"
            component="textarea"
            gridSize={12}
            name="description"
            control={control}
          />
          <Input
            control={control}
            name="format"
            label={translation("format", "settings")}
            type="select"
            data={formats}
          />
        </div>
      </Modal>
      <AddBtn
        title={translation("add user")}
        callback={create}
        icon="fas fa-plus-circle"
      />
    </AdminLayout>
  );
}
