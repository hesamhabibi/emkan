import { useTranslation } from "react-i18next";
import { generate_nested_object_with_keys } from "../../helpers/obj";

const CheckboxInput = ({
  label,
  name,
  onChange,
  type = "checkbox",
  form,
  value,
}) => {
  const { t } = useTranslation();

//   const keys = [1,2,3];
//   const key = keys.shift();
//   console.log(key)

  return (
    <div>
      <label>{t(label)}</label>
      <input
        name={name}
        checked={value}
        onChange={(e) => {
          const names = name.split(".");
          if (names?.length > 1) {
            const main_object_name = names[0];
            const other_names = names?.filter(
              (item) => item !== main_object_name
            );
            e.target = {
              name: main_object_name,
              value: generate_nested_object_with_keys(
                form[main_object_name] || {},
                other_names,
                !value
              ),
            };
          } else {
            e.target = {
              name,
              value: !value,
            };
          }
          return onChange(e);
        }}
        type={type}
      />
    </div>
  );
};

export default CheckboxInput;
