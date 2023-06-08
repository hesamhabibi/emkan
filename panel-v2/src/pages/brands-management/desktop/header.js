import React from "react";
import {useTranslation} from "react-i18next";
import routesName from "../../../constants/routes";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import {ButtonBase} from "@mui/material";


export default function Header() {
    const {t} = useTranslation();

    return (
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
    )
}