import { useController } from "react-hook-form"
import { Grid, GridContainer } from "@admin/Grid"
import Input from "@admin/Input"
import { Fragment, useContext } from "react"
import { DeviceView, TranslationContext } from "~/app/Context"
import Button from "@admin/Button"

const Conditions = ({ watch, control, getValues, reset }) => {
  const translation = useContext(TranslationContext)

  const isDesktop = useContext(DeviceView)

  const {
    field: { value, onChange, onBlur },
  } = useController({ control, name: "conditions" })

  const AddItem = () => {
    onChange([...(value || []), { type: 1, operator: 1, value: "" }])
  }

  const removeItem = (key) => {
    value.splice(key, 1)
    onChange([...value])
    reset(
      { ...getValues(), conditions: value },
      {
        keepErrors: true,
      }
    )
  }

  return (
    <>
      {(value || []).map((item, key) => (
        <Fragment key={key}>
          <Grid size={3}>
            <Input
              type="select-searchable"
              label={translation("type")}
              control={control}
              name={`conditions.${key}.type`}
              data={[
                {
                  id: 1,
                  name: translation("weight"),
                },
                {
                  id: 2,
                  name: translation("price"),
                },
              ]}
            />
          </Grid>
          <Grid size={3}>
            <Input
              name={`conditions.${key}.operator`}
              control={control}
              label={translation("operator")}
              data={[
                { id: 1, name: translation("less_than") },
                { id: 2, name: translation("less_than_or_equal") },
                { id: 3, name: translation("equal") },
                { id: 4, name: translation("not_equal") },
                { id: 5, name: translation("more_than") },
                { id: 6, name: translation("more_than_or_equal") },
              ]}
              type="select-searchable"
            />
          </Grid>
          <Grid size={5}>
            <Input
              direction="ltr"
              group={
                watch(`conditions.${key}.type`)
                  ? translation(
                      getValues(`conditions.${key}.type`) === 2
                        ? "toman"
                        : "gram"
                    )
                  : null
              }
              type="number"
              label={translation("value")}
              control={control}
              name={`conditions.${key}.value`}
            />
          </Grid>
          {isDesktop ? (
            <Grid size={1} className="align-self-center">
              <i
                className="far fa-trash-alt mt-3 pointer"
                onClick={removeItem.bind(this, key)}
              />
            </Grid>
          ) : (
            <Grid size={10} className="my-2 text-center">
              <Button
                type="error"
                className="w-100"
                onClick={removeItem.bind(this, key)}
              >
                {translation("delete instance")}
                <i className="far fa-trash-alt mr-2 pointer" />
              </Button>
            </Grid>
          )}
        </Fragment>
      ))}
      <Grid size={12}>
        <hr />
        <Button onClick={AddItem} className="mr-auto" type="success">
          {translation("Add Condition")}
          <i className="fas fa-plus-circle mr-2" />
        </Button>
      </Grid>
    </>
  )
}

