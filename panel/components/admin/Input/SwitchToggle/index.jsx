import Styles from "./switch.module.scss"
import Info from "@admin/Input/Info"

const SwitchToggle = ({field: {onChange, value, name}, label, info, size}) => {

    const changeValue = (e) => {
        e.stopPropagation()

        console.log(value, "changeValue");
        onChange(!value)
    }

    console.log(value, "SwitchToggle");

    return (
        <div className={Styles.container}>
            {!!label && (
                <label className={size === "sm" ? Styles.sm : ""}>{label}</label>
            )}
            <div className={size === "sm" ? Styles.small : ""} onClick={changeValue}>
                <span className={`${Styles.tag} ${value ? Styles.active : ""}`}/>
            </div>
            <Info text={info}/>
        </div>
    )
}

export default SwitchToggle
