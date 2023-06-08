import { useContext } from "react";
import { TranslationContext } from "~/app/Context";
import AdminLayout from "@admin/Layout";
import Tabs from "@admin/Tab";
import Tab from "./tab";
import TabFront from "~/pages/reports/tab-front";

export default function Categories() {
  const translation = useContext(TranslationContext);

  return (
    <AdminLayout title={translation("Categories")}>
      <Tabs>
        <div title={translation("front", "reports")}>
          <TabFront key={0} />
        </div>
        <div title={translation("500", "reports")}>
          <Tab key={1} code={500} />
        </div>
        <div title={translation("422", "reports")}>
          <Tab key={2} translation={translation} code={422} />
        </div>
        <div title={translation("403", "reports")}>
          <Tab key={4} translation={translation} code={403} />
        </div>
        <div title={translation("401", "reports")}>
          <Tab key={3} translation={translation} code={401} />
        </div>
        <div title={translation("200", "reports")}>
          <Tab key={5} translation={translation} code={200} />
        </div>
      </Tabs>
    </AdminLayout>
  );
}
