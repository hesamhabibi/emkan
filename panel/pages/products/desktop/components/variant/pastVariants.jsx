import Popup from "@admin/Popup";
import Styles from "./past-variants.module.scss";
import { closePopup } from "~/app/State/popups";
import { useContext, useEffect } from "react";
import { TranslationContext } from "~/app/Context";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Input from "@admin/Input";
import _ from "lodash";
import { useRouter } from "next/router";

export default function PastVariants({ callback, colors, keys }) {
  const translation = useContext(TranslationContext);
  const dispatch = useDispatch();

  const popup = useSelector((state) => state.popups.value["choose-color"]);

  const { control, getValues, watch, handleSubmit, reset } = useForm();

  const locale = useRouter().locale;

  const modifyData = (data) => {
    callback(
      Object.keys(data)
        .slice(1)
        .map((item) => colors.find((color) => color.key === item))
    );
  };

  const actions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("choose-color")),
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: handleSubmit(modifyData),
    },
  ];

  useEffect(() => {
    if (!popup) return;
    const values = Object.keys(getValues())
      .slice(1)
      .map((item) => colors.find((color) => color.key === item))
      .filter((item) => item);

    const resetKeys = keys
      .filter((item) =>
        values.find(
          (value) => value?.values?.color_value === item.values.color_value
        )
      )
      .map((item) => item.key);
    reset({ search: "", ..._.invert(resetKeys) });
  }, [popup]);

  return (
    <Popup
      id="choose-color"
      status="info"
      title={translation("Choose Mixin", "products")}
      actions={actions}
    >
      <Input
        name="search"
        control={control}
        label={translation("Search Filter", "products")}
        type="text"
      />
      <div className={Styles.mixins}>
        {watch("search") && getValues().search
          ? colors
              .filter((item) =>
                item.title[locale].includes(getValues().search || "")
              )
              .map((item, key) => (
                <div key={key}>
                  <Input
                    key={item.key}
                    name={item.key}
                    type="checkbox"
                    control={control}
                  />
                  <span>{item.title[locale]}</span>
                </div>
              ))
          : colors.map((item, key) => (
              <div key={key}>
                <Input
                  name={item.key}
                  key={item.key}
                  type="checkbox"
                  control={control}
                />
                <span>{item.title[locale]}</span>
              </div>
            ))}
      </div>
    </Popup>
  );
}
