import * as React from "react";
import Filter from "./filter";
import NoContentComponent from "../../../components/no-content";
import TableData from "./table";
import { useState } from "react";

//main function
export default function Index({
  loading,
  data,
  data_option,
  set_data_option,
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
}) {
  const [open_filter_collapse, set_open_filter_collapse] = useState(false);

  return (
    <>
      {loading && (
        <>
          {/* filter collapse */}
          <Filter
            {...{
              filter_form,
              clear_form,
              write_form,
              apply_filter,
              open_filter_collapse,
              set_open_filter_collapse,
              active_filter,
            }}
          />
          <TableData
            {...{
              data: [{}, {}, {}],
              data_option,
              loading,
              write_option_data,
              set_data_option,
              delete_row,
              sort_handler,
              select_row,
              check_selected_item,
              selected_item,
              check_selected_all_items,
              check_indeterminate,
              open_filter_collapse,
            }}
          />
        </>
      )}
      {!loading && data?.data?.length > 0 && (
        <>
          {/*filter collapse*/}
          <Filter
            {...{
              filter_form,
              clear_form,
              write_form,
              apply_filter,
              open_filter_collapse,
              set_open_filter_collapse,
              active_filter,
            }}
          />

          {/*role table*/}
          <TableData
            {...{
              data,
              data_option,
              loading,
              write_option_data,
              set_data_option,
              delete_row,
              sort_handler,
              select_row,
              check_selected_item,
              selected_item,
              select_all_rows,
              check_selected_all_items,
              check_indeterminate,
              open_filter_collapse,
            }}
          />
        </>
      )}
      {!loading && data?.data?.length === 0 && <NoContentComponent />}
    </>
  );
}
