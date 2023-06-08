import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Button from "@admin/Button";
import Styles from "../components.module.scss";

const section = (
  <Button
    className="p-2 mt-4"
    loading={true}
    onClick={(e) => console.log("Clicked")}
    type="success"
    disabled={false}
    options={{ ref: (ref) => console.log(ref) }}
  >
    Button
  </Button>
);

export default function GridDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>دکمه ها</h3>
        <p className={Styles.muted}>
          دکمه ها با استایل های مختلف آماده استفاده می باشد.
        </p>
        <section>
          <div>
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
          {section}
        </section>
      </div>
    </AdminLayout>
  );
}