const Attributes = ({ watch, control, getValues, reset }) => {
  const translation = useContext(TranslationContext)

  const {
    field: { value, onChange, onBlur },
  } = useController({ control, name: "attributes" })

  const AddItem = () => {
    onChange([...(value || []), { type: 1, operator: 1, value: "" }])
  }

  const removeItem = (key) => {
    value.splice(key, 1)
    onChange([...value])
    reset(
      { ...getValues(), attributes: value },
      {
        keepErrors: true,
      }
    )
  }

  return (
    <>
      {(value || []).map((item, key) => (
        <Fragment key={key}>
          <Grid size={3}>
            <Input
              name={`attributes.${key}.operator`}
              control={control}
              label={translation("operator")}
              data={[
                { id: 1, name: translation("less_than") },
                { id: 2, name: translation("between") },
                { id: 3, name: translation("more_than") },
              ]}
              type="select-searchable"
            />
          </Grid>
          {watch(`attributes.${key}.operator`) ? (
            getValues(`attributes.${key}.operator`) === 1 ? (
              <Grid size={8}>
                <Input
                  type="number"
                  direction="ltr"
                  group={translation("gram")}
                  label={translation("from weight")}
                  name={`attributes.${key}.from_weight`}
                  control={control}
                />
              </Grid>
            ) : getValues(`attributes.${key}.operator`) === 2 ? (
              <>
                <Grid size={4}>
                  <Input
                    direction="ltr"
                    group={translation("gram")}
                    type="number"
                    label={translation("from weight")}
                    name={`attributes.${key}.from_weight`}
                    control={control}
                  />
                </Grid>
                <Grid size={4}>
                  <Input
                    group={translation("gram")}
                    direction="ltr"
                    type="number"
                    label={translation("to weight")}
                    name={`attributes.${key}.to_weight`}
                    control={control}
                  />
                </Grid>
              </>
            ) : (
              <Grid size={8}>
                <Input
                  type="number"
                  direction="ltr"
                  label={translation("to weight")}
                  group={translation("gram")}
                  name={`attributes.${key}.to_weight`}
                  control={control}
                />
              </Grid>
            )
          ) : null}
          <Grid size={1} className="align-self-center">
            <i
              className="far fa-trash-alt mt-3 pointer"
              onClick={removeItem.bind(this, key)}
            />
          </Grid>
          <Grid size={12} />
        </Fragment>
      ))}
      <Grid size={12}>
        <Button onClick={AddItem} className="mr-auto" type="success">
          {translation("Add Weight")}
          <i className="fas fa-plus-circle mr-2" />
        </Button>
      </Grid>
    </>
  )
}

export default {
  defaultValues: {
    conditions: [],
    status: 1,
    attributes: [],
    weight_sensitivity: false,
  },
  fields: (translation, watch, getValues, reset, setValue) => [
    [
      {
        gridSize: 6,
        name: "title",
        type: "multi-language",
        perm: "shipping_methods_title_field",
      },
      {
        size: 6,
        data: [
          {
            name: translation("active"),
            color: "#3ECF8E",
            id: 1,
          },
          {
            name: translation("inactive"),
            color: "#EC6060",
            id: 2,
          },
        ],
        type: "toggle",
        name: "status",
        perm: "shipping_methods_status_field",
      },
      {
        type: "toggle",
        name: "weight_sensitivity",
        size: 6,
        data: [
          {
            name: translation("True"),
            color: "#3ECF8E",
            id: true,
          },
          {
            name: translation("False"),
            color: "#EC6060",
            id: false,
          },
        ],
        perm: "shipping_methods_weight_sensitivity_field",
      },
      {
        render: ({ control }) =>
          watch("weight_sensitivity") && getValues("weight_sensitivity") ? (
            <>
              <Grid size={12} className="font-weight-bold">
                {translation("Attributes")} <hr />
              </Grid>
              <Attributes
                control={control}
                watch={watch}
                getValues={getValues}
                reset={reset}
              />
            </>
          ) : null,
        perm: "shipping_methods_weight_sensitivity_content_field",
      },
      {
        type: "multi-language",
        name: "description",
        component: "textarea",
        gridSize: 12,
        perm: "shipping_methods_description_field",
      },
      {
        render: ({ control }) => (
          <>
            <Grid size={12} className="font-weight-bold">
              {translation("Conditions")} <hr />
            </Grid>
            <Conditions
              control={control}
              watch={watch}
              getValues={getValues}
              reset={reset}
            />
          </>
        ),
        perm: "shipping_methods_conditions_field",
      },
    ],
  ],
  tableFields: [
    {
      title: "title_panel",
      td: (row) =>
        `${row.title_panel}${
          row.weight_sensitivity ? ` - ${row.attributes[0].from_weight}` : ""
        }`,
      perm: "shipping_methods_title_column",
    },
  ],
  allowed: [
    "title",
    "description",
    "admin_description",
    "status",
    "weight_sensitivity",
    "conditions",
    "attributes",
  ],
}
