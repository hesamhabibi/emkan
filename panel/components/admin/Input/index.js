import {Grid, GridContainer} from "@admin/Grid"
import {useContext, useEffect} from "react"
import {DeviceView, TranslationContext} from "~/app/Context"
import {Controller} from "react-hook-form"
import dynamic from "next/dynamic"
import Info from "@admin/Input/Info"

const Text = dynamic(() => import("./Text"))
const SelectMultiple = dynamic(() => import("./SelectMultiple"))
const Select = dynamic(() => import("./Select"))
const Toggle = dynamic(() => import("./Toggle"))
const Date = dynamic(() => import("./Date"))
const Image = dynamic(() => import("./Image"))
const File = dynamic(() => import("./File"))
const ImageGallery = dynamic(() => import("./ImageGallery"))
const Prepend = dynamic(() => import("./Prepend"))
const Map = dynamic(() => import("./Map"))
const SelectSearchable = dynamic(() => import("./SelectSearchable"))
const Time = dynamic(() => import("./Time"))
const SelectMultipleLabel = dynamic(() => import("./SelectMultipleLabel"))
const Video = dynamic(() => import("./Video"))
const CKEditor = dynamic(() => import("./JoditEditor"))
const ImageSimple = dynamic(() => import("./ImageSimple"))
const Textarea = dynamic(() => import("./Textarea"))
const SelectSorted = dynamic(() => import("./SelectSorted"))
const Checkbox = dynamic(() => import("./CheckBox"))
const DateTimeIcon = dynamic(() => import("./DateTimeIcon"))
const SelectSortedSingle = dynamic(() => import("./SelectSortedSingle"))
const Color = dynamic(() => import("./Color"))
const SwitchToggle = dynamic(() => import("./SwitchToggle"))

