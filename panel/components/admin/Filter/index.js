import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { DeviceView } from "~/app/Context"
import { close } from "~/app/State/collapse"
import Mobile from "./mobile"
import Desktop from "./desktop"

export default function Filter({ id, callback, defaultValues, ...props }) {
  const isDesktop = useContext(DeviceView)
  const dispatch = useDispatch()

  const [collapse, setCollapse] = useState(false)

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
  })

  const clearFilters = () => {
    reset()
    handleSubmit(callback)()
    dispatch(close(id))
    setCollapse(false)
  }

  const changeFilter = () => {
    dispatch(close(id))
    handleSubmit(callback)()
    setCollapse(false)
  }

  return isDesktop ? (
    <Desktop
      {...props}
      id={id}
      changeFilter={changeFilter}
      clearFilters={clearFilters}
      setCollapse={setCollapse}
      control={control}
      collapse={collapse}
      handleSubmit={handleSubmit}
    />
  ) : (
    <Mobile
      {...props}
      id={id}
      changeFilter={changeFilter}
      clearFilters={clearFilters}
      control={control}
      collapse={collapse}
      setCollapse={setCollapse}
      handleSubmit={handleSubmit}
    />
  )
}

Filter.defaultProps = {
  id: "filters",
}
