import Styles from "./empty.module.scss"
import {useContext} from "react"
import {DeviceView, TranslationContext} from "~/app/Context"
import Button from "@admin/Button"

const Empty = ({Text, button}) => {
    const isDesktop = useContext(DeviceView)
    return (
        <div className={Styles.container}>
            <img src="/images/empty.png" width={isDesktop ? 300 : 200} height={isDesktop ? 300 : 200}/>
            {typeof Text === "function" ? <Text/> : <p>{Text}</p>}
            { isDesktop && button }
        </div>
    )
}

Empty.defaultProps = {
    Text: () => {
        const translation = useContext(TranslationContext)
        return <p className="my-4 text-center">{translation("no record found")}</p>
    },
    button: null,
}

export default Empty