const Input = ({type, control, name, rules, validate, ...extra}) => {
    const translation = useContext(TranslationContext)
    const isDesktop = useContext(DeviceView)

    switch (type) {
        case "switch-toggle":
            return (
                <Controller
                    render={({...props}) => <SwitchToggle {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "select":
            return (
                <Controller
                    render={({...props}) => <Select {...extra} {...props} />}
                    rules={rules}
                    control={control}
                    name={name}
                />
            )

        case "map":
            return (
                <Controller
                    render={({...props}) => <Map {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "select-multiple-label":
            return (
                <Controller
                    render={({...props}) => (
                        <SelectMultipleLabel {...extra} {...props} />
                    )}
                    rules={rules}
                    control={control}
                    name={name}
                />
            )

        case "date-time-icon":
            return (
                <Controller
                    control={control}
                    render={({...props}) => <DateTimeIcon {...extra} {...props} />}
                    name={name}
                />
            )

        case "select-sorted":
            return (
                <Controller
                    render={({...props}) => <SelectSorted {...extra} {...props} />}
                    rules={rules}
                    control={control}
                    name={name}
                />
            )

        case "select-searchable":
            return (
                <Controller
                    render={({...props}) => <SelectSearchable {...extra} {...props} />}
                    rules={rules}
                    name={name}
                    control={control}
                />
            )

        case "checkbox":
            return (
                <Controller
                    render={({...props}) => <Checkbox {...extra} {...props} />}
                    rules={rules}
                    name={name}
                    control={control}
                />
            )

        case "image-gallery":
            console.log(name, 'image-gallery');
            return (
                <Controller
                    rules={rules}
                    render={({...props}) => <ImageGallery {...extra} {...props} />}
                    name={name}
                    control={control}
                />
            )

        case "select-sorted-single":
            return (
                <Controller
                    render={({...props}) => (
                        <SelectSortedSingle {...extra} {...props} />
                    )}
                    rules={rules}
                    name={name}
                    control={control}
                />
            )

        case "toggle":
            return (
                <Controller
                    rules={rules}
                    render={({...props}) => <Toggle {...extra} {...props} />}
                    control={control}
                    name={name}
                />
            )

        case "image":
            return (
                <Controller
                    control={control}
                    rules={rules}
                    render={({...props}) => <Image {...extra} {...props} />}
                    name={name}
                />
            )

        case "file":
            return (
                <Controller
                    control={control}
                    rules={rules}
                    render={({...props}) => <File {...extra} {...props} />}
                    name={name}
                />
            )

        case "select-multiple":
            return (
                <Controller
                    render={({...props}) => <SelectMultiple {...extra} {...props} />}
                    rules={rules}
                    control={control}
                    name={name}
                />
            )

        case "text-editor":
            return (
                <Controller
                    render={({...props}) => <CKEditor {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "image-simple":
            return (
                <Controller
                    control={control}
                    render={({...props}) => <ImageSimple {...extra} {...props} />}
                    name={name}
                />
            )

        case "date":
            return (
                <Controller
                    render={({...props}) => <Date {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "time":
            return (
                <Controller
                    render={({...props}) => <Time {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "textarea":
            return (
                <Controller
                    render={({...props}) => <Textarea {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "video":
            return (
                <Controller
                    render={({...props}) => <Video {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "color":
            return (
                <Controller
                    render={({...props}) => <Color {...extra} {...props} />}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )

        case "prepend":
            const data = JSON.parse(localStorage.getItem("web_languages"))
            return (
                <Prepend
                    {...extra}
                    name={name}
                    select_data={[
                        {
                            id: data.map((item) => item.code),
                            name: translation("All Languages"),
                        },
                        ...data.map((item) => ({id: item.code, name: item.name_auto})),
                    ]}
                    control={control}
                    rules={rules}
                />
            )

        case "multi-language": {
            const locales = JSON.parse(localStorage.getItem("web_languages"))

            const default_locale = JSON.parse(
                localStorage.getItem("web_default_language")
            )

            return isDesktop ? (
                <>
                    {locales.map((item, key) => (
                        <Grid
                            size={
                                key === locales.length - 1 && (key + 1) % 2 === 1
                                    ? 12
                                    : extra.gridSize
                            }
                            key={key}
                            {...extra.tag_props}
                        >
                            <Input
                                direction={item.direction}
                                label={`${extra.label || ""} (${item.name_auto})`}
                                name={`${name}.${item.code}`}
                                control={control}
                                type={extra.component}
                                rules={default_locale?.code || "fa" === item.code ? rules : {}}
                            />
                        </Grid>
                    ))}
                    <Grid size={12}>
                        <Info text={extra.info}/>
                    </Grid>
                </>
            ) : (
                <div>
                    {locales.map((item, key) => (
                        <div className="mt-3">
                            <Input
                                direction={item.direction}
                                label={`${extra.label || ""} (${item.name_auto})`}
                                name={`${name}.${item.code}`}
                                control={control}
                                type={extra.component}
                                rules={rules}
                            />
                        </div>
                    ))}
                    {/*<Grid size={12}>*/}
                    <Info text={extra.info}/>
                    {/*</Grid>*/}
                </div>
            )
        }

        case "multi-language-panel":
            return (
                <GridContainer gap="Lg">
                    {JSON.parse(localStorage.getItem("panel_languages")).map(
                        (item, key) => (
                            <Grid size={extra.gridSize} key={key} {...extra.tag_props}>
                                <Input
                                    direction={item.direction}
                                    label={`${extra.label} (${item.name_fa})`}
                                    name={`${name}.${item.code}`}
                                    control={control}
                                    type={extra.component}
                                />
                            </Grid>
                        )
                    )}
                </GridContainer>
            )

        default:
            return (
                <Controller
                    render={({...props}) => (
                        <Text {...extra} {...props} validate={validate} type={type}/>
                    )}
                    name={name}
                    control={control}
                    rules={rules}
                />
            )
    }
}

Input.defaultProps = {
    rules: {},
    validate: (callback, e) => callback(e),
}

export default Input
