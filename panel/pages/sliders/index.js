import Fields from "./fields"
import queries from "./queries"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"
import { useContext, useEffect, useState } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import dynamic from "next/dynamic"
import { useApolloClient } from "~/app/Hooks/Api"
import Pagination from "@admin/Pagination"
import { useDispatch } from "react-redux"
import ModalForms from "@admin/Forms"
import { useForm } from "react-hook-form"
import AddBtn from "@admin/CrudLayout/Add"
import { openModal } from "~/app/State/modal"
import Slider from "./Slider"
import { useMutation } from "~/app/Hooks"
import Popup from "@admin/Popup"
import { closePopup, openPopup } from "~/app/State/popups"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Shield from "@admin/Shield"

const Filter = dynamic(() => import("./components"), { ssr: false })

const Sliders = () => {
  const translation = useContext(TranslationContext)
  const fireToast = useContext(ToastContext)

  const { getPage } = useApolloClient()
  const fireLoading = useContext(LoadingContext)
  const dispatch = useDispatch()
  const [fields, setFields] = useState(() => Fields.sliderFields)
  const [action, setAction] = useState(() => {})

  const { reset, control, handleSubmit, setError, clearErrors } = useForm()

  // States
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({})
  const [data, setData] = useState({ data: [] })
  const [title, setTitle] = useState("")

  const filterPage = async (data) => {
    fireLoading(true)
    setFilter(data)
    return await getPage({
      page: 1,
      limit: 15,
      fields: data,
      query: queries.all,
      exactFields: [],
    })
  }

  const { mutate } = useMutation({
    setData,
    setError,
    id: "editForms",
    setLoading,
    clearErrors,
  })

  // ---- useEffects
  useEffect(() => {
    let isMounted = true
    filterPage({}).then((res) => {
      if (!isMounted) return
      setData(res.result)
      fireLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const getNextPage = async (page) => {
    fireLoading(true)
    const res = await getPage({
      page,
      limit: 15,
      fields: filter,
      query: queries.all,
      exactFields: [],
    })
    setData(res.result)
    fireLoading(false)
  }

  function createImage(item) {
    setTitle(translation("Add Image"))
    setFields(() => Fields.imageField)
    setAction(() => storeImage)
    reset({ id: item.id })
    dispatch(openModal("editForms"))
  }

  async function storeSlider(data) {
    // console.log(data)
    await mutate({
      mutation: queries.create,
      variables: { input: data },
      action: "create",
    })

    // setData((prev) => {
    //   prev.data.push(res.res.data.result)
    //   return { ...prev }
    // })
  }

  function createSlider() {
    setTitle(translation("Add Slider"))
    setFields(() => Fields.sliderFields)
    setAction(() => storeSlider)
    reset({ status: 1 })
    dispatch(openModal("editForms"))
  }

  async function storeImage(data) {
    const input = { ...data, id: undefined }

    const res = await mutate({
      mutation: queries.createImage,
      variables: { input, id: data.id },
    })

    if (!res.status) return

    setData((prev) => {
      const index = prev.data.findIndex((item) => item.id === data.id)
      prev.data[index].images.push(
        res.res.data.result.images[res.res.data.result.images.length - 1]
      )

      return { ...prev }
    })
  }

  async function updateImage(data) {
    const input = {
      ...data,
    }

    const res = await mutate({
      mutation: queries.updateImage,
      variables: {
        input: filterFields({ data: input, fields: Fields.imageAllowed }),
        id: data.id,
        image_id: data.image_id,
      },
      action: "edit",
    })

    if (res.status) await getNextPage(1)
  }

  function editImage(key, item) {
    reset({
      ...item,
      id: data.data[key].id,
      image_id: item.id,
      image: { url: item.url, media_id: item.media_id, alt: item.alt },
    })
    setTitle(translation("Edit Slider"))
    setAction(() => updateImage)
    setFields(() => Fields.imageField)
    dispatch(openModal("editForms"))
  }

  async function updateSlider(data) {
    await mutate({
      mutation: queries.update,
      variables: {
        input: {
          ...filterFields({ data, fields: Fields.allowed }),
          id: undefined,
          images: undefined,
        },
        id: data.id,
      },
    })
  }

  function editSlider(data) {
    reset(data)
    setTitle(translation("Edit Slider"))
    setAction(() => updateSlider)
    setFields(() => Fields.sliderFields)
    dispatch(openModal("editForms"))
  }

  async function destroySlider(data) {
    await mutate({
      mutation: queries.delete,
      variables: data,
      action: "delete",
    })
  }

  function deleteSlider(item) {
    reset({ id: item.id })
    dispatch(openPopup("delete-action"))
    setAction(() => destroySlider)
  }

  async function destroyImage(data) {
    const { key } = data
    await mutate({
      mutation: queries.deleteImage,
      action: "",
      variables: { ...data, key: undefined },
    })
    dispatch(closePopup("delete-action"))
    setData((prev) => {
      const child = prev.data[key].images.findIndex(
        (item) => item.id === data.image_id
      )
      prev.data[key].images.splice(child, 1)
      return { ...prev }
    })
  }

  function deleteImage(key, item) {
    reset({ image_id: item.id, id: data.data[key].id, key })
    dispatch(openPopup("delete-action"))
    setAction(() => destroyImage)
  }

  const deleteActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("delete-action")),
    },
    {
      background: "#e40031",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: handleSubmit(action),
    },
  ]

  return (
    <AdminLayout
      action={
        <Shield id="sliders_create_action" action>
          <Button type="success" onClick={createSlider}>
            {translation("Add Slider")}
            <i className="fas fa-plus-circle mr-2" />
          </Button>
        </Shield>
      }
      title={translation("Sliders")}
    >
      <Filter
        inputs={Fields.filterFields(translation)}
        filterPage={filterPage}
        fireLoading={fireLoading}
        setData={setData}
        section="sliders"
        id="filters"
      />

      <Slider
        getNextPage={getNextPage}
        data={data.data}
        setData={setData}
        actions={{
          deleteSlider: deleteSlider,
          deleteImage: deleteImage,
          editSlider: editSlider,
          editImage: editImage,
          create: createImage,
        }}
      />

      <Shield id="sliders_create_action" action>
        <AddBtn callback={createSlider} title={translation("Add Slider")} />
      </Shield>
      <Pagination
        page={data.paginate?.page}
        getPage={getNextPage}
        pages={data.paginate?.pages}
      />

      <ModalForms
        form={fields(translation)}
        callback={handleSubmit(action)}
        loading={loading}
        id="editForms"
        state={title}
        control={control}
      />
      <Popup
        status="danger"
        id="delete-action"
        actions={deleteActions}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </AdminLayout>
  )
}

export default Sliders
