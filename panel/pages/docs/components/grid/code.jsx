export default `import { Grid, GridContainer } from "@admin/Grid";
import Styles from "./styles.module.scss";

const gridSection = (
  <GridContainer className="mt-3" size="Lg">
    <Grid className={Styles.purple} size="3">
      Sidebar
    </Grid>
    <Grid className={Styles.green} size="9">
      Main
    </Grid>
  </GridContainer>
)`;
