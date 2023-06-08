import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Desktop from "./desktop";
import Mobile from "./mobile";
import { useHeaderComponentContext } from "../../contexts/HeaderComponentContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  init_int_format,
  init_string_format,
} from "../../helpers/init_formats";
import routesName from "../../constants/routes";
import {
  create_user_service,
  edit_user_service,
  single_user_service,
} from "../../services/userService";
import { get_all_roles_service } from "../../services/roleService";
import useGraphql from "../../hooks/graphql";
import { CREATE_USER, UPDATE_USER } from "../../services/userService/mutations";
import {
  GET_USER,
  GET_USER_WITH_ACCESSES,
} from "../../services/userService/queries";
import { GET_ALL_ACCESSES } from "../../services/accessServices/queries";

export default function Index() {
  const { set_title_page, set_breadcrumbs } = useHeaderComponentContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { queryGraphql, mutationGraphql } = useGraphql();
  const [accesses, set_accesses] = useState();
  const [loading, set_loading] = useState(undefined);
  const [search_params, set_search_params] = useSearchParams();
  const get_global_query_params = () => ({
    name: init_string_format(search_params.get("name")),
    last_name: init_string_format(search_params.get("last_name")),
    username: init_string_format(search_params.get("username")),
    password: init_string_format(search_params.get("password")),
    email: init_string_format(search_params.get("email")),
    mobile: init_string_format(search_params.get("mobile")),
    access_id: init_string_format(search_params.get("access_id")),
  });

  const [form, set_form] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      name: _get_global_query_params["name"],
      last_name: _get_global_query_params["last_name"],
      username: _get_global_query_params["username"],
      password: _get_global_query_params["password"],
      email: _get_global_query_params["email"],
      mobile: _get_global_query_params["mobile"],
      access_id: _get_global_query_params["access_id"],
      is_active: true,
      // role_id: _get_global_query_params['role_id'],
      // errors: {}
    };
  });

  const write_form = (e) => {
    const { name, value } = e.target;
    set_form((prev) => ({ ...prev, [name]: value }));

    if (value?.toString()?.length > 0) {
      search_params.set(name, value);
      set_search_params(search_params, { replace: true });
    } else {
      if (search_params.has(name)) {
        search_params.delete(name);
        set_search_params(search_params, { replace: true });
      }
    }
  };

  const get_user = async () => {
    if (id) {
      if (loading !== true) set_loading(true);
      //   const result = await single_user_service({id});
      const result = await queryGraphql(
        GET_USER_WITH_ACCESSES,
        { id },
        {
          fetchPolicy: "network-only",
        }
      );
      set_loading(false);
      console.log("get_user", result);
      if (result?.data?.user?.access_id !== null) {
        set_accesses(
          result?.data?.accesses.map((item) => ({
            title: item?.name,
            value: item?.id,
          })) || []
        );
      }
      if (result.status) {
        set_form((prev) => ({
          ...prev,
          name: prev?.name || result?.data?.user?.name,
          last_name: prev?.last_name || result?.data?.user?.last_name,
          username: prev?.username || result?.data?.user?.username,
        //   password: prev?.password || result?.data?.user?.password,
          email: prev?.email || result?.data?.user?.email,
          mobile: prev?.mobile || result?.data?.user?.mobile,
          access_id: prev?.access_id || result?.data?.user?.access_id,
        }));
      }
    }
  };

  const get_all_accesses = async () => {
    const result = await queryGraphql(GET_ALL_ACCESSES, null, {
      fetchPolicy: "network-only",
    });
    // console.log(result.data)
    set_accesses(
      result?.data?.map((item) => ({
        title: item?.name,
        value: item?.id,
      })) || []
    );
  };
  useEffect(() => console.log(22, form?.access_id), [form?.access_id]);

  useEffect(() => {
    if (id) {
      get_user();
    } else {
      get_all_accesses();
    }
  }, [id]);

  const submit_user = async () => {
    let result;
    const data = {
      name: form?.name,
      last_name: form?.last_name,
      username: form?.username,
      password: form?.password,
      email: form?.email,
      mobile: form?.mobile,
      access_id: form?.access_id,
      is_active: true,
    };
    if (id) {
      //   result = await edit_user_service({id, ...data})
      result = await mutationGraphql(
        UPDATE_USER,
        {
          id,
          input: { ...data },
        },
        {
          fetchPolicy: "network-only",
        }
      );
    } else {
      // result = await create_user_service(data)
      result = await mutationGraphql(
        CREATE_USER,
        {
          input: { ...data },
        },
        {
          fetchPolicy: "network-only",
        }
      );
    }
    if (result?.status) {
      navigate(-1);
    } else {
      set_form((prev) => ({
        ...prev,
        errors: result?.errors,
      }));
    }
    // console.log(555, result?.errors);
  };

  useEffect(() => {
    set_title_page("usersTable.new_user");
    set_breadcrumbs([
      {
        title: "common.home",
        link: routesName["home"],
      },
      {
        title: "dashboardMenuItems.users_title",
        link: routesName["users"],
      },
      {
        title: !!id ? "usersTable.edit_user_btn" : "usersTable.new_user",
        link: !!id
          ? routesName["users-management-edit"]
          : routesName["users-management"],
      },
    ]);
  }, []);

  return (
    <>
      <MobileView>
        <Mobile
          {...{
            form,
            set_form,
            write_form,
            submit_user,
            edit_mode: !!id,
            loading,
            accesses,
          }}
        />
      </MobileView>
      <BrowserView
        style={{
          height: "100%",
        }}
      >
        <Desktop
          {...{
            form,
            set_form,
            write_form,
            submit_user,
            edit_mode: !!id,
            loading,
            accesses,
          }}
        />
      </BrowserView>
    </>
  );
}
