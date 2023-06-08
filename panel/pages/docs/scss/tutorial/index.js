import AdminLayout from "@admin/Layout";
import Styles from "../index.module.scss";
import code from "./code";
import { CodeBlock, dracula } from "react-code-blocks";

export default function Tutorial() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>ساخت استایل های یک صفحه</h3>
        <p className={Styles.muted}>
          رعایت ساختار کد زنی در پروژه بسیار مهم می باشد و پروژه را یک دست می
          کند.
        </p>
        <p>در اینجا به یکی از صفحه های پروژه به عنوان مثال می پردازیم: </p>
        <section className="mt-4">
          <h5>استایل صفحه این داکیومنت</h5>
          <h6 className="mt-4">- JSX</h6>
          <div>
            <CodeBlock language="jsx" theme={dracula} text={code.jsx} />
          </div>
          <h6 className="mt-4">- SCSS</h6>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.scss} />
          </div>
          <p>
            استاندارد پروژه یک کلاس parent و کلاس های children از طریق parent
            استایل دهی می شوند
          </p>
        </section>
        <p>
          تمام ایمپورت های استایل ها بصورت یک variable باشد. که باعث hash شدن
          استایل در کامپوننت های react می شوند
        </p>
        <section>
          <div>
            <div className="d-flex align-items-center">
              <i className="fas fa-check-circle mr-4" />
              <CodeBlock
                language="js"
                theme={dracula}
                text="import Styles from 'index.module.scss'"
              />
              <span className="ml-3">// result: admin_adminLayout__oQHPX</span>
            </div>
            <div className="d-flex align-items-center">
              <i className="fas fa-times-circle mr-4" />
              <CodeBlock
                language="js"
                theme={dracula}
                text="import 'index.module.scss'"
              />
              <span className="ml-3">// result: adminLayout</span>
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
