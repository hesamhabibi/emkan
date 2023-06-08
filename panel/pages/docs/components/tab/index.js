import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";
import Tab from "@admin/Tab";

export default function GridDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>تب ها</h3>
        <p className={Styles.muted}>
          تب ها موجب تقسیم بندی صفحه و دسته بندی نوع دیتا یا فرم (HTML) می باشد.
        </p>
        <section>
          <div>
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
          <Tab>
            <div title="test" icon="fas fa-times">
              salam
            </div>
            <div title="Test2" icon="fas fa-check">
              234oiu324i3u4324u
            </div>
          </Tab>
        </section>
      </div>
    </AdminLayout>
  );
}
