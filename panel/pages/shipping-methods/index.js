import queries from "./queries"
import Fields from "./fields"
import { useContext, useEffect, useRef, useState } from "react"
import { DeviceView, LoadingContext, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { useApolloClient } from "~/app/Hooks/Api"
import { useForm } from "react-hook-form"
import { useMutation } from "~/app/Hooks"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"
import ModalForms from "@admin/Forms"
import { openModal } from "~/app/State/modal"
import { filterFields } from "~/app/Helpers/MutationHandler"
import Styles from "./shipping-methods.module.scss"
import Collapse from "@admin/Collapse"
import { toggle } from "~/app/State/collapse"
import { Grid, GridContainer } from "@admin/Grid"
import { toInt } from "~/pages/products/chart"
import Popup from "@admin/Popup"
import { closePopup, openPopup } from "~/app/State/popups"
import Toggle from "@admin/Input/Toggle"
import _ from "lodash"
import TableStyles from "~/styles/components/table.module.scss"
import Text from "@admin/Input/Text"
import Info from "@admin/Input/Info"
import AddBtn from "@admin/CrudLayout/Add"
import Empty from "@admin/Empty"
import Shield from "@admin/Shield"

const infoTexts = {
  free: () => "هزینه ارسال رایگان حساب می شود",
  afterPay: () => "هزینه از مقصد دریافت می شود",
  price: (label, price) => {
    if (label === "amount") return `مقدار ${price} تومان هزینه می برد`

    return `مقدار ${price} درصد هزینه می برد`
  },
  disabled: () => "این روش در این شهر یا استان غیرفعال است",
}

const inputGroupTypes = {
  amount: "toman",
  percent: "percent",
}

const states = {
  not_neighboring_state: {
    price: 0,
    type: "disabled",
    price_type: "amount",
  },
  neighboring_state: {
    price: 0,
    type: "disabled",
    price_type: "amount",
  },
  same_state: {
    price: 0,
    type: "disabled",
    price_type: "amount",
  },
  same_city: {
    price: 0,
    type: "disabled",
    price_type: "amount",
  },
}

const ShippingMethods = () => {
  const translation = useContext(TranslationContext)
  const fireLoading = useContext(LoadingContext)

  const isDesktop = useContext(DeviceView)

  const [popup, setPopup] = useState(false)
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(() => {})
  const [title, setTitle] = useState("")
  const [collapses, setCollapses] = useState([])
  const [form, setForm] = useState([])
  const [name, setName] = useState("")

  const settings = useRef(null)

  const changed = useRef(null)

  const {
    control,
    setError,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm()

  const dispatch = useDispatch()
  const { getPage } = useApolloClient()
  const { mutate } = useMutation({
    setData,
    setLoading,
    setError,
    id: "editForms",
    clearErrors,
  })

  const dataProps = [
    { id: "free", name: translation("free") },
    {
      id: "afterPay",
      name: translation("afterPay"),
    },
    { id: "price", name: translation("Price") },
    {
      id: "disabled",
      name: translation("Disabled"),
    },
  ]

  useEffect(() => {
    let isMounted = true

    getPage({ page: 1, query: queries.all, fields: [] }).then((res) => {
      if (!isMounted) return

      settings.current = res.shipping.value
      setForm(res.shipping.value)
      setData(res.result)

      fireLoading(false)
    })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (changed.current === null) {
      changed.current = false
      return
    } else if (changed.current === false) {
      changed.current = true
      return
    }
    setPopup(true)
  }, [form])

  const createInstance = async (data) => {
    data.conditions = (data.conditions || []).map((item) => ({
      ...item,
      value: toInt(item.value),
    }))
    data.attributes = (data.attributes || []).map((item) => ({
      ...item,
      from_weight: toInt(item.from_weight),
      to_weight: toInt(item.to_weight),
    }))
    await mutate({
      mutation: queries.create,
      variables: { input: filterFields({ data, fields: Fields.allowed }) },
      action: "create",
    })
  }

  async function submitSetting() {
    await mutate({
      mutation: queries.updateSetting,
      variables: { input: { value: form } },
    })
    changed.current = false
    setPopup(false)
  }

  const activateSort = (
    <div
      className={`${TableStyles.popup} ${!isDesktop ? TableStyles.mobile : ""}`}
    >
      ذخیره تغییرات
      <div className={TableStyles.buttons}>
        <i
          onClick={() => {
            changed.current = false
            setForm([...settings.current])
            setPopup(false)
          }}
          className={`fas fa-times ${TableStyles.close}`}
        />
        <Button
          onClick={() => {
            setPopup(false)
            submitSetting(data)
          }}
          type="success"
        >
          {translation("Save")}
        </Button>
      </div>
    </div>
  )

  const createModal = () => {
    reset(Fields.defaultValues)
    setTitle(translation("Add Shipping Method"))
    setCallback(() => createInstance)
    dispatch(openModal("editForms"))
  }

  const editInstance = async (data) => {
    data.conditions = (data.conditions || []).map((item) => ({
      ...item,
      value: toInt(item.value),
    }))
    data.attributes = (data.attributes || []).map((item) => ({
      ...item,
      from_weight: toInt(item.from_weight),
      to_weight: toInt(item.to_weight),
    }))
    await mutate({
      mutation: queries.update,
      variables: {
        input: filterFields({ data, fields: Fields.allowed }),
        id: data.id,
      },
      action: "edit",
    })
  }

  const editModal = (item, e) => {
    e.stopPropagation()
    reset(item)
    setTitle(translation("Edit Shipping Method"))
    setCallback(() => editInstance)
    dispatch(openModal("editForms"))
  }

  const createAction = (
    <Shield id="shipping_methods_create_action" action>
      <Button type="success" onClick={createModal}>
        {translation("Add Shipping Method")}
        <i className="fas fa-plus-circle mr-2" />
      </Button>
    </Shield>
  )

  const toggleCollapse = (key) => {
    dispatch(toggle(`shipping-${key}`))
    setCollapses((prev) => {
      prev[key] = prev[key] ? !prev[key] : true
      return [...prev]
    })
  }

  const deleteOption = (item, e) => {
    e.stopPropagation()
    reset(item)
    dispatch(openPopup("delete-action"))
  }

  const deleteRow = async (data) => {
    await mutate({
      mutation: queries.delete,
      variables: { id: data.id },
      action: "delete",
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

  const priceActions = [
    {
      background: "#fff",
      boxShadow: null,
      title: translation("Cancel"),
      onClick: () => dispatch(closePopup("set-price")),
    },
    {
      background: "#6b7b93",
      color: "#fff",
      boxShadow: "rgba(149, 157, 165, 0.2) 0 8px 24px",
      title: translation("Submit"),
      onClick: () => dispatch(closePopup("set-price")),
    },
  ]

  useEffect(() => {
    if (
      name.split(".").reduce((form, item) => form[item], form) &&
      !name.split(".").reduce((form, item) => form[item], form)?.price_type
    ) {
      setForm((form) => {
        const keys = name.split(".")
        let key = form
        for (let i = 0; keys.length > i; i++) {
          key = key[keys[i]]
        }
        key.price_type = "amount"
        return [...form]
      })
    }
  }, [name])

  return (
    <AdminLayout action={createAction} title={translation("Shipping Method")}>
      {popup && activateSort}
      <div className="mb-5 pb-5">
        {!data.length && (
          <Empty Text={translation("no shipping method found")} />
        )}
        {data.map((item, key) => (
          <div className={Styles.container} key={key}>
            <div className={Styles.row}>
              <div
                onClick={toggleCollapse.bind(null, key)}
                className={Styles.button}
              >
                <div>{item.title_panel}</div>
                <span className={Styles.buttonActions}>
                  <Shield id="shipping_methods_edit_action" action>
                    <i
                      className="far fa-edit mx-1"
                      onClick={editModal.bind(this, item)}
                    />
                  </Shield>
                  <Shield id="shipping_methods_delete_action" action>
                    {item.is_main || (
                      <i
                        onClick={deleteOption.bind(this, item)}
                        className="far fa-trash-alt mx-1"
                      />
                    )}
                  </Shield>
                  <i
                    className={`far fa-angle-down mx-1 ${
                      collapses[key] ? "fa-rotate-180" : ""
                    }`}
                  />
                </span>
              </div>
              <Collapse id={`shipping-${key}`}>
                <div className={Styles.content}>
                  {item.weight_sensitivity ? (
                    item.attributes.map((attribute, index) => (
                      <GridContainer
                        gap="Lg"
                        key={index}
                        className={`${Styles.section} align-items-center`}
                      >
                        <Grid size={12}>
                          <span className="mr-2">
                            {(() => {
                              if (!attribute.from_weight)
                                return (
                                  <>
                                    {translation("more than")}{" "}
                                    {attribute.to_weight} {translation("gram")}
                                  </>
                                )
                              if (!attribute.to_weight)
                                return (
                                  <>
                                    {translation("less than")}{" "}
                                    {attribute.from_weight}{" "}
                                    {translation("gram")}
                                  </>
                                )

                              return (
                                <>
                                  {translation("from")} {attribute.from_weight}{" "}
                                  {translation("to")} {attribute.to_weight}{" "}
                                  {translation("gram")}
                                </>
                              )
                            })()}
                          </span>
                          <hr />
                        </Grid>
                        <Shield id="shipping_methods_same_city_action" action>
                          <Grid size={isDesktop ? 6 : 12}>
                            <Toggle
                              label={translation("same city and state")}
                              field={{
                                value:
                                  form
                                    .find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                    ?.attributes?.find(
                                      (attr) =>
                                        attr.attribute_id === attribute.id
                                    )?.same_city?.type || "disabled",
                                onChange: (value) => {
                                  if (
                                    !form.find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                  ) {
                                    form.push({
                                      shipping_method_id: item.id,
                                      attributes: [
                                        {
                                          attribute_id: attribute.id,
                                          ...states,
                                          same_city: {
                                            type: value,
                                            price: 0,
                                          },
                                        },
                                      ],
                                    })
                                  } else if (
                                    !form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      ?.attributes?.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      )
                                  ) {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.push({
                                        attribute_id: attribute.id,
                                        ...states,
                                        same_city: {
                                          type: value,
                                          price: 0,
                                        },
                                      })
                                  } else {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      ).same_city.type = value
                                  }
                                  setForm([...form])
                                  if (value !== "price") return

                                  const index = form.findIndex(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )

                                  const key = form[index].attributes.findIndex(
                                    (attr) => attr.attribute_id === attribute.id
                                  )

                                  dispatch(openPopup("set-price"))

                                  setName(
                                    `${index}.attributes.${key}.same_city`
                                  )
                                },
                              }}
                              fieldState={{}}
                              data={dataProps}
                            />
                            <Info
                              text={(() => {
                                let type = form
                                  .find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                  ?.attributes?.find(
                                    (attr) => attr.attribute_id === attribute.id
                                  )?.same_city

                                if (!type)
                                  type = {
                                    price_type: "price",
                                    price: 0,
                                    type: "disabled",
                                  }

                                return infoTexts[type.type](
                                  type.price_type,
                                  type.price
                                )
                              })()}
                            />
                          </Grid>
                        </Shield>
                        <Shield
                          id="shipping_methods_same_province_action"
                          action
                        >
                          <Grid size={isDesktop ? 6 : 12}>
                            <Toggle
                              label={translation("same state")}
                              field={{
                                value:
                                  form
                                    .find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                    ?.attributes?.find(
                                      (attr) =>
                                        attr.attribute_id === attribute.id
                                    )?.same_state?.type || "disabled",
                                onChange: (value) => {
                                  if (
                                    !form.find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                  ) {
                                    form.push({
                                      shipping_method_id: item.id,
                                      attributes: [
                                        {
                                          attribute_id: attribute.id,
                                          ...states,
                                          same_state: {
                                            type: value,
                                            price: 0,
                                          },
                                        },
                                      ],
                                    })
                                  } else if (
                                    !form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      ?.attributes?.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      )
                                  ) {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.push({
                                        attribute_id: attribute.id,
                                        ...states,
                                        same_state: {
                                          type: value,
                                          price: 0,
                                        },
                                      })
                                  } else {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      ).same_state.type = value
                                  }
                                  setForm([...form])

                                  if (value !== "price") return

                                  dispatch(openPopup("set-price"))
                                  const index = form.findIndex(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )

                                  const key = form[index].attributes.findIndex(
                                    (attr) => attr.attribute_id === attribute.id
                                  )

                                  setName(
                                    `${index}.attributes.${key}.same_state`
                                  )
                                },
                              }}
                              fieldState={{}}
                              data={dataProps}
                            />
                            <Info
                              text={(() => {
                                let type = form
                                  .find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                  ?.attributes?.find(
                                    (attr) => attr.attribute_id === attribute.id
                                  )?.same_state

                                if (!type)
                                  type = {
                                    price_type: "price",
                                    price: 0,
                                    type: "disabled",
                                  }

                                return infoTexts[type.type](
                                  type.price_type,
                                  type.price
                                )
                              })()}
                            />
                          </Grid>
                        </Shield>
                        <Shield
                          id="shipping_methods_close_province_action"
                          action
                        >
                          <Grid size={isDesktop ? 6 : 12}>
                            <Toggle
                              label={translation("close state")}
                              field={{
                                value:
                                  form
                                    .find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                    ?.attributes?.find(
                                      (attr) =>
                                        attr.attribute_id === attribute.id
                                    )?.neighboring_state?.type || "disabled",
                                onChange: (value) => {
                                  if (
                                    !form.find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                  ) {
                                    form.push({
                                      shipping_method_id: item.id,
                                      attributes: [
                                        {
                                          attribute_id: attribute.id,
                                          ...states,
                                          neighboring_state: {
                                            type: value,
                                            price: 0,
                                          },
                                        },
                                      ],
                                    })
                                  } else if (
                                    !form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      ?.attributes?.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      )
                                  ) {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.push({
                                        attribute_id: attribute.id,
                                        ...states,
                                        neighboring_state: {
                                          type: value,
                                          price: 0,
                                        },
                                      })
                                  } else {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      ).neighboring_state.type = value
                                  }
                                  setForm([...form])

                                  if (value !== "price") return

                                  const index = form.findIndex(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )

                                  const key = form[index].attributes.findIndex(
                                    (attr) => attr.attribute_id === attribute.id
                                  )

                                  setName(
                                    `${index}.attributes.${key}.neighboring_state`
                                  )

                                  dispatch(openPopup("set-price"))
                                },
                              }}
                              fieldState={{}}
                              data={dataProps}
                            />
                            <Info
                              text={(() => {
                                let type = form
                                  .find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                  ?.attributes?.find(
                                    (attr) => attr.attribute_id === attribute.id
                                  )?.neighboring_state

                                if (!type)
                                  type = {
                                    price_type: "price",
                                    price: 0,
                                    type: "disabled",
                                  }

                                return infoTexts[type.type](
                                  type.price_type,
                                  type.price
                                )
                              })()}
                            />
                          </Grid>
                        </Shield>
                        <Shield
                          id="shipping_methods_far_province_action"
                          action
                        >
                          <Grid size={isDesktop ? 6 : 12}>
                            <Toggle
                              label={translation("far state")}
                              field={{
                                value:
                                  form
                                    .find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                    ?.attributes?.find(
                                      (attr) =>
                                        attr.attribute_id === attribute.id
                                    )?.not_neighboring_state?.type ||
                                  "disabled",
                                onChange: (value) => {
                                  if (
                                    !form.find(
                                      (form) =>
                                        form.shipping_method_id === item.id
                                    )
                                  ) {
                                    form.push({
                                      shipping_method_id: item.id,
                                      attributes: [
                                        {
                                          attribute_id: attribute.id,
                                          ...states,
                                          not_neighboring_state: {
                                            type: value,
                                            price: 0,
                                          },
                                        },
                                      ],
                                    })
                                  } else if (
                                    !form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      ?.attributes?.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      )
                                  ) {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.push({
                                        attribute_id: attribute.id,
                                        ...states,
                                        not_neighboring_state: {
                                          type: value,
                                          price: 0,
                                        },
                                      })
                                  } else {
                                    form
                                      .find(
                                        (form) =>
                                          form.shipping_method_id === item.id
                                      )
                                      .attributes.find(
                                        (attr) =>
                                          attr.attribute_id === attribute.id
                                      ).not_neighboring_state.type = value
                                  }
                                  setForm([...form])

                                  if (value !== "price") return

                                  dispatch(openPopup("set-price"))

                                  const index = form.findIndex(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )

                                  const key = form[index].attributes.findIndex(
                                    (attr) => attr.attribute_id === attribute.id
                                  )

                                  setName(
                                    `${index}.attributes.${key}.not_neighboring_state`
                                  )
                                },
                              }}
                              fieldState={{}}
                              data={dataProps}
                            />
                            <Info
                              text={(() => {
                                let type = form
                                  .find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                  ?.attributes?.find(
                                    (attr) => attr.attribute_id === attribute.id
                                  )?.not_neighboring_state

                                if (!type)
                                  type = {
                                    price_type: "price",
                                    price: 0,
                                    type: "disabled",
                                  }

                                return infoTexts[type.type](
                                  type.price_type,
                                  type.price
                                )
                              })()}
                            />
                          </Grid>
                        </Shield>
                      </GridContainer>
                    ))
                  ) : (
                    <GridContainer
                      gap="Lg"
                      key={key}
                      className="align-items-center"
                    >
                      <Shield id="shipping_methods_same_city_action" action>
                        <Grid size={isDesktop ? 6 : 12}>
                          <Toggle
                            label={translation("same city and state")}
                            field={{
                              value:
                                form.find(
                                  (form) => form.shipping_method_id === item.id
                                )?.attribute?.same_city?.type || "disabled",
                              onChange: (value) => {
                                if (
                                  !form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                ) {
                                  form.push({
                                    shipping_method_id: item.id,
                                    attribute: {
                                      ...states,
                                      same_city: {
                                        type: value,
                                        price: 0,
                                      },
                                    },
                                  })
                                } else {
                                  form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  ).attribute.same_city.type = value
                                }

                                setForm([...form])
                                if (value !== "price") return

                                const index = form.findIndex(
                                  (form) => form.shipping_method_id === item.id
                                )

                                dispatch(openPopup("set-price"))

                                setName(`${index}.attribute.same_city`)
                              },
                            }}
                            fieldState={{}}
                            data={dataProps}
                          />
                          <Info
                            text={(() => {
                              let type = form.find(
                                (form) => form.shipping_method_id === item.id
                              )?.attribute?.same_city

                              if (!type)
                                type = {
                                  price_type: "price",
                                  price: 0,
                                  type: "disabled",
                                }

                              return infoTexts[type.type](
                                type.price_type,
                                type.price
                              )
                            })()}
                          />
                        </Grid>
                      </Shield>
                      <Shield id="shipping_methods_same_province_action" action>
                        <Grid size={isDesktop ? 6 : 12}>
                          <Toggle
                            label={translation("same state")}
                            field={{
                              value:
                                form.find(
                                  (form) => form.shipping_method_id === item.id
                                )?.attribute?.same_state?.type || "disabled",
                              onChange: (value) => {
                                if (
                                  !form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                ) {
                                  form.push({
                                    shipping_method_id: item.id,
                                    attribute: {
                                      ...states,
                                      same_state: {
                                        type: value,
                                        price: 0,
                                      },
                                    },
                                  })
                                } else {
                                  form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  ).attribute.same_state.type = value
                                }

                                setForm([...form])
                                if (value !== "price") return

                                const index = form.findIndex(
                                  (form) => form.shipping_method_id === item.id
                                )

                                dispatch(openPopup("set-price"))

                                setName(`${index}.attribute.same_state`)
                              },
                            }}
                            fieldState={{}}
                            data={dataProps}
                          />
                          <Info
                            text={(() => {
                              let type = form.find(
                                (form) => form.shipping_method_id === item.id
                              )?.attribute?.same_state

                              if (!type)
                                type = {
                                  price_type: "price",
                                  price: 0,
                                  type: "disabled",
                                }

                              return infoTexts[type.type](
                                type.price_type,
                                type.price
                              )
                            })()}
                          />
                        </Grid>
                      </Shield>
                      <Shield
                        id="shipping_methods_close_province_action"
                        action
                      >
                        <Grid size={isDesktop ? 6 : 12}>
                          <Toggle
                            label={translation("close state")}
                            field={{
                              value:
                                form.find(
                                  (form) => form.shipping_method_id === item.id
                                )?.attribute?.neighboring_state?.type ||
                                "disabled",
                              onChange: (value) => {
                                if (
                                  !form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                ) {
                                  form.push({
                                    shipping_method_id: item.id,
                                    attribute: {
                                      ...states,
                                      neighboring_state: {
                                        type: value,
                                        price: 0,
                                      },
                                    },
                                  })
                                } else {
                                  form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  ).attribute.neighboring_state.type = value
                                }

                                setForm([...form])

                                if (value !== "price") return

                                const index = form.findIndex(
                                  (form) => form.shipping_method_id === item.id
                                )

                                dispatch(openPopup("set-price"))

                                setName(`${index}.attribute.neighboring_state`)
                              },
                            }}
                            fieldState={{}}
                            data={dataProps}
                          />
                          <Info
                            text={(() => {
                              let type = form.find(
                                (form) => form.shipping_method_id === item.id
                              )?.attribute?.neighboring_state

                              if (!type)
                                type = {
                                  price_type: "price",
                                  price: 0,
                                  type: "disabled",
                                }

                              return infoTexts[type.type](
                                type.price_type,
                                type.price
                              )
                            })()}
                          />
                        </Grid>
                      </Shield>
                      <Shield id="shipping_methods_far_province_action" action>
                        <Grid size={isDesktop ? 6 : 12}>
                          <Toggle
                            label={translation("far state")}
                            field={{
                              value:
                                form.find(
                                  (form) => form.shipping_method_id === item.id
                                )?.attribute?.not_neighboring_state?.type ||
                                "disabled",
                              onChange: (value) => {
                                if (
                                  !form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  )
                                ) {
                                  form.push({
                                    shipping_method_id: item.id,
                                    attribute: {
                                      ...states,
                                      not_neighboring_state: {
                                        type: value,
                                        price: 0,
                                      },
                                    },
                                  })
                                } else {
                                  form.find(
                                    (form) =>
                                      form.shipping_method_id === item.id
                                  ).attribute.not_neighboring_state.type = value
                                }

                                setForm([...form])

                                if (value !== "price") return

                                const index = form.findIndex(
                                  (form) => form.shipping_method_id === item.id
                                )

                                dispatch(openPopup("set-price"))

                                setName(
                                  `${index}.attribute.not_neighboring_state`
                                )
                              },
                            }}
                            fieldState={{}}
                            data={dataProps}
                          />
                          <Info
                            text={(() => {
                              let type = form.find(
                                (form) => form.shipping_method_id === item.id
                              )?.attribute?.not_neighboring_state

                              if (!type)
                                type = {
                                  price_type: "price",
                                  price: 0,
                                  type: "disabled",
                                }

                              return infoTexts[type.type](
                                type.price_type,
                                type.price
                              )
                            })()}
                          />
                        </Grid>
                      </Shield>
                    </GridContainer>
                  )}
                </div>
              </Collapse>
            </div>
          </div>
        ))}
      </div>
      <ModalForms
        form={Fields.fields(translation, watch, getValues, reset, setValue)}
        loading={loading}
        callback={handleSubmit(callback)}
        state={title}
        control={control}
        id="editForms"
      />
      <Popup
        status="info"
        title={translation("set price")}
        id="set-price"
        actions={priceActions}
      >
        <Toggle
          label={translation("type")}
          fieldState={{}}
          data={[
            {
              id: "amount",
              name: translation("price"),
            },
            {
              id: "percent",
              name: translation("percent"),
            },
          ]}
          field={{
            value: name.split(".").reduce((form, item) => form[item], form)
              ?.price_type,
            onChange: (value) =>
              setForm((form) => {
                const keys = name.split(".")
                let key = form
                for (let i = 0; keys.length > i; i++) {
                  key = key[keys[i]]
                }
                key.price_type = value
                return [...form]
              }),
          }}
        />
        <div className="mt-2">
          <Text
            direction="ltr"
            type="number"
            field={{
              value:
                name.split(".").reduce((form, item) => form[item], form)
                  ?.price || "",
              onChange: (value) =>
                setForm((form) => {
                  const keys = name.split(".")
                  let key = form
                  for (let i = 0; keys.length > i; i++) {
                    key = key[keys[i]]
                  }
                  key.price = value
                  return [...form]
                }),
            }}
            validate={(callback, value) => callback(value.target.value)}
            fieldState={{}}
            label={translation(
              name.split(".").reduce((form, item) => form[item], form)
                ?.price_type
            )}
            group={translation(
              inputGroupTypes[
                name.split(".").reduce((form, item) => form[item], form)
                  ?.price_type
              ]
            )}
          />
        </div>
      </Popup>
      <AddBtn
        title={translation("Add Shipping Method")}
        callback={createModal}
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

export default ShippingMethods
