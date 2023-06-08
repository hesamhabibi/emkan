import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  TranslationContext,
  DeviceView,
  ToastContext,
  LoadingContext,
} from "~/app/Context";
import { useApolloClient } from "~/app/Hooks/Api";
import client from "~/app/apollo-client";
import queries from "./queries";
import { array_pluck } from "~/app/Tree";
import Button from "@admin/Button";
import TreeComponent from "@admin/Tree";
import Back from "@admin/CrudLayout/Back";
import AdminLayout from "@admin/Layout";
import AddBtn from "@admin/CrudLayout/Add";

export default function AclTree() {
  const translation = useContext(TranslationContext);
  const isDesktop = useContext(DeviceView);
  const fireToast = useContext(ToastContext);
  const setLoading = useContext(LoadingContext);

  const router = useRouter();

  const { mutate } = useApolloClient();

  const [data, setData] = useState([]);
  const [submit, setSubmit] = useState(false);

  const { id, access_id } = router.query;

  if (!access_id || !id) router.push("/menu-items");

  const getComponents = async () => {
    setLoading(true);

    return await client.query({
      query: queries.all,
      variables: { filter: null, parent_id: id, access_id },
    });
  };

  const submitAccess = () => setSubmit(true);

  useEffect(() => {
    let isMounted = true;
    getComponents().then((res) => {
      if (!isMounted) return;
      setData(res.data.result);
      setLoading(false);
      setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const submitTree = async (data) => {
    const bulk_data = array_pluck(
      data.map((arr) => {
        if (arr.has_access === -1) return { ...arr, has_access: true };

        return arr;
      }),
      ["id", "has_access"]
    );

    setLoading(true);

    const res = await mutate(
      { access_id, accessComponents: bulk_data },
      queries.submit
    );
    if (res.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      });
      const res = await getComponents();
      setData(res.data.result);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submit) {
      setSubmit(false);
      submitTree(data);
    }
  }, [submit]);

  return (
    <AdminLayout
      title={translation("Access Management")}
      action={
        <Button type="success" onClick={submitAccess}>
          <i className="fas fa-check-circle ml-2" />
          {translation("Submit Access")}
        </Button>
      }
    >
      <Back title={translation("back")} url="/menu-items" />
      <TreeComponent
        data={data}
        setData={setData}
        no_popup
        actions={[]}
        checkbox
        checked_field="has_access"
        not_draggable
        title="name"
        translation={translation}
      />
      <AddBtn
        title={translation("Submit Access")}
        callback={submitAccess}
        icon="fas fa-check-circle mr-2"
      />
    </AdminLayout>
  );
}
