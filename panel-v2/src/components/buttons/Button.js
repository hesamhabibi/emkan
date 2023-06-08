import React from "react";
import {Button, darken, lighten, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {styled} from "@mui/material/styles";
import BadgePulse from "../badge-pulsing";
import {useModeColorContext} from "../../contexts/ModeColorContext";

const StyledButton = styled(Button)(({
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
        minWidth: 'auto',
        gap: '3px',
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
                                  onClick,
                                  button_text,
                                  iconButton,
                                  variant,
                                  startIcon,
                                  color_type,
                                  sx,
                                  tooltip_title,
                                  badgePulse,
                                  type
                              }) {
    const {t} = useTranslation();
    const {mode} = useModeColorContext();

    return (
        <>
            {tooltip_title?.length > 0 ?
                <Tooltip placement='top' title={tooltip_title}>
                    <StyledButton
                        mode={mode}
                        onClick={onClick}
                        variant={variant}
                        startIcon={startIcon}
                        color_type={color_type}
                        button_text={button_text}
                        sx={sx}
                        type={type}
                    >
                        {iconButton && iconButton}
                        {button_text &&
                            <Typography sx={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                                {t(button_text)}
                            </Typography>
                        }
                    </StyledButton>
                </Tooltip>
                :
                <StyledButton
                    mode={mode}
                    onClick={onClick}
                    variant={variant}
                    startIcon={startIcon}
                    color_type={color_type}
                    button_text={button_text}
                    sx={sx}
                    type={type}
                >
                    {iconButton && iconButton}
                    {button_text &&
                        <Typography sx={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            {t(button_text)}
                        </Typography>
                    }
                    {badgePulse && <BadgePulse/>}
                </StyledButton>
            }
        </>
    )
}