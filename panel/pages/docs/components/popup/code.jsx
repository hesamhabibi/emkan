export default `import { useContext } from "react";
import Button from "@admin/Button";
import { ToastContext } from "~/app/Context/Toast";

const Section = () => {
  const fireToast = useContext(ToastContext);

  return (
    <Button
      type="primary"
      className="p-5"
      onClick={() =>
        fireToast("عملیات با موفقیت انجام شد", {
          duration: 3000,
          status: "success"
        })
      }
    >
      Submit
    </Button>
  );
};`;
