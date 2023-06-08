import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { make_tree } from "~/app/Tree";
import Checkbox from "./CheckBox";
import Styles from "./select-sorted.module.scss";
import Errors from "@admin/Input/Errors";
import Info from "@admin/Input/Info";
import { TranslationContext } from "~/app/Context";

export default function SelectSorted({
  label,
  data,
  options,
  info,
  field: { onChange, value, onBlur },
  fieldState: { invalid, error, ...props },
  data_key,
}) {
  const [focused, setFocused] = useState(false);
  const [search, setSearch] = useState("");

  const translation = useContext(TranslationContext);
  const selectBox = useRef(null);
  const input = useRef(null);

  const addValue = (item, e) => {
    e.stopPropagation();
    if (item === null || item.disabled) return;

    setSearch("");

    if (value) {
      const index = value.findIndex((val) => val === item.id);
      if (index !== -1) {
        value.splice(index, 1);
        return onChange([...value]);
      }
      onChange([...value, item.id]);
    } else onChange([item.id]);
  };

  const onClickRemove = (e) => {
    if (selectBox.current && !selectBox.current.contains(e.target))
      setFocused(false);
  };

  const deleteOption = (item) =>
    onChange(value.filter((selected) => selected !== item));

  useEffect(() => {
    if (focused) {
      document.addEventListener("click", onClickRemove);
    } else {
      document.removeEventListener("click", onClickRemove);
    }
    return () => {
      document.removeEventListener("click", onClickRemove);
    };
  }, [focused]);

  const ChildList = ({ item, deep = 0 }) =>
    deep === 0 ? (
      item.map((item, key) => (
        <Fragment key={key}>
          <li onClick={addValue.bind(this, item)} disabled={item.disabled}>
            {Array.from(new Array(deep)).map(() => "-")}{" "}
            <Checkbox
              value={(value || []).includes(item.id)}
              onChange={() => {}}
              label={item.name}
            />
          </li>
          {item.children.length ? (
            <ChildList item={item.children} deep={deep + 1} />
          ) : null}
        </Fragment>
      ))
    ) : (
      <ul>
        {item.map((item, key) => (
          <Fragment key={key}>
            <li onClick={addValue.bind(this, item)} disabled={item.disabled}>
              {Array.from(new Array(deep)).map(() => "-")}{" "}
              <Checkbox
                value={(value || []).includes(item.id)}
                onChange={() => {}}
                label={item.name}
              />
            </li>
            {item.children.length ? (
              <ChildList item={item.children} deep={deep + 1} />
            ) : null}
          </Fragment>
        ))}
      </ul>
    );

  return (
    <>
      <div className={Styles.formGroup}>
        {Boolean(label) && <label>{label}</label>}

        <div
          onClick={(e) => {
            e.stopPropagation();
            input.current.focus();
            setFocused(!focused);
          }}
          ref={selectBox}
          className={`${Styles.formSelectMultiple} ${
            focused ? Styles.actived : ""
          } ${invalid ? Styles.invalid : ""}`}
        >
          <i
            className={`far fa-angle-down ${label ? "" : Styles.dropdown} ${
              focused ? "fa-rotate-180" : ""
            }`}
          />
          {(value || [])?.map((item, key) => (
            <small key={key} className={Styles.tag}>
              <button type="button" onClick={deleteOption.bind(this, item)}>
                <i className="fas fa-times ml-1" />
              </button>
              {typeof item === "object"
                ? data.find(
                    (row) => JSON.stringify(row.id) === JSON.stringify(item)
                  )?.name
                : data.find((row) => row.id === item)?.name}
            </small>
          ))}
          <input
            {...options}
            type="text"
            ref={input}
            className={`${Styles.formControl}`}
            readOnly={!focused}
            onChange={(e) => setSearch(e.target.value)}
            value={"" || search}
          />
        </div>
        <ul
          className={`${Styles.selectDropDown} ${focused ? Styles.active : ""}`}
        >
          {!data.filter((item) => item.name && item.name.includes(search))
            .length && <li disabled>{translation("no record found")}</li>}
          <ChildList
            item={(() => {
              const res = data.filter(
                (item) => item.name && item.name.includes(search)
              );
              return make_tree(res);
            })()}
          />
        </ul>
      </div>
      <Info text={info} />
      <Errors errors={error} />
    </>
  );
}

SelectSorted.defaultProps = {
  data: [],
};
