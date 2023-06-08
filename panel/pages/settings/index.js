import { useContext, useEffect, useState } from "react";
import {
  DeviceView,
  LoadingContext,
  ToastContext,
  TranslationContext,
} from "~/app/Context";
import { useForm } from "react-hook-form";
import { useApolloClient } from "~/app/Hooks/Api";
import queries from "./queries";
import Desktop from "./desktop";
import Mobile from "./mobile";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "~/app/State/modal";
import { closePopup, openPopup } from "~/app/State/popups";
import Popup from "@admin/Popup";

const filtered = (data, fields) =>
  Object.keys(data)
    .filter((key) => fields.includes(key))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

export default function Settings({}) {
  const isDesktop = useContext(DeviceView);
  const translation = useContext(TranslationContext);
  const fireLoading = useContext(LoadingContext);
  const { getPage, mutate, setErrors } = useApolloClient();
  const fireToast = useContext(ToastContext);

  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [callback, setCallback] = useState(() => {});

  const { control, handleSubmit, setError, reset } = useForm();

  const storeData = async (data) => {
    setLoading(true);
    const res = await mutate({ input: data }, queries.create);
    setErrors(res.errors, setError);
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      setData((prev) => [...prev, res.res.data.result]);
      dispatch(closeModal("AddSettings"));
    }
    setLoading(false);
  };

  const createData = () => {
    setModalTitle(translation("add", "settings"));
    setCallback(() => storeData);
    dispatch(openModal("AddSettings"));
  };

  const updateData = async (data) => {
    setLoading(true);
    const res = await mutate(
      {
        input: filtered(data, [
          "name",
          "key",
          "description",
          "value",
          "format",
        ]),
        id: data.id,
      },
      queries.create
    );
    setErrors(res.errors, setError);
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      setData((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        prev[index] = res.res.data.result;
        return [...prev];
      });
      dispatch(closeModal("AddSettings"));
    }
    setLoading(false);
  };

  const editData = (id) => {
    setCallback(() => updateData);
    setModalTitle(translation("edit", "settings"));
    reset(data.find((item) => item.id === id));
    dispatch(openModal("AddSettings"));
  };

  const deleteData = (id) => {
    reset({ id });
    setCallback(() => deleteRow);
    dispatch(openPopup("delete-action"));
  };

  const modalButtons = [
    {
      name: translation("Cancel"),
      disabled: false,
      onClick: (close) => close("AddSettings"),
    },
    {
      name: translation("Submit"),
      disabled: loading,
      onClick: handleSubmit(callback),
    },
  ];

  const formats = [
    {
      id: 3,
      name: translation("text", "settings"),
    },
    {
      id: 4,
      name: translation("big text", "settings"),
    },
  ];

  useEffect(() => {
    let isMounted = true;
    fireLoading(true);

    getData().then((res) => {
      if (!isMounted) return;
      setData(res.result);
      fireLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const getData = async () => {
    fireLoading(true);
    return getPage({
      query: queries.all,
      fields: [],
    });
  };

  const deleteRow = async (data) => {
    fireLoading(true);
    const res = await mutate({ id: data.id }, queries.delete);
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      dispatch(closePopup("delete-action"));
      setData((prev) => {
        const index = prev.findIndex((item) => item.id === data.id);
        prev.splice(index, 1);
        return [...prev];
      });
    }
    fireLoading(false);
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
      onClick: handleSubmit(callback),
    },
  ];

  return (
    <>
      <Popup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
      {isDesktop ? (
        <Desktop
          modalTitle={modalTitle}
          modalButtons={modalButtons}
          control={control}
          create={createData}
          edit={editData}
          del={deleteData}
          data={data}
          formats={formats}
        />
      ) : (
        <Mobile
          modalTitle={modalTitle}
          modalButtons={modalButtons}
          control={control}
          create={createData}
          edit={editData}
          del={deleteData}
          data={data}
          formats={formats}
        />
      )}
    </>
  );
}

// export const getServerSideProps = async ({ req, res }) => {
//   console.log("browser headers : s", req.headers.cookie);
//
//   const server = ServerQuery(req.headers.  cookie);
//
//   let data = [];
//   try {
//     const res = await server.query({
//       query: queries.all,
//     });
//     console.log(res);
//     data = res?.data.result || [];
//   } catch (e) {
//     console.log(e);
//   }
//
//   return {
//     props: {
//       data,
//     },
//   };
// };
