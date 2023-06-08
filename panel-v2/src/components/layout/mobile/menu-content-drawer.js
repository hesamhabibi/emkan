import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import MobileSearchBox from "./mobile-search-box";
import List from "@mui/material/List";
import {Collapse, ListItem, ListItemIcon, ListItemText, ListSubheader} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import {rout_list} from "../../../constants/rout-list";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useModeColorContext} from "../../../contexts/ModeColorContext";
import {styled} from "@mui/material/styles";
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {useLanguageContext} from "../../../contexts/LanguagesContext";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const StyledListSubheader = styled(ListSubheader)(({theme}) => ({
    '&': {
        background: theme.palette.background.default
    },
}));

const StyledListItem = styled(ListItem)(({theme, item, open_submenu_collapse}) => ({
    '&': {
        background: (item?.children?.length > 0 && open_submenu_collapse[item.key]) ?
            theme.palette.background.item_background
            :
            theme.palette.background.item_background_light
    },
}));

const IsChildListItemButton = styled(ListItemButton)(({theme}) => ({
    '&': {
        background: theme.palette.background.item_background_light
    },
}));


export default function MenuContentDrawer() {
    const [open_submenu_collapse, set_open_submenu_collapse] = useState(() => {
        const collapse_routes = rout_list?.filter(item => item?.children?.length > 0);
        let collapses = {};
        collapse_routes?.forEach(item => {
            collapses = {
                ...collapses,
                [item.key]: false
            }
        })
        return collapses;
    });

    const ParentListItemButton = styled(ListItemButton)(({open}) => ({
            '&': {
                minHeight: 35,
                py: '10px',
                my: '5px',
                borderRadius: '10px',
                mr: 2,
            }
        })
    );

    const {t} = useTranslation();
    const {mode} = useModeColorContext();
    const {direction} = useLanguageContext();

    const handle_menu_collapse = (key) => {
        set_open_submenu_collapse({
            ...open_submenu_collapse,
            [key]: !open_submenu_collapse[key]
        });

    };

    return (
        <>
            <MobileSearchBox/>
            <List
                subheader={
                    <StyledListSubheader
                        component="div"
                        sx={{
                            lineHeight: '23px',
                            py: 1,
                        }}
                        id="nested-list-subheader">
                        {t('dashboardMenuItems.nested_list_title')}
                    </StyledListSubheader>
                }
            >
                {rout_list.map((item, index) => (
                    <StyledListItem
                        key={index}
                        disablePadding
                        open_submenu_collapse={open_submenu_collapse}
                        item={item}
                        sx={{
                            display: 'block',
                            borderRadius: '11px'
                        }}>
                        {
                            item?.children?.length > 0 ?
                                <>
                                    <ParentListItemButton
                                        onClick={() => handle_menu_collapse(item?.key)}
                                        open={open_submenu_collapse[item?.key]}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 2,
                                                justifyContent: 'center',
                                            }}>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={t(item.title)}/>
                                        {open_submenu_collapse[item?.key] ? <ExpandLess color="primary"/> :
                                            <ExpandMore color="primary"/>}
                                    </ParentListItemButton>
                                    <Collapse
                                        in={open_submenu_collapse[item?.key]}
                                        timeout="auto"
                                        unmountOnExit
                                        sx={{pt: '5px', pb: 2}}
                                    >
                                        <List component="div" disablePadding>
                                            {
                                                item?.children?.map((item, index) => (
                                                    <IsChildListItemButton
                                                        key={index}
                                                        sx={{
                                                            minHeight: 35,
                                                            py: '10px',
                                                            margin: '6px',
                                                            borderRadius: '10px'
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            sx={{
                                                                minWidth: 0,
                                                                mr: 2,
                                                                justifyContent: 'center',
                                                            }}
                                                            color="primary"
                                                        >
                                                            {item.icon}
                                                        </ListItemIcon>
                                                        <ListItemText primary={t(item.title)}/>
                                                    </IsChildListItemButton>
                                                ))
                                            }
                                        </List>
                                    </Collapse>
                                </>
                                :
                                <ListItemButton href={item.path}
                                                sx={{
                                                    minHeight: 35,
                                                    py: '10px',
                                                    my: '5px',
                                                    borderRadius: '10px'
                                                }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={t(item.title)}
                                    />
                                    {
                                        item?.badge &&
                                        <CircleIcon
                                            sx={{fontSize: 12}}
                                            color="primary"/>
                                    }
                                    {direction === 'rtl' ?
                                        <KeyboardArrowLeftIcon color="primary"/>
                                        :
                                        <KeyboardArrowRightIcon color="primary"/>
                                    }

                                </ListItemButton>
                        }

                    </StyledListItem>
                ))}
            </List>
        </>
    )
}