import { combineReducers, createStore } from "@reduxjs/toolkit"
import badges from "./badges"
import collapse from "./collapse"
import modals from "./modal"
import popups from "./popups"
import tabs from "./tabs"
import preview from "./preview"

const reducer = combineReducers({
  badges,
  collapse,
  modals,
  popups,
  tabs,
  preview,
})

export default createStore(reducer)
