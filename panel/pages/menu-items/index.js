import { useContext, useEffect, useState } from "react";
import { LoadingContext, TranslationContext } from "~/app/Context";
import client from "~/app/apollo-client";
import queries from "./queries";
import Tabs from "@admin/Tab";
import Tab from "./tab";
import AdminLayout from "@admin/Layout";
import Button from "@admin/Button";

export default function MenuItems() {
  const translation = useContext(TranslationContext);
  const setLoading = useContext(LoadingContext);

  const [components, setComponents] = useState([]);
  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [callback, setCallback] = useState(() => {});

  const getData = async () => {
    setLoading(true);
    try {
      return await client.query({
        query: queries.mixin,
        variables: {
          menuFilter: {},
          roleFilter: {},
          accessFilter: { type: [{ operator: "Equal", value: 1 }] },
        },
      });
    } catch {}
  };

  useEffect(() => {
    let isMounted = true;
    getData().then((res) => {
      if (!isMounted) return;
      setTabs(res.data.role);
      setComponents(res.data.access);

      const menus = {};

      res.data.role.forEach((value) => {
        menus[value.id] = [];
      });
      res.data.menu.forEach((value) => {
        try {
          menus[value.access_id].push(value);
        } catch (e) {}
      });
      setLoading(false);
      setData(menus);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AdminLayout
      action={
        <Button type="success" onClick={callback}>
          {translation("Add Menu Item")}
        </Button>
      }
      title={translation("Menu Items")}
    >
      <Tabs>
        {tabs.map((tab, key) => (
          <div key={key} title={translation(tab.name)}>
            <Tab
              key={key}
              setAction={setCallback}
              tab={tab}
              data={data[tab.id]}
              setData={setData}
              refresh={() => {
                getData().then((res) => {
                  setTabs(res.data.role);
                  setComponents(res.data.access);

                  const menus = {};

                  res.data.role.forEach((value) => {
                    menus[value.id] = [];
                  });
                  res.data.menu.forEach((value) => {
                    try {
                      menus[value.access_id].push(value);
                    } catch (e) {}
                  });
                  setData(menus);
                  setLoading(false);
                });
              }}
              components={components}
            />
          </div>
        ))}
      </Tabs>
    </AdminLayout>
  );
}
