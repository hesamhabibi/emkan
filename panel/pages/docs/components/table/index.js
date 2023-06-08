import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import data from "./data";
import Table from "@admin/Table";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";

export default function TableDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>جدول ها</h3>
        <p className={Styles.muted}>
          برای نشان دادن اطلاعات از دیتابیس از جدول ها استفاده می شود.
        </p>
        <section>
          <div className="mt-2">
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
          <span className="w-100">
            <Table
              fields={[
                { title: "name" },
                { title: "last_name" },
                { title: "phone_number" },
                { title: "national_code" },
              ]}
              actions={[
                {
                  onClick: (rows) => console.log(rows),
                  icon: "fa-edit",
                },
                {
                  onClick: (rows) => console.log(rows),
                  icon: "fa-trash-alt",
                },
              ]}
              data={data}
            />
          </span>
        </section>
      </div>
    </AdminLayout>
  );
}
