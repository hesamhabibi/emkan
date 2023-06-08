import {useContext, useEffect, useReducer, useState} from "react"
import {ToastContext, TranslationContext} from "~/app/Context"
import Manual from "./components/manual"
import Auto from "./components/auto"
import RelatedProductAuto from "./components/related-product-auto"
import RelatedProductManual from "./components/related-product-manual"
import {Grid, GridContainer} from "@admin/Grid"
import Styles from "./components/manual.module.scss"
import Input from "@admin/Input"
import Tabs from "@admin/Tab"
import {seo} from "~/app/global"
import {convert_to_english_variable_name} from "~/app/Helpers/Slug"
import types from "./components/types"
// import Shield from "@admin/Shield"
import HasPerm from "~/app/perm"
import {useRouter} from "next/router"

const reducer = (state, action) => {

    switch (action.type) {
        case 1:
            return Manual
        case 2:
            return Auto
        case 3:
            return RelatedProductAuto
        case 4:
            return RelatedProductManual
    }
}

export function generateLink(getValues, setValue, fireToast, translation) {
    const title = getValues("extra_fields.title") || {}
    if (title.en)
        return setValue("extra_fields.seo.url", title.en.replaceAll(" ", "-"))

    const link = Object.values(title).find((item) => item)

    if (!link)
        return fireToast(
            translation("at least one of the title fields are required", "products"),
            {
                status: "warning",
            }
        )

    setValue("extra_fields.seo.url", convert_to_english_variable_name(link, "-"))
}

const Campaign = ({
                      control,
                      setValue,
                      getValues,
                      watch,
                      variants,
                      setVariants,
                      handleSubmit,
                      reset,
                      setError,
                      perm,
                  }) => {
    const translation = useContext(TranslationContext)
    const fireToast = useContext(ToastContext)

    const [Tab, setTab] = useReducer(reducer, Manual)
    const [data, setData] = useState([])

    useEffect(() => {
        const value = getValues("type")
        if (value) setTab({type: value})
    }, [watch("type")])

    const router = useRouter()

    return (
        <Tabs>
            {HasPerm({id: "campaigns_collection_tab", router}) && (
                <div title={translation("collection public information", "products")}>
                    {watch("type") && types[getValues("type")](translation, control)}
                </div>
            )}

            {HasPerm({
                id: "campaigns_collection_values_tab",
                router,
            }) && (
                <div title={translation("collection values", "products")}>
                    <GridContainer className={`m-3 ${Styles.container}`} gap="Lg">
                        <Grid size={12}>
                            <Tab
                                perm={perm}
                                setVariants={setVariants}
                                variants={variants}
                                Watch={watch}
                                getVal={getValues}
                                setVal={setValue}
                                control={control}
                                data={data}
                                setError={setError}
                                reset={reset}
                                handleSubmit={handleSubmit}
                            />
                        </Grid>
                    </GridContainer>
                </div>
            )}

            {HasPerm({id: "campaigns_collection_seo_tab", router}) && (
                <div title={translation("seo")}>
                    <GridContainer className="text-right" gap="Lg">
                        {seo
                            .form(
                                getValues,
                                setValue,
                                fireToast,
                                translation,
                                "/search?campaign=",
                                generateLink
                            )
                            .map((item, key) =>
                                item.size ? (
                                    <Grid key={key} size={item.size}>
                                        {item.render ? (
                                            item.render({label: translation(name, "category")})
                                        ) : (
                                            <Input
                                                key={key}
                                                {...item}
                                                control={control}
                                                name={`extra_fields.${item.name}`}
                                                label={translation(item.name, "category")}
                                            />
                                        )}
                                    </Grid>
                                ) : (
                                    <Input
                                        key={key}
                                        {...item}
                                        // type={item.type}
                                        control={control}
                                        name={`extra_fields.${item.name}`}
                                        label={translation(item.name, "category")}
                                    />
                                )
                            )}
                    </GridContainer>
                </div>
            )}
        </Tabs>
    )
}

export default Campaign
