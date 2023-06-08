import { useContext, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import { useApolloClient } from "~/app/Hooks/Api"
import { DeviceView, LoadingContext, TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Button from "@admin/Button"
import queries from "./queries"
import Fields from "./fields"
import Styles from "./attributes.module.scss"
import ModalForms from "@admin/Forms"
import { useDispatch } from "react-redux"
import { openModal } from "~/app/State/modal"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Table from "./components/table"
import Taable from "@admin/Table"
import { closePopup, openPopup } from "~/app/State/popups"
import Popup from "@admin/Popup"
import Tag from "@admin/Tag"
import Collapse from "@admin/Collapse"
import { open, toggle } from "~/app/State/collapse"
import TableStyles from "~/styles/components/table.module.scss"
import { array_pluck } from "~/app/Tree"
import Shield from "@admin/Shield"

const title_deeps = ["attribute group", "attribute", "variant"]

const tabIds = ["variant", "attribute-groups", "attributes", "values"]

const form_deeps = [
  Fields.attributes,
  Fields.attrGroupFields,
  Fields.variantFields,
]

const Wrapper = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [formInputs, setFormInputs] = useState([])
  const [changed, setChanged] = useState(false)
  const [title, setTitle] = useState("")
  const [defaultValues, setDefault] = useState({})
  const [callback, setCallback] = useState("")
  const [data, setData] = useState([])
  const [deeps, setDeeps] = useState({})

  const blockRef = useRef(null)

  const { control, setError, handleSubmit, reset, clearErrors } = useForm()

  const isDesktop = useContext(DeviceView)

  const { mutate } = useMutation({
    setError,
    clearErrors,
    setLoading,
    id: "editForms",
    setData,
  })

  const { getPage } = useApolloClient()

  const getPages = async (page = 1) => {
    fireLoading(true)

    return await getPage({
      page,
      fields: {},
      query: queries.all,
      exactFields: ["deep"],
    })
  }

  useEffect(() => {
    let isMounted = true

    dispatch(open("variants"))

    getPages().then((res) => {
      if (!isMounted) return
      setData(res.result)
      fireLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const createInstance = async (data) => {
    await mutate({
      mutation: queries.create,
      action: "create",
      variables: { input: filterFields({ data, fields: Fields.allowed }) },
    })
  }
  const editInstance = async (data) => {
    await mutate({
      mutation: queries.update,
      action: "edit",
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),
        id: data.id,
      },
    })
  }

  const editModal = (deep = 1, item) => {
    setFormInputs(form_deeps[deep - 1](translation))
    reset(item)
    setTitle(translation(`edit ${title_deeps[deep - 1]}`, "attribute"))
    setCallback(() => editInstance)
    dispatch(openModal("editForms"))
  }

  const deleteOption = (item) => {
    reset({ id: item.id })
    dispatch(openPopup("delete-action"))
  }

  const addModal = (deep = 1, parent_id) => {
    setFormInputs(form_deeps[deep - 1](translation))
    reset({ active: true, deep, parent_id })
    setTitle(translation(`add ${title_deeps[deep - 1]}`, "attribute"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const showAttributes = (index, item) => {
    if (tabIds[index + 1]) {
      blockRef.current.scrollIntoView({ block: "end", behavior: "smooth" })
      dispatch(open(tabIds[index + 1]))
    }

    setDeeps((prev) => {
      prev[index] = item.id
      const deleteNext = (index) => {
        if (prev[index + 1]) {
          delete prev[index + 1]
          deleteNext(index + 1)
        }
      }
      deleteNext(index)
      return { ...prev }
    })
  }

  const deleteRow = async (data) => {
    await mutate({
      mutation: queries.delete,
      action: "delete",
      variables: { id: data.id },
    })
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
      onClick: handleSubmit(deleteRow),
    },
  ]

  const submitDefault = async (item) => {
    await mutate({
      mutation: queries.updateDefault,
      action: "",
      variables: { id: deeps[2], default_attribute_value_id: item.id },
    })
    const res = await getPages()
    setData(res.result)
    fireLoading(false)
  }

  useEffect(() => {
    if (!deeps[2]) return
    changeAttr(data.find((item) => item.id === deeps[2]))
  }, [data])

  const changeAttr = (item) => {
    blockRef.current.scrollIntoView({ block: "end", behavior: "smooth" })
    dispatch(open(tabIds[tabIds.length - 1]))
    setDefault({
      data: item.attribute_values,
      type: item.type,
      default_value: item.default_attribute_value_id,
    })
    setDeeps((prev) => {
      prev[2] = item.id
      return { ...prev }
    })
  }

  const submitSort = async (flatted) => {
    await mutate({
      mutation: queries.sort,
      action: "",
      variables: {
        input: array_pluck(flatted, ["id", "sort"]),
      },
    })
    setChanged(false)
  }

  const activateSort = data.length ? (
    <div
      className={`${TableStyles.popup} ${!isDesktop ? TableStyles.mobile : ""}`}
    >
      {translation("Save Categories Sorting Changes")}
      <div className={TableStyles.buttons}>
        <i
          onClick={() => {
            getPages().then((res) => {
              setData(res.result)
              fireLoading(false)
            })
            setChanged(false)
          }}
          className={`fas fa-times ${TableStyles.close}`}
        />
        <Button
          onClick={() => {
            setChanged(false)
            submitSort(data)
          }}
          type="success"
        >
          {translation("Save")}
        </Button>
      </div>
    </div>
  ) : null

  return (
    <>
      <div ref={blockRef} className="w-100">
        {changed && activateSort}
        <GridContainer gap="Lg">
          <Grid className={Styles.card} size={12}>
            <div
              onClick={() => dispatch(toggle("variants"))}
              className={Styles.header}
            >
              <h6>{translation("Variant Attributes", "attribute")}</h6>
              <span>
                <Shield id="attributes_create_action" action>
                  <Button type="success" onClick={() => addModal(1)}>
                    <i className="fas fa-plus-circle" />
                    {translation("add")}
                  </Button>
                </Shield>
              </span>
            </div>
            <Collapse id="variants">
              <Table
                showAttributes={showAttributes.bind(this, 0)}
                addModal={addModal}
                callback={() => setChanged(true)}
                editModal={editModal.bind(this, 1)}
                setData={(fn) =>
                  setData(
                    typeof fn === "function"
                      ? (prev) =>
                        fn(prev.filter((item) => item.parent_id === null))
                      : (prev) => [
                        ...prev.filter((item) => item.parent_id !== null),
                        ...fn,
                      ]
                  )
                }
                data={data
                  .filter((item) => item.deep === 1)
                  .sort((a, b) => a.sort - b.sort)}
                deleteOption={deleteOption}
              />
            </Collapse>
          </Grid>
          <Grid size={12} className={Styles.card}>
            <div
              onClick={() => dispatch(toggle("attribute-groups"))}
              className={`${Styles.header} ${!deeps[0] ? Styles.disabled : ""}`}
            >
              <h6>{translation("Attribute Groups", "attribute")}</h6>
              <span>
                <Shield id="attributes_create_action" action>
                  <Button
                    type="success"
                    disabled={!deeps[0]}
                    onClick={() => addModal(2, deeps[0])}
                  >
                    <i className="fas fa-plus-circle" />
                    {translation("add")}
                  </Button>
                </Shield>
              </span>
            </div>
            <Collapse id="attribute-groups">
              {Boolean(deeps[0]) && (
                <Table
                  showAttributes={showAttributes.bind(this, 1)}
                  addModal={addModal}
                  deleteOption={deleteOption}
                  editModal={editModal.bind(this, 2)}
                  callback={() => setChanged(true)}
                  data={data
                    .filter((item) => item.parent_id === deeps[0])
                    .sort((a, b) => a.sort - b.sort)}
                  setData={(fn) =>
                    setData(
                      typeof fn === "function"
                        ? (prev) =>
                          fn(
                            prev.filter((item) => item.parent_id === deeps[0])
                          )
                        : (prev) => [
                          ...prev.filter(
                            (item) => item.parent_id !== deeps[0]
                          ),
                          ...fn,
                        ]
                    )
                  }
                />
              )}
            </Collapse>
          </Grid>
          <Grid size={12} className={Styles.card}>
            <div
              onClick={() => dispatch(toggle("attributes"))}
              className={`${Styles.header} ${!deeps[1] ? Styles.disabled : ""}`}
            >
              <h6>{translation("Attribute", "attribute")}</h6>
              <span>
                <Shield id="attributes_create_action" action>
                  <Button
                    type="success"
                    disabled={!deeps[1]}
                    onClick={() => addModal(3, deeps[1])}
                  >
                    <i className="fas fa-plus-circle" />
                    {translation("add")}
                  </Button>
                </Shield>
              </span>
            </div>
            <Collapse id="attributes">
              {Boolean(deeps[1]) && (
                <Table
                  addModal={addModal}
                  deleteOption={deleteOption}
                  editModal={editModal.bind(this, 3)}
                  callback={() => setChanged(true)}
                  data={data
                    .filter((item) => item.parent_id === deeps[1])
                    .sort((a, b) => a.sort - b.sort)}
                  setData={(fn) =>
                    setData(
                      typeof fn === "function"
                        ? (prev) =>
                          fn(
                            prev.filter((item) => item.parent_id === deeps[1])
                          )
                        : (prev) => [
                          ...prev.filter(
                            (item) => item.parent_id !== deeps[1]
                          ),
                          ...fn,
                        ]
                    )
                  }
                  showAttributes={changeAttr}
                />
              )}
            </Collapse>
          </Grid>
          <Grid size={12} className={Styles.card}>
            <div
              onClick={() => dispatch(toggle("values"))}
              className={`${Styles.header} ${!deeps[2] ? Styles.disabled : ""}`}
            >
              <h6>{translation("values", "attribute")}</h6>
            </div>
            <Collapse id="values">
              {Boolean(deeps[2]) && (
                <Taable
                  title="title_panel"
                  section="attribute"
                  callback={() => setChanged(true)}
                  fields={[
                    {
                      title: "title_panel",
                      td: (item) =>
                        [1, 2].includes(defaultValues.type) ? (
                          item.value_panel
                        ) : item.value ? (
                          <Tag type="success">{translation("True")}</Tag>
                        ) : (
                          <Tag type="error">{translation("False")}</Tag>
                        ),
                    },
                  ]}
                  data={defaultValues.type == 3 ?
                    Array.from(new Set(defaultValues.data.map(s => { return Boolean(s.value) }))).map(value => {
                      console.log(value);
                      return {
                        value,
                        ...(defaultValues.data.reverse().find(s => s.value === value) || {})
                      }
                    })
                    :
                    Array.from(new Set(defaultValues.data.map(s => { return s.value_panel }))).map(value_panel => {
                      return {
                        value_panel,
                        ...(defaultValues.data.reverse().find(s => s.value_panel === value_panel) || {})
                      }
                    })}
                  actions={[
                    {
                      onClick: submitDefault,
                      icon: "far fa-check-circle",
                      tooltip: "default",
                      disabled: (item) =>
                        item.id === defaultValues.default_value,
                      dir: "right",
                    },
                  ]}
                  headless
                />
              )}
            </Collapse>
          </Grid>
        </GridContainer>
      </div>
      <ModalForms
        callback={handleSubmit(callback)}
        id="editForms"
        loading={loading}
        form={formInputs}
        size="sm"
        control={control}
        state={title}
      />
      <Popup
        id="delete-action"
        actions={deleteActions}
        status="danger"
        title={translation("Warning")}
      >
        <p>{translation("delete-warning", "menuItems")}</p>
      </Popup>
    </>
  )
}

export default Wrapper
