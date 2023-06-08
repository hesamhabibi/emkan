import Styles from "./sidebar.module.scss";
import { useContext } from "react";
import { TranslationContext } from "~/app/Context";
import Input from "@admin/Input";
import Button from "@admin/Button";
import Tag from "@admin/Tag";
import { DeviceView } from "~/app/Context";
import Back from "@admin/CrudLayout/Back";

const statusFields = [
  "title", "category_id", "brand_id", "summary", "main_features", "strengths", "weaknesses", "description",
]

const galleryFields = [
  "media_gallery", "video", "files"
]

const extraFields = [
  "has_comment", "is_special", "has_rating"
]

const variantFields = [
  "variant", "mix_variant", "price", "details"
]

// attribute_groups
// seo

export default function Sidebar({ section, setSection, control, callback, errors }) {
  const translation = useContext(TranslationContext)

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


  const containsError = (field, section) => {
    return section.findIndex(item => Object.keys(field).includes(item)) !== -1
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
          <Tag>نوع محصول: سرویس</Tag>
        </div>
      </div>
      <div className={Styles.body}>
        <div className={Styles.container}>
          <div
            onClick={setSection.bind(this, 1)}
            className={`${Styles.card} ${section === 1 ? Styles.active : ""} ${containsError(errors, statusFields) ? Styles.error: ""}`}
          >
            {translation("product status", "products")}
          </div>

          <div
            onClick={setSection.bind(this, 2)}
            className={`${Styles.card} ${section === 2 ? Styles.active : ""} ${
              containsError(errors, ["seo"]) ? Styles.error: ""
            }`}
          >
            {translation("seo and optimization", "products")}
          </div>

          <div
            onClick={setSection.bind(this, 3)}
            className={`${Styles.card} ${section === 3 ? Styles.active : ""} ${
              containsError(errors, galleryFields) ? Styles.error: ""
            }`}
          >
            {translation("product images", "products")}
          </div>

          {/*<div*/}
          {/*  onClick={setSection.bind(this, 4)}*/}
          {/*  className={`${Styles.card} ${section === 4 ? Styles.active : ""}`}*/}
          {/*>*/}
          {/*  {translation("product price", "products")}*/}
          {/*</div>*/}

          <div
            onClick={setSection.bind(this, 4)}
            className={`${Styles.card} ${section === 4 ? Styles.active : ""} ${
              containsError(errors, ["attribute_groups"]) ? Styles.error: ""
            }`}
          >
            {translation("product table", "products")}
          </div>

          <div
            onClick={setSection.bind(this, 5)}
            className={`${Styles.card} ${section === 5 ? Styles.active : ""} ${
              containsError(errors, variantFields) ? Styles.error: ""
            }`}
          >
            {translation("product attributes", "products")}
          </div>

          <div
            onClick={setSection.bind(this, 6)}
            className={`${Styles.card} ${section === 6 ? Styles.active : ""} ${
              containsError(errors, extraFields) ? Styles.error: ""
            }`}
          >
            {translation("advanced", "products")}
          </div>

          <div
            onClick={setSection.bind(this, 7)}
            className={`${Styles.card} ${section === 7 ? Styles.active : ""} ${
              containsError(errors, ["collections"]) ? Styles.error: ""
            }`}
          >
            {translation("related products", "products")}
          </div>

          <div className="d-flex mt-1 justify-content-between align-items-center">
            <Button
              onClick={setSection.bind(this, (prev) => prev + 1)}
              disabled={section > 6}
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
  );
}
