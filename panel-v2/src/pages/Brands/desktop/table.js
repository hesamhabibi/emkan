import React, { useEffect, useRef, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableBody from "@mui/material/TableBody";
import { Skeleton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { visuallyHidden } from "@mui/utils";
import TablePagination from "../../../components/layout/desktop/table-pagination";
import { useTranslation } from "react-i18next";
import { useTimeZoneContext } from "../../../contexts/TimeZoneContext";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import routesName from "../../../constants/routes";
import AddIcon from "@mui/icons-material/Add";
import ButtonCustom from "../../../components/buttons";

const StyledTableContainer = styled(TableContainer)(
  ({
    theme,
    toolbar_height,
    height_filter_collapse,
    open_filter_collapse,
  }) => ({
    "&": {
      background: theme.palette.background.paper,
      borderRadius: "0",
      height: open_filter_collapse
        ? `calc(100% - 80px - ${toolbar_height}px - ${height_filter_collapse}px)`
        : `calc(100% - 60px - ${2 * toolbar_height}px)`,
      transition: "height 0.1s ease-out",
    },
  })
);
const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  "&": {
    background: theme.palette.background.paper,
    borderRadius: "12px 12px 0 0",
  },
}));

const StickyTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    background: theme.palette.background.paper,
    position: "sticky",
    right: 0,
  },
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  "&": {
    background: theme.palette.background.paper,
  },
}));

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
  open_filter_collapse,
}) {
  const { t } = useTranslation();
  const { convert_timestamp_time_zone } = useTimeZoneContext();
  const toolBarRef = useRef();

  const get_filter_collapse = () =>
    document?.getElementById("filter-component")?.offsetHeight || 0;

  const [height_filter_collapse, set_height_filter_collapse] = useState(
    get_filter_collapse()
  );

  useEffect(() => {
    setTimeout(() => {
      const _height = get_filter_collapse();
      if (_height !== height_filter_collapse) {
        set_height_filter_collapse(_height);
      }
    }, 200);
  }, [open_filter_collapse]);

  return (
    <Box
      sx={(theme) => ({
        position: "relative",
        height: "100%",
      })}
    >
      {/*table toolbar*/}
      <StyledToolbar
        ref={toolBarRef}
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        {selected_item.length > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            component={"span"}
          >
            {selected_item.length} {t("common.selected")}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component={"span"}
          >
            {t("brands.brands")}
          </Typography>
        )}

        {selected_item.length > 0 && (
          <ButtonCustom
            onClick={() => delete_row(selected_item)}
            iconButton={<DeleteOutlineOutlinedIcon />}
            button_text={"common.delete_all"}
            color_type="danger"
            sx={{ marginRight: "5px" }}
          />
        )}

        <ButtonCustom
          button_text={"brands.create_brand_btn"}
          iconButton={<AddIcon />}
          href={routesName["brands-management"]}
        />
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
              {/*select all item check box*/}
              <HeaderTableCell
                sx={{
                  borderBottom: data?.data?.length === 0 && "none",
                  paddingLeft: 0,
                }}
                padding="checkbox"
              >
                <Checkbox
                  sx={{
                    mx: "5px",
                  }}
                  onChange={select_all_rows}
                  checked={check_selected_all_items()}
                  indeterminate={check_indeterminate()}
                  color="primary"
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </HeaderTableCell>

              <HeaderTableCell
                key={"name"}
                align={"left"}
                padding={"true" ? "none" : "normal"}
                sx={{ borderBottom: data?.data?.length === 0 && "none" }}
                sortDirection={
                  data_option.order_by === "name" ? data_option.order : false
                }
              >
                <TableSortLabel
                  direction={data_option["sort_title"] || "asc"}
                  onClick={() => sort_handler("title")}
                >
                  {t("rolesTable.table_header_col_1")}
                  {data_option.order_by === "title" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {data_option.order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </HeaderTableCell>
              <HeaderTableCell
                key="createdAt"
                align={"left"}
                padding={"true" ? "none" : "normal"}
                sx={{ borderBottom: data?.data?.length === 0 && "none" }}
                sortDirection={
                  data_option.order_by === "createdAt"
                    ? data_option.order
                    : false
                }
              >
                <TableSortLabel
                  direction={data_option["sort_createdAt"] || "asc"}
                  onClick={() => sort_handler("createdAt")}
                >
                  {t("common.createdAt")}
                  {data_option.order_by === "createdAt" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {data_option.order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </HeaderTableCell>
              <HeaderTableCell
                key="updatedAt"
                align={"left"}
                padding={"true" ? "none" : "normal"}
                sx={{ borderBottom: data?.data?.length === 0 && "none" }}
                sortDirection={
                  data_option.order_by === "updatedAt"
                    ? data_option.order
                    : false
                }
              >
                <TableSortLabel
                  direction={data_option["sort_updatedAt"] || "asc"}
                  onClick={() => sort_handler("updatedAt")}
                >
                  {t("common.updatedAt")}
                  {data_option.order_by === "updatedAt" ? (
                    <Box component="span" sx={visuallyHidden}>
                      {data_option.order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </HeaderTableCell>

              {/*header operation table cell*/}
              <StickyTableCell
                key="operation"
                align={"left"}
                padding={"true" ? "none" : "normal"}
                sx={{
                  borderBottom: data?.data?.length === 0 && "none",
                  textAlign: "center",
                }}
              >
                {t("common.operation")}
              </StickyTableCell>
            </TableRow>
          </TableHead>

          {/*table body*/}
          <TableBody sx={{ overflowY: "scroll" }}>
            {data?.data?.map((item, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={labelId}
                  sx={(theme) => ({
                    "&:hover .MuiTableCell-root:last-child": {
                      background: theme.palette.action.light_border2,
                    },
                  })}
                >
                  {/*select item check box*/}
                  <TableCell sx={{ pl: 0, py: "5px" }} padding="checkbox">
                    {loading ? (
                      <Skeleton width="70%" />
                    ) : (
                      <Checkbox
                        sx={{ ml: "5px", mr: "5px" }}
                        onClick={() => select_row(item.id)}
                        color="primary"
                        inputProps={{ "aria-labelledby": labelId }}
                        checked={check_selected_item(item.id)}
                      />
                    )}
                  </TableCell>

                  {/*table items*/}
                  <TableCell
                    sx={{ pl: 0, py: "5px" }}
                    component="th"
                    id={labelId}
                  >
                    {loading ? <Skeleton width="100%" /> : item?.title?.fa}
                  </TableCell>
                  <TableCell sx={{ pl: 0, py: "5px" }}>
                    {loading ? (
                      <Skeleton width="100%" />
                    ) : (
                      convert_timestamp_time_zone(item.createdAt)
                    )}
                  </TableCell>
                  <TableCell sx={{ pl: 0, py: "5px" }}>
                    {loading ? (
                      <Skeleton width="100%" />
                    ) : (
                      convert_timestamp_time_zone(item.updatedAt)
                    )}
                  </TableCell>

                  {/*operation table cell*/}
                  <StickyTableCell sx={{ py: "5px" }}>
                    <Box
                      sx={(theme) => ({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1,
                      })}
                    >
                      {loading ? (
                        <>
                          <Skeleton width="30px" height="38px" />
                          <Skeleton width="30px" height="38px" />
                        </>
                      ) : (
                        <>
                          <ButtonCustom
                            iconButton={<EditIcon />}
                            href={routesName["brands-management-edit"].replace(
                              ":id",
                              item.id
                            )}
                            tooltip_title={t("brands.edit_brand_btn")}
                          />
                          <ButtonCustom
                            onClick={() => delete_row([item.id])}
                            iconButton={<DeleteOutlineOutlinedIcon />}
                            color_type="danger"
                            tooltip_title={t("brands.delete_brand")}
                          />
                        </>
                      )}
                    </Box>
                  </StickyTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </StyledTableContainer>

      {/*table pagination*/}
      <TablePagination
        {...{
          state: data,
          data_option,
          write_option_data,
          loading,
        }}
      />
    </Box>
  );
}
