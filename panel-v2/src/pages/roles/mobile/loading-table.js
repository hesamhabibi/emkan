import {Box, Skeleton} from "@mui/material";
import React from "react";
import {styled} from "@mui/material/styles";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import TablePagination from "../../../components/layout/mobile/table-pagination";

const TableRowLoadingCover = styled(Box)(({theme}) => ({
    '&': {

        height: '45px',
        display: 'flex',
        alignItems: 'center'
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

export default function LoadingTable({
                                         loading,
                                         data,
                                         data_option,
                                         write_option_data,
                                     }) {

    const {language} = useLanguageContext();


    return (

        <Box
            sx={{
                margin: '10px',
                height: 'calc(100vh - 215px)',
                position: 'relative'
            }}
        >
            <StyledBox
                language={language}
            >
                <Box sx={{padding: '5px 20px'}}>
                    <TableRowLoadingCover>
                        <Skeleton width="100%"/>
                    </TableRowLoadingCover>
                    <Skeleton sx={{background: '1px dashed rgba(224, 224, 224, 1)', width: '100%', height: "1px"}}/>
                    <TableRowLoadingCover>
                        <Skeleton width="100%"/>
                    </TableRowLoadingCover>
                    <Skeleton sx={{background: '1px dashed rgba(224, 224, 224, 1)', width: '100%', height: "1px"}}/>
                    <TableRowLoadingCover>
                        <Skeleton width="100%"/>
                    </TableRowLoadingCover>
                    <Skeleton sx={{background: '1px dashed rgba(224, 224, 224, 1)', width: '100%', height: "1px"}}/>
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
                    <Skeleton sx={{width: '100%', height: '50px'}}/>

                    {/*delete button*/}
                    <Skeleton sx={{width: '100%', height: '50px'}}/>

                </Box>
            </StyledBox>

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