import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18next from "../helpers/i18n";
import {
    get_language,
    set_direction as set_direction_storage,
    set_language as set_language_storage

} from "../helpers/storage";
import languageConfigs from "../global-data/languageConfigs";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFnsJalali} from '@mui/x-date-pickers/AdapterDateFnsJalali';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import fa from 'date-fns/locale/fa-IR';


export const LanguageContext = createContext(false);

export const LanguageContextProvider = ({children}) => {
    const {i18n} = useTranslation();

    const base_language = 'fa';
    const defaultDirection = languageConfigs[base_language].dir

    const defaultLanguage = get_language();
    const base_direction = defaultLanguage ? languageConfigs[defaultLanguage].dir : defaultDirection;

    const [language, set_language] = useState(() => {
        if (defaultLanguage === 'en' || defaultLanguage === 'fa') {
            return defaultLanguage
        }
        return base_language;
    });

    // console.log(language);

    const [direction, set_direction] = useState(base_direction);

    const values = useMemo(() => ({
        language,
        set_language,
        direction,
        set_direction,
        change_language: (lang) => {
            lang = lang.toLowerCase();
            set_language(lang)
            set_language_storage(lang)
            const dir = languageConfigs[lang].dir;
            set_direction(dir)
            set_direction_storage(dir)
        }
    }), [language, direction]);


    useEffect(() => {
        i18n.changeLanguage(language)
        document.dir = languageConfigs[language].dir;
    }, [language])

    return (
        <LocalizationProvider dateAdapter={language === 'fa' ? AdapterDateFnsJalali : AdapterDateFns} >
            <LanguageContext.Provider value={{...values}}>
                <I18nextProvider i18n={i18next}>
                    {children}
                </I18nextProvider>
            </LanguageContext.Provider>
        </LocalizationProvider>
    );
};

export const useLanguageContext = () => useContext(LanguageContext)
