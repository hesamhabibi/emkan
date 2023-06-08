import React from "react";
import Link from "@mui/material/Link";
import {ButtonBase, darken, lighten, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {styled} from "@mui/material/styles";
import {useModeColorContext} from "../../contexts/ModeColorContext";

const StyledLink = styled(Link)(({
                                     theme,
                                     button_text,
                                     color_type,
                                     sx,
                                     mode
                                 }) => {

    const default_styles = {
        borderRadius: '10px',
        padding: button_text ? '8px 12px' : '8px',
        borderWidth: '1px',
        borderStyle: 'solid',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        borderColor: mode === 'dark' ?
            darken(theme.palette.primary.main, 0.6)
            :
            lighten(theme.palette.primary.main, 0.7),
        '&:hover': {
            background: theme.palette.background.item_background_light,
        },
        '& > svg': {
            fontSize: '22px',
        },
        ...sx
    }

    if (color_type && color_type === "info") {
        return {
            '&': {
                ...default_styles,
                borderColor: mode === 'dark' ?
                    darken(theme.palette.background.blue_button, 0.6)
                    :
                    lighten(theme.palette.background.blue_button, 0.7),
                color: theme.palette.background.blue_button,
            },
        }
    } else if (color_type && color_type === "warning") {
        return {
            '&': {
                ...default_styles,
                borderColor: mode === 'dark' ?
                    darken(theme.palette.color.yellowAlert, 0.6)
                    :
                    lighten(theme.palette.color.yellowAlert, 0.7),
                color: theme.palette.color.yellowAlert,
            },
        }
    } else if (color_type && color_type === "danger") {
        return {
            '&': {
                ...default_styles,
                borderColor: mode === 'dark' ?
                    darken(theme.palette.color.redAlert, 0.6)
                    :
                    lighten(theme.palette.color.redAlert, 0.7),
                color: theme.palette.color.redAlert,
            },
        }
    } else
        return {
            '&': {
                ...default_styles,
            },
        }

});


export default function Index({
                                  button_text,
                                  iconButton,
                                  href,
                                  sx,
                                  color_type,
                                  tooltip_title,
                              }) {
    const {t} = useTranslation();
    const {mode} = useModeColorContext();

    return (
        <>
            {tooltip_title?.length > 0 ?
                <Tooltip placement='top' title={tooltip_title}>
                    <StyledLink
                        mode={mode}
                        href={href}
                        underline="none"
                        component={ButtonBase}
                        color_type={color_type}
                        sx={sx}
                    >

                        {iconButton && iconButton}

                        {button_text &&
                            <Typography sx={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                                {t(button_text)}
                            </Typography>
                        }
                    </StyledLink>
                </Tooltip>
                :
                <StyledLink
                    mode={mode}
                    href={href}
                    underline="none"
                    component={ButtonBase}
                    color_type={color_type}
                    sx={sx}
                >

                    {iconButton && iconButton}

                    {button_text &&
                        <Typography sx={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            {t(button_text)}
                        </Typography>
                    }
                </StyledLink>
            }
        </>
    )
}