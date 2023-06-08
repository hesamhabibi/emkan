import React, {useEffect, useState} from 'react';
import {BrowserView, MobileView} from "react-device-detect";
import Desktop from './desktop';
import Mobile from './mobile';
import {useHeaderComponentContext} from "../../contexts/HeaderComponentContext";
import {create_roles_service, edit_roles_service, single_role_service} from "../../services/roleService";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import {init_string_format} from "../../helpers/init_formats";

export default function Index() {
    const {set_title_page, set_breadcrumbs} = useHeaderComponentContext();
    const navigate = useNavigate()
    const {id} = useParams()
    const [search_params, set_search_params] = useSearchParams();
    const get_global_query_params = () => ({
        name: init_string_format(search_params.get('name'))
    })

    const [form, set_form] = useState(() => {
        const _get_global_query_params = get_global_query_params();
        return {
            name: _get_global_query_params['name'],
            errors: {}
        }
    });


    const write_form = (e) => {
        const {name, value} = e.target
        set_form(prev => ({...prev, [name]: value}))

        if (value?.toString()?.length > 0) {
            search_params.set(name, value);
            set_search_params(search_params, {replace: true});
        } else {
            if (search_params.has(name)) {
                search_params.delete(name);
                set_search_params(search_params, {replace: true});
            }
        }
    }

    const get_role = async () => {
        const result = await single_role_service({id});
        if (result.status) {
            set_form(prev => ({
                    ...prev,
                    name: prev?.name || result?.data?.role?.name,
                })
            )
        }
    }

    useEffect(() => {
        if (id) {
            get_role()
        }
    }, [id])

    const submit_role = async () => {
        let result;

        if (id) {
            result = await edit_roles_service({
                id,
                name: form?.name
            })
        } else {
            result = await create_roles_service({
                name: form?.name
            })
        }
        if (result?.status) {
            navigate(-1)
        } else {
            set_form(prev => ({
                ...prev,
                errors: result?.errors
            }))
        }
    }

    useEffect(() => {
        set_title_page('rolesTable.new-role')
        set_breadcrumbs([
            {
                title: 'common.home',
                link: '/'
            },
            {
                title: 'dashboardMenuItems.role_title',
                link: '/roles'
            },
            {
                title: 'rolesTable.new-role',
                link: '/roles-management'
            }
        ])

    }, [])

    return (
        <>
            <MobileView>
                <Mobile
                    {...({
                        form,
                        set_form,
                        write_form,
                        submit_role,
                        edit_mode: !!id
                    })}/>
            </MobileView>
            <BrowserView>
                <Desktop
                    {...({
                        form,
                        set_form,
                        write_form,
                        submit_role,
                        edit_mode: !!id
                    })}/>
            </BrowserView>
        </>
    )
}