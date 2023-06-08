import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import { closeModal, openModal } from "~/app/State/modal"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import AdminLayout from "@admin/Layout"
import Button from "@admin/Button"
import AddBtn from "@admin/CrudLayout/Add"
import Modal from "@admin/Modal"
import Styles from "./products.module.scss"
import { Grid, GridContainer } from "@admin/Grid"
import Tabs from "@admin/Tab"
import Tab from "./tab"
import HasPerm from "~/app/perm"
import Shield from "@admin/Shield"

export default function Products() {
  const translation = useContext(TranslationContext)

  const router = useRouter()
  const dispatch = useDispatch()

  const createModal = () => {
    dispatch(openModal("status-create"))
  }

  return (
    <AdminLayout
      action={
        <Shield id="products_create_action" action>
          <Button onClick={createModal} type="success">
            <i className="fas fa-plus-circle ml-1" />
            {translation("Add Product")}
          </Button>
        </Shield>
      }
      title={translation("Product")}
    >
      <Tabs>
        {HasPerm({ id: "products_physical_tab", router }) && (
          <div title={translation("product")}>
            <Tab key={1} type={1} />
          </div>
        )}
        {HasPerm({ id: "products_digital_tab", router }) && (
          <div title={translation("digital")}>
            <Tab key={2} type={2} />
          </div>
        )}
        {HasPerm({ id: "products_service_tab", router }) && (
          <div title={translation("service")}>
            <Tab key={3} type={3} />
          </div>
        )}
        {HasPerm({ id: "products_preview_tab", router }) && (
          <div title={translation("device")}>
            <Tab key={4} type={4} />
          </div>
        )}
      </Tabs>

      <Shield id="products_create_action" action>
        <AddBtn title={translation("Add Product")} callback={createModal} />
      </Shield>
      <Modal
        hasInfo={false}
        title={translation("choose product type")}
        size="xs"
        id="status-create"
        actions={[]}
      >
        <div className={Styles.container}>
          <Shield id="products_create_physical_action" action>
            <div
              onClick={() => {
                dispatch(closeModal("status-create"))
                router.push("/products/create/physical")
              }}
              className={Styles.row}
            >
              <GridContainer className="align-items-center w-100">
                <Grid size={2} className="text-center">
                  <i className="fad fa-box fa-3x ml-3" />
                </Grid>
                <Grid size={8}>
                  <div>
                    <h4>{translation("product")}</h4>
                    <p>{translation("product description")}</p>
                  </div>
                </Grid>
                <Grid size={1} />
                <Grid className="text-left" size={1}>
                  <i className="fad fa-caret-left mr-auto fa-2x" />
                </Grid>
              </GridContainer>
            </div>
          </Shield>

          <Shield id="products_create_digital_action" action>
            <div
              className={Styles.row}
              onClick={() => {
                dispatch(closeModal("status-create"))
                router.push("/products/create/digital")
              }}
            >
              <GridContainer className="align-items-center w-100">
                <Grid size={2} className="text-center">
                  <i className="fad fa-file-download fa-3x ml-3" />
                </Grid>
                <Grid size={8}>
                  <div>
                    <h4>{translation("digital")}</h4>
                    <p>{translation("digital description")}</p>
                  </div>
                </Grid>
                <Grid size={1} />
                <Grid className="text-left" size={1}>
                  <i className="fad fa-caret-left mr-auto fa-2x" />
                </Grid>
              </GridContainer>
            </div>
          </Shield>
          <Shield id="products_create_service_action" action>
            <div
              className={Styles.row}
              onClick={() => {
                dispatch(closeModal("status-create"))
                router.push("/products/create/service")
              }}
            >
              <GridContainer className="align-items-center w-100">
                <Grid size={2} className="text-center">
                  <i className="fad fa-cog fa-3x ml-3" />
                </Grid>
                <Grid size={8}>
                  <div>
                    <h4>{translation("service")}</h4>
                    <p>{translation("service description")}</p>
                  </div>
                </Grid>
                <Grid size={1} />
                <Grid size={1} className="text-left">
                  <i className="fad fa-caret-left mr-auto fa-2x" />
                </Grid>
              </GridContainer>
            </div>
          </Shield>
          <Shield id="products_create_preview_action" action>
            <div
              className={Styles.row}
              onClick={() => {
                dispatch(closeModal("status-create"))
                router.push("/products/create/preview")
              }}
            >
              <GridContainer className="align-items-center w-100">
                <Grid size={2} className="text-center">
                  <i className="fad fa-eye fa-3x ml-3" />
                </Grid>
                <Grid size={8}>
                  <div>
                    <h4>{translation("device")}</h4>
                    <p>{translation("preview description")}</p>
                  </div>
                </Grid>
                <Grid size={1} />
                <Grid size={1} className="text-left">
                  <i className="fad fa-caret-left mr-auto fa-2x" />
                </Grid>
              </GridContainer>
            </div>
          </Shield>
        </div>
      </Modal>
    </AdminLayout>
  )
}
