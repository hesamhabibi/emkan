import { useRouter } from "next/router"
import React, { useState, useEffect, useRef, useContext } from "react"
import { DeviceView, LoadingContext, TranslationContext } from "~/app/Context"
import NavbarStyle from "./navbar.module.scss"
import queries from "./queries"
import client from "~/app/apollo-client"
import Button from "@admin/Button"
import { useSelector } from "react-redux"

export default function Navbar({
  forwardedRef,
  sidebar,
  setSidebar,
  action,
  title,
}) {
  const isMobile = !useContext(DeviceView)

  const badges = useSelector((state) => state.badges.value)

  const setLoading = useContext(LoadingContext)
  const translation = useContext(TranslationContext)

  const handleCloseClick = () => {
    setSidebar()
  }
  const [credentials, setCredentials] = useState({ name: "", email: "" })
  const [dropDownShow, setDropDownShow] = useState(false)
  const [bellShow, setBellShow] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  const dropdown = useRef(null)
  const bell = useRef(null)
  const router = useRouter()

  const logout = async () => {
    setLoading(true)
    try {
      await client.mutate({
        mutation: queries.logout,
      })

      localStorage.removeItem("user")
      localStorage.removeItem("menuAccess")
      localStorage.removeItem("web_languages")

      document.cookie = "token=;Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    } catch (e) {
      document.cookie = "token=;Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
    setLoading(false)
    await router.push(`/auth/login?redirect=${router.pathname}`)
  }

  const onClick = (e) => {
    if (dropdown.current && !dropdown.current.contains(e.target)) {
      setDropDownShow(false)
    }
    if (bell.current && !bell.current.contains(e.target) && bellShow)
      setBellShow(false)
  }

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      const sidebar = JSON.parse(localStorage.getItem("menuAccess"))

      if (sidebar) {
        setMenuItems(sidebar.filter((item) => item.badge_key))
      }

      if (user) {
        setCredentials({
          name: `${user?.user?.name || ""} ${user?.user?.last_name || ""} ${
            (!user?.user?.name &&
              !user?.user?.last_name &&
              user.user?.username) ||
            ""
          }`,
          email: user.user?.email,
        })
      }
    } catch (e) {
      router.push(`/auth/login?redirect=${router.pathname}`)
    }

    document.addEventListener("click", onClick)

    return () => {
      document.removeEventListener("click", onClick)
    }
  }, [bellShow])

  return (
    <header
      id={NavbarStyle.navbar}
      className={sidebar && !isMobile ? "" : NavbarStyle.hidden}
    >
      <nav>
        <button
          type="button"
          className={`${sidebar && isMobile ? NavbarStyle.active : ""} ${
            NavbarStyle.menuBtn
          } p-0`}
          onClick={handleCloseClick}
          ref={forwardedRef}
        >
          <span />
          <span />
          <span />
        </button>
        <h5 className="mr-3 font-weight-normal">
          {JSON.parse(localStorage.getItem("menuAccess_flat") || "[]").find(
            (item) => router.asPath === item.route
          )?.title || title}
        </h5>

        <div className="mr-auto d-flex align-items-center">
          {isMobile ? null : action}
          {/*<div className={`${NavbarStyle.relative} mx-3`}>*/}
          {/*  <i*/}
          {/*    onClick={setBellShow.bind(this, !bellShow)}*/}
          {/*    className={`${NavbarStyle.notifications} far fa-bell`}*/}
          {/*  >*/}
          {/*    {!!Object.keys(badges).filter((item) => badges[item]).length && (*/}
          {/*      <span className={NavbarStyle.pulse} />*/}
          {/*    )}*/}
          {/*  </i>*/}

          {/*  <div*/}
          {/*    ref={bell}*/}
          {/*    className={`${NavbarStyle.dropdown} ${*/}
          {/*      bellShow ? NavbarStyle.show : ""*/}
          {/*    } ${NavbarStyle.badgeDropDown}`}*/}
          {/*  >*/}
          {/*    <div className={`${NavbarStyle.header} text-center px-3`}>*/}
          {/*      {(() => {*/}
          {/*        const count = Object.keys(badges).filter(*/}
          {/*          (item) => badges[item]*/}
          {/*        ).length*/}

          {/*        return count ? (*/}
          {/*          <>*/}
          {/*            <p className="mb-0 font-weight-medium">*/}
          {/*              {count}*/}
          {/*              {translation("new notifications")}*/}
          {/*            </p>*/}
          {/*            <hr />*/}
          {/*          </>*/}
          {/*        ) : (*/}
          {/*          <p className="m-0 pt-1">{translation("no new notifications")}</p>*/}
          {/*        )*/}
          {/*      })()}*/}
          {/*    </div>*/}
          {/*    <div className={NavbarStyle.body}>*/}
          {/*      {Object.keys(badges)*/}
          {/*        .filter((item) => badges[item])*/}
          {/*        .map((item, key) => (*/}
          {/*          <a*/}
          {/*            onClick={() =>*/}
          {/*              router.push(*/}
          {/*                menuItems.find((badge) => badge.badge_key === item)*/}
          {/*                  ?.route*/}
          {/*              )*/}
          {/*            }*/}
          {/*            key={key}*/}
          {/*            className={NavbarStyle.item}*/}
          {/*          >*/}
          {/*            <div className={NavbarStyle.icon}>{badges[item]}</div>*/}
          {/*            <p className="mb-0">*/}
          {/*              {*/}
          {/*                menuItems.find((badge) => badge.badge_key === item)*/}
          {/*                  ?.title*/}
          {/*              }*/}
          {/*            </p>*/}
          {/*            /!*<p className={`${NavbarStyle.subText} text-muted`}>*!/*/}
          {/*            /!*  2 ثانیه قبل*!/*/}
          {/*            /!*</p>*!/*/}
          {/*          </a>*/}
          {/*        ))}*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className={`p-0 d-flex mr-2 ${NavbarStyle.relative}`}>
            <Button
              options={{ ref: dropdown }}
              type="white"
              className={`d-flex align-items-center ${NavbarStyle.profile}`}
              onClick={() => setDropDownShow(!dropDownShow)}
            >
              <div className={`mx-2 text-right ${NavbarStyle.info}`}>
                {translation("user panel")}
              </div>
              <i
                className={`far fa-angle-down ${
                  dropDownShow ? "fa-rotate-180" : ""
                } mr-1`}
              />
            </Button>
            <div
              className={`${NavbarStyle.dropdown} ${
                dropDownShow ? NavbarStyle.show : ""
              }`}
            >
              <div
                className={`${NavbarStyle.header} d-flex align-items-center`}
              >
                <div className="mb-3">
                  <img src="/images/not-found.png" alt="profile image" />
                </div>
                <div className="text-center">
                  <p className={`${NavbarStyle.name} mb-0`}>
                    {credentials.name}
                  </p>
                  <p className={`${NavbarStyle.email} text-muted mb-3`}>
                    {credentials.email}
                  </p>
                  <hr />
                </div>
              </div>

              <div>
                <ul className={`${NavbarStyle.body} p-0`}>
                  {/*<li className={NavbarStyle.navItem}>*/}
                  {/*  <a className={NavbarStyle.navLink}>*/}
                  {/*    <i className="far fa-user ml-3" />*/}
                  {/*    <span>پروفایل</span>*/}
                  {/*  </a>*/}
                  {/*</li>*/}
                  {/*<li className={NavbarStyle.navItem}>*/}
                  {/*  <a className={NavbarStyle.navLink}>*/}
                  {/*    <i*/}
                  {/*      className="far fa-user-edit ml-3"*/}
                  {/*      style={{ marginRight: -5 }}*/}
                  {/*    />*/}
                  {/*    <span>ویرایش پروفایل</span>*/}
                  {/*  </a>*/}
                  {/*</li>*/}
                  <li className={NavbarStyle.navItem}>
                    <a onClick={logout} className={NavbarStyle.navLink}>
                      <i className="far fa-arrow-from-left ml-3" />
                      <span>{translation("logout")}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
