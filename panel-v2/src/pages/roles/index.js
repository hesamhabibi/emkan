import {BrowserView, MobileView} from "react-device-detect";
import Desktop from './desktop';
import Mobile from './mobile';
import React, {useEffect, useState} from "react";
import {delete_roles_service, roles_service} from "../../services/roleService";
import {useHeaderComponentContext} from "../../contexts/HeaderComponentContext";
import {useSearchParams} from "react-router-dom";
import {init_date_format, init_int_format, init_string_format} from "../../helpers/init_formats";
import {useDialogContext} from "../../contexts/DialogContext";
import ConfirmationDialog from "../../components/confirmation-dialog"
// import {default_rows_per_page} from "../../constants/PaginationConfigs";
import SnackConfig from "../../constants/SnackConfigs";
import {useSnackbar} from "notistack";
import {check_has_object_values} from "../../helpers/obj";

const delete_dialog_name = 'confirmation_delete_role_dialog';

export default function RoleIndex() {

  const [search_params, set_search_params] = useSearchParams();
  const [loading, set_loading] = useState(undefined);
  const [data, set_data] = useState(undefined);
  const {init_dialog, dialog_open_handler} = useDialogContext();
  const [selected_item, set_selected_item] = useState([])
  const {enqueueSnackbar} = useSnackbar();

  const get_global_query_params = () => ({
    name: init_string_format(search_params.get('name')),
    created_at: init_date_format(search_params.get('created_at')),
    updated_at: init_date_format(search_params.get('updated_at')),
    page_number: init_int_format(search_params.get('page_number'), 1),
    // per_page: init_int_format(search_params.get('per_page'), default_rows_per_page),
    // per_page: init_int_format(search_params.get('per_page'), 3),
    sort_name: init_string_format(search_params.get('sort_name')),
    sort_created_at: init_string_format(search_params.get('per_page')),
    sort_updated_at: init_string_format(search_params.get('per_page')),
  })

  const {set_title_page, set_breadcrumbs} = useHeaderComponentContext();

  const [filter_form, set_filter_form] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      name: _get_global_query_params['name'],
      created_at: _get_global_query_params['created_at'],
      updated_at: _get_global_query_params['updated_at'],
    }
  });

  const [data_option, set_data_option] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      page_number: _get_global_query_params['page_number'],
      per_page: _get_global_query_params['per_page'],
      sort_name: _get_global_query_params['sort_name'],
      sort_created_at: _get_global_query_params['sort_created_at'],
      sort_updated_at: _get_global_query_params['sort_updated_at'],
    }
  });

  const [active_filter, set_active_filter] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    const {
      name,
      created_at,
      updated_at,
      sort_name,
      sort_created_at,
      sort_updated_at,
      per_page
    } = _get_global_query_params;

    return {
      desktop: check_has_object_values({name, created_at, updated_at,}),
      mobile: check_has_object_values({
        name,
        created_at,
        updated_at,
        sort_name,
        sort_created_at,
        sort_updated_at,
        per_page
      }),
    }

  })

  const sort_handler = (name) => {
    const isAsc = data_option[`sort_${name}`] === 'asc';
    const value = isAsc ? 'desc' : 'asc';
    write_option_data(`sort_${name}`, value)
  };

  const select_row = (id) => {
    if (selected_item.includes(id)) {
      set_selected_item(prev => {
        const index = prev.indexOf(id)
        if (index > -1) {
          prev?.splice(index, 1)
        }
        return [...prev]
      })
    } else {
      set_selected_item(prev => {
        return [...prev, id]
      })
    }
  }

  const check_selected_item = (id) => {
    return selected_item.includes(id)
  }

  const select_all_rows = () => {
    if (selected_item?.length === data?.data?.length) {
      set_selected_item([])
    } else {
      const all_id = data?.data?.map((item) => item.id)
      set_selected_item([...all_id])
    }
  }

  const check_selected_all_items = () => {
    return selected_item?.length === data?.data?.length
  }

  const check_indeterminate = () => {
    return !(selected_item?.length === data?.data?.length || selected_item?.length === 0)
  }

  const fetch_data = async (data = data_option) => {
    if (loading !== true) set_loading(true);
    const result = await roles_service(data);
    set_loading(false)
    if (selected_item?.length > 0) {
      set_selected_item([])
    }
    // console.log('result', result);
    if (result?.status) {
      set_data(result?.data?.roles || undefined)
    } else {
      // TODO: ERROR HANDLER
    }
  }

  useEffect(() => {
    const _get_global_query_params = get_global_query_params();
    fetch_data(_get_global_query_params)
    const {
      name,
      created_at,
      updated_at,
      sort_name,
      sort_created_at,
      sort_updated_at,
      per_page
    } = _get_global_query_params;

    set_active_filter({
      desktop: check_has_object_values({name, created_at, updated_at}),
      mobile: check_has_object_values({
        name,
        created_at,
        updated_at,
        sort_name,
        sort_created_at,
        sort_updated_at,
        per_page
      })
    })


  }, [search_params])

  const write_form = (e) => {
    const {name, value} = e.target
    // design filter inputs
    set_filter_form(prev => {
      // console.log({...prev, [name]: value})
      return {...prev, [name]: value}
    })
  }

  const write_option_data = (key, value) => {
    // design filter inputs
    set_data_option(prev => {
      return {...prev, [key]: value}
    })
    // design get query params
    if (value?.toString()?.length > 0) {
      search_params.set(key, value);
      set_search_params(search_params, {replace: false});
    } else {
      if (search_params.has(key)) {
        search_params.delete(key);
        set_search_params(search_params, {replace: false});
      }
    }
  }

  const clear_form = async () => {
    search_params.delete('name');
    search_params.delete('created_at');
    search_params.delete('updated_at');
    set_search_params(search_params, {replace: false})

    set_filter_form({
      name: '',
      created_at: null,
      updated_at: null,
    })
  }

  const apply_filter = async () => {
    const filter_form_keys = Object.keys(filter_form);
    filter_form_keys.forEach(key => {
      if (filter_form[key]?.length > 0 && filter_form[key] !== 'null') {
        search_params.set(key, filter_form[key]);
      }
    })
    set_search_params(search_params, {replace: false});
  }

  useEffect(() => {
    set_title_page('dashboardMenuItems.role_title')
    set_breadcrumbs([
      {
        title: 'common.home',
        link: '/'
      },
      {
        title: 'dashboardMenuItems.role_title',
        link: '/roles'
      }
    ])

  }, [])

  const delete_row = (ids) => {
    dialog_open_handler(delete_dialog_name, true, {ids})
  }

  const onConfirmDeleteDialog = async (data) => {
    if (loading !== true) set_loading(true);
    const _get_global_query_params = get_global_query_params();
    const result = await delete_roles_service({
      ..._get_global_query_params,
      ...data
    });
    set_loading(false)
    if (result?.status) {
      set_data(result?.data?.roles || undefined)
      set_selected_item(prev => {
        // filter uncommon prev values with data.ids
        const values = prev?.filter(item => !data?.ids?.includes(item))
        return [...values];
      })
    } else {
      enqueueSnackbar(result?.errors?.id[0],
        {
          ...SnackConfig,
          variant: 'variantError',
        })
    }
    dialog_open_handler(delete_dialog_name, false)
  }

  const onCancelDeleteDialog = (id) => {
    dialog_open_handler(delete_dialog_name, false, {id})
  }

  useEffect(() => {
    init_dialog({
      name: delete_dialog_name,
      component: <ConfirmationDialog
        title={'delete role'}
        description={'are you sure you want delete?'}
        onConfirm={onConfirmDeleteDialog}
        onCancel={onCancelDeleteDialog}
      />,
      open: false,
      title: undefined,
      type: 'confirmation_danger'
    })
  }, []);

  return (
    <>
      <MobileView>
        <Mobile
          {...({
            loading,
            set_loading,
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
            active_filter
          })}
        />
      </MobileView>
      <BrowserView
        style={{
          height: '100%',
          // position:'relative',
          overflowY: 'hidden'
        }}>
        <Desktop
          {...({
            loading,
            set_loading,
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
            active_filter
          })}
        />
      </BrowserView>
    </>
  )
}