import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useLanguageContext } from "../../../contexts/LanguagesContext";
import { styled } from "@mui/material/styles";
import { Skeleton } from "@mui/material";
import { page_calculation_from, page_calculation_to } from "../../../helpers/pagination_calculation";

export default function TablePagination({ state,data,write_option_data, loading }) {
  const StyledBox = styled(Box)(({ theme }) => ({
    "&": {
      background: theme.palette.background.default,
      color: theme?.palette?.color?.defaultFont,
      padding: "3px 5px",
      textAlign: "right",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: "20px",
      // position:'absolute',
      bottom: "5px",
      left: 0,
      right: 0,
      margin: "auto",
      Width: "calc(100% - 10px)",
    },
  }));
  const { direction, language } = useLanguageContext();

  return (
    <Box sx={{ paddingBottom: "10px" }}>
      <StyledBox>
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

        {loading ? (
          <Skeleton width={60} height={30} />
        ) : (
          <Box>
            <Typography sx={{ fontSize: 13, lineHeight: 3.5 }}>
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
      </StyledBox>
    </Box>
  );
}
