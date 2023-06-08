import {useContext} from "react"
import {DeviceView, TranslationContext} from "~/app/Context"
import Desktop from "./desktop"
import Mobile from "./mobile"
import Empty from "@admin/Empty"

export default function Table({data, button, ...props}) {
    const isDesktop = useContext(DeviceView)

    if (!data?.length)
        return (
            <div className={isDesktop ? "mt-5" : "mt-3"}>
                <Empty button={button}/>
            </div>
        )

    return isDesktop ? (
        <Desktop data={data} {...props} />
    ) : (
        <Mobile data={data} {...props} />
    )
}
