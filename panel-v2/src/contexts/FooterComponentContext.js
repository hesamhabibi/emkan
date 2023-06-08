import {createContext, useContext, useMemo, useState} from 'react';

export const FooterComponentContext = createContext(false);

export const FooterComponentContextProvider = ({children}) => {


    const [footer_component,set_footer_component] = useState();

    const values = useMemo(() => ({
        footer_component,
        set_footer_component,
    }), [footer_component]);

    return (
        <FooterComponentContext.Provider value={{...values}}>
            {children}
        </FooterComponentContext.Provider>
    );
};

export const useFooterComponentContext = () => useContext(FooterComponentContext)
