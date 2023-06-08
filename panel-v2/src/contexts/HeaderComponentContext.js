import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {useTranslation} from "react-i18next";

export const HeaderComponentContext = createContext(false);

export const HeaderComponentContextProvider = ({children}) => {

    const {t} = useTranslation();

    const [title_page, set_title_page] = useState();
    const [breadcrumbs, set_breadcrumbs] = useState([]);
    const [header_component,set_header_component] = useState();

    useEffect(()=>{
        document.title = t(title_page);
    },[title_page])


    const values = useMemo(() => ({
        title_page,
        set_title_page,
        breadcrumbs,
        set_breadcrumbs,
        header_component,
        set_header_component
    }), [title_page, breadcrumbs,header_component]);

    return (
        <HeaderComponentContext.Provider value={{...values}}>
            {children}
        </HeaderComponentContext.Provider>
    );
};

export const useHeaderComponentContext = () => useContext(HeaderComponentContext)
