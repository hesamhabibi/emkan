import AdminLayout from "@admin/Layout"
import {useContext, useEffect, useState} from "react"
import {InfoContext, LoadingContext, TranslationContext} from "~/app/Context"
import Button from "@admin/Button"
// import Filter from "@admin/Filter"
// import Table from "@admin/Table"
import Pagination from "@admin/Pagination"
import {useDispatch} from "react-redux"
import {closeModal, openModal} from "~/app/State/modal"
import AddBtn from "@admin/CrudLayout/Add"
import queries from "./queries"
import Fields from "./fields"
import {useForm} from "react-hook-form"
import {useApolloClient} from "~/app/Hooks/Api"
import {useMutation} from "~/app/Hooks"
import {filterFields} from "~/app/Helpers/MutationHandler"
// import {closePopup, openPopup} from "~/app/State/popups"
import Campaign from "~/components/Campaign"
import Modal from "@admin/Modal"
import Styles from "~/pages/products/products.module.scss"
import {Grid, GridContainer} from "@admin/Grid"
import Tag from "@admin/Tag"
import moment from "jalali-moment"
// import Popup from "@admin/Popup"
// import HasPerm from "~/app/perm";
import Tab from "./tab";
import Tabs from "@admin/Tab";
// import Shield from "@admin/Shield"

const campaignTypes = {
    1: "static",
    2: "dynamic",
    3: "related-products",
    4: "product-static",
}

const defaultValues = {
    type: 1,
    extra_fields: {
        has_timer: true,
        show: true,
        expireAt: moment(),
        startAt: moment(),
    },
    list: [],
    condition: {
        model_name: "ProductModel",
        logic: 1,
        orders: [{}],
        wheres: [{}],
        limit: 15,
    },
}

moment.locale("fa")

