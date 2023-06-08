import Table from "@admin/Table"
import Fields from "./fields"
import Pagination from "@admin/Pagination"
import Popup from "@admin/Popup"
import {useEffect} from "react"
import {closePopup, openPopup} from "~/app/State/popups"
import dynamic from "next/dynamic"
import {useMutation} from "~/app/Hooks"
import queries from "./queries"
import {openModal} from "~/app/State/modal"
import moment from "jalali-moment";
import {filterFields} from "~/app/Helpers/MutationHandler";
import Button from "@admin/Button";

const FilterComponent = dynamic(() => import("./components"), {ssr: false})

export default function Tab({
                                type,
                                queryType,
                                creationType,
                                translation,
                                handleSubmit,
                                setError,
                                reset,
                                clearErrors,
                                getValues,
                                getPage,
                                filter,
                                setFilter,
                                dispatch,
                                data, setData,
                                callback, setCallback,
                                variants, setVariants,
                                title, setTitle,
                                fireLoading,

                            }) {


    const filterPage = async (data = null) => {
        fireLoading(true)
        if (!data) data = {}
        setFilter(data)
        return await getPage({
            fields: {...data, type},
            query: queries[queryType],
            exactFields: ["type"],
        })
    }

    const changePage = async (page) => {
        fireLoading(true)
        const res = await getPage({
            page,
            fields: {...filter, type},
            query: queries[queryType],
            exactFields: ["type"],
        })
        fireLoading(false)
        setData(res.result)
        return res
    }

    useEffect(() => {

        let isMounted = true

        filterPage({}).then((res) => {
            if (!isMounted) return
            setData(res.result)
            fireLoading(false)
        })

        return () => {
            isMounted = false
        }

    }, [])

    const {mutate} = useMutation({
        id: "editForms",
        clearErrors,
        setError,
        setLoading: fireLoading,
        setData,
    })

    const editInstance = async (data) => {

        console.log("____________________ ");
        console.log("--------list--------", data);
        console.log("==================== ");

        if (data.list) {
            data.list = (data.list || []).map((item) => {
                item.has_variant_key = (item?.mix_variant_keys?.length > 0)
                item.mix_variant_keys = (item.mix_variant_keys) ? item.mix_variant_keys.flat() : []
                return item
            })
        }

        data.extra_fields.title_panel = undefined

        data.extra_fields.expireAt = `${data.extra_fields.expireAt.unix()}000`
        data.extra_fields.startAt = `${data.extra_fields.startAt.unix()}000`

        if (data.condition?.limit) {
            data.condition.limit = parseInt(data.condition?.limit, 10)
        }

        await mutate({
            mutation: queryType === 'all' ? queries.update : queries.updateRelated,
            variables: {
                input: filterFields({fields: Fields.allowedFields, data}),
                id: data.id,
            },
            action: "edit",
        })

        reset({})
        setVariants([])
    }

    const _get_type = () => {
        if (queryType === 'all') return type;
        if (type === 1) return 4
        if (type === 2) return 3
    }

    const editModal = async (item) => {
        const _type = _get_type();

        console.log("_type", _type);

        if (item.list?.length) {
            setVariants(item.list.map((item) => ({...item.product})))
            item.list = item.list.map((item) => ({...item, product: undefined}))
        } else {
            setVariants([])
        }

        let extra_fields = {...item.extra_fields}

        if (_type < 3) {
            extra_fields['expireAt'] = item.extra_fields.expireAt ? moment(parseInt(item.extra_fields.expireAt, 10)) : '';
            extra_fields['startAt'] = item.extra_fields.startAt ? moment(parseInt(item.extra_fields.startAt, 10)) : '';
        }

        reset({
            ...item,
            extra_fields,
            type: _type,
        })

        setCallback(() => editInstance)
        setTitle(translation("edit", "campaigns"))
        dispatch(openModal("editForms"))
    }


    const deleteInstance = async (data) => {
        await mutate({
            mutation: queryType === 'all' ? queries.delete : queries.deleteRelated,
            variables: data,
            action: "delete",
        })
    }

    const deleteOption = (item) => {
        reset({id: item.id})
        dispatch(openPopup("delete-action"))
        setCallback(() => deleteInstance)
    }

    const deleteActions = [
        {
            background: "#fff",
            boxShadow: null,
            title: translation("Cancel"),
            onClick: () => dispatch(closePopup("delete-action")),
        },
        {
            background: "#e40031",
            color: "#fff",
            boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
            title: translation("Submit"),
            onClick: handleSubmit(callback),
        },
    ]

    return (
        <>
            {/*<FilterComponent*/}
            {/*    setData={setData}*/}
            {/*    filterPage={filterPage}*/}
            {/*    fireLoading={fireLoading}*/}
            {/*/>*/}
            <Table
                data={data.data}
                section="products"
                translation={translation}
                button={
                    // <Shield id="campaigns_create_action" action>
                    <Button onClick={creationType} type="success">
                        {translation("Add Campaign")}
                        <i className="fas fa-plus-circle mr-2"/>
                    </Button>
                    // </Shield>
                }
                actions={Fields.tableActions({
                    delete: deleteOption,
                    edit: editModal
                })}
                fields={Fields.tableFields(translation)}
            />
            <Pagination
                page={data?.paginate?.page}
                getPage={changePage}
                pages={data?.paginate?.pages}
            />
            <Popup
                status="danger"
                id="delete-action"
                actions={deleteActions}
                title={translation("Warning")}
            >
                <p>{translation("delete-warning", "menuItems")}</p>
            </Popup>
        </>
    )
}
