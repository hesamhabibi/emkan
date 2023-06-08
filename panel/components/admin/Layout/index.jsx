import { useRouter } from "next/router"
import Head from "next/head"
import React, { useContext, useEffect, useRef, useState } from "react"
import Loadings from "~/app/Context/Loadings"
import { DeviceView, TranslationContext } from "~/app/Context"
import AdminStyle from "./admin.module.scss"
import Sidebar from "./sidebar"
import dynamic from "next/dynamic"
import { useDispatch, useSelector } from "react-redux"
import { destroyImage } from "~/app/State/preview"

const Navbar = dynamic(() => import("./navbar"), { ssr: false })

export default function AdminLayout({ children, title, action }) {
  const mobile = !useContext(DeviceView)
  const translation = useContext(TranslationContext)

  const preview = useSelector((state) => state.preview.value)
  const dispatch = useDispatch()

  const imageRef = useRef(null)

  const [settings, setSettings] = useState({})
  const [sidebarOpened, setSidebarOpened] = useState(!mobile)
  const sidebarRef = useRef(null)
  const navBtnRef = useRef(null)

  const router = useRouter()

  const previewClick = (e) => {
    if (imageRef.current && !imageRef.current.contains(e.target)) {
      dispatch(destroyImage())
    }
  }

  const updateTitle = () => {
    const settings = JSON.parse(localStorage.getItem("settings"))

    if (settings) {
      setSettings(settings)
    }
  }

  useEffect(() => {
    updateTitle()
    window.addEventListener("storage", updateTitle)

    return () => {
      window.removeEventListener("storage", updateTitle)
    }
  }, [])

  return (
    <Loadings>
      <div
        className={`${AdminStyle.imagePreview} ${
          preview ? AdminStyle.show : ""
        }`}
        onClick={previewClick}
      >
        <span>
          <i
            className="far fa-times ml-2"
            onClick={() => dispatch(destroyImage())}
          />
          {translation("Close")}
        </span>
        <img src={preview} alt="image preview" ref={imageRef} />
      </div>
      <div id={AdminStyle.adminLayout}>
        <Head>
          <title>{`${title || translation("Home")} | ${
            settings.shop_name || "پنل ادمین"
          }`}</title>
          <link
            rel="icon"
            href={process.env.apiHost + settings.panel_logo_image?.url}
          />
        </Head>
        <Sidebar
          logo={
            settings.panel_logo_image?.url
              ? process.env.apiHost + settings.panel_logo_image?.url
              : "/images/logo.png"
          }
          forwardedRef={sidebarRef}
          sidebar={sidebarOpened}
          translation={translation}
          close={() => setSidebarOpened(false)}
        />
        <Navbar
          forwardedRef={navBtnRef}
          title={title || translation("Home")}
          translation={translation}
          sidebar={sidebarOpened}
          key={router.pathname}
          action={action}
          setSidebar={() => setSidebarOpened(!sidebarOpened)}
        />
        <main className={sidebarOpened && !mobile ? null : AdminStyle.hidden}>
          {children}
        </main>
      </div>
    </Loadings>
  )
}
