import { useEffect, useState, useContext } from "react"
import { useForm } from "react-hook-form"
import queries from "./queries"
import { useApolloClient } from "~/app/Hooks/Api"
import Fields from "./fields"
import ModalForms from "@admin/Forms"
import Button from "@admin/Button"
import Popup from "@admin/Popup"
import { useDispatch, useSelector } from "react-redux"
import Perm from "@admin/Shield"
import Styles from "./tags.module.scss"
import { TranslationContext, LoadingContext } from "~/app/Context"
import Collapse from "@admin/Collapse"
import AddBtn from "@admin/CrudLayout/Add"
import { useMutation } from "~/app/Hooks"
import AdminLayout from "@admin/Layout"
import { filterFields } from "~/app/Helpers/MutationHandler"
import { closeModal, openModal } from "~/app/State/modal"
import { closePopup, openPopup } from "~/app/State/popups"
import { toggle } from "~/app/State/collapse"
import Tab from "@admin/Tab"
import _ from "lodash"
import HasPerm from "~/app/perm"
import { useRouter } from "next/router"
import Shield from "@admin/Shield"

export default function Tags() {
  const translation = useContext(TranslationContext)
  const tab = useSelector((state) => state.tabs.value["tag-tabs"])
  const dispatch = useDispatch()

  const { getPage } = useApolloClient()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [tag, setTag] = useState("")
  const [addButton, setAddButton] = useState({
    callback: () => {},
    title: translation("Add Tag"),
  })
  const [state, setState] = useState(null)
  const [callback, setCallback] = useState(null)
  const [formInputs, setFormInputs] = useState([[]])
  const [dataCollapse, setDataCollapse] = useState({})

  const { handleSubmit, setError, clearErrors, reset, control } = useForm({
    defaultValues: Fields.defaultValues,
  })

  const { mutate } = useMutation({
    setData,
    setLoading,
    setError,
    id: "editForms",
    clearErrors,
  })

  const filterPage = async () => {
    setLoading(true)
    return await getPage({ fields: [], query: queries.all })
  }

  const storeTag = async (data) => {
    const { status } = await mutate({
      mutation: queries.createTag,
      variables: { input: filterFields({ data, fields: Fields.allowed }) },
      action: "",
    })
    if (status) dispatch(closeModal("editForms"))
    const res = await filterPage()
    setData(res.result)
    setLoading(false)
  }

  const updateTag = async (data) => {
    await mutate({
      mutation: queries.updateTag,
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),
        id: data.id,
      },
      action: "",
    })
    dispatch(closeModal("editForms"))
    const res = await filterPage()
    setData(res.result)
    setLoading(false)
  }

  const destroyTag = async (id) => {
    await mutate({
      mutation: queries.deleteTag,
      variables: { input: filterFields({ data, fields: Fields.allowed }), id },
      action: "",
    })
    dispatch(closePopup("delete-action"))
    const res = await filterPage()
    setData(res.result)
    setLoading(false)
  }

  const createTag = (item, action = null) => {
    clearErrors()
    setCallback(() => handleSubmit(storeTag))
    setState(
      translation(
        action === "tag" ? "create" : item.deep === 1 ? "create" : "add group",
        "tags"
      )
    )
    setFormInputs(
      item?.deep ? Fields.tagFields(data) : Fields.tagGroupFields(data)
    )
    if (item && !_.isEqual(item, { deep: 1 })) {
      if (item.title_panel)
        setTag(`${translation("_to")} "${item.title_panel}"`)
      else {
        setTag("")
      }
      reset({
        ...Fields.defaultValues,
        tag_group_ids: [item.id],
        deep: item.id ? 1 : 2,
      })
    } else {
      setTag("")
      reset(Fields.defaultValues)
    }
    dispatch(openModal("editForms"))
  }

  const editTag = (item) => {
    clearErrors()
    setCallback(() => handleSubmit(updateTag))
    setTag(`"${item.title_panel}"`)
    if (item.deep === 1) setFormInputs(Fields.tagFields(data))
    else setFormInputs(Fields.tagGroupFields(data))
    setState(translation(item.deep === 1 ? "edit" : "edit group", "tags"))
    reset(item)
    dispatch(openModal("editForms"))
  }

  const deleteTag = (item) => {
    setCallback(() => destroyTag.bind(this, item.id))
    dispatch(openPopup("delete-action"))
  }

  useEffect(() => {
    let isMounted = true
    filterPage().then((res) => {
      if (!isMounted) return
      setData(res.result)
      setLoading(false)
    })
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!tab || tab?.tab === 0)
      setAddButton({
        title: translation("Add Tag"),
        callback: createTag.bind(this, { deep: 1 }),
      })
    else
      setAddButton({
        callback: createTag,
        title: translation("Add Group Tag"),
      })
  }, [tab])

  const router = useRouter()

  return (
    <AdminLayout
      action={
        <Shield id="tags_create_action" action>
          <Button onClick={addButton.callback} type="success">
            <i className="fas fa-plus-circle ml-1" />
            {addButton.title}
          </Button>
        </Shield>
      }
      title={translation("Tags")}
    >
      <Tab id="tag-tabs">
        {HasPerm({ id: "tags_single_tab", router }) && (
          <div title={translation("Tags")}>
            {!data.length ? (
              <p className="text-center mt-5">
                {translation("no record found")}
              </p>
            ) : null}
            <div className={Styles.main}>
              {data
                .filter((item) => item.deep === 1)
                .map((row, index) => (
                  <div key={index} className={Styles.tag}>
                    <Shield id="tags_title_column">{row.title_panel}</Shield>
                    <span className={Styles.actions}>
                      <Shield id="tags_update_action" action>
                        <button
                          type="button"
                          data-tooltip={translation("edit", "tags")}
                          data-tooltip-location="left"
                          onClick={() => editTag(row)}
                        >
                          <i className="far fa-edit" />
                        </button>
                      </Shield>
                      <Shield id="tags_delete_action" action>
                        <button
                          type="button"
                          data-tooltip-location="left"
                          data-tooltip={translation("delete", "tags")}
                          onClick={() => deleteTag(row)}
                        >
                          <i className="far fa-trash-alt" />
                        </button>
                      </Shield>
                    </span>
                  </div>
                ))}
            </div>
            <div className="text-center">
              <ModalForms
                tag={tag}
                form={formInputs}
                state={state}
                size="sm"
                section="tags"
                callback={callback}
                id="editForms"
                control={control}
                loading={loading}
              />
            </div>
          </div>
        )}
        {HasPerm({ id: "tags_group_tab", router }) && (
          <div title={translation("Tag Groups")}>
            {!data.length ? (
              <p className="text-center mt-5">
                {translation("no record found")}
              </p>
            ) : null}
            <div className={Styles.main}>
              {data
                .filter((item) => item.deep === 2)
                .map((rows, key) => (
                  <div className={Styles.rows} key={key}>
                    <Button
                      onClick={() => {
                        dispatch(toggle(`field${key}`))
                        dataCollapse[rows.id] =
                          dataCollapse[rows.id] !== undefined
                            ? !dataCollapse[rows.id]
                            : true
                        setDataCollapse({ ...dataCollapse })
                      }}
                      className={Styles.button}
                      type="white"
                    >
                      <span>
                        <Perm id="tags_title_column">
                          <p className={Styles.textBlack}>{rows.title_panel}</p>
                        </Perm>
                      </span>
                      <span>
                        <Shield id="tags_create_action" action>
                          <button
                            type="button"
                            className={Styles.textBlack}
                            data-tooltip-location="right"
                            data-tooltip={translation("create", "tags")}
                            onClick={() => createTag(rows, "tag")}
                          >
                            <i className="far fa-plus" />
                          </button>
                        </Shield>
                        <Shield id="tags_update_action" action>
                          <button
                            className={Styles.textBlack}
                            data-tooltip-location="right"
                            data-tooltip={translation("edit-group", "tags")}
                            type="button"
                            onClick={() => editTag(rows)}
                          >
                            <i className="far fa-edit" />
                          </button>
                        </Shield>
                        <Shield id="tags_delete_action" action>
                          <button
                            className={Styles.textBlack}
                            data-tooltip-location="right"
                            data-tooltip={translation("delete-group", "tags")}
                            type="button"
                            onClick={() => deleteTag(rows)}
                          >
                            <i className="far fa-trash-alt" />
                          </button>
                        </Shield>
                        {!!rows.tags.length ? (
                          <i
                            className={`fas fa-angle-down ${Styles.textBlack} ${
                              dataCollapse[rows.id] ? "fa-rotate-180" : ""
                            } mr-3`}
                          />
                        ) : (
                          <span className="mx-2 pr-2" />
                        )}
                      </span>
                    </Button>
                    <Collapse id={`field${key}`} className="bg-white">
                      <div className={Styles.group} key={key}>
                        {!rows.tags.length && (
                          <div className="text-center w-100">
                            <small className={Styles.mute}>
                              {translation("no record found")}
                            </small>
                          </div>
                        )}
                        {rows.tags.map((row, index) => (
                          <div key={index} className={Styles.tag}>
                            <Shield id="tags_title_column">
                              {row.title_panel}
                            </Shield>
                            <Shield id="tags_delete_action" action>
                              <span className={Styles.actions}>
                                <button
                                  type="button"
                                  data-tooltip-location="left"
                                  data-tooltip={translation("delete", "tags")}
                                  onClick={() => deleteTag(row)}
                                >
                                  <i className="far fa-trash-alt" />
                                </button>
                              </span>
                            </Shield>
                          </div>
                        ))}
                      </div>
                    </Collapse>
                  </div>
                ))}
            </div>
            <div className="text-center">
              <ModalForms
                tag={<h5>{tag}</h5>}
                form={formInputs}
                state={state}
                size="sm"
                section="tags"
                callback={callback}
                id="editForms"
                control={control}
                loading={loading}
              />
            </div>
          </div>
        )}
      </Tab>
      <Shield id="tags_create_action" action>
        <AddBtn callback={addButton.callback} title={addButton.title} />
      </Shield>
      <Popup
        status="danger"
        id="delete-action"
        actions={[
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
            onClick: callback,
          },
        ]}
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </AdminLayout>
  )
}
