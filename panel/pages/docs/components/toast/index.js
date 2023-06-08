import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";

import { useContext } from "react";
import Button from "@admin/Button";
import { ToastContext } from "~/app/Context/Toast";

const Section = () => {
  const fireToast = useContext(ToastContext);

  return (
    <Button
      type="primary"
      className="mt-3 p-3 w-100"
      onClick={() =>
        fireToast("عملیات با موفقیت انجام شد", {
          duration: 3000,
          status: "success",
        })
      }
    >
      ثبت
    </Button>
  );
};

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
          <Section />
        </section>
      </div>
    </AdminLayout>
  );
}
