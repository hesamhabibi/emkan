import Section from "../section"
import { Grid } from "@admin/Grid"
import Input from "@admin/Input"
import { useContext } from "react"
import { TranslationContext } from "~/app/Context"
import Styles from "./attributes.module.scss"
import { useRouter } from "next/router"
import Shield from "@admin/Shield"

export default function Gallery({ control, data, setInfo, info }) {
  const translation = useContext(TranslationContext)

  const router = useRouter()

  return (
    <Section>
      <Grid size={12}>
        <h5 className={`d-flex justify-content-between ${Styles.header}`}>
          {translation("product images", "products")}
          <div
            onClick={setInfo.bind(null, !info)}
            className={`mr-2 ${!info ? Styles.active : ""}`}
          >
            <i className="fad fa-question-circle fa-lg" />
          </div>
        </h5>
      </Grid>
      <Grid size={12}>
        <Input
          type="image-gallery"
          control={control}
          label={translation("images", "products")}
          info={translation("image info", "products")}
          name="media_gallery"
          url={`${process.env.apiHost}api/media/upload-media-product`}
        />
      </Grid>
      <Grid size={12}>
        <Shield
          route="/products"
          id={`products_${
            router.asPath.split("/").pop().split("?")[0]
          }_video_field`}
        >
          <Input
            type="video"
            control={control}
            label={translation("video", "products")}
            name="video"
            info={translation("video info", "products")}
            url={`${process.env.apiHost}api/media/upload-video-product`}
          />
        </Shield>
      </Grid>
      {/*<Grid size={12}>*/}
      {/*  <Input*/}
      {/*    type="file"*/}
      {/*    control={control}*/}
      {/*    label={translation("file", "products")}*/}
      {/*    info={translation("file info", "products")}*/}
      {/*    name="files"*/}
      {/*    url={`${process.env.apiHost}api/media/upload-media-product`}*/}
      {/*  />*/}
      {/*</Grid>*/}
    </Section>
  )
}
