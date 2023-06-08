import Styles from "./toggle.module.scss";
import Errors from "@admin/Input/Errors";
import Info from "@admin/Input/Info";

export default function Toggle({
                                   label,
                                   disabled,
                                   data,
                                   value,
                                   error,
                                   onChange,
                                   styleToggle,
                                   info,
                                   direction,
                               }) {
    return (
        <>
            <div className={`${Styles.formGroup} ${direction === 'ltr' ? 'text-left' : 'text-right'}`}>
                {Boolean(label) && <label>{label}</label>}

                <div className={`${Styles.formControl} ${Styles.formToggle}`}>
                    {data.map((item, key) => (
                        <button
                            type="button"
                            disabled={disabled}
                            style={
                                !item.color && value === item.id
                                    ? styleToggle
                                    : item.id === value
                                    ? styleToggle
                                    : {background: null, boxShadow: null, color: "black"}
                            }
                            key={key}
                            onClick={onChange.bind(this, item)}
                        >
                            {item.name}
                        </button>
                    ))}
                    <span style={styleToggle}/>
                </div>
            </div>
            <Info text={info}/>
            <Errors errors={error}/>
        </>
    );
}
