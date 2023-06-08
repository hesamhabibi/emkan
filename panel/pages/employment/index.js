import {useContext, useEffect, useState} from "react"
import {LoadingContext, TranslationContext} from "~/app/Context"
import {useDispatch} from "react-redux"
import AdminLayout from "@admin/Layout"
import queries from "./queries"
import Fields from "./fields"
import Filter from "@admin/Filter"
import Pagination from "@admin/Pagination"
import Table from "@admin/Table"
import Styles from "./orders.module.scss"
import {openModal} from "~/app/State/modal"
import Modal from "@admin/Modal"
import {useRouter} from "next/router"
import client from "~/app/apollo-client"
import {Grid, GridContainer} from "@admin/Grid";
import { DeviceView } from "~/app/Context"

const Employment = () => {
    const translation = useContext(TranslationContext)
    const fireLoading = useContext(LoadingContext)

    const router = useRouter()

    const [data, setData] = useState({data: []})
    const [filter, setFilter] = useState({})
    const [employment_details, set_employment_details] = useState({fields: []})

    const isDesktop = useContext(DeviceView)


    const dispatch = useDispatch()


    const getPages = async (page = 1) => {
        fireLoading(true)
        let res = []
        try {
            res = await client.query({
                query: queries.all,
                variables: {
                    page: 1,
                    limit: 15,
                    filter,
                },
            })
            res = res.data
        } catch (e) {
            console.log(e)
        }
        return res
    }

    const filterPage = async (data) => {
        fireLoading(true)
        let res = []
        const createdAt = []
        try {
            if (data.to_date) {
                createdAt.push({
                    operator: "LessThanOrEqual",
                    value: `${data.to_date?.unix()}000`,
                })
            }
            if (data.from_date) {
                createdAt.push({
                    operator: "MoreThanOrEqual",
                    value: `${data.from_date?.unix()}000`,
                })
            }

            const filter = {
                user_name: data.user_name ? [{value: data.user_name}] : [],
                user_last_name: data.user_last_name ? [{value: data.user_last_name}] : [],
                user_email: data.user_email ? [{value: data.user_email}] : [],
                user_mobile: data.user_mobile ? [{value: data.user_mobile}] : [],
                createdAt,
            }

            setFilter(filter)

            res = await client.query({
                query: queries.all,
                variables: {
                    page: 1,
                    limit: 15,
                    filter,
                },
            })
            res = res.data
        } catch (e) {
            console.log(e)
        }
        setData(res.result)
        fireLoading(false)
    }

    useEffect(() => {

        let isMounted = true

        getPages(1).then((res) => {
            if (!isMounted) return
            setData(res.result)
            fireLoading(false)
        })

        return () => {
            isMounted = false
        }

    }, [])


    const get_employment_details = (row) => {
        dispatch(openModal("editForms"))
        set_employment_details(row)
    }


    return (
        <AdminLayout title={translation("employment")}>
            <Filter
                callback={(data) => filterPage(data)}
                inputs={Fields.filterFields(translation)}
                id="filters"
            />
            <Table
                className={(row) => (row.status === 0 ? Styles.bgRed : "")}
                data={data.data}
                fields={Fields.tableFields(translation, router.locale)}
                actions={Fields.tableActions({
                    detail: get_employment_details,
                })}
            />
            <Modal
                hasInfo={false}
                title={`${translation("employment_details")} ${employment_details?.user_name} ${employment_details.user_last_name}`}
                actions={[]}
                id="editForms"
            >
                <div className={Styles.wrapper}>

                    <div className="p-3">
                        <GridContainer className="text-right" gap="Lg">
                            <Grid size={isDesktop ? 3 : 12}>
                                {translation("name")} <br/>
                                <strong>{employment_details.user_name}</strong>
                            </Grid>
                            <Grid size={isDesktop ? 3 : 12}>
                                {translation("last_name")}<br/>
                                <strong>{employment_details.user_last_name}</strong>
                            </Grid>
                            <Grid size={isDesktop ? 3 : 12}>
                                {translation("email")}<br/>
                                <strong>{employment_details.user_email}</strong>
                            </Grid>
                            <Grid size={isDesktop ? 3 : 12}>
                                {translation("mobile")}<br/>
                                <strong>{employment_details.user_mobile}</strong>
                            </Grid>

                            {
                                employment_details.fields.map((item, index) => {

                                    return <Grid size={isDesktop ? item.size : 12}>
                                        {item.title_panel}<br/>
                                        <strong>
                                            {
                                                [1, 2, 3].includes(item.type) && item.value
                                            }
                                            {
                                                item.type === 4 && new Date(parseInt(item.value, 10))
                                                    .toLocaleString("fa")
                                                    .replace("،", " - ")
                                            }

                                            {
                                                // [5, 6].includes(item.type) && <a href={process.env.apiHost + item.value?.url} target="_blank">{item.title_panel} دانلود </a>
                                                [5, 6].includes(item.type) && <form target="_blank" method="post" action={process.env.apiHost + item.value?.url} enctype="multipart/form-data" ><input type="hidden" name="token" value={JSON.parse(localStorage.getItem("user"))?.token}></input><button type="submit">{item.title_panel} دانلود </button></form>
                                            }


                                        </strong>
                                    </Grid>

                                })
                            }
                        </GridContainer>
                    </div>

                </div>
            </Modal>
            <Pagination
                page={data.paginate?.page}
                getPage={getPages}
                pages={data.paginate?.pages}
            />
        </AdminLayout>
    )
}

export default Employment
