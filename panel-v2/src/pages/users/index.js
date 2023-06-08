import { BrowserView, MobileView } from "react-device-detect";
import Desktop from "./desktop";
import Mobile from "./mobile";
import React, { useEffect, useState } from "react";
import { default_rows_limit } from "../../constants/PaginationConfigs";
import { useHeaderComponentContext } from "../../contexts/HeaderComponentContext";
import { useSearchParams } from "react-router-dom";
import {
  init_date_format,
  init_int_format,
  init_string_format,
} from "../../helpers/init_formats";
import {
  check_has_object_values,
  remove_undefined_value_in_object,
} from "../../helpers/obj";
import routesName from "../../constants/routes";
import { useDialogContext } from "../../contexts/DialogContext";
import SnackConfig from "../../constants/SnackConfigs";
import { useSnackbar } from "notistack";
import ConfirmationDialog from "../../components/confirmation-dialog";
import { useTranslation } from "react-i18next";
import useGraphql from "../../hooks/graphql";
import {
  GET_USERS,
  GET_USERS_WITH_ACCESSES,
} from "../../services/userService/queries";
import { DELETE_USER } from "../../services/userService/mutations";
import {
  filterEqualQuery,
  filterLessThanOrEqualDateQuery,
  filterMoreThanOrEqualDateQuery,
  filterRegexQuery,
} from "../../helpers/filterQuery";
import sortQuery from "../../helpers/sortQuery";

const delete_dialog_name = "confirmation_delete_role_dialog";

