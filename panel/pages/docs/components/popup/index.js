import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";
import Button from "@admin/Button";
import { useDispatch } from "react-redux";
import Popup from "@admin/Popup";
import { useContext } from "react";
import { TranslationContext } from "~/app/Context";
import { closePopup, openPopup } from "~/app/State/popups";

const Section = () => {
  const dispatch = useDispatch();
  const translation = useContext(TranslationContext);

  const deleteActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("delete-action")),
    },
    {
      background: "#e40031",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: () => dispatch(closePopup("delete-action")),
    },
  ];

  return (
    <div>
      <Popup
        id="delete-action"
        title="حذف کالا"
        status="error"
        actions={deleteActions}
      >
        <p>آیا مطمعن هستید؟</p>
      </Popup>
      <Button
        type="error"
        className="mt-3 p-3 w-100"
        onClick={() => {
          dispatch(openPopup("delete-action"));
        }}
      >
        حذف
      </Button>
    </div>
  );
};

export default function GridDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3 className="my-2">Popup</h3>
        <p className={Styles.muted}>
          برای تایید کار یا پر کردن فرم های کوچک استفاده می شود
        </p>
        <section>
          <div>
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
        </section>
        <Section />
      </div>
    </AdminLayout>
  );
}
