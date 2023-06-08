import { GridContainer } from "@admin/Grid";
import Styles from "./section.module.scss";

export default function Section({ children }) {
  return (
    <GridContainer className={Styles.container} gap="Lg">
      {children}
    </GridContainer>
  );
}
