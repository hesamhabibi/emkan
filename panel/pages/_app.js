import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import { DeviceView, InfoContext, RootElement } from "~/app/Context"
import { getSettingsByKey } from "~/app/global"
import ErrorBoundary from "~/app/Helpers/ErrorHandler"
import store from "~/app/State"
import client from "~/app/apollo-client"
import Translation from "~/app/Context/Translation"
import Toast from "~/app/Context/Toast"
import Loadings from "~/app/Context/Loadings"
import User from "~/app/Context/User"
import MobileDetect from "mobile-detect"

import "~/styles/default.scss"

const mobileStyles = (
  <style jsx="true">{`
    :root {
      font-size: 14px;
    }

    h4,
    h3 {
      font-size: 1.2rem;
    }

    h2,
    h1 {
      font-size: 1.4rem;
    }

    h5,
    h6 {
      font-size: 1rem;
    }
  `}</style>
)

export default function MyApp({ Component, pageProps, breakpoint }) {
  const [isDesktop, setIsDesktop] = useState(breakpoint)

  const getSettings = async (key) => {
    try {
      return await client.query({
        query: getSettingsByKey,
        variables: { key },
      })
    } catch (e) {
      console.log(e)
    }
  }

  const heightChange = () => {
    const md = !new MobileDetect(navigator.userAgent).isPhoneSized()
    setIsDesktop(md)
    localStorage.setItem("template", JSON.stringify(md))
  }

  useEffect(() => {
    localStorage.setItem("template", JSON.stringify(breakpoint))
    if (!localStorage.getItem("web_languages")) {
      getSettings("web_content_languages").then((res) => {
        localStorage.setItem(
          "web_default_language",
          JSON.stringify(res.data.web_language.value)
        )
        localStorage.setItem(
          "web_languages",
          JSON.stringify(res.data.result.value)
        )
      })
    }
    if (!localStorage.getItem("panel_languages")) {
      getSettings("panel_content_languages").then((res) => {
        localStorage.setItem(
          "web_default_language",
          JSON.stringify(res.data.web_language.value)
        )
        localStorage.setItem(
          "panel_languages",
          JSON.stringify(res.data.result.value)
        )
      })
    }

    window.addEventListener("resize", heightChange)

    return () => {
      window.removeEventListener("resize", heightChange)
    }
  }, [])

  return (
    <ErrorBoundary>
      {!!isDesktop || mobileStyles}
      <Loadings>
        <User>
          <Provider store={store}>
            <Translation>
              <DeviceView.Provider value={isDesktop}>
                <Toast>
                  <InfoContext.Provider value={true}>
                    <Component {...pageProps} />
                  </InfoContext.Provider>
                </Toast>
              </DeviceView.Provider>
            </Translation>
          </Provider>
        </User>
      </Loadings>
    </ErrorBoundary>
  )
}

MyApp.getInitialProps = async function (ctx) {
  if (typeof window === "undefined") {
    const DeviceDetect = eval('require("node-device-detector")')
    const device = new DeviceDetect()
    const {
      device: { type },
    } = device.detect(ctx.ctx.req.headers["user-agent"])
    const breakpoint = [
      true,
      type === "tablet",
      type === "desktop",
    ].lastIndexOf(true)

    return {
      breakpoint: breakpoint !== 0,
    }
  }
  return {
    breakpoint: JSON.parse(localStorage.getItem("template")),
  }
}
