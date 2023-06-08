import Styles from "./slider.module.scss"
import { useContext, useState } from "react"
import { DeviceView, LoadingContext, TranslationContext } from "~/app/Context"
import { useDispatch } from "react-redux"
import { toggle } from "~/app/State/collapse"
import Collapse from "@admin/Collapse"
import SwitchToggle from "@admin/Input/SwitchToggle"
import client from "~/app/apollo-client"
import queries from "./queries"
import Sortable from "@admin/Table/sortable"
import Fields from "~/pages/attributes/fields"
import Empty from "@admin/Empty"
import Shield from "@admin/Shield"
import TableStyles from "~/styles/components/table.module.scss"
import Button from "@admin/Button"
import { array_pluck } from "~/app/Tree"

const Slider = ({ data, actions, setData, getNextPage }) => {
  const translation = useContext(TranslationContext)
  const dispatch = useDispatch()
  const isDesktop = useContext(DeviceView)
  const fireLoading = useContext(LoadingContext)

  const [changed, setChanged] = useState(false)
  const [id, setId] = useState(null)

  const [collapses, setCollapses] = useState([])

  if (!data || !data.length) return <Empty />

  const changeCollapse = (key) => {
    collapses[key] = collapses[key] ? !collapses[key] : true
    setCollapses([...collapses])
    dispatch(toggle(`slider-${key}`))
  }

  const changeStatus = async (item, key) => {
    fireLoading(true)
    try {
      await client.mutate({
        mutation: queries.statusSlider,
        variables: {
          id: item.id,
          input: {
            status: item.status === 1 ? 2 : 1,
          },
        },
      })
      setData((prev) => {
        prev.data[key].status = prev.data[key].status === 1 ? 2 : 1
        return { ...prev }
      })
    } catch (e) {
      console.log(e)
    }
    fireLoading(false)
  }

  const setSort = (key, data) => {
    setData((prev) => {
      prev.data[key].images = data
      return { ...prev }
    })
  }

  const submitSort = async (data) => {
    fireLoading(true)
    try {
      await client.mutate({
        mutation: queries.sortSlider,
        variables: {
          id: id,
          input: array_pluck(
            data.find((item) => item.id === id)?.images || [],
            ["id", "sort"]
          ),
        },
      })
      setChanged(false)
    } catch (e) {
      console.log(e)
    }
    fireLoading(false)
  }

  const activateSort = data.length ? (
    <div
      className={`${TableStyles.popup} ${!isDesktop ? TableStyles.mobile : ""}`}
    >
      {translation("Save Categories Sorting Changes")}
      <div className={TableStyles.buttons}>
        <i
          onClick={() => getNextPage(1)}
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
      {changed && activateSort}
      <div className={Styles.container}>
        {data.map((item, key) => (
          <div key={key}>
            <span onClick={changeCollapse.bind(this, key)}>
              <span className="d-flex align-items-center">
                {item.name_panel}
              </span>
              <span className="d-flex align-items-center">
                <Shield id="sliders_status_action" action>
                  <small className="ml-2">
                    {translation(item.status === 1 ? "inactive" : "active")}
                  </small>
                  <span style={{ position: "relative", bottom: "-5px" }}>
                    <SwitchToggle
                      size="sm"
                      field={{
                        onChange: changeStatus.bind(this, item, key),
                        value: item.status === 2,
                      }}
                    />
                  </span>
                </Shield>
                <Shield id="sliders_add_image_action" action>
                  <i
                    onClick={actions.create.bind(this, item)}
                    className="far fa-plus mr-2"
                  />
                </Shield>
                <Shield id="sliders_edit_action" action>
                  <i
                    onClick={actions.editSlider.bind(this, item)}
                    className="far fa-edit mr-3"
                  />
                </Shield>
                <Shield id="sliders_delete_action" action>
                  <i
                    onClick={actions.deleteSlider.bind(this, item)}
                    className="far fa-trash-alt mr-3"
                  />
                </Shield>
                <i
                  className={`far fa-angle-down ${
                    collapses[key] ? "fa-rotate-180" : ""
                  } mr-4`}
                />
              </span>
            </span>
            <Collapse id={`slider-${key}`}>
              <Sortable
                callback={() => {
                  setId(item.id)
                  setChanged(true)
                }}
                title="name_panel"
                section="sliders"
                fields={[
                  {
                    perm: "sliders_image_column",
                    title: "image",
                    td: (row) => (
                      <img
                        className="rounded"
                        width={45}
                        height={45}
                        src={`${process.env.apiHost}${row.media.url}`}
                        alt={row.title_panel}
                      />
                    ),
                  },
                  {
                    title: "title_panel",
                    perm: "sliders_title_column",
                  },
                ]}
                data={item.images.filter((item) => item)}
                setData={setSort.bind(this, key)}
                actions={[
                  {
                    onClick: actions.editImage.bind(this, key),
                    icon: "far fa-edit",
                    perm: "sliders_edit_action",
                    tooltip: "edit",
                    dir: "right",
                  },
                  {
                    onClick: actions.deleteImage.bind(this, key),
                    icon: "far fa-trash-alt",
                    perm: "sliders_delete_action",
                    tooltip: "delete",
                    dir: "right",
                  },
                ]}
                headless
              />
            </Collapse>
          </div>
        ))}
      </div>
    </>
  )
}

export default Slider
