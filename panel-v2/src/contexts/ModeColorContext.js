import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {createTheme} from "@mui/material";
import {ThemeProvider, CacheProvider} from "@emotion/react";
import {useThemeDetector} from "../hooks/useThemeDetector";
import {get_mode_color, set_mode_color} from "../helpers/storage";
import themeConfigs from "../constants/themes/ThemeConfigs";
import paletteConfigs from "../constants/paletts/PaletteConfigs";
import shadowConfigs from "../constants/shadows/ShadowConfigs";
import {useLanguageContext} from "./LanguagesContext";
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {StylesProvider, jssPreset} from '@mui/styles';
import rtlPlugin from "stylis-plugin-rtl";


export const ModeColorContext = createContext(null);
export const ModeColorContextProvider = ({children}) => {
        const {direction, language} = useLanguageContext();

        const baseTheme = 'system';
        const systemTheme = useThemeDetector();

        const defaultTheme = get_mode_color();

        const [mode_name, set_mode_name] = useState(() => {
            if (!defaultTheme) return 'system'
            return defaultTheme;
        });

        const [mode, set_mode] = useState(() => {
            if (defaultTheme === 'system') {
                return systemTheme
            } else if (defaultTheme === 'light' || defaultTheme === 'dark') {
                return defaultTheme;
            }
            return systemTheme;
        });

        useEffect(() => {
            if (defaultTheme === 'system') {
                set_mode(systemTheme);
            }
        }, [systemTheme])

        const values = useMemo(() => ({
            mode,
            mode_name,
            baseTheme,
            local_storage_color_mode: defaultTheme,
            change_color_mode: (mode_color) => {
                mode_color = mode_color.toLowerCase();
                set_mode(mode_color === 'system' ? systemTheme : mode_color);
                set_mode_name(mode_color)
                set_mode_color(mode_color)
            },
        }), [mode, mode_name]);

        const theme = useMemo(() => createTheme({
            direction,
            palette: {
                mode,
            ...(mode === 'light'? paletteConfigs.light : paletteConfigs.dark),
            },
            shadows: {...(mode === 'light' ? shadowConfigs.light : shadowConfigs.dark)},
            overrides: {},
            ...themeConfigs[language]
        }), [mode, language]);

        const cacheLtr = createCache({
            key: "muiltr"
        });

        const cacheRtl = createCache({
            key: "muirtl",
            stylisPlugins: [prefixer, rtlPlugin]
        });

        const jss = create({
            plugins: [...jssPreset().plugins, rtl()],
        });

        return (
            <ModeColorContext.Provider value={{...values}}>
                <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
                    <ThemeProvider theme={theme}>
                        {direction === "rtl" ? <StylesProvider jss={direction === "rtl" && jss}>
                                {children}
                            </StylesProvider> :
                            children
                        }
                    </ThemeProvider>
                </CacheProvider>
            </ModeColorContext.Provider>
        );
    }
;

export const useModeColorContext = () => useContext(ModeColorContext)