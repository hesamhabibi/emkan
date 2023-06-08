import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import {FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import SettingsBrightnessIcon from "@mui/icons-material/SettingsBrightness";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import languageConfigs from "../../../global-data/languageConfigs";
import Box from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {useTranslation} from "react-i18next";
import {useModeColorContext} from "../../../contexts/ModeColorContext";
import {useLanguageContext} from "../../../contexts/LanguagesContext";


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({theme}) => ({
    '& .MuiToggleButtonGroup-grouped': {
        '&:first-of-type': {
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
        },
        '&:last-of-type': {
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
        },
    },
}));

export default function SettingContentDrawer() {

    const {t} = useTranslation();
    const {change_color_mode, mode_name} = useModeColorContext();
    const {change_language, language} = useLanguageContext();
    const [alignment, setAlignment] = useState(mode_name);

    const handleAlignment = (event, newAlignment) => {setAlignment(newAlignment);};

    return (
        <Box sx={{padding: 3,}}>
            {/*mode buttons title*/}
            <Typography sx={{paddingBottom: 2}}>
                {t('swipeDrawer.title_mode')}
            </Typography>

            {/*mode buttons*/}
            <StyledToggleButtonGroup
                fullWidth
                onChange={handleAlignment}
                value={alignment}
                exclusive
                aria-label="text alignment"
                variant="outlined"
                color="primary"
            >
                <ToggleButton
                    value="light"
                    onClick={() => change_color_mode('light')}
                >
                    <LightModeIcon sx={{marginRight: 1}}/>
                    {t('swipeDrawer.light_mode')}
                </ToggleButton>

                <ToggleButton
                    value="system"
                    onClick={() => change_color_mode('system')}
                >
                    <SettingsBrightnessIcon sx={{marginRight: 1}}/>
                    {t('swipeDrawer.system_mode')}
                </ToggleButton>

                <ToggleButton
                    onClick={() => change_color_mode('dark')}
                    value="dark"
                >
                    <DarkModeIcon sx={{marginRight: 1}}/>
                    {t('swipeDrawer.dark_mode')}
                </ToggleButton>
            </StyledToggleButtonGroup>

            {/*language select box title*/}
            <Typography sx={{paddingTop: 6, paddingBottom: 2}}>
                {t('swipeDrawer.lang')}
            </Typography>

            {/*language select box*/}
            <FormControl fullWidth>
                <InputLabel id="select-language-label">
                    {t('swipeDrawer.lang_label')}
                </InputLabel>
                <Select
                    labelId="select-language-label"
                    id="select-language"
                    label="language"
                    value={language}
                    onChange={(e) => {
                        change_language(e.target.value)
                    }}>
                    {Object.keys(languageConfigs).map((key, index) => (
                        <MenuItem key={index} value={key}>{languageConfigs[key].label}</MenuItem>))}
                </Select>
            </FormControl>
        </Box>
    )
}