import { useContext, useState } from "react";
import Desktop from "./desktop";
import Mobile from "./mobile";
import AdminLayout from "@admin/Layout";
import { DeviceView, TranslationContext } from "~/app/Context";
import Shield from "@admin/Shield"

export default function Calendar() {
  const translation = useContext(TranslationContext);
  const isDesktop = useContext(DeviceView);
  const [action, setAction] = useState(() => {});

  return (
    <AdminLayout
      action={
        <Shield id="calendar_create_action" action>
          {action}
        </Shield>
      }
      title={translation("Calendar")}
    >
      {isDesktop ? <Desktop setAction={setAction} /> : <Mobile />}
    </AdminLayout>
  )
}
