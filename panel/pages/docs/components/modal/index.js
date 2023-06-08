import { useContext } from "react";
import { dracula, CodeBlock } from "react-code-blocks";
import { useDispatch } from "react-redux";
import { TranslationContext } from "~/app/Context";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";
import Modal from "@admin/Modal";
import { openModal } from "~/app/State/modal";
import Button from "@admin/Button";

const ModalSection = () => {
  const dispatch = useDispatch();
  const translation = useContext(TranslationContext);

  const actions = [
    {
      onClick: (close) => close(),
      disabled: false,
      name: translation("Close"),
    },
  ];

  return (
    <span className="w-100">
      <Button
        className="mt-2"
        onClick={() => dispatch(openModal("myModal"))}
        type="primary"
      >
        باز کردن مودال
      </Button>

      <Modal id="myModal" actions={actions} title="عنوان مودال ما">
        <div>salam salam salam</div>
      </Modal>
    </span>
  );
};

export default function ModalDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>استفاده از مودال ها</h3>
        <p className={Styles.muted}>
          برای فرایند پر کردن فرم ها معمولا از مودال استفاده می شود. برای
          استفاده از مودال ها مطالعه react-redux می تواند کمک کند.
        </p>
        <section>
          <div className="mt-2">
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
          <ModalSection />
        </section>
      </div>
    </AdminLayout>
  );
}
