import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "~/app/Hooks";
import { useApolloClient } from "~/app/Hooks/Api";
import { LoadingContext, TranslationContext } from "~/app/Context";
import { Grid, GridContainer } from "@admin/Grid";
import Button from "@admin/Button";
import queries from "./queries";
import Fields from "./fields";
import Styles from "./attributes.module.scss";
import ModalForms from "@admin/Forms";
import { useDispatch } from "react-redux";
import { openModal } from "~/app/State/modal";
import { filterFields } from "~/app/Helpers/MutationHandler";
import Table from "./components/table";
// import Taable from "@admin/Table";
import { closePopup, openPopup } from "~/app/State/popups";
import Popup from "@admin/Popup";
// import Tag from "@admin/Tag";

const title_deeps = ["attribute group", "attribute", "variant"];
const form_deeps = [
  Fields.attributes,
  Fields.attrGroupFields,
  Fields.variantFields,
];

export default function Attributes({ callback: setParentData }) {
  const translation = useContext(TranslationContext);
  const fireLoading = useContext(LoadingContext);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formInputs, setFormInputs] = useState([]);
  const [title, setTitle] = useState("");
  const [defaultValues, setDefault] = useState({});
  const [callback, setCallback] = useState("");
  const [data, setData] = useState([]);
  const [deeps, setDeeps] = useState({});

  const { control, setError, handleSubmit, reset, clearErrors } = useForm();

  const { mutate } = useMutation({
    setError,
    clearErrors,
    setLoading,
    id: "editForms",
    setData,
  });

  const { getPage } = useApolloClient();

  const getPages = async (page = 1) => {
    fireLoading(true);

    return await getPage({
      page,
      fields: {},
      query: queries.all,
      exactFields: ["deep"],
    });
  };

  useEffect(() => {
    let isMounted = true;
    getPages().then((res) => {
      if (!isMounted) return;
      setData(res.result);
      fireLoading(false);
    });

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    if (data.data?.length) setParentData(data.data);
  }, [data]);

  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: { input: filterFields({ data, fields: Fields.allowed }) },
    });
  };
  const editInstance = async (data) => {
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),
        id: data.id,
      },
    });
  };

  const editModal = (deep = 1, item) => {
    setFormInputs(form_deeps[deep - 1](translation));
    reset(item);
    setTitle(translation(`edit ${title_deeps[deep - 1]}`, "attribute"));
    setCallback(() => editInstance);
    dispatch(openModal("editForms"));
  };

  const deleteOption = (item) => {
    reset({ id: item.id });
    dispatch(openPopup("delete-action"));
  };

  const addModal = (deep = 1, parent_id) => {
    setFormInputs(form_deeps[deep - 1](translation));
    reset({ active: true, deep, parent_id });
    setTitle(translation(`add ${title_deeps[deep - 1]}`, "attribute"));
    setCallback(() => createInstance);
    dispatch(openModal("editForms"));
  };

  const showAttributes = (index, item) => {
    setDeeps((prev) => {
      prev[index] = item.id;
      const deleteNext = (index) => {
        if (prev[index + 1]) {
          delete prev[index + 1];
          deleteNext(index + 1);
        }
      };
      deleteNext(index);
      return { ...prev };
    });
  };

  const deleteRow = async (data) => {
    await mutate({
      mutation: queries.delete,
      action: "delete",
      variables: { id: data.id },
    });
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
      onClick: handleSubmit(deleteRow),
    },
  ];

  const submitDefault = async (item) => {
    await mutate({
      mutation: queries.updateDefault,
      action: "",
      variables: { id: deeps[2], default_attribute_value_id: item.id },
    });
    const res = await getPages();
    setData(res.result);
    fireLoading(false);
  };

  useEffect(() => {
    if (!deeps[2]) return;
    changeAttr(data.find((item) => item.id === deeps[2]));
  }, [data]);

  const changeAttr = (item) => {
    setDefault({
      data: item.attribute_values,
      type: item.type,
      default_value: item.default_attribute_value_id,
    });
    setDeeps((prev) => {
      prev[2] = item.id;
      return { ...prev };
    });
  };

  return (
    <>
      <GridContainer gap="Lg">
        <Grid className={Styles.card} size={4}>
          <div className={Styles.header}>
            <h5>{translation("Variant Attributes", "attribute")}</h5>
            <span>
              <Button type="success" onClick={() => addModal(1)}>
                <i className="fas fa-plus-circle" />
                {translation("add")}
              </Button>
            </span>
          </div>
          <Table
            callback={submitDefault}
            showAttributes={showAttributes.bind(this, 0)}
            addModal={addModal}
            editModal={editModal.bind(this, 1)}
            setData={(fn) =>
              setData(
                typeof fn === "function"
                  ? (prev) => fn(prev.filter((item) => item.parent_id === null))
                  : (prev) => [
                      ...prev.filter((item) => item.parent_id !== null),
                      ...fn,
                    ]
              )
            }
            data={data.filter((item) => item.deep === 1)}
            deleteOption={deleteOption}
          />
        </Grid>
        <Grid size={4} className={Styles.card}>
          <div className={Styles.header}>
            <h5>{translation("Attribute Groups", "attribute")}</h5>
            <span>
              <Button
                type="success"
                disabled={!deeps[0]}
                onClick={() => addModal(2, deeps[0])}
              >
                <i className="fas fa-plus-circle" />
                {translation("add")}
              </Button>
            </span>
          </div>
          {Boolean(deeps[0]) && (
            <Table
              callback={submitDefault}
              showAttributes={showAttributes.bind(this, 1)}
              addModal={addModal}
              deleteOption={deleteOption}
              editModal={editModal.bind(this, 2)}
              data={data.filter((item) => item.parent_id === deeps[0])}
              setData={(fn) =>
                setData(
                  typeof fn === "function"
                    ? (prev) =>
                        fn(prev.filter((item) => item.parent_id === deeps[0]))
                    : (prev) => [
                        ...prev.filter((item) => item.parent_id !== deeps[0]),
                        ...fn,
                      ]
                )
              }
            />
          )}
        </Grid>
        <Grid size={4} className={Styles.card}>
          <div className={Styles.header}>
            <h5>{translation("Attribute", "attribute")}</h5>
            <span>
              <Button
                type="success"
                disabled={!deeps[1]}
                onClick={() => addModal(3, deeps[1])}
              >
                <i className="fas fa-plus-circle" />
                {translation("add")}
              </Button>
            </span>
          </div>
          {Boolean(deeps[1]) && (
            <Table
              callback={submitDefault}
              addModal={addModal}
              deleteOption={deleteOption}
              editModal={editModal.bind(this, 3)}
              data={data.filter((item) => item.parent_id === deeps[1])}
              setData={(fn) =>
                setData(
                  typeof fn === "function"
                    ? (prev) =>
                        fn(prev.filter((item) => item.parent_id === deeps[1]))
                    : (prev) => [
                        ...prev.filter((item) => item.parent_id !== deeps[1]),
                        ...fn,
                      ]
                )
              }
              showAttributes={changeAttr}
            />
          )}
        </Grid>
      </GridContainer>
      <ModalForms
        callback={handleSubmit(callback)}
        id="editForms"
        loading={loading}
        form={formInputs}
        size="sm"
        control={control}
        state={title}
      />
      <Popup
        id="delete-action"
        actions={deleteActions}
        status="danger"
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </>
  );
}
