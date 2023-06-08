import zIndex from "@mui/material/styles/zIndex";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import React from "react";
import {styled} from "@mui/material/styles";
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import {useTranslation} from "react-i18next";
import {SwipeableDrawer,} from "@mui/material";
import SettingContentDrawer from "../mobile/setting-content-drawer";

const StyleSwipeableDrawer = styled(SwipeableDrawer)(({theme, direction}) => ({
    '& .MuiPaper-root': {
        borderTopLeftRadius: direction === 'ltr' ? 0 : 10,
        borderBottomLeftRadius: direction === 'ltr' ? 0 : 10,
        borderTopRightRadius: direction === 'ltr' ? 10 : 0,
        borderBottomRightRadius: direction === 'ltr' ? 10 : 0,
        background:theme.palette.background.paper
    },
    '& .MuiDrawer-paperAnchorLeft': {
        right: 0,
        left: 'auto',
    }
}));

export default function SettingSwipeableDrawer({open_setting, set_open_setting, DrawerHeader}) {

    const {direction} = useLanguageContext();
    const {t} = useTranslation();


    const handleSwipeDrawerClose = () => {
        set_open_setting(false);
    };
    const open_setting_handler = open => set_open_setting(open);

    return (
        <StyleSwipeableDrawer
            open={open_setting}
            onOpen={() => open_setting_handler(true)}
            onClose={() => open_setting_handler(false)}
            sx={{
                zIndex: zIndex.drawer + 1,
            }}
            SlideProps={{
                direction: direction === 'rtl' ? 'right' : 'left'
            }}
        >
            <Box sx={{height: '100%'}}>
                {/*drawer header*/}
                <DrawerHeader
                    sx={{
                        justifyContent: 'space-between',
                        paddingLeft: 3,
                        paddingRight: 3,
                    }}
                >
                    <Typography variant="h6">
                        {t('common.setting')}
                    </Typography>
                    <IconButton onClick={handleSwipeDrawerClose}>
                        <CloseIcon/>
                    </IconButton>
                </DrawerHeader>
                <Divider/>

                {/*drawer body*/}
                <SettingContentDrawer/>

            </Box>
        </StyleSwipeableDrawer>
    )
}