const Campaigns = () => {
    const translation = useContext(TranslationContext)
    const fireLoading = useContext(LoadingContext)

    // ---- states
    const [data, setData] = useState({})
    const [callback, setCallback] = useState(() => undefined)
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState({})
    const [variants, setVariants] = useState([])
    const [tab_info, set_tab_info] = useState({
        query: 'camp',
        type: 1,
        active_index: 0
    })

    // ---- Hooks
    const dispatch = useDispatch()
    const {
        control,
        setValue,
        getValues,
        reset,
        clearErrors,
        watch,
        setError,
        handleSubmit,
    } = useForm({
        defaultValues,
    })

    const {getPage} = useApolloClient()

    const {mutate} = useMutation({
        setData,
        id: "editForms",
        clearErrors,
        setError,
        setLoading,
    })

    // --- callbacks
    const createInstance = async (data) => {
        data.list = (data.list || []).map((item) => {
            item.has_variant_key = (item?.mix_variant_keys?.length > 0)
            item.mix_variant_keys = item.mix_variant_keys.flat()
            return item
        })
        data.extra_fields.expireAt = `${data.extra_fields.expireAt.unix() || 0}000`
        data.extra_fields.startAt = `${data.extra_fields.startAt.unix() || 0}000`
        await mutate({
            mutation: data.type > 2 ? queries.createRelated : queries.create,
            variables: {
                input: filterFields({fields: Fields.allowedFields, data}),
            },
            action: "create",
        })
    }

    const createModal = (type) => {
        setVariants([])
        dispatch(closeModal("manage-campaigns"))
        reset({...defaultValues, type})
        setCallback(() => createInstance)
        setTitle(translation("create", "campaigns"))
        dispatch(openModal("editForms"))
    }

    const creationType = () => dispatch(openModal("manage-campaigns"))

    const modalActions = [
        {
            name: translation("Cancel"),
            disabled: false,
            onClick: (close) => close(),
        },
        {
            name: translation("Submit"),
            disabled: loading,
            onClick: handleSubmit(callback),
        },
    ]

    return (
        <AdminLayout
            title={translation("Campaigns")}
            action={
                // <Shield id="campaigns_create_action" action>
                <Button onClick={creationType} type="success">
                    {translation("Add Campaign")}
                    <i className="fas fa-plus-circle mr-2"/>
                </Button>
                // </Shield>
            }
        >
            <Tabs id={tab_info.active_index}>
                {/*{HasPerm({ id: "products_physical_tab", router }) && (*/}
                <div title={translation("Manual")}>
                    <Tab
                        key={1}
                        type={1}
                        queryType={'all'}
                        onClick={() => set_tab_info({
                            query: 'camp',
                            type: 1,
                            active_index: 0
                        })}
                        {...{
                            translation,
                            creationType,
                            fireLoading,
                            control,
                            setValue,
                            getValues,
                            reset,
                            clearErrors,
                            watch,
                            setError,
                            handleSubmit,
                            getPage,
                            filter,
                            setFilter,
                            dispatch,
                            data, setData,
                            callback, setCallback,
                            variants, setVariants,
                            title, setTitle
                        }}
                    />
                </div>
                {/*)}*/}
                {/*{HasPerm({ id: "products_digital_tab", router }) && (*/}
                <div title={translation("Dynamic")}>
                    <Tab
                        key={2}
                        type={2}
                        queryType={'all'}
                        creationType={creationType}
                        onClick={() => set_tab_info({
                            query: 'camp',
                            type: 2,
                            active_index: 1
                        })}
                        {...{
                            translation,
                            creationType,
                            fireLoading,
                            control,
                            setValue,
                            getValues,
                            reset,
                            clearErrors,
                            watch,
                            setError,
                            handleSubmit,
                            getPage,
                            filter,
                            setFilter,
                            dispatch,
                            data, setData,
                            callback, setCallback,
                            variants, setVariants,
                            title, setTitle
                        }}
                    />
                </div>
                {/*)}*/}
                {/*{HasPerm({ id: "products_digital_tab", router }) && (*/}
                <div title={translation("Related Product Static")}>
                    <Tab
                        key={3}
                        type={1}
                        queryType={'allRelated'}
                        creationType={creationType}
                        onClick={() => set_tab_info({
                            query: 'related',
                            type: 1,
                            active_index: 2
                        })}
                        {...{
                            translation,
                            creationType,
                            fireLoading,
                            control,
                            setValue,
                            getValues,
                            reset,
                            clearErrors,
                            watch,
                            setError,
                            handleSubmit,
                            getPage,
                            filter,
                            setFilter,
                            dispatch,
                            data, setData,
                            callback, setCallback,
                            variants, setVariants,
                            title, setTitle
                        }}
                    />
                </div>
                {/*)}*/}
                {/*{HasPerm({ id: "products_digital_tab", router }) && (*/}
                <div title={translation("Related Product")}>
                    <Tab
                        key={4}
                        type={2}
                        queryType={'allRelated'}
                        creationType={creationType}
                        onClick={() => set_tab_info({
                            query: 'related',
                            type: 2,
                            active_index: 3
                        })}
                        {...{
                            translation,
                            creationType,
                            fireLoading,
                            control,
                            setValue,
                            getValues,
                            reset,
                            clearErrors,
                            watch,
                            setError,
                            handleSubmit,
                            getPage,
                            filter,
                            setFilter,
                            dispatch,
                            data, setData,
                            callback, setCallback,
                            variants, setVariants,
                            title, setTitle
                        }}
                    />
                </div>
                {/*)}*/}
            </Tabs>
            {/*<Filter*/}
            {/*    callback={(data) => {*/}
            {/*        filterPage(data).then((res) => {*/}
            {/*            fireLoading(false)*/}
            {/*            setData(res.result)*/}
            {/*        })*/}
            {/*    }}*/}
            {/*    inputs={Fields.filterFields(translation)}*/}
            {/*    defaultValues={{*/}
            {/*        extra_fields: {*/}
            {/*            show: "",*/}
            {/*        },*/}
            {/*    }}*/}
            {/*    section="campaigns"*/}
            {/*/>*/}

            <Modal
                title={translation("choose collection type")}
                size="xs"
                id="manage-campaigns"
                actions={[]}
            >
                <div className={Styles.container}>
                    <div onClick={createModal.bind(this, 1)} className={Styles.row}>
                        <GridContainer className="align-items-center w-100">
                            <Grid size={2} className="text-center">
                                <i className="fad fa-box fa-3x ml-3"/>
                            </Grid>
                            <Grid size={8}>
                                <div>
                                    <h4>{translation("Manual")}</h4>
                                    <p>{translation("Manual Description")}</p>
                                </div>
                            </Grid>
                            <Grid size={1}/>
                            <Grid className="text-left" size={1}>
                                <i className="fad fa-caret-left mr-auto fa-2x"/>
                            </Grid>
                        </GridContainer>
                    </div>
                    <div className={Styles.row} onClick={createModal.bind(this, 2)}>
                        <GridContainer className="align-items-center w-100">
                            <Grid size={2} className="text-center">
                                <i className="fad fa-cog fa-3x ml-3"/>
                            </Grid>
                            <Grid size={8}>
                                <div>
                                    <h4>{translation("Dynamic")}</h4>
                                    <p>{translation("Dynamic description")}</p>
                                </div>
                            </Grid>
                            <Grid size={1}/>
                            <Grid className="text-left" size={1}>
                                <i className="fad fa-caret-left mr-auto fa-2x"/>
                            </Grid>
                        </GridContainer>
                    </div>
                    <div className={Styles.row} onClick={createModal.bind(this, 4)}>
                        <GridContainer className="align-items-center w-100">
                            <Grid size={2} className="text-center">
                                <i className="fad fa-bags-shopping fa-3x ml-3"/>
                            </Grid>
                            <Grid size={8}>
                                <div>
                                    <h4>{translation("Related Product Static")}</h4>
                                    <p>{translation("Related product static description")}</p>
                                </div>
                            </Grid>
                            <Grid size={1}/>
                            <Grid size={1} className="text-left">
                                <i className="fad fa-caret-left mr-auto fa-2x"/>
                            </Grid>
                        </GridContainer>
                    </div>
                    <div className={Styles.row} onClick={createModal.bind(this, 3)}>
                        <GridContainer className="align-items-center w-100">
                            <Grid size={2} className="text-center">
                                <i className="fad fa-album-collection fa-3x ml-3"/>
                            </Grid>
                            <Grid size={8}>
                                <div>
                                    <h4>{translation("Related Product")}</h4>
                                    <p>{translation("Related product dynamic description")}</p>
                                </div>
                            </Grid>
                            <Grid size={1}/>
                            <Grid size={1} className="text-left">
                                <i className="fad fa-caret-left mr-auto fa-2x"/>
                            </Grid>
                        </GridContainer>
                    </div>

                </div>
            </Modal>
            <Modal
                full_screen
                id="editForms"
                actions={modalActions}
                title={title}
                tag={
                    watch("type") && (
                        <Tag type="info">
                            {translation(campaignTypes[getValues("type")])}
                        </Tag>
                    )
                }
            >
                <InfoContext.Provider value={false}>
                    <Campaign
                        perm="campaigns"
                        setVariants={setVariants}
                        variants={variants}
                        control={control}
                        setValue={setValue}
                        getValues={getValues}
                        watch={watch}
                        reset={reset}
                        handleSubmit={handleSubmit}
                        setError={setError}
                    />
                </InfoContext.Provider>
            </Modal>

            {/*<Shield id="campaigns_create_action" action>*/}
            <AddBtn title={translation("Add Campaigns")} callback={creationType}/>
            {/*</Shield>*/}

            {/*<Pagination*/}
            {/*    getPage={getPages}*/}
            {/*    pages={data.paginate?.pages}*/}
            {/*    page={data.paginate?.page}*/}
            {/*/>*/}
            {/*<Popup*/}
            {/*    status="danger"*/}
            {/*    id="delete-action"*/}
            {/*    actions={deleteActions}*/}
            {/*    title={translation("Warning")}*/}
            {/*>*/}
            {/*    <p>{translation("delete-warning", "menuItems")}</p>*/}
            {/*</Popup>*/}
        </AdminLayout>
    )
}

export default Campaigns
