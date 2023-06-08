import React, {useEffect, useRef, useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import {Button, ButtonBase, Skeleton} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import TablePagination from "../../../components/layout/desktop/table-pagination";
import {useTranslation} from "react-i18next";
import {useTimeZoneContext} from "../../../contexts/TimeZoneContext";
import {styled} from '@mui/material/styles';
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Link from "@mui/material/Link";
import routesName from "../../../constants/routes";
import AddIcon from "@mui/icons-material/Add";

const StyledToolbar = styled(Toolbar)(
  ({theme}) => ({
    '&': {
      background: theme.palette.background.paper,
      borderRadius: "12px 12px 0 0",
    }
  })
);

const StyledTableContainer = styled(TableContainer)(
  ({
     theme, toolbar_height, height_filter_collapse, open_filter_collapse
   }) => ({
    '&': {
      background: theme.palette.background.paper,
      borderRadius: "0",
      height: open_filter_collapse ? `calc(100% - 82px - ${toolbar_height}px - ${height_filter_collapse}px)` : `calc(100% - 60px - ${2 * toolbar_height}px)`,
      // transition: (theme) => theme.transitions.create(['height'], {
      //   easing: theme.transitions.easing.easeInOut,
      //   duration: theme.transitions.duration.complex,
      // }),
      transition: 'height 0.1s ease-out'
    }
  })
);

export default function Index({
                                data,
                                data_option,
                                loading,
                                write_option_data,
                                delete_row,
                                sort_handler,
                                select_row,
                                check_selected_item,
                                selected_item,
                                select_all_rows,
                                check_selected_all_items,
                                check_indeterminate,
                                open_filter_collapse
                              }) {

  const {t} = useTranslation();
  const {convert_time_zone} = useTimeZoneContext();
  const toolBarRef = useRef();

  const get_filter_collapse = () => document?.getElementById('filter-component')?.offsetHeight || 0

  const [height_filter_collapse, set_height_filter_collapse] = useState(get_filter_collapse());

  useEffect(() => {
    setTimeout(() => {
      const _height = get_filter_collapse();
      if (_height !== height_filter_collapse) {
        set_height_filter_collapse(_height)
      }
    }, 200)

  }, [open_filter_collapse])

  return (
    <Box
      sx={(theme) => ({
        position: 'relative',
        height: '100%',
        borderRadius: '12px',
      })}
    >

      {/*table toolbar*/}
      <StyledToolbar
        ref={toolBarRef}
        sx={{
          pl: {sm: 2},
          pr: {xs: 1, sm: 1},
        }}
      >
        {selected_item.length > 0 ?
          <Typography
            sx={{flex: '1 1 100%'}}
            color="inherit"
            component={'span'}
          >
            {selected_item.length} {t('common.selected')}
          </Typography>
          :
          <Typography
            sx={{flex: '1 1 100%'}}
            variant="h6"
            id="tableTitle"
            component={'span'}
          >
            {t('rolesTable.title')}
          </Typography>}

        {selected_item.length > 0 &&
        <Tooltip title="Delete">
          <IconButton onClick={() => delete_row(selected_item)}>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
        }

        <Link
          href={routesName["roles-management"]}
          underline="none"
          component={ButtonBase}
          sx={(theme) => ({
            borderRadius: '10px',
            padding: '11px 8px',
            fontSize: 12,
            borderWidth: '1px',
            borderStyle: 'solid',
            width: '150px',
            // borderColor: theme.palette.primary.main,
            borderColor: theme.palette.action.light_border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            '&:hover': {
              background: theme.palette.background.item_background_light,
            }
          })}
        >
          <AddIcon
            sx={(theme) => ({
              fontSize: 17,
              color: theme.palette.primary.main,
            })}/>
          {t('rolesTable.create_role_btn')}
        </Link>
      </StyledToolbar>

      {/*role table*/}
      <StyledTableContainer
        toolbar_height={toolBarRef?.current?.offsetHeight || 0}
        height_filter_collapse={height_filter_collapse}
        open_filter_collapse={open_filter_collapse ? 1 : 0}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
          aria-labelledby="tableTitle"
        >

          {/*table head*/}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  borderBottom: (data?.data?.length === 0) && 'none',
                  paddingLeft: 0
                }}
                padding="checkbox"
              >
                <Checkbox
                  sx={{
                    mx: '5px',
                  }}
                  onChange={select_all_rows}
                  checked={check_selected_all_items()}
                  indeterminate={check_indeterminate()}
                  color="primary"
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>

              <TableCell
                key={'name'}
                align={'left'}
                padding={'true' ? 'none' : 'normal'}
                sx={{borderBottom: (data?.data?.length === 0) && 'none'}}
                sortDirection={data_option.order_by === 'name' ? data_option.order : false}
              >
                <TableSortLabel
                  direction={data_option['sort_name'] || 'asc'}
                  onClick={() => sort_handler('name')}
                >
                  {t('rolesTable.table_header_col_1')}
                  {data_option.order_by === 'name' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                key='created_at'
                align={'left'}
                padding={'true' ? 'none' : 'normal'}
                sx={{borderBottom: (data?.data?.length === 0) && 'none'}}
                sortDirection={data_option.order_by === 'created_at' ? data_option.order : false}
              >
                <TableSortLabel
                  direction={data_option['sort_created_at'] || 'asc'}
                  onClick={() => sort_handler('created_at')}
                >
                  {t('common.created_at')}
                  {data_option.order_by === 'created_at' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                key='updated_at'
                align={'left'}
                padding={'true' ? 'none' : 'normal'}
                sx={{borderBottom: (data?.data?.length === 0) && 'none'}}
                sortDirection={data_option.order_by === 'updated_at' ? data_option.order : false}
              >
                <TableSortLabel
                  direction={data_option['sort_updated_at'] || 'asc'}
                  onClick={() => sort_handler('updated_at')}
                >
                  {t('common.updated_at')}
                  {data_option.order_by === 'updated_at' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {data_option.order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                key='operation'
                align={'left'}
                padding={'true' ? 'none' : 'normal'}
                sx={{borderBottom: (data?.data?.length === 0) && 'none'}}
              >
                {t('common.operation')}
              </TableCell>
            </TableRow>
          </TableHead>

          {/*table body*/}
          <TableBody sx={{overflowY: 'scroll'}}>
            {data?.data?.map((item, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={labelId}
                >
                  <TableCell sx={{pl: 0, py: '5px'}} padding="checkbox">
                    {loading ?
                      <Skeleton width="70%"/>
                      :
                      <Checkbox
                        sx={{ml: '5px', mr: '5px'}}
                        onClick={() => select_row(item.id)}
                        color="primary"
                        inputProps={{'aria-labelledby': labelId,}}
                        checked={check_selected_item(item.id)}
                      />}
                  </TableCell>
                  <TableCell sx={{pl: 0, py: '5px'}}
                             component="th" id={labelId}>
                    {loading ? <Skeleton width="100%"/> : item.name}
                  </TableCell>
                  <TableCell sx={{pl: 0, py: '5px'}}>
                    {loading ?
                      <Skeleton width="100%"/> : convert_time_zone(item.created_at)}
                  </TableCell>
                  <TableCell sx={{pl: 0, py: '5px'}}>
                    {loading ?
                      <Skeleton width="100%"/> : convert_time_zone(item.updated_at)}
                  </TableCell>
                  <TableCell sx={{pl: 0, py: '5px'}}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: 'start',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      {loading ?
                        <>
                          <Skeleton width="30px" height="38px"/>
                          <Skeleton width="30px" height="38px"/>
                        </>
                        :
                        <>
                          <Tooltip placement='top' title={t('rolesTable.edit_role_btn')}>
                            <Link
                              component={ButtonBase}
                              href={routesName['roles-management-edit'].replace(':id', item.id)}
                              sx={(theme) => ({
                                minWidth: '38px',
                                borderRadius: '10px',
                                padding: '5px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: theme.palette.action.light_border,
                                '&:hover': {
                                  background: theme.palette.background.item_background_light,
                                }
                              })}>
                              <EditIcon color="primary"/>
                            </Link>
                          </Tooltip>

                          <Tooltip placement='top' title={t('rolesTable.delete_role')}>
                            <Button
                              variant="outlined"
                              onClick={() => delete_row([item.id])}
                              sx={(theme) => ({
                                minWidth: '38px',
                                borderRadius: '10px',
                                px: '5px',
                                borderWidth: '1px',
                                borderStyle: 'solid',
                                borderColor: theme.palette.action.light_border,
                                '&:hover': {
                                  background: theme.palette.background.item_background_light,
                                  borderColor: theme.palette.action.light_border,
                                }
                              })}>
                              <DeleteOutlineOutlinedIcon color="primary"/>
                            </Button>
                          </Tooltip>
                        </>
                      }
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/*table pagination*/}
      <TablePagination
        {...({
          data,
          data_option,
          write_option_data,
          loading
        })}
      />
    </Box>

  )
}