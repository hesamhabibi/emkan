import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import Footer from "./footer";
import {useFooterComponentContext} from "../../../contexts/FooterComponentContext";
import Filter from "./filter";
import {useDialogContext} from "../../../contexts/DialogContext";
import Index from "../../../components/no-content";
import LoadingTable from "./loading-table";
import TableData from "./table";

export default function Mobile({
                                   loading,
                                   data,
                                   data_option,
                                   filter_form,
                                   clear_form,
                                   write_form,
                                   apply_filter,
                                   write_option_data,
                                   delete_row,
                                   sort_handler,
                                   select_row,
                                   check_selected_item,
                                   selected_item,
                                   select_all_rows,
                                   check_selected_all_items,
                                   check_indeterminate
                               }) {

    const {t} = useTranslation();
    const {set_footer_component} = useFooterComponentContext();
    const {init_dialog} = useDialogContext();

    useEffect(() => {
        init_dialog({
            name: 'filterRole',
            component: <Filter
                {...({
                    write_form,
                    filter_form,
                    clear_form,
                    apply_filter,
                    data_option,
                    write_option_data
                })}
            />,
            open: false,
            title: t('common.filter')
        })
    }, [filter_form])

    useEffect(() => {
        set_footer_component(
            <Footer/>)
    }, [])

    return (
        <>
            {loading &&
                <LoadingTable
                    {...({
                        data,
                        data_option,
                        write_option_data,
                        loading,
                        select_row,
                        sort_handler,
                        check_selected_item,
                        selected_item,
                        select_all_rows,
                        check_selected_all_items,
                        check_indeterminate
                    })}
                />
            }

            {(!loading && data?.data?.length > 0) &&
                <TableData
                    {...({
                        loading,
                        data,
                        data_option,
                        write_option_data,
                        delete_row,
                        sort_handler,
                        select_row,
                        check_selected_item,
                        selected_item,
                        select_all_rows,
                        check_selected_all_items,
                        check_indeterminate
                    })}
                />
            }

            {(!loading && data?.data?.length === 0) &&
                <Index/>
            }
        </>

    )
}