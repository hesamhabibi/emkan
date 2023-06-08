import { useContext } from "react";
import { DeviceView, TranslationContext } from "~/app/Context";
import Mobile from "./mobile";
import Desktop from "./desktop";

export default function ModalInfo({ fields, title, section, ...props }) {
  const translation = useContext(TranslationContext);
  const isDesktop = useContext(DeviceView);

  const actions = [
    {
      name: translation("Cancel"),
      disabled: false,
      onClick: (close) => close("infoModal"),
    },
  ];

  return isDesktop ? (
    <Desktop
      fields={fields}
      actions={actions}
      translation={translation}
      title={title}
      section={section}
      {...props}
    />
  ) : (
    <Mobile
      fields={fields}
      actions={actions}
      translation={translation}
      title={title}
      section={section}
      {...props}
    />
  );
}
