import { useContext, useEffect, useState } from "react"
import { LoadingContext, ToastContext, TranslationContext } from "~/app/Context"
import { Grid } from "@admin/Grid"
import Section from "../section"
import queries from "./queries"
import client from "~/app/apollo-client"
import Button from "@admin/Button"
import Popup from "@admin/Popup"
import Input from "@admin/Input"
import Styles from "./tutorials.module.scss"
import { useForm } from "react-hook-form"
import { closePopup, openPopup } from "~/app/State/popups"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import Alert from "@admin/Alert"

export default function Tutorials({
  control,
  getValues,
  setValue,
  info,
  setInfo,
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const fireToast = useContext(ToastContext)
  const setLoading = useContext(LoadingContext)

  const locale = useRouter().locale

  const [callback, setCallback] = useState(() => {})
  const [data, setData] = useState({})
  const [tutorials, setTutorials] = useState(getValues("tutorials") || [])

  const form = useForm()

  const getData = async () => {
    setLoading(true)
    try {
      return await client.query({
        query: queries.getFiles,
      })
    } catch {}
  }

  useEffect(() => {
    let isMounted = true
    getData().then((res) => {
      if (!isMounted) return
      setLoading(false)
      setData(res?.data || {})
    })

    return () => {
      isMounted = false
    }
  }, [])

  function updateData(data) {
    setValue("tutorials", data)
  }

  useEffect(() => {
    updateData(tutorials)
  }, [tutorials])

  function createModal() {
    form.reset({})
    dispatch(openPopup("tutorials"))
    setCallback(() => createInstance)
  }

  function createInstance(data) {
    let hasError = false
    if (!data.title?.fa) {
      form.setError("title.fa", {
        message: translation("required"),
        type: "required",
      })
      hasError = true
    }
    if (!data.title?.en) {
      form.setError("title.en", {
        message: translation("required"),
        type: "required",
      })
      hasError = true
    }
    if (hasError) return

    setTutorials((prev) => {
      return [...prev, { ...data, user_access_ids: [] }]
    })
    fireToast(translation("Operation Completed Successfully"), {
      status: "success",
    })
    dispatch(closePopup("tutorials"))
  }

  const actions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => {
        dispatch(closePopup("tutorials"))
        dispatch(closePopup("tutorial-access"))
      },
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: form.handleSubmit(callback),
    },
  ]

  function editInstance({ key }, data) {
    setTutorials((prev) => {
      prev[key] = data
      return [...prev]
    })
    dispatch(closePopup("tutorials"))
    fireToast(translation("Operation Completed Successfully"), {
      status: "success",
    })
  }

  const editModal = ({ item, key }) => {
    form.reset(item)
    setCallback(() => editInstance.bind(this, { key }))
    dispatch(openPopup("tutorials"))
  }

  const deleteOption = (key) => {
    setTutorials((prev) => {
      prev.splice(key, 1)
      return [...prev]
    })
    fireToast(translation("Operation Completed Successfully"), {
      status: "success",
    })
  }

  function updateAccess(key, data) {
    setTutorials((prev) => {
      prev[key] = data
      return [...prev]
    })
    dispatch(closePopup("tutorial-access"))
  }

  function access_users(key) {
    form.reset({ ...tutorials[key] })
    setCallback(() => updateAccess.bind(this, key))
    dispatch(openPopup("tutorial-access"))
  }

  return (
    <>
      <Popup
        actions={actions}
        title={translation("Add Tutorial", "products")}
        status="info"
        id="tutorials"
      >
        <Input
          label={translation("title")}
          control={form.control}
          name="title"
          type="multi-language"
          gridSize={12}
        />
        <div className="mt-3">
          <Input
            label={translation("file")}
            control={form.control}
            name="file_key"
            type="select-searchable"
            data={
              data.result?.value?.map((item) => ({
                name: item.title,
                id: item.key,
              })) || []
            }
          />
        </div>
      </Popup>
      <Popup
        id="tutorial-access"
        title={translation("access users", "products")}
        status="info"
        actions={actions}
      >
        <div className={Styles.popup}>
          <Input
            control={form.control}
            name="user_access_ids"
            type="select-multiple"
            label={translation("accessed users", "products")}
            data={data?.users || []}
          />
        </div>
      </Popup>
      <Section>
        <Grid size={12}>
          <h5
            className={`d-flex align-items-center align-items-center justify-content-between ${Styles.header}`}
          >
            {translation("Tutorial", "products")}
            <div
              onClick={setInfo.bind(null, !info)}
              className={`mr-auto ml-2 ${!info ? Styles.active : ""}`}
            >
              <i className="fad fa-question-circle fa-lg" />
            </div>
            <span>
              <Button type="primary" onClick={createModal}>
                <i className="fas fa-plus-circle ml-1" />
                {translation("Add Tutorial", "products")}
              </Button>
            </span>
          </h5>
        </Grid>
        {info && (
          <Grid size={12}>
            <Alert className="text-justify" type="info">
              {translation("tutorial_info", "products")}
            </Alert>
          </Grid>
        )}

        <Grid size={12}>
          {tutorials.map((item, key) => (
            <div className={Styles.container} key={key}>
              <span>
                <i className="fas fa-circle ml-3 fa-sm" />
                {item.title[locale]}
              </span>
              <span>
                <span data-tooltip={translation("tutorial access", "products")}>
                  <i
                    className="fal fa-universal-access"
                    onClick={access_users.bind(this, key)}
                  />
                </span>
                <span data-tooltip={translation("edit tutorial", "products")}>
                  <i
                    onClick={editModal.bind(this, { item, key })}
                    className="far fa-edit mr-2"
                  />
                </span>
                <span data-tooltip={translation("delete tutorial", "products")}>
                  <i
                    onClick={deleteOption.bind(this, key)}
                    className="far fa-trash-alt mr-2"
                  />
                </span>
              </span>
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}
