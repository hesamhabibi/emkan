import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {TranslationContext} from "~/app/Context";
import {array_pluck} from "~/app/Tree";
import AddBtn from "@admin/CrudLayout/Add";
import Popup from "@admin/Popup";
import Perm from "@admin/Shield";
import TreeComponent from "@admin/Tree";
import Fields from "./fields";
import queries from "./queries";
import ModalForms from "@admin/Forms";
import Tag from "@admin/Tag";
import {useMutation} from "~/app/Hooks";
import {filterFields} from "~/app/Helpers/MutationHandler";
import {useDispatch} from "react-redux";
import {openModal} from "~/app/State/modal";
import {closePopup, openPopup} from "~/app/State/popups";

export default function Tab({
                                data,
                                setAction,
                                tab,
                                components,
                                refresh,
                                setData,
                            }) {
    const translation = useContext(TranslationContext);

    const router = useRouter();
    const dispatch = useDispatch();

    const [state, setState] = useState(null);
    const [callback, setCallback] = useState(null);
    const [delId, setDelId] = useState(null);
    const [loading, setLoading] = useState(false);

    const {handleSubmit, setError, control, clearErrors, reset} = useForm({
        defaultValues: Fields.defaultValues,
    });

    const {mutate} = useMutation({
        setData,
        clearErrors,
        id: "editForms",
        setLoading,
        setError,
    });

    const createInstance = async (data) => {
        await mutate({
            mutation: queries.create,
            action: "create",
            variables: {
                input: {
                    ...filterFields({data, fields: Fields.allowed}),
                    access_id: tab.id,
                },
            },
        });
        await refresh(1);
    };

    useEffect(() => {
        setAction(() => createModal);
    }, []);

    const updateInstance = async (data, close) => {
        await mutate({
            mutation: queries.update,
            action: "",
            variables: {
                input: {
                    ...filterFields({data, fields: Fields.allowed}),
                    access_id: tab.id,
                },
                id: data.id,
            },
        });
        await refresh(1);
    };

    const createModal = (item) => {
        if (item) {
            reset({...Fields.defaultValues, sort: 9999999, parent_id: item.id});
        } else {
            reset(Fields.defaultValues);
        }
        setState(translation(`create`, "menuItems"));
        setCallback(() => createInstance);
        dispatch(openModal("editForms"));
    };

    const editModal = (item) => {
        reset(item);
        setState(translation(`edit`, "menuItems"));
        setCallback(() => updateInstance);
        dispatch(openModal("editForms"));
    };

    const deleteOption = (item) => {
        setDelId(item.id);
        dispatch(openPopup("delete-action"));
    };

    const submitSort = async (flatted) => {
        const flat_list = array_pluck(flatted, ["id", "parent_id", "sort"]);

        await mutate({
            mutation: queries.sort,
            variables: {input: flat_list},
            action: "",
        });
        await refresh(1);
    };

    const deleteRow = async () => {
        await mutate({
            variables: {
                id: delId,
            },
            mutation: queries.delete,
        });
        dispatch(closePopup("delete-action"));
        await refresh(1);
    };

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
            onClick: deleteRow,
        },
    ];

    return (
        <div className="pb-4">
            <TreeComponent
                // data={(data || []).map(item => ({...item, title:
               // {/*<>{item.title} {item.show_in_menu === 1 ? <i className="fas fa-grip-vertical fa-lg" />: <i className="fas fa-grip-vertical fa-lg" />} </>}))}*/}
                data={data || []}
                actions={Fields.tableActions(
                    router,
                    {
                        create: createModal,
                        delete: deleteOption,
                        edit: editModal,
                    },
                    translation
                )}
                title="title"
                sort={submitSort}
                translation={translation}
            />

            <div className="text-center">
                <ModalForms
                    form={Fields.fields(components, translation)}
                    tag={<Tag type="info">{tab.name}</Tag>}
                    control={control}
                    state={state}
                    id="editForms"
                    section="menuItems"
                    callback={handleSubmit(callback)}
                    loading={loading}
                />
            </div>
            <Perm id="menu_items_create_action" action>
                <AddBtn title={translation("Add Menu Item")} callback={createModal}/>
            </Perm>
            <Popup
                status="danger"
                id="delete-action"
                actions={deleteActions}
                title={translation("Warning")}
            >
                <p>{translation("delete-warning", "menuItems")}</p>
            </Popup>
        </div>
    );
}
