import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { TranslationContext, ToastContext } from "~/app/Context";
import { useApolloClient } from "~/app/Hooks/Api";
import Perm from "@admin/Shield";
import AddBtn from "@admin/CrudLayout/Add";
import TableCards from "@admin/Card";
import Pagination from "@admin/Pagination";
import Fields from "./fields";
import Filter from "@admin/Filter";
import queries from "./queries";
import ModalForms from "@admin/Forms";
import Popup from "@admin/Popup";
import { closePopup, openPopup } from "~/app/State/popups";
import { openModal } from "~/app/State/modal";
import AdminLayout from "@admin/Layout";
import Button from "@admin/Button";
import { filterFields } from "~/app/Helpers/MutationHandler";

export default function Accesses() {
  const translation = useContext(TranslationContext);
  const fireToast = useContext(ToastContext);
  const dispatch = useDispatch();

  const { handleSubmit, setError, clearErrors, reset, control } = useForm({
    defaultValues: Fields.defaultValues,
  });

  const { mutate, getPage, setErrors } = useApolloClient();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [state, setState] = useState([]);
  const [delId, setDelId] = useState(null);
  const [callback, setCallback] = useState(null);

  const createInstance = async (data, close) => {
    clearErrors();
    setLoading(true);
    const res = await mutate(
      { input: filterFields({ data, fields: queries.allowed }) },
      queries.create
    );
    setErrors(res.errors, setError);
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      close();
      await getNextPage(1);
    }
    setLoading(false);
  };

  const updateInstance = async (data, close) => {
    clearErrors();
    setLoading(true);
    const { id } = data;
    const res = await mutate(
      { input: filterFields({ data, fields: queries.allowed }), id },
      queries.update
    );

    setErrors(res.errors, setError);
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      close();
      await getNextPage(1);
    }
    setLoading(false);
  };

  const deleteRow = async () => {
    const res = await mutate({ id: delId }, queries.delete);
    dispatch(closePopup("delete-action"));
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      await getNextPage(1);
    }
  };

  const createModal = () => {
    reset(Fields.defaultValues);
    setState(translation("create", "access"));
    setCallback(() => createInstance);
    dispatch(openModal("editForms"));
  };

  const editModal = (item) => {
    reset(item);
    setState(translation("edit", "access"));
    setCallback(() => updateInstance);
    dispatch(openModal("editForms"));
  };

  const deleteOption = (item) => {
    setDelId(item.id);
    dispatch(openPopup("delete-action"));
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

  const filterPage = async (data) => {
    setLoading(true);
    setFilter(data);
    return await getPage({
      page: 1,
      limit: 15,
      fields: data,
      query: queries.all,
    });
  };

  useEffect(() => {
    let isMounted = true;
    filterPage({}).then((res) => {
      if (!isMounted) return;
      setData(res.result);
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getNextPage = async (page) => {
    setLoading(true);
    const res = await getPage({ page, fields: filter, query: queries.all });
    setData(res.result);
    setLoading(false);
  };

  return (
    <AdminLayout
      title={translation("Accesses")}
      action={
        <Button type="success" onClick={createModal}>
          <i className="fas fa-plus-circle ml-1" />
          {translation("Add Access")}
        </Button>
      }
    >
      <Filter
        inputs={Fields.filterFields}
        callback={(data) => {
          filterPage(data).then((res) => {
            setData(res.result);
            setLoading(false);
          });
        }}
        section="access"
        id="filters"
      />
      <div className="mt-3">
        <TableCards
          data={data.data || []}
          translation={translation}
          actions={Fields.tableActions(
            {
              edit: editModal,
              delete: deleteOption,
            },
            translation
          )}
          fields={[]}
        />
      </div>

      {!data.data?.length ? (
        <p className="text-center">{translation("no record found")}</p>
      ) : null}

      <div className="text-center">
        <ModalForms
          form={Fields.fields}
          size="sm"
          state={state}
          section="access"
          id="editForms"
          control={control}
          callback={handleSubmit(callback)}
          loading={loading}
        />
      </div>

      <Pagination
        pages={data.paginate?.pages}
        getPage={getNextPage}
        page={data.paginate?.page}
      />
      <Perm id="accesses_create_action" action>
        <AddBtn title={translation("Add Access")} callback={createModal} />
      </Perm>

      <Popup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </AdminLayout>
  );
}
