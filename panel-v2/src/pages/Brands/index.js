import { BrowserView, MobileView } from "react-device-detect";
import Desktop from "./desktop";
import Mobile from "./mobile";
import React, { useEffect, useState } from "react";
import { useHeaderComponentContext } from "../../contexts/HeaderComponentContext";
import { useSearchParams } from "react-router-dom";
import { GET_BRANDS } from "../../services/brandsService/queries";
import {
  init_boolean_format,
  init_date_format,
  init_int_format,
  init_string_format,
} from "../../helpers/init_formats";
import { DELETE_BRAND } from "../../services/brandsService/mutations";
import { useDialogContext } from "../../contexts/DialogContext";
import ConfirmationDialog from "../../components/confirmation-dialog";
import { default_rows_limit } from "../../constants/PaginationConfigs";
import SnackConfig from "../../constants/SnackConfigs";
import { useSnackbar } from "notistack";
import {
  check_has_object_values,
  remove_undefined_value_in_object,
} from "../../helpers/obj";
import routesName from "../../constants/routes";
import useGraphql from "../../hooks/graphql";
import {
  filterEqualQuery,
  filterLessThanOrEqualDateQuery,
  filterMoreThanOrEqualDateQuery,
  filterMultiLangQuery,
} from "../../helpers/filterQuery";
import sortQuery from "../../helpers/sortQuery";

const delete_dialog_name = "confirmation_delete_brand_dialog";

