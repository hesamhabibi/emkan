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

const defaultValues = {
  status: 2,
  type: 1,
  details: {
    count_status: 1,
    count_unit: 1,
  },
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
}) {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()

  const attributeGroup = watch("attribute_groups.attribute_group_id")

  const createAttribute = () => {
    setModel("attributes")
    setTitle(translation("Edit Attribute"))
    dispatch(openModal("create-form"))
  }

  const updateValues = () => {
    const groupId = getValues()?.attribute_groups?.attribute_group_id
    if (!groupId) return

    const ids = data.attributes.filter((item) => item.parent_id === groupId)
    const attributes = data.attributes.filter((item) =>
      ids
        .map((item) => item.attribute_ids)
        .flat()
        .includes(item.id)
    )
    setValue(
      "attribute_groups.attributes",
      attributes
        .filter((item) => item.default_value)
        .map((item) => ({ value: item.default_value }))
    )
  }

  useEffect(() => {
    updateValues()
  }, [attributeGroup])

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
      <Shield id="products_attribute_id_field">
        <Grid size={12}>
          <Input
            control={control}
            name="attribute_groups.attribute_group_id"
            type="select-searchable"
            label={translation("Product Attributes", "products")}
            data={data.attributes.filter((item) => item.deep === 1)}
          />
        </Grid>
        <Grid size={12}>
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
        {attributeGroup && getValues().attribute_groups ? (
          <hr className="mt-2 mb-4" />
        ) : null}
        {attributeGroup &&
          data.attributes
            .filter(
              (item) =>
                item.parent_id ===
                getValues("attribute_groups.attribute_group_id")
            )
            .map((item, key) => (
              <div key={key}>
                <p className={`font-weight-bold ${key === 0 ? "" : "mt-5"}`}>
                  {item.name}
                </p>
                {data.attributes
                  .filter(
                    (it) =>
                      item.attribute_ids.includes(it.id) &&
                      (setValue(
                        `attribute_groups.attributes.${key}.attribute_id`,
                        it.id
                      ) ||
                        true)
                  )
                  .map((item, key) => (
                    <div className="mt-3 mb-2" key={key}>
                      {item.type === 3 ? (
                        <Input
                          name={`attribute_groups.attributes.${key}.value`}
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
                          gridSize={12}
                        />
                      ) : (
                        <GridContainer gap="Lg">
                          <Input
                            name={`attribute_groups.attributes.${key}.value`}
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
                            gridSize={12}
                          />
                        </GridContainer>
                      )}
                    </div>
                  ))}
              </div>
            ))}
      </Grid>
    </Section>
  )
}