export default function UserIndex() {
  // call contexts
  const { set_title_page, set_breadcrumbs } = useHeaderComponentContext();
  const { init_dialog, dialog_open_handler } = useDialogContext();
  // call hooks
  const { t } = useTranslation();
  const [search_params, set_search_params] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const { queryGraphql, mutationGraphql } = useGraphql();
  // init states
  const [accesses, set_accesses] = useState([]);
  const [loading, set_loading] = useState(undefined);
  const [user_data, set_user_data] = useState(undefined);
  const [selected_item, set_selected_item] = useState([]);

  const get_global_query_params = () => ({
    // filter inputs
    name: init_string_format(search_params.get("name")),
    last_name: init_string_format(search_params.get("last_name")),
    username: init_string_format(search_params.get("username")),
    email: init_string_format(search_params.get("email")),
    access_id: init_string_format(search_params.get("access_id")),
    mobile: init_string_format(search_params.get("mobile")),
    createdAt: init_date_format(search_params.get("createdAt")),
    updatedAt: init_date_format(search_params.get("updatedAt")),
    // pagination values
    page: init_int_format(search_params.get("page"), 1),
    limit: init_int_format(search_params.get("limit"), default_rows_limit),
    // sort values
    sort_name: init_string_format(search_params.get("sort_name")),
    sort_last_name: init_string_format(search_params.get("sort_last_name")),
    sort_username: init_string_format(search_params.get("sort_username")),
    sort_email: init_string_format(search_params.get("sort_email")),
    sort_mobile: init_string_format(search_params.get("sort_mobile")),
    sort_access_id: init_string_format(search_params.get("sort_access_id")),
    sort_createdAt: init_string_format(search_params.get("sort_createdAt")),
    sort_updatedAt: init_string_format(search_params.get("sort_updatedAt")),
    need_dependency: accesses?.length <= 0,
  });

  const [filter_form, set_filter_form] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      name: _get_global_query_params["name"],
      last_name: _get_global_query_params["last_name"],
      username: _get_global_query_params["username"],
      email: _get_global_query_params["email"],
      mobile: _get_global_query_params["mobile"],
      access_id: _get_global_query_params["access_id"],
      createdAt: _get_global_query_params["createdAt"],
      updatedAt: _get_global_query_params["updatedAt"],
    };
  });

  const [data_option, set_data_option] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      // pagination value
      page: _get_global_query_params["page"],
      limit: _get_global_query_params["limit"],
      // sort value
      sort_name: _get_global_query_params["sort_name"],
      sort_last_name: _get_global_query_params["sort_last_name"],
      sort_username: _get_global_query_params["sort_username"],
      sort_email: _get_global_query_params["sort_email"],
      sort_access_id: _get_global_query_params["sort_access_id"],
      sort_mobile: _get_global_query_params["sort_mobile"],
      sort_createdAt: _get_global_query_params["sort_createdAt"],
      sort_updatedAt: _get_global_query_params["sort_updatedAt"],
    };
  });

  const [active_filter, set_active_filter] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    const {
      name,
      last_name,
      username,
      email,
      access_id,
      mobile,
      createdAt,
      updatedAt,
      sort_name,
      sort_last_name,
      sort_username,
      sort_email,
      sort_access_id,
      sort_mobile,
      sort_createdAt,
      sort_updatedAt,
      limit,
    } = _get_global_query_params;

    return {
      desktop: check_has_object_values({
        name,
        last_name,
        username,
        email,
        access_id,
        mobile,
        createdAt,
        updatedAt,
      }),
      mobile: check_has_object_values({
        name,
        last_name,
        username,
        email,
        access_id,
        mobile,
        createdAt,
        updatedAt,
        sort_name,
        sort_last_name,
        sort_username,
        sort_email,
        sort_mobile,
        sort_access_id,
        sort_createdAt,
        sort_updatedAt,
        limit,
      }),
    };
  });

  const handle_user_access = (id) => {
    const access = accesses.find((item) => item?.value === id);
    return access ? access?.title : t("usersTable.no_access");
  };

  const write_form = (e) => {
    const { name, value } = e.target;
    // design filter inputs
    set_filter_form((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const write_option_data = (key, value) => {
    // design filter inputs
    set_data_option((prev) => {
      return { ...prev, [key]: value };
    });
    // design get query params
    if (value?.toString()?.length > 0) {
      search_params.set(key, value);
      set_search_params(search_params, { replace: false });
    } else {
      if (search_params.has(key)) {
        search_params.delete(key);
        set_search_params(search_params, { replace: false });
      }
    }
  };

  const write_option_data_mobile = (e) => {
    const { name, value } = e.target;
    // design filter inputs
    console.log({ name, value });
    write_option_data(name, value);
  };

  const sort_handler = (name) => {
    let value;
    const old_value = data_option[`sort_${name}`] || "";
    if (old_value === "") {
      value = "asc";
    } else if (old_value === "asc") {
      value = "desc";
    } else if (old_value === "desc") {
      value = "";
    }
    write_option_data(`sort_${name}`, value);
  };

  const select_row = (id) => {
    if (selected_item.includes(id)) {
      set_selected_item((prev) => {
        const index = prev.indexOf(id);
        if (index > -1) {
          prev?.splice(index, 1);
        }
        return [...prev];
      });
    } else {
      set_selected_item((prev) => {
        return [...prev, id];
      });
    }
  };

  const check_selected_item = (id) => {
    return selected_item.includes(id);
  };

  const select_all_rows = () => {
    if (selected_item?.length === user_data?.data?.length) {
      set_selected_item([]);
    } else {
      const all_id = user_data?.data?.map((item) => item.id);
      set_selected_item([...all_id]);
    }
  };

  const check_selected_all_items = () => {
    return selected_item?.length === user_data?.data?.length;
  };

  const check_indeterminate = () => {
    return !(
      selected_item?.length === user_data?.data?.length ||
      selected_item?.length === 0
    );
  };

  const clear_form = async () => {
    search_params.delete("name");
    search_params.delete("last_name");
    search_params.delete("username");
    search_params.delete("email");
    search_params.delete("access_id");
    search_params.delete("mobile");
    search_params.delete("createdAt");
    search_params.delete("updatedAt");
    set_search_params(search_params, { replace: false });

    set_filter_form({
      name: "",
      last_name: "",
      username: "",
      email: "",
      mobile: "",
      access_id: null,
      createdAt: null,
      updatedAt: null,
    });
  };

  // TODO: CONVERT STATE TO FORM STRUCTURE
  const apply_filter = (e) => {
    e.preventDefault(e);
    console.log(e.target.createdAt.value);
    const {
      name,
      last_name,
      username,
      email,
      mobile,
      access_id,
      createdAt,
      updatedAt,
    } = e.target;
    const filter = {
      name: name.value,
      last_name: last_name.value,
      username: username.value,
      email: email.value,
      mobile: mobile.value,
      access_id: access_id.value,
      createdAt: createdAt.value,
      updatedAt: updatedAt.value,
    };
    const filter_keys = Object.keys(filter);
    filter_keys.forEach((key) => {
      if (typeof filter[key] === "object" && filter[key]) {
        search_params.set(key, filter[key]);
      } else if (filter[key]?.length > 0 && filter[key] !== "null") {
        search_params.set(key, filter[key]);
      } else {
        search_params.delete(key);
      }
    });
    set_search_params(search_params, { replace: false });
  };

  const apply_filter_mobile = () => {
    const filter_form_keys = Object.keys(filter_form);
    filter_form_keys.forEach((key) => {
      if (typeof filter_form[key] === "object" && filter_form[key]) {
        search_params.set(key, filter_form[key]);
      } else if (filter_form[key]?.length > 0 && filter_form[key] !== "null") {
        search_params.set(key, filter_form[key]);
      } else {
        search_params.delete(key);
      }
    });
    set_search_params(search_params, { replace: false });
  };

  const delete_row = (ids) =>
    dialog_open_handler(delete_dialog_name, true, { ids });

  const onCancelDeleteDialog = (id) =>
    dialog_open_handler(delete_dialog_name, false, { id });

  const fetch_user_data = async () => {
    if (loading !== true) set_loading(true);
    const _get_global_query_params = get_global_query_params();

    const filter = remove_undefined_value_in_object({
      name: filterRegexQuery(_get_global_query_params?.name),
      last_name: filterRegexQuery(_get_global_query_params?.last_name),
      username: filterRegexQuery(_get_global_query_params?.username),
      email: filterRegexQuery(_get_global_query_params?.email),
      mobile: filterRegexQuery(_get_global_query_params?.mobile),
      access_id: filterEqualQuery(_get_global_query_params?.access_id),
      createdAt: filterMoreThanOrEqualDateQuery(
        _get_global_query_params?.createdAt
      ),
      updatedAt: filterLessThanOrEqualDateQuery(
        _get_global_query_params?.updatedAt
      ),
    });

    const sort = [
      sortQuery("name", _get_global_query_params?.sort_name),
      sortQuery("last_name", _get_global_query_params?.sort_last_name),
      sortQuery("username", _get_global_query_params?.sort_username),
      sortQuery("email", _get_global_query_params?.sort_email),
      sortQuery("mobile", _get_global_query_params?.sort_mobile),
      sortQuery("access_id", _get_global_query_params?.sort_access_id),
      sortQuery("createdAt", _get_global_query_params?.sort_createdAt),
      sortQuery("updatedAt", _get_global_query_params?.sort_updatedAt),
    ];

    const pagination = {
      page: _get_global_query_params?.page,
      limit: _get_global_query_params?.limit,
    };

    const data = {
      filter,
      sort,
      ...pagination,
    };

    if (accesses?.length > 0) {
      const result = await queryGraphql(GET_USERS, data);
      set_loading(false);
      if (result?.status) {
        set_user_data(result?.data || []);
      }
    } else {
      const result = await queryGraphql(GET_USERS_WITH_ACCESSES, data);
      set_loading(false);
      if (result?.status) {
        set_user_data(result?.data?.users || []);
        set_accesses(
          result?.data?.accesses?.map((access) => ({
            value: access?.id,
            title: access?.name,
          })) || []
        );
      }
    }
    if (selected_item?.length > 0) {
      set_selected_item([]);
    }
  };

  useEffect(() => {
    const _get_global_query_params = get_global_query_params();
    fetch_user_data(_get_global_query_params);
    const {
      name,
      last_name,
      username,
      email,
      access_id,
      mobile,
      createdAt,
      updatedAt,
      sort_name,
      sort_last_name,
      sort_username,
      sort_email,
      sort_mobile,
      sort_access_id,
      sort_createdAt,
      sort_updatedAt,
      limit,
    } = _get_global_query_params;

    set_active_filter({
      desktop: check_has_object_values({
        name,
        last_name,
        username,
        email,
        access_id,
        mobile,
        createdAt,
        updatedAt,
      }),
      mobile: check_has_object_values({
        name,
        last_name,
        username,
        email,
        access_id,
        mobile,
        createdAt,
        updatedAt,
        sort_name,
        sort_last_name,
        sort_username,
        sort_email,
        sort_mobile,
        sort_access_id,
        sort_createdAt,
        sort_updatedAt,
        limit,
      }),
    });
  }, [search_params]);

  const onConfirmDeleteDialog = async (data) => {
    console.log(data.ids);
    if (loading !== true) set_loading(true);
    const _get_global_query_params = get_global_query_params();
    const result = await mutationGraphql(
      DELETE_USER,
      { id: data?.ids[0] },
      {
        fetchPolicy: "network-only",
      }
    );
    set_loading(false);
    if (result?.status) {
      await fetch_user_data(_get_global_query_params);
      set_selected_item((prev) => {
        // filter uncommon prev values with data.ids
        const values = prev?.filter((item) => item !== data?.ids[0]);
        return [...values];
      });
    } else {
      enqueueSnackbar(result?.message, {
        ...SnackConfig,
        variant: "variantError",
      });
    }
    dialog_open_handler(delete_dialog_name, false);
  };

  useEffect(() => {
    init_dialog({
      name: delete_dialog_name,
      component: (
        <ConfirmationDialog
          title={"delete user"}
          description={"are you sure you want delete?"}
          onConfirm={onConfirmDeleteDialog}
          onCancel={onCancelDeleteDialog}
        />
      ),
      open: false,
      title: undefined,
      type: "confirmation_danger",
    });
  }, []);

  useEffect(() => {
    set_title_page("dashboardMenuItems.users_title");
    set_breadcrumbs([
      {
        title: "common.home",
        link: routesName["home"],
      },
      {
        title: "dashboardMenuItems.users_title",
        link: routesName["users"],
      },
    ]);
  }, []);

  return (
    <>
      <MobileView>
        <Mobile
          {...{
            loading,
            user_data,
            selected_item,
            data_option,
            filter_form,
            active_filter,
            accesses,
            handle_user_access,
            clear_form,
            write_form,
            apply_filter,
            write_option_data,
            delete_row,
            sort_handler,
            select_row,
            check_selected_item,
            select_all_rows,
            check_selected_all_items,
            check_indeterminate,
            write_option_data_mobile,
            get_global_query_params,
            apply_filter_mobile
          }}
        />
      </MobileView>
      <BrowserView>
        <Desktop
          {...{
            user_data,
            handle_user_access,
            loading,
            data_option,
            set_data_option,
            // filter_form,
            selected_item,
            active_filter,
            accesses,
            // write_form,
            write_option_data,
            clear_form,
            apply_filter,
            delete_row,
            sort_handler,
            select_row,
            check_selected_item,
            select_all_rows,
            check_selected_all_items,
            check_indeterminate,
            get_global_query_params
          }}
        />
      </BrowserView>
    </>
  );
}
