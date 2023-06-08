import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import DialogComponent from "../components/dialog";

export const DialogContext = createContext(false);

export const DialogContextProvider = ({children}) => {

    const max_deep_of_dialog_list = (dialog_list) => Math.max(...dialog_list.map(item => item?.deep))
    const _check_open_dialog = () => max_deep_of_dialog_list(dialog_list) > 0;

    const [dialog_list, set_dialog_list] = useState([]);
    const [check_open_dialog, set_check_open_dialog] = useState(() => _check_open_dialog());


    useEffect(() => {
        set_check_open_dialog(_check_open_dialog())
    }, [dialog_list])


    const init_dialog = obj => {
        set_dialog_list((prev) => {
            const exists_names = prev?.map(item => item?.name);
            if (!exists_names.includes(obj.name)) {
                obj.deep = 0
                return [...prev, obj];
            }
            const index = prev?.findIndex(item => item.name === obj.name);
            const values = [...prev];
            values[index]['component'] = {...obj.component};
            return [...values];
        })
    }

    const dialog_open_handler = (name, open, data = {}) => {
        set_dialog_list(prev => {
            prev.forEach((item, index) => {
                if (name === item.name) {
                    prev[index]['open'] = open;
                    const last_deep = max_deep_of_dialog_list(prev);
                    prev[index]['data'] = {...data};
                    if (open) {
                        prev[index]['deep'] = last_deep + 1
                    } else {
                        prev[index]['deep'] = last_deep - 1
                    }
                }
            })
            return [...prev];
        })
    }

    const dialog_close_last_deep = () => {
        const last_deep = max_deep_of_dialog_list(dialog_list);
        set_dialog_list(prev => {
            prev.forEach((item, index) => {
                if (last_deep === item.deep && item.open) {
                    prev[index]['open'] = false;
                    prev[index]['deep'] = 0
                }
            })
            return [...prev];
        })
    }

    const dialog_title = () => {
        const last_deep = max_deep_of_dialog_list(dialog_list);
        for (let i = 0; i < dialog_list?.length; i++) {
            if (dialog_list[i].deep === last_deep && dialog_list[i].open) {
                return dialog_list[i]?.title
                break;
            }
        }
    }

    const values = useMemo(() => ({
        dialog_list,
        set_dialog_list,
        check_open_dialog,
        set_check_open_dialog,
        init_dialog,
        dialog_open_handler,
        dialog_close_last_deep,
        dialog_title
    }), [dialog_list, check_open_dialog]);

    return (
        <DialogContext.Provider value={{...values}}>
            {dialog_list?.map((item, key) =>
                <DialogComponent
                    key={`dialog-${item?.name}-${key}`}
                    name={item?.name}
                    type={item?.type}
                    data={{...item?.data}}
                    {...({
                        open: item?.open,
                        set_open: dialog_open_handler,
                    })}
                >
                    {item?.component && item?.component}
                </DialogComponent>
            )}
            {children}
        </DialogContext.Provider>
    );
};

export const useDialogContext = () => useContext(DialogContext)
