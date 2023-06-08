import React, { useEffect, useState } from "react"
import TabStyle from "./tab.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { switchTab } from "~/app/State/tabs"
import { Transition } from "react-transition-group"

const Tab = ({ children, id, className, sticky, forwardRef}) => {
  if (!Array.isArray(children)) children = [children]

  const dispatch = useDispatch()

  const activeTabIndex = useSelector((state) => state.tabs.value[id]?.tab || 0)

  const [toggle, setToggle] = useState(true)

  const activeTab = children.filter((child) => child)[activeTabIndex]

  const [styleBorder, setStyleBorder] = useState({
    right: "1rem",
    left: `calc(${
      children.filter((child) => child).length - 1
    } * ((100% - 2rem) / ${children.filter((child) => child).length}) + 1rem)`,
  })

  const handleChangeTab = (key) => {
    setStyleBorder({
      right: `calc(${key} * ((100% - 2rem) / ${
        children.filter((child) => child).length
      }) + 1rem)`,
      left: `calc(${
        children.filter((child) => child).length - 1 - key
      } * ((100% - 2rem) / ${
        children.filter((child) => child).length
      }) + 1rem)`,
      transition: "right 0.2s,left 0.2s",
    })
  }

  useEffect(() => {
    handleChangeTab(activeTabIndex)
    setToggle(false)
    setTimeout(() => setToggle(true), 500)
    return () => {
      setToggle(false)
    }
  }, [activeTabIndex, children])

  useEffect(() => {
    dispatch(switchTab({ id, tab: 1 }))
  }, [])

  const animateEnter = (element) => {
    element.classList.add(TabStyle.entering)
  }

  const animateExit = (element) => {
    element.classList.add(TabStyle.exiting)
  }

  return (
    <>
      <section
        className={`${TabStyle.tabLink} ${sticky ? TabStyle.sticky : ""}`}
      >
        {children
          .filter((child) => child)
          .map((tab, key) => {
            return (
              <button
                type="button"
                onClick={() => dispatch(switchTab({ id, data: { tab: key } }))}
                className={`${activeTabIndex === key ? TabStyle.active : ""} ${
                  TabStyle[`tab-${tab.props.color}`]
                }`}
                key={key}
              >
                {tab.props.icon ? (
                  <i className={`far fa-lg ${tab.props.icon}`} />
                ) : (
                  ""
                )}
                {tab.props.title}
              </button>
            )
          })}
        <span className={TabStyle.border} style={styleBorder} />
      </section>
      <section
        key={activeTabIndex}
        className={`${TabStyle.tabContent} ${className}`}
      >
        <Transition
          onEntering={animateEnter}
          onExit={animateExit}
          timeout={500}
          unmountOnExit
          in={toggle}
        >
          <div ref={forwardRef}>
            {Boolean(activeTab) && activeTab.props.children}
          </div>
        </Transition>
      </section>
    </>
  )
}

Tab.defaultProps = {
  className: "",
}

export default Tab
