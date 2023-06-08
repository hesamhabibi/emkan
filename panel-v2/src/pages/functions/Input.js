import { useTranslation } from "react-i18next";
import languageConfigs from "../../global-data/languageConfigs";
import { generate_nested_object_with_keys } from "../../helpers/obj";

const Input = ({ name, type = "text", label, onChange, form, lang, value }) => {
  const { t } = useTranslation();
  return (
    <div>
      <label>
        
        {}

        {
        lang && 
      (t(label)  + languageConfigs[lang].label)
        }
      </label>
      <input
        dir={lang && languageConfigs[lang].dir}
        type={type}
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
                e.target.value
              ),
            };
          }

          return onChange(e);
        }}
        name={name}
        defaultValue={value}
      />
    </div>
  );
};

export default Input;
