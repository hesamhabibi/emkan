import { useContext, useState } from "react";
import { TranslationContext } from "~/app/Context";
import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import data from "./data";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";
import Tree from "@admin/Tree";

export default function TableDocs() {
  const translation = useContext(TranslationContext);
  const [data, setData] = useState([
    {
      id: 1,
      title: "salam",
      parent_id: null,
    },
    {
      id: 2,
      title: "test",
      parent_id: 1,
    },
    {
      id: 3,
      title: "child 1",
      parent_id: 2,
    },
    {
      id: 4,
      title: "child 2",
      parent_id: 3,
    },
    {
      id: 5,
      title: "parent",
      parent_id: null,
    },
  ]);

  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>جدول درختی</h3>
        <p className={Styles.muted}>
          جدول عادی با توانایی sort کردن و تخصیص فرزند به پدر می باشد.
        </p>
        <section>
          <div className="mt-2">
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
          <span className="w-100">
            <Tree
              title="title"
              setData={setData}
              actions={[
                (item) => ({
                  onClick: () => console.log("PRESSED", item),
                  icon: "far fa-plus",
                  tooltip: translation("create", "category"),
                  dir: "right",
                }),
                (item) => ({
                  onClick: () => console.log("PRESSED", item),
                  icon: "far fa-edit",
                  tooltip: translation("edit", "category"),
                  dir: "right",
                }),
                (item) => ({
                  onClick: () => console.log("PRESSED", item),
                  icon: "far fa-trash-alt",
                  tooltip: translation("delete", "category"),
                  dir: "right",
                }),
              ]}
              data={data}
            />
          </span>
        </section>
      </div>
    </AdminLayout>
  );
}
