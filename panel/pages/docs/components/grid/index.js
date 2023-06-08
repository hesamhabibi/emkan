import { dracula, CodeBlock } from "react-code-blocks";
import code from "./code";
import AdminLayout from "@admin/Layout";
import Styles from "../components.module.scss";

import { Grid, GridContainer } from "@admin/Grid";

const gridSection = (
  <GridContainer className="mt-3" size="Lg">
    <Grid className={Styles.purple} size="3">
      Sidebar
    </Grid>
    <Grid className={Styles.green} size="9">
      Main
    </Grid>
  </GridContainer>
);

export default function GridDocs() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>گریدبندی و گرید ها</h3>
        <p className={Styles.muted}>
          در بوت استرپ برای width دادن به المنت ها بسته به صفحه از row استفاده
          می کند، بجای row و استفاده از flexbox گرید ها جایگزین مناسبی می باشند.
        </p>
        <section>
          <h5>طریقه استفاده از grid ها </h5>
          <div>
            <CodeBlock language="jsx" theme={dracula} text={code} />
          </div>
          {gridSection}
        </section>
      </div>
    </AdminLayout>
  );
}
