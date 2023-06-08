import * as React from "react";
import Filter from "./filter";
import NoContentComponent from "../../../components/no-content";
import TableData from "./table";
import { useState } from "react";

//main function
export default function Index({
  user_data,
  handle_user_access,
  loading,
  data_option,
  set_data_option,
  filter_form,
  selected_item,
  active_filter,
  write_form,
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
  accesses,
  get_global_query_params
}) {
  const [open_filter_collapse, set_open_filter_collapse] = useState(false);

  return (
    <>
      {loading && (
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
              accesses,
              get_global_query_params
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
      {!loading && user_data?.data?.length > 0 && (
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
              accesses,
              get_global_query_params
            }}
          />

          {/*user table*/}
          <TableData
            {...{
              user_data,
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
              handle_user_access,
              accesses,
            }}
          />
        </>
      )}
      {!loading && user_data?.data?.length === 0 && <NoContentComponent />}
    </>
  );
}

// export default function Users({
//                                   loading,
//                                   user_data,
//                                   data_option,
//                                   set_data_option,
//                                   handle_user_role,
//                                   filter_form,
//                                   set_filter_form,
//                                   write_form
//                               }) {
//     const [selected, setSelected] = useState([]);
//     const [open_filter_collapse, set_open_filter_collapse] = useState(false);
//
//     const {t} = useTranslation();
//
//
//     const handle_click_users_table = () => {
//         set_open_filter_collapse(!open_filter_collapse);
//     };
//
//     const handle_select_all_click = (event) => {
//         if (event.target.checked) {
//             const new_selected = user_data.map((n) => n.name);
//             setSelected(new_selected);
//             return;
//         }
//         setSelected([]);
//     };
//
//     const handle_request_sort = (event, property) => {
//         const isAsc = data_option.orderBy === property && data_option.order === 'asc';
//         set_data_option({
//             ...data_option,
//             order: (isAsc ? 'desc' : 'asc'),
//             order_by: (property),
//         })
//     };
//
//     const create_sort_handler = (property) => (event) => {
//         handle_request_sort(event, property);
//     };
//
//     const is_selected = (name) => selected.indexOf(name) !== -1;
//
//     const handle_click = (event, name) => {
//         const selected_index = selected.indexOf(name);
//         let new_selected = [];
//
//         if (selected_index === -1) {
//             new_selected = new_selected.concat(selected, name);
//         } else if (selected_index === 0) {
//             new_selected = new_selected.concat(selected.slice(1));
//         } else if (selected_index === selected.length - 1) {
//             new_selected = new_selected.concat(selected.slice(0, -1));
//         } else if (selected_index > 0) {
//             new_selected = new_selected.concat(
//                 selected.slice(0, selected_index),
//                 selected.slice(selected_index + 1),
//             );
//         }
//
//         setSelected(new_selected);
//     };
//
//     return (
//         <>
//             {/*filter collapse*/}
//             <Filter
//                 {...({
//                     handle_click_users_table,
//                     open_filter_collapse,
//                     filter_form,
//                     set_filter_form,
//                     write_form
//                 })}
//             />
//
//             {/*users table*/}
//             <Paper
//                 elevation={0}
//                 sx={{
//                     borderRadius: "12px",
//                     border: "1px solid #ededed"
//                 }}
//             >
//
//                 {/*user table toolbar*/}
//                 <Toolbar
//                     sx={{
//                         pl: {sm: 2},
//                         pr: {xs: 1, sm: 1},
//                         borderTopLeftRadius: '12px',
//                         borderTopRightRadius: '12px',
//                         ...(selected.length > 0 && {
//                             bgcolor: (theme) =>
//                                 alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//                         }),
//                     }}
//                 >
//                     {selected.length > 0 ? (
//                         <Typography
//                             sx={{flex: '1 1 100%'}}
//                             color="inherit"
//                             variant="subtitle1"
//                             component="div"
//                         >
//                             {selected.length} {t('common.selected')}
//                         </Typography>
//                     ) : (
//                         <Typography
//                             sx={{flex: '1 1 100%'}}
//                             variant="h6"
//                             id="tableTitle"
//                             component="div"
//                         >
//                             {t('rolesTable.title')}
//                         </Typography>
//                     )}
//
//                     {selected.length > 0 && (
//                         <Tooltip title="Delete">
//                             <IconButton>
//                                 <DeleteIcon/>
//                             </IconButton>
//                         </Tooltip>
//                     )}
//                 </Toolbar>
//
//                 <TableContainer sx={{maxHeight: 440}}>
//                     <Table
//                         stickyHeader
//                         aria-label="sticky table"
//                         // sx={{minWidth: 450}}
//                         aria-labelledby="tableTitle">
//
//                         {/*table head*/}
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell padding="checkbox">
//                                     <Checkbox
//                                         color="primary"
//                                         indeterminate={selected.length > 0 && selected.length < user_data.length}
//                                         checked={user_data.length > 0 && selected.length === user_data.length}
//                                         onChange={handle_select_all_click}
//                                         inputProps={{
//                                             'aria-label': 'select all desserts',
//                                         }}
//                                     />
//                                 </TableCell>
//
//                                 <TableCell
//                                     key={'profile'}
//                                     align={'left'}
//                                     padding={'true' ? 'none' : 'normal'}
//                                     sortDirection={data_option.order_by === 'profile' ? data_option.order : false}
//                                 >
//                                     <TableSortLabel
//                                         active={data_option.order_by === 'profile'}
//                                         direction={data_option.order_by === 'profile' ? data_option.order : 'asc'}
//                                         onClick={create_sort_handler('profile')}
//                                     >
//                                         {t('usersTable.table_header_col_1')}
//                                         {data_option.order_by === 'profile' ? (
//                                             <Box component="span" sx={visuallyHidden}>
//                                                 {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                             </Box>
//                                         ) : null}
//                                     </TableSortLabel>
//                                 </TableCell>
//                                 <TableCell
//                                     key='full_name'
//                                     align={'left'}
//                                     padding={'true' ? 'none' : 'normal'}
//                                     sortDirection={data_option.order_by === 'full_name' ? data_option.order : false}
//                                 >
//                                     <TableSortLabel
//                                         active={data_option.order_by === 'full_name'}
//                                         direction={data_option.order_by === 'full_name' ? data_option.order : 'asc'}
//                                         onClick={create_sort_handler('full_name')}
//                                     >
//                                         {t('common.full_name')}
//                                         {data_option.order_by === 'full_name' ? (
//                                             <Box component="span" sx={visuallyHidden}>
//                                                 {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                             </Box>
//                                         ) : null}
//                                     </TableSortLabel>
//                                 </TableCell>
//                                 <TableCell
//                                     key='username'
//                                     align={'left'}
//                                     padding={'true' ? 'none' : 'normal'}
//                                     sortDirection={data_option.order_by === 'username' ? data_option.order : false}
//                                 >
//                                     <TableSortLabel
//                                         active={data_option.order_by === 'username'}
//                                         direction={data_option.order_by === 'username' ? data_option.order : 'asc'}
//                                         onClick={create_sort_handler('username')}
//                                     >
//                                         {t('usersTable.table_header_col_4')}
//                                         {data_option.order_by === 'username' ? (
//                                             <Box component="span" sx={visuallyHidden}>
//                                                 {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                             </Box>
//                                         ) : null}
//                                     </TableSortLabel>
//                                 </TableCell>
//                                 <TableCell
//                                     key='email'
//                                     align={'left'}
//                                     padding={'true' ? 'none' : 'normal'}
//                                     sortDirection={data_option.order_by === 'email' ? data_option.order : false}
//                                 >
//                                     <TableSortLabel
//                                         active={data_option.order_by === 'email'}
//                                         direction={data_option.order_by === 'email' ? data_option.order : 'asc'}
//                                         onClick={create_sort_handler('email')}
//                                     >
//                                         {t('usersTable.table_header_col_5')}
//                                         {data_option.order_by === 'email' ? (
//                                             <Box component="span" sx={visuallyHidden}>
//                                                 {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                             </Box>
//                                         ) : null}
//                                     </TableSortLabel>
//                                 </TableCell>
//                                 <TableCell
//                                     key='role'
//                                     align={'left'}
//                                     padding={'true' ? 'none' : 'normal'}
//                                     sortDirection={data_option.order_by === 'role' ? data_option.order : false}
//                                 >
//                                     <TableSortLabel
//                                         active={data_option.order_by === 'role'}
//                                         direction={data_option.order_by === 'role' ? data_option.order : 'asc'}
//                                         onClick={create_sort_handler('role')}
//                                     >
//                                         {t('usersTable.table_header_col_6')}
//                                         {data_option.order_by === 'role' ? (
//                                             <Box component="span" sx={visuallyHidden}>
//                                                 {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                                             </Box>
//                                         ) : null}
//                                     </TableSortLabel>
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//
//                         {/*table body*/}
//                         <TableBody>
//                             {user_data?.map((item, index) => {
//                                 const isItemSelected = is_selected(item.name);
//                                 const labelId = `enhanced-table-checkbox-${index}`;
//
//                                 return (
//                                     <TableRow
//                                         hover
//                                         onClick={(event) => handle_click(event, item.name)}
//                                         role="checkbox"
//                                         aria-checked={isItemSelected}
//                                         tabIndex={-1}
//                                         key={item.name}
//                                         selected={isItemSelected}
//                                     >
//                                         <TableCell padding="checkbox">
//                                             {loading ? <Skeleton width="100&"/> : <Checkbox
//                                                 color="primary"
//                                                 checked={isItemSelected}
//                                                 inputProps={{'aria-labelledby': labelId,}}
//                                             />}
//                                         </TableCell>
//                                         <TableCell>
//                                             {loading ? <Skeleton width="100&"/> : item.id}
//                                         </TableCell>
//                                         <TableCell component="th" id={labelId}>
//                                             {loading ?
//                                                 <Skeleton width="100&"/> : item.first_name + " " + item.last_name}
//                                         </TableCell>
//                                         <TableCell>
//                                             {loading ? <Skeleton width="100&"/> : item.username}
//                                         </TableCell>
//                                         <TableCell>
//                                             {loading ? <Skeleton width="100&"/> : item.email}
//                                         </TableCell>
//                                         <TableCell>
//                                             {loading ? <Skeleton width="100&"/> : handle_user_role(item.role_id)}
//                                         </TableCell>
//                                     </TableRow>
//                                 )
//                                     ;
//                             })}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <TablePagination/>
//
//             </Paper>
//         </>
//     );
// }
