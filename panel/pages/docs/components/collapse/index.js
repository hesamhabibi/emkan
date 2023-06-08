import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Button from "@admin/Button";
import Styles from "../components.module.scss";

import { useDispatch } from "react-redux";
import Collapse from "@admin/Collapse";
import { toggle, open, close } from "~/app/State/collapse";

const Section = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        className="p-2 mt-4 w-100"
        onClick={() => dispatch(toggle("collapsed"))}
        type="warning"
        disabled={false}
        options={{ ref: (ref) => console.log(ref) }}
      >
        فیلتر جستجو
      </Button>
      <Collapse id="collapsed">
        <div style={{ background: "white", padding: 20 }}>
          salam salam salam
        </div>
      </Collapse>
    </>
  );
};

export default function GridDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>Collapse</h3>
        <p className={Styles.muted}>
          برای استفاده از کالپس می توانید پکیج react-redux را مطالعه فرمایید.
          برای مدیریت بهتر state ها از این پکیج استفاده می شود
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
