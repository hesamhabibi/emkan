import { useContext, useState } from "react";
import { TranslationContext } from "~/app/Context";
import Tabs from "@admin/Tab";
import Tab from "./tab";
import AdminLayout from "@admin/Layout";
import Button from "@admin/Button";

export default function MenuItems() {
  const translation = useContext(TranslationContext);

  const [action, setAction] = useState(null);

  return (
    <AdminLayout
      action={
        <Button type="success" onClick={action}>
          <i className="fas fa-plus-circle ml-1" />
          {translation("add access")}
        </Button>
      }
      title={translation("Menu Items")}
    >
      <Tabs>
        <div title={translation("panel")}>
          <Tab key={1} type={1} tabName={translation("panel")} setAction={setAction} />
        </div>

        <div title={translation("web")}>
          <Tab key={2} type={2}  tabName={translation("web")} setAction={setAction}/>
        </div>
      </Tabs>
    </AdminLayout>
  );
}
