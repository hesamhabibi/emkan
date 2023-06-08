import Styles from "./sidebar.module.scss"
import { useContext, useState } from "react"
import { TranslationContext } from "~/app/Context"
import Input from "@admin/Input"
import Button from "@admin/Button"
import Tag from "@admin/Tag"
import { DeviceView } from "~/app/Context"
import Back from "@admin/CrudLayout/Back"
import Shield from "@admin/Shield"
import { TabComponents } from "~/pages/products/create/physical/desktop/wrapped"
import HasPerm from "~/app/perm"
import { useRouter } from "next/router"

const statusFields = [
  "title",
  "category_id",
  "brand_id",
  "summary",
  "main_features",
  "strengths",
  "weaknesses",
  "description",
]

const galleryFields = ["media_gallery", "video", "files"]

const extraFields = ["has_comment", "is_special", "has_rating"]

const variantFields = ["variant", "mix_variant", "price", "details"]

// attribute_groups
// seo

const permissions = [
  {
    name: "تب گونه ها",
    key: "products_attributes_tab",
  },
  {
    name: "تب اصلی",
    key: "products_main_tab",
  },
  {
    name: "تب سئو",
    key: "products_seo_tab",
  },
  {
    name: "تب گالری تصاویر",
    key: "products_images_tab",
  },
  {
    name: "تب جدول محصول",
    key: "products_table_tab",
  },
  {
    name: "تب قیمت محصول",
    key: "products_price_tab",
  },
  {
    name: "تب پیشرفته محصول",
    key: "products_advanced_tab",
  },
  {
    name: "تب محصولات مشابه",
    key: "products_related_tab",
  },
]

export default function Sidebar({
  section,
  setSection,
  control,
  callback,
  errors,
  menuItems,
  title = "فیزیکی",
  route = undefined,
}) {
  const translation = useContext(TranslationContext)

  if (!menuItems) menuItems = TabComponents

  const statuses = [
    {
      name: translation("show"),
      id: 2,
    },
    {
      name: translation("draft"),
      id: 3,
    },
    {
      name: translation("inactive"),
      id: 1,
    },
  ]
  const router = useRouter()

  const length = menuItems.filter((item) =>
    HasPerm({ id: item.permission, router, route })
  ).length

  const containsError = (field, section) => {
    return section.findIndex((item) => Object.keys(field).includes(item)) !== -1
  }

  return (
    <>
      <div className="mb-4">
        <Back
          title={translation("back")}
          className="w-100 mb-3"
          url="/products"
        />
        <div className="text-center">
          <p className="font-weight-bold">اضافه کردن محصول جدید</p>
          <Tag>نوع محصول: {title}</Tag>
        </div>
      </div>
      <div className={Styles.body}>
        <div className={Styles.container}>
          {menuItems
            .filter((item) => HasPerm({ id: item.permission, router, route }))
            .map((item, key) => (
              <div
                key={key}
                onClick={setSection.bind(this, key + 1)}
                className={`${Styles.card} ${
                  section === key + 1 ? Styles.active : ""
                } ${containsError(errors, item.errors) ? Styles.error : ""}`}
              >
                {translation(item.title, "products")}
              </div>
            ))}
          <div className="d-flex mt-1 justify-content-between align-items-center">
            <Button
              onClick={setSection.bind(this, (prev) => prev + 1)}
              disabled={section > length - 1}
              className={Styles.actions}
              type="white"
            >
              <i className="fas fa-angle-right ml-1" />
              {translation("next")}
            </Button>
            <Button
              disabled={section < 2}
              onClick={setSection.bind(this, (prev) => prev - 1)}
              className={Styles.actions}
              type="white"
            >
              {translation("previous")}
              <i className="fas fa-angle-left mr-1" />
            </Button>
          </div>
        </div>
        <div className={Styles.card}>
          <div className={Styles.header}>
            <span>{translation("status", "products")}</span>
          </div>
          <div className={Styles.body}>
            <DeviceView.Provider value={false}>
              <Input
                type="select"
                name="status"
                data={statuses}
                control={control}
                label={translation("product-status", "products")}
              />
            </DeviceView.Provider>
            <div className="my-3">
              <Input
                top
                control={control}
                label={translation("Publish At", "products")}
                name="publishAt"
                type="date-time-icon"
              />
            </div>
            <Button type="success" onClick={callback} className={Styles.submit}>
              {translation("Submit")}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
