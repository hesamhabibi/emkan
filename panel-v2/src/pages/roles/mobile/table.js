import {Box, Button, ButtonBase, Divider, FormControlLabel} from "@mui/material";
import React from "react";
import {useTranslation} from "react-i18next";
import {styled} from "@mui/material/styles";
import {useTimeZoneContext} from "../../../contexts/TimeZoneContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import TablePagination from "../../../components/layout/mobile/table-pagination";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import Link from "@mui/material/Link";
import routesName from "../../../constants/routes";
import Checkbox from "@mui/material/Checkbox";

const TableCellBox = styled(Box)(({theme}) => ({
    '&': {
        height: 48,
        alignItems: 'center',
        color: theme?.palette?.color?.defaultFont,
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        width: '50% !important',
        display: 'inline-flex'
    },
    '&::-webkit-scrollbar': {
        display: 'none'
    }
}))

const StyledBox = styled(Box)(({theme, language}) => ({
    '&': {
        background: theme.palette.background.default,
        marginBottom: '10px',
        borderRadius: '20px',
        fontFamily: language === 'fa' ? 'IRANSans-Regular,IRANSans-Medium' : 'IRANSans-Regular-EnNum',
        fontSize: 14,
    }
}))

export default function TableData({
                                      loading,
                                      data,
                                      data_option,
                                      write_option_data,
                                      delete_row,
                                      sort_handler,
                                      select_row,
                                      check_selected_item,
                                      selected_item,
                                      select_all_rows,
                                      check_selected_all_items,
                                      check_indeterminate
                                  }) {

    const {t} = useTranslation();
    const {convert_time_zone} = useTimeZoneContext();
    const {language} = useLanguageContext();

    return (
        (!loading && data?.data?.length > 0) &&

        <Box
            sx={{
                margin: '10px',
                height: 'calc(100vh - 215px)',
                position: 'relative'
            }}
        >
            {/*select all*/}
            <FormControlLabel
                sx={{
                    color: "white",
                    padding: '5px 15px 10px'
                }}
                control={
                    <Checkbox
                        color="primary"
                        sx={{padding: 0, mr: '5px'}}
                        onChange={select_all_rows}
                        checked={check_selected_all_items()}
                        indeterminate={check_indeterminate()}
                    />}
                label={(selected_item.length > 0) ? selected_item?.length : 'select all'}
            />

            {/*role info boxes*/}
            {
                data?.data?.map((item, index) => {
                    return (
                        // role info box
                        <StyledBox
                            language={language}
                        >
                            <Box sx={{padding: '5px 20px'}}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <TableCellBox sx={{justifyContent: 'start'}}>
                                        <Checkbox
                                            sx={{padding: 0, mr: '5px'}}
                                            color="primary"
                                            onClick={() => select_row(item.id)}
                                            checked={check_selected_item(item.id)}
                                        />
                                        {t('rolesTable.table_header_col_1')} :
                                    </TableCellBox>
                                    <TableCellBox>{item.name}</TableCellBox>
                                </Box>
                                <Divider/>
                                <Box>
                                    <TableCellBox>{t('common.created_at')} :</TableCellBox>
                                    <TableCellBox>{convert_time_zone(item.created_at)}</TableCellBox>
                                </Box>
                                <Divider/>
                                <Box>
                                    <TableCellBox>{t('common.updated_at')} :</TableCellBox>
                                    <TableCellBox>{convert_time_zone(item.updated_at)}</TableCellBox>
                                </Box>
                                <Divider/>
                            </Box>

                            {/*edit & delete buttons*/}
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: '5px 0',
                                    padding: '0 20px 5px'
                                }}
                            >
                                {/*edit button*/}

                                <Link
                                    href={routesName['roles-management-edit'].replace(':id', item.id)}
                                    component={ButtonBase}
                                    underline="none"
                                    sx={(theme) => ({
                                        borderRadius: '10px',
                                        width: '100%',
                                        color: theme.palette.color.yellowAlert,
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: theme.palette.color.yellowAlert,
                                        '&:active,&:focus,&:hover': {borderColor: theme.palette.color.yellowAlert,},
                                        background: theme.palette.background.default,
                                        '& .MuiButton-startIcon': {marginRight: '4px'},
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: '5px 15px'

                                    })}

                                >
                                    <EditIcon sx={{marginRight: '5px'}}/>
                                    {t('common.edit')}
                                </Link>

                                {/*delete button*/}
                                <Button
                                    sx={(theme) => ({
                                        borderRadius: '10px',
                                        width: '100%',
                                        color: theme.palette.color.redAlert,
                                        borderColor: theme.palette.color.redAlert,
                                        '&:active,&:focus,&:hover': {borderColor: theme.palette.color.redAlert,},
                                        background: theme.palette.background.default,
                                        '& .MuiButton-startIcon': {marginRight: '4px'}
                                    })}
                                    variant="outlined"
                                    startIcon={<DeleteOutlineOutlinedIcon/>}
                                    onClick={() => delete_row([item.id])}
                                >
                                    {t('common.delete')}
                                </Button>

                            </Box>
                        </StyledBox>

                    );
                })
            }

            {/*Table Pagination*/}
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