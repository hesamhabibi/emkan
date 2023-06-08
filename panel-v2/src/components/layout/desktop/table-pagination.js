import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import { rows_limit_list } from "../../../constants/PaginationConfigs";
import { styled } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useTranslation } from "react-i18next";
import { useLanguageContext } from "../../../contexts/LanguagesContext";
import { from, page_calculation_from, page_calculation_to, to } from "../../../helpers/pagination_calculation";

export default function TablePagination({
  state,
  data_option,
  write_option_data,
  loading,
}) {
  const { t } = useTranslation();
  const { direction, language } = useLanguageContext();

  const StyledBox = styled(Box)(({ theme }) => ({
    "&": {
      background: theme.palette.background.paper,
      borderTop: "1px solid #515151",
      borderRadius: "0 0 12px 12px",
      height: "60px",
      // alignSelf: 'end',
      // width: '100%',
      position: "sticky",
      bottom: 0,
    },
  }));
  const StyledSelect = styled(Select)(({ theme }) => ({
    fontSize: 13,
    "& .MuiSelect-select": {
      textAlign: "start",
      padding: "8px 10px",
      borderRadius: "0 0 12px 12px",
    },
  }));

  return (
    <>
      <StyledBox>
        <Box
          sx={{
            padding: "10px",
            textAlign: "right",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            gap: 3,
            borderRadius: "0 0 12px 12px",
          }}
        >
          <Typography component={"span"} sx={{ fontSize: 13 }}>
            {t("pagination.row_limit")}:
          </Typography>

          {loading ? (
            <Skeleton width={30} height={30} />
          ) : (
            <FormControl sx={{ width: "70px" }}>
              <StyledSelect
                labelId="row-per-page-select-label"
                id="row-per-page-select-label"
                value={data_option?.limit}
                onChange={(e) => write_option_data("limit", e.target.value)}
                displayEmpty
                defaultValue={10}
              >
                {rows_limit_list.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </StyledSelect>
            </FormControl>
          )}

          {loading ? (
            <Skeleton width={60} height={30} />
          ) : (
            <Box>
              <Typography component={"span"} sx={{ fontSize: 13 }}>
                {` ${page_calculation_from(state?.paginate?.page, state?.paginate?.limit)} `}-
                {` ${page_calculation_to(
                  state?.paginate?.total,
                  state?.paginate?.page,
                  state?.paginate?.limit
                )} `}
                {language === "fa" ? "از" : " of"}
                {` ${state?.paginate?.total} `}
              </Typography>
            </Box>
          )}

          <ButtonGroup>
            <IconButton
              disabled={state?.paginate?.page === 1}
              onClick={() =>
                write_option_data("page", state?.paginate?.page - 1)
              }
            >
              {direction === "ltr" ? (
                <KeyboardArrowLeftIcon />
              ) : (
                <KeyboardArrowRightIcon />
              )}
            </IconButton>
            <IconButton
              disabled={state?.paginate?.page === state?.paginate?.pages}
              onClick={() =>
                write_option_data("page", state?.paginate?.page + 1)
              }
            >
              {direction === "ltr" ? (
                <KeyboardArrowRightIcon />
              ) : (
                <KeyboardArrowLeftIcon />
              )}
            </IconButton>
          </ButtonGroup>
        </Box>
      </StyledBox>
    </>
  );
}
