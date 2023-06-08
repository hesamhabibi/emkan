import { Box, Divider, FormControlLabel } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import { useTimeZoneContext } from "../../../contexts/TimeZoneContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TablePagination from "../../../components/layout/mobile/table-pagination";
import { useLanguageContext } from "../../../contexts/LanguagesContext";
import routesName from "../../../constants/routes";
import Checkbox from "@mui/material/Checkbox";
import ButtonCustom from "../../../components/buttons";

const ToolbarBox = styled(Box)(({ theme }) => ({
  "&": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: theme.palette.background.default,
    color: theme?.palette?.color?.defaultFont,
    padding: "8px 15px",
    borderRadius: "20px",
    marginBottom: "5px",
    height: "40px",
  },
}));

const TableCellBox = styled(Box)(({ theme }) => ({
  "&": {
    height: 48,
    alignItems: "center",
    color: theme?.palette?.color?.defaultFont,
    overflowX: "auto",
    whiteSpace: "nowrap",
    width: "50% !important",
    display: "inline-flex",
  },
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const StyledBox = styled(Box)(({ theme, language }) => ({
  "&": {
    background: theme.palette.background.default,
    marginBottom: "10px",
    borderRadius: "20px",
    fontFamily:
      language === "fa"
        ? "IRANSans-Regular,IRANSans-Medium"
        : "IRANSans-Regular-EnNum",
    fontSize: 14,
  },
}));

export default function TableData({
  loading,
  user_data,
  data_option,
  write_option_data,
  delete_row,
  select_row,
  check_selected_item,
  selected_item,
  select_all_rows,
  check_selected_all_items,
  check_indeterminate,
  handle_user_access,
}) {
  const { t } = useTranslation();
  const { convert_timestamp_time_zone } = useTimeZoneContext();
  const { language } = useLanguageContext();

  return (
    !loading &&
    user_data?.data?.length > 0 && (
      <Box
        sx={{
          margin: "5px 1px",
          height: "calc(100vh - 215px)",
          position: "relative",
        }}
      >
        {/*select all*/}
        <ToolbarBox>
          <FormControlLabel
            sx={{
              color: "white",
              padding: "5px 15px 10px",
            }}
            control={
              <Checkbox
                color="primary"
                sx={{ padding: 0, mr: "5px" }}
                onChange={select_all_rows}
                checked={check_selected_all_items()}
                indeterminate={check_indeterminate()}
              />
            }
            label={
              selected_item.length > 0
                ? `${selected_item.length} ${t("common.selected")}`
                : `${t("common.select_all")}`
            }
          />

          {selected_item.length > 0 && (
            <ButtonCustom
              onClick={() => delete_row(selected_item)}
              iconButton={<DeleteOutlineOutlinedIcon />}
              button_text={"common.delete_all"}
              color_type="danger"
              sx={{ marginRight: "5px" }}
            />
          )}
        </ToolbarBox>

        {/*role info boxes*/}
        {user_data?.data?.map((item, index) => {
          return (
            // role info box
            <StyledBox language={language}>
              <Box sx={{ padding: "5px 20px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TableCellBox sx={{ justifyContent: "start" }}>
                    <Checkbox
                      sx={{ padding: 0, mr: "5px" }}
                      color="primary"
                      onClick={() => select_row(item.id)}
                      checked={check_selected_item(item.id)}
                    />
                    {t("usersTable.table_header_col_2")} :
                  </TableCellBox>
                  <TableCellBox>{item.name}</TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>
                    {t("usersTable.table_header_col_3")} :
                  </TableCellBox>
                  <TableCellBox>{item.last_name}</TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>
                    {t("usersTable.table_header_col_4")} :
                  </TableCellBox>
                  <TableCellBox>{item.username}</TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>
                    {t("usersTable.table_header_col_5")} :
                  </TableCellBox>
                  <TableCellBox>{item.email}</TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>
                    {t("usersTable.table_header_col_6")} :
                  </TableCellBox>
                  <TableCellBox>{item.mobile}</TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>
                    {t("usersTable.table_header_col_7")} :
                  </TableCellBox>
                  <TableCellBox>{handle_user_access(item.access_id)}</TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>{t("common.createdAt")} :</TableCellBox>
                  <TableCellBox>
                    {convert_timestamp_time_zone(item.createdAt)}
                  </TableCellBox>
                </Box>
                <Divider />
                <Box>
                  <TableCellBox>{t("common.updatedAt")} :</TableCellBox>
                  <TableCellBox>
                    {convert_timestamp_time_zone(item.updatedAt)}
                  </TableCellBox>
                </Box>
                <Divider />
              </Box>

              {/*edit & delete buttons*/}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "5px 0",
                  padding: "0 20px 10px",
                }}
              >
                {/*edit button*/}
                <ButtonCustom
                  iconButton={<EditIcon />}
                  href={routesName["users-management-edit"].replace(
                    ":id",
                    item.id
                  )}
                  color_type="warning"
                  button_text={"common.edit"}
                  sx={{ width: "100%" }}
                />

                <ButtonCustom
                  iconButton={<DeleteOutlineOutlinedIcon />}
                  onClick={() => delete_row([item.id])}
                  color_type="danger"
                  button_text={"common.delete"}
                  sx={{ width: "100%" }}
                />
              </Box>
            </StyledBox>
          );
        })}

        {/*Table Pagination*/}
        <TablePagination
          {...{
            state: user_data,
            data_option,
            write_option_data,
            loading,
          }}
        />
      </Box>
    )
  );
}