export default function BrandIndex() {
  const [search_params, set_search_params] = useSearchParams();
  const [loading, set_loading] = useState(undefined);
  const [data, set_data] = useState(undefined);
  const { init_dialog, dialog_open_handler } = useDialogContext();
  const [selected_item, set_selected_item] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const { queryGraphql, mutationGraphql } = useGraphql();

  // useEffect(() => {
  //   console.log(data, loading);
  // }, [data, loading]);

  const get_global_query_params = () => ({
    title: init_string_format(search_params.get("title")),
    description: init_string_format(search_params.get("description")),
    show_in_menu: init_boolean_format(search_params.get("show_in_menu")),
    createdAt: init_date_format(search_params.get("createdAt")),
    updatedAt: init_date_format(search_params.get("updatedAt")),
    page: init_int_format(search_params.get("page"), 1),
    limit: init_int_format(search_params.get("limit"), default_rows_limit),
    // per_page: init_int_format(search_params.get('per_page'), 2),
    sort_title: init_string_format(search_params.get("sort_title")),
    sort_createdAt: init_string_format(search_params.get("sort_createdAt")),
    sort_updatedAt: init_string_format(search_params.get("sort_updatedAt")),
  });

  const { set_title_page, set_breadcrumbs } = useHeaderComponentContext();

  const [filter_form, set_filter_form] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      title: _get_global_query_params["title"],
      description: _get_global_query_params["description"],
      show_in_menu: _get_global_query_params["show_in_menu"],
      createdAt: _get_global_query_params["createdAt"],
      updatedAt: _get_global_query_params["updatedAt"],
    };
  });

  useEffect(() => {
    console.log(filter_form);
  }, [filter_form]);
  const [data_option, set_data_option] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      page: _get_global_query_params["page"],
      limit: _get_global_query_params["limit"],
      sort_title: _get_global_query_params["sort_title"],
      sort_createdAt: _get_global_query_params["sort_createdAt"],
      sort_updatedAt: _get_global_query_params["sort_updatedAt"],
    };
  });

  const [active_filter, set_active_filter] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    const {
      title,
      description,
      show_in_menu,
      createdAt,
      updatedAt,
      sort_title,
      sort_createdAt,
      sort_updatedAt,
      limit,
    } = _get_global_query_params;

    return {
      desktop: check_has_object_values({
        title,
        createdAt,
        updatedAt,
        description,
        show_in_menu,
      }),
      mobile: check_has_object_values({
        title,
        description,
        show_in_menu,
        createdAt,
        updatedAt,
        sort_title,
        sort_createdAt,
        sort_updatedAt,
        limit,
      }),
    };
  });

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
    if (selected_item?.length === data?.data?.length) {
      set_selected_item([]);
    } else {
      const all_id = data?.data?.map((item) => item.id);
      set_selected_item([...all_id]);
    }
  };

  const check_selected_all_items = () => {
    return selected_item?.length === data?.data?.length;
  };

  const check_indeterminate = () => {
    return !(
      selected_item?.length === data?.data?.length ||
      selected_item?.length === 0
    );
  };

  const fetch_data = async () => {
    if (loading !== true) set_loading(true);
    const _get_global_query_params = get_global_query_params();

    const filter = remove_undefined_value_in_object({
      title: filterMultiLangQuery(_get_global_query_params.title),
      description: filterMultiLangQuery(_get_global_query_params.description),
      show_in_menu: filterEqualQuery(_get_global_query_params.show_in_menu),
      createdAt: filterMoreThanOrEqualDateQuery(
        _get_global_query_params.createdAt
      ),
      updatedAt: filterLessThanOrEqualDateQuery(
        _get_global_query_params.updatedAt
      ),
    });

    const sort = [
      sortQuery("title", _get_global_query_params?.sort_title),
      sortQuery("createdAt", _get_global_query_params?.sort_createdAt),
      sortQuery("updatedAt", _get_global_query_params?.sort_updatedAt),
    ];

    const pagination = {
      page: _get_global_query_params?.page,
      limit: _get_global_query_params?.limit,
    };

    const data = {
      filter,
      ...pagination,
      sort,
    };

    const result = await queryGraphql(GET_BRANDS, data);
    console.log(result?.data?.data);
    set_loading(false);

    if (selected_item?.length > 0) {
      set_selected_item([]);
    }
    if (result?.status) {
      set_data({ ...result?.data } || undefined);
    }
  };

  useEffect(() => {
    const _get_global_query_params = get_global_query_params();
    fetch_data(_get_global_query_params);

    const {
      title,
      description,
      show_in_menu,
      createdAt,
      updatedAt,
      sort_title,
      sort_createdAt,
      sort_updatedAt,
      limit,
    } = _get_global_query_params;

    set_active_filter({
      desktop: check_has_object_values({
        title,
        description,
        show_in_menu,
        createdAt,
        updatedAt,
      }),
      mobile: check_has_object_values({
        title,
        description,
        show_in_menu,
        createdAt,
        updatedAt,
        sort_title,
        sort_createdAt,
        sort_updatedAt,
        limit,
      }),
    });
  }, [search_params]);

  const write_form = (e) => {
    const { name, value } = e.target;
    // design filter inputs
    set_filter_form((prev) => {
      // console.log({...prev, [name]: value})
      return { ...prev, [name]: value };
    });
  };
  const write_option_data_mobile = (e) => {
    const { name, value } = e.target;
    // design filter inputs
    console.log({ name, value });
    write_option_data(name, value);
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
    console.log("data_option", data_option);
  };

  const clear_form = async () => {
    search_params.delete("title");
    search_params.delete("description");
    search_params.delete("show_in_menu");
    search_params.delete("createdAt");
    search_params.delete("updatedAt");
    set_search_params(search_params, { replace: false });

    set_filter_form({
      title: "",
      description: "",
      show_in_menu: false,
      createdAt: null,
      updatedAt: null,
    });
  };

  const apply_filter = async () => {
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

  useEffect(() => {
    set_title_page("brands.brands");
    set_breadcrumbs([]);
  }, []);

  const delete_row = (ids) => {
    dialog_open_handler(delete_dialog_name, true, { ids });
  };

  const onConfirmDeleteDialog = async ({ ids }) => {
    // console.log(data);
    if (loading !== true) set_loading(true);
    const _get_global_query_params = get_global_query_params();
    const result = await mutationGraphql(DELETE_BRAND, {
      id: ids[0],
    });
    set_loading(false);
    // console.log(result?.status)
    if (result?.status) {
      await fetch_data(_get_global_query_params);
      set_selected_item((prev) => {
        // filter uncommon prev values with data.ids
        const values = prev?.filter((item) => item !== ids[0]);
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

  const onCancelDeleteDialog = (id) => {
    dialog_open_handler(delete_dialog_name, false, { id });
  };

  useEffect(() => {
    init_dialog({
      name: delete_dialog_name,
      component: (
        <ConfirmationDialog
          title={"delete brand"}
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

  return (
    <>
      <MobileView>
        <Mobile
          {...{
            loading,
            // set_loading,
            data,
            set_data,
            data_option,
            set_data_option,
            fetch_data,
            write_form,
            write_option_data,
            filter_form,
            clear_form,
            apply_filter,
            delete_row,
            sort_handler,
            select_row,
            check_selected_item,
            selected_item,
            select_all_rows,
            check_selected_all_items,
            check_indeterminate,
            active_filter,
            write_option_data_mobile,
          }}
        />
      </MobileView>
      <BrowserView
        style={{
          height: "100%",
          overflowY: "hidden",
          borderRadius: "12px",
        }}
      >
        <Desktop
          {...{
            loading,
            // set_loading,
            data,
            set_data,
            data_option,
            set_data_option,
            fetch_data,
            write_form,
            write_option_data,
            filter_form,
            clear_form,
            apply_filter,
            delete_row,
            sort_handler,
            select_row,
            check_selected_item,
            selected_item,
            select_all_rows,
            check_selected_all_items,
            check_indeterminate,
            active_filter,
          }}
        />
      </BrowserView>
    </>
  );
}
