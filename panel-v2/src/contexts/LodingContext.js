import {createContext, useContext, useEffect, useMemo, useState} from 'react';

export const LoadingContext = createContext(false);
export const LoadingContextProvider = ({children}) => {

    const [loading, set_loading] = useState(false);

    const values = useMemo(() => ({loading, set_loading}), [loading]);

    useEffect(() => {
        window.set_loading = set_loading
    }, [])

    return (
        <LoadingContext.Provider value={{...values}}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => useContext(LoadingContext)

