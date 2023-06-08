import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFooterComponentContext } from "../../../contexts/FooterComponentContext";
import { useDialogContext } from "../../../contexts/DialogContext";
import Filter from "./filter";
import Footer from "./footer";
import LoadingTable from "./loading-table";
import TableData from "./table";
import Index from "../../../components/no-content";

export default function Mobile({
  loading,
  user_data,
  handle_user_access,
  data_option,
  filter_form,
  clear_form,
  write_form,
  apply_filter,
  write_option_data,
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
  apply_filter_mobile,
//   roles,
accesses
}) {
  const { t } = useTranslation();
  const { set_footer_component } = useFooterComponentContext();
  const { init_dialog } = useDialogContext();

  useEffect(() => {
    init_dialog({
      name: "filterRole",
      component: (
        <Filter
          {...{
            write_form,
            filter_form,
            clear_form,
            apply_filter,
            data_option,
            sort_handler,
            write_option_data,
            write_option_data_mobile,
            // roles,
            accesses,
            apply_filter_mobile
          }}
        />
      ),
      open: false,
      title: t("common.filter"),
    });
  }, [filter_form, data_option, accesses]);

  useEffect(() => {
    set_footer_component(
      <Footer
        {...{
          active_filter,
        }}
      />
    );
  }, [active_filter]);

  return (
    <>
      {loading && (
        <LoadingTable
          {...{
            user_data,
            data_option,
            write_option_data,
            loading,
            select_row,
            sort_handler,
            check_selected_item,
            selected_item,
            select_all_rows,
            check_selected_all_items,
            check_indeterminate,
          }}
        />
      )}

      {!loading && user_data?.data?.length > 0 && (
        <TableData
          {...{
            loading,
            user_data,
            data_option,
            write_option_data,
            delete_row,
            sort_handler,
            select_row,
            check_selected_item,
            selected_item,
            select_all_rows,
            check_selected_all_items,
            check_indeterminate,
            handle_user_access,
          }}
        />
      )}
      {!loading && user_data?.data?.length === 0 && <Index />}
    </>
  );
}
