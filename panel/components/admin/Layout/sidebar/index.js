import {useEffect, useContext, useState, useRef} from "react"
import {useDispatch, useSelector} from "react-redux"
import {gql} from "@apollo/client"
import Link from "next/link"
import {useRouter} from "next/router"
import Image from "next/image"
import {make_tree} from "~/app/Tree"
import Collapse from "@admin/Collapse"
import AsideStyle from "./sidebar.module.scss"
import client from "~/app/apollo-client"
import {DeviceView} from "~/app/Context"
import {toggle as Toggle} from "~/app/State/collapse"
import {init} from "~/app/State/badges"

export default function Sidebar({forwardedRef, sidebar, close, logo}) {
    const isMobile = !useContext(DeviceView)
    const dispatch = useDispatch()
    const router = useRouter()
    const badges = useSelector((state) => state.badges.value)

    const {asPath} = useRouter()
    const [menuItems, setMenuItems] = useState([])
    const [loading, setLoading] = useState(true)

    const sideBar = useRef(null)

    const getBadges = async (data) => {
        try {
            const res = await client.query({
                query: gql`
          query ($keys: [String]) {
            result: getBadges(keys: $keys)
          }
        `,
                variables: {
                    keys: data.map((item) => {
                        return item.badge_key
                    }),
                },
            })
            // Object.keys(res.data.result).forEach((item) => {
            //   dispatch(init(res.data.result[item]))
            // })
            dispatch(init(res.data.result))
        } catch (e) {
            console.log(e)
        }
    }

    const getMenuItems = async () => {
        try {
            const res = await client.query({
                query: gql`
          query {
            result: getMenuItemsByAccess {
              id
              title
              icon
              route
              badge_key
              columns
              parent_id
              child_access_components_keys
              actions
              fields
            }
            panel_logo_image: getSettingByKey(key: "panel_logo_image") {
              parsed_value
            }
            title: getSettingByKey(key: "shop_name") {
              parsed_value
            }
          }
        `,
                fetchPolicy: "cache-first",
            })
            localStorage.setItem("menuAccess_flat", JSON.stringify(res.data.result))

            localStorage.setItem(
                "settings",
                JSON.stringify({
                    image: res.data.image.parsed_value,
                    title: res.data.title.parsed_value,
                })
            )
            getBadges(res.data.result)
            const treeItems = make_tree(res.data.result)
            setMenuItems(treeItems)
            localStorage.setItem("menuAccess", JSON.stringify(treeItems))
        } catch (e) {
            router.push(`/auth/login?redirect=${router.asPath}`)
        }
        setLoading(false)
    }

    const toggle = (index) => {
        dispatch(Toggle(`side-menu${index}`))
        const item = document.querySelector(`#collapse-menu${index}`)
        if (!item) return setTimeout(toggle.bind(this, index), 100)
        item.classList.toggle("fa-rotate-180")
    }

    const findMenu = (items) => {
        if (items.children.length) return Boolean(items.children.find(findMenu))
        return items.route === asPath
    }

    const ChildMenu = ({item, index}) => {
        if (!item.children?.length && item.route) {
            return (
                <li key={`sidebar-${index}`}>
                    <Link href={item.route} activeClassName="active">
                        <a
                            className={
                                asPath === item.route ? AsideStyle.activeLinkClass : null
                            }
                        >
              <span>
                {item.parent_id ? null : (
                    <i className={`${item.icon} ml-2 fa-fw`}/>
                )}
                  {item.title}
              </span>
                            {Boolean(item.badge_key) && (
                                <div className={AsideStyle.badge}>
                                    {badges[item.badge_key] ?? 0}
                                </div>
                            )}
                        </a>
                    </Link>
                </li>
            )
        }

        return (

            <li key={`sidebar-child-${index}`}>
                <a onClick={toggle.bind(this, index)}>
          <span>
            {item.parent_id ? null : (
                <i className={`${item.icon} ml-2 fa-fw`}/>
            )}
              {item.title}
          </span>
                    <i
                        id={`collapse-menu${index}`}
                        className={`far fa-angle-down fa-1x`}
                    />
                </a>
                <Collapse
                    openDefault={item.children.find((it) => it.route === asPath)}
                    id={`side-menu${index}`}
                >
                    <ul className={AsideStyle.childrenSidebar}>
                        {item.children.map((child, index1) => (
                            <ChildMenu
                                item={child}
                                key={`${index}-${index1}`}
                                index={`${index}-${index1}`}
                            />
                        ))}
                    </ul>
                </Collapse>
            </li>
        )
    }

    const menu = menuItems.map((item, key) => (
        <>
            {!item.title.startsWith("_hidden") && <ChildMenu item={item} key={key} index={key}/>}
        </>
    ))

    const clickClose = () => close()

    useEffect(() => {
        const sidebarApps = localStorage.getItem("menuAccess")
        if (sidebarApps) {
            const items = JSON.parse(sidebarApps)
            setMenuItems(items)
            getBadges(items)
            setLoading(false)
        } else {
            getMenuItems()
        }
    }, [])

    useEffect(() => {
        if (sideBar.current) sideBar.current.addEventListener("click", clickClose)

        return () => {
            if (sideBar.current)
                sideBar.current.removeEventListener("click", clickClose)
        }
    }, [isMobile])

    return (
        <>
            <aside
                id={AsideStyle.sidebar}
                className={sidebar ? "" : AsideStyle.hidden}
                ref={forwardedRef}
            >
                <section className={`${AsideStyle.logo}`}>
                    <Link href="/">
                        <a>
                            <img src={logo} width="150" height="70" alt="info bank logo"/>
                        </a>
                    </Link>
                </section>

                <section className={AsideStyle.menu}>
                    {loading ? null : (
                        <ul className="p-0 mt-3 list-style-type-none">{menu}</ul>
                    )}
                </section>
            </aside>
            {isMobile ? <div id={AsideStyle.bgAside} ref={sideBar}/> : null}
        </>
    )
}
