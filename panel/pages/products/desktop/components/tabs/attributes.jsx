import Section from "../section"
import Input from "@admin/Input"
import { useContext, useEffect } from "react"
import { TranslationContext } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Button from "@admin/Button"
import Styles from "./attributes.module.scss"
import { useDispatch } from "react-redux"
import { openModal } from "~/app/State/modal"
import Info from "@admin/Input/Info"
import Shield from "@admin/Shield"

const fields = {
  2: "textarea",
  3: "toggle",
  1: "text",
}

export default function Attributes({
  control,
  data,
  watch,
  getValues,
  setValue,
  setModel,
  setTitle,
  setInfo,
  info,
  isCreate,
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const attributeVariantId = watch("attribute_variant_id")

  const createAttribute = () => {
    setModel("attributes")
    setTitle(translation("Edit Attribute"))
    dispatch(openModal("create-form"))
  }

  const updateValues = () => {

    const attribute_variant_id = getValues()?.attribute_variant_id
    if (!attribute_variant_id) return

    const attribute_groups = data.attributes.filter((item) => item.parent_id === attribute_variant_id)
    attribute_groups.map((attribute_group, key) => {
      const attributes = data.attributes.filter((attribute) => {
        return attribute.parent_id == attribute_group.id;
      })
      setValue(`attribute_groups.${key}.attribute_group_id`, attribute_group.id);
      // console.log(attributes.map((item) => { return item.default_value ? ({ value: item.default_value }) : item.type == 3 ? null : {} }))
      setValue(`attribute_groups.${key}.attributes`,
        attributes.map((item) => { return isCreate && item.default_value ? ({ value: item.default_value }) : {} }) || []
      )
    })
    // const attributes = data.attributes.filter((item) =>
    //   attribute_groups.map((item) => item.attribute_ids)
    //     .flat()
    //     .includes(item.id)
    // )
    // setValue(
    //   "attribute_groups.0.0.attributes",
    //   attributes
    //     .filter((item) => item.default_value)
    //     .map((item) => ({ value: item.default_value }))
    // )
  }

  useEffect(() => {
    updateValues()
  }, [attributeVariantId])

  return (
    <Section>
      <Grid size={12}>
        <h5 className={`d-flex justify-content-between ${Styles.header}`}>
          {translation("product table", "products")}
          <div
            onClick={setInfo.bind(null, !info)}
            className={`mr-2 ${!info ? Styles.active : ""}`}
          >
            <i className="fad fa-question-circle fa-lg" />
          </div>
        </h5>
      </Grid>
      <Shield id="products_attribute_id_field" route="/products">
        <Grid size={9}>
          <Input
            control={control}
            name="attribute_variant_id"
            type="select-searchable"
            label={translation("Product Attributes", "products")}
            data={data.attributes.filter((item) => item.deep === 1)}
          />
        </Grid>
        <Grid size={3}>
          <Shield id="attributes_create_action" action route="/attributes">
            <Button
              type="primary"
              onClick={createAttribute}
              className={`w-100 ${Styles.button}`}
            >
              <i className="fas fa-plus ml-1" />
              {translation("Create Attribute", "products")}
            </Button>
          </Shield>
        </Grid>
        <Grid size={12} className={Styles.info}>
          <Info text={translation("attributes_info", "products")} />
        </Grid>
      </Shield>
      <Grid size={12}>
        {attributeVariantId && data.attributes.filter(
          (attribute_group) => {
            return attribute_group.deep == 2 && attribute_group.parent_id == attributeVariantId;
          }).map(
            (attribute_group, attribute_group_index) => {
              return (<>
                {attributeVariantId && getValues().attribute_variant_id ? (
                  <hr className="mt-2 mb-4" />
                ) : null}
                {attributeVariantId &&
                  data.attributes
                    .filter(
                      (item) =>
                        item.id === attribute_group.id
                      // getValues(`attribute_groups.${attribute_group_index}.attribute_group_id`)
                    )
                    .map((item, key) => (
                      <div key={`grp${key}-${attribute_group_index}`}>
                        <p className={`font-weight-bold ${key === 0 ? "" : "mt-5"}`}>
                          {item.name}
                        </p>
                        {data.attributes
                          .filter(
                            (it) => item.attribute_ids.includes(it.id) && it.id
                          )
                          .map((item, key) => {
                            setValue(
                              `attribute_groups.${attribute_group_index}.attributes.${key}.attribute_id`,
                              item.id
                            );
                            return (
                              <div className="mt-3 mb-2" key={`att${key}-${attribute_group_index}`}>
                                {item.type === 3 ? (
                                  <Input
                                    name={`attribute_groups.${attribute_group_index}.attributes.${key}.value`}
                                    label={item.name}
                                    control={control}
                                    type={item.type === 3 ? "toggle" : "multi-language"}
                                    component={fields[item.type]}
                                    data={[
                                      {
                                        name: translation("True"),
                                        color: "#3ECF8E",
                                        id: 1,
                                      },
                                      {
                                        name: translation("False"),
                                        color: "#EC6060",
                                        id: 0,
                                      },
                                    ]}
                                    gridSize={6}
                                  />
                                ) : (
                                  <GridContainer gap="Lg">
                                    <Input
                                      name={`attribute_groups.${attribute_group_index}.attributes.${key}.value`}
                                      label={item.name}
                                      control={control}
                                      type={item.type === 3 ? "toggle" : "multi-language"}
                                      component={fields[item.type]}
                                      data={[
                                        {
                                          name: translation("True"),
                                          color: "#3ECF8E",
                                          id: 1,
                                        },
                                        {
                                          name: translation("False"),
                                          color: "#EC6060",
                                          id: 0,
                                        },
                                      ]}
                                      gridSize={6}
                                    />
                                  </GridContainer>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    ))}
              </>)
            }
          )}
      </Grid>
    </Section>
  )
}
