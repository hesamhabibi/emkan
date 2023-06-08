export default `import { useDispatch } from "react-redux";
import Modal from "@admin/Modal";
import { openModal } from "~/app/State/modal";
import Button from "@admin/Button";
import { TranslationContext } from "~/app/Context";

const ModalSection = () => {
  const dispatch = useDispatch(); // Hook for updating redux
  const translation = useContext(TranslationContext); // Context of translation

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
        {/* Update Modal State */}
        type="primary"
      >
        اضافه کردن فرم
      </Button>

      <Modal id="myModal" actions={actions} title="عنوان مودال ما">
        {/* Modal Content */}
        <div>salam salam salam</div>
      </Modal>
    </span>
  );
};`;
