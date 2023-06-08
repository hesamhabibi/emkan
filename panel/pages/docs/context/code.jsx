export default {
  translation: `import { TranslationContext } from "~/app/Context";

const Component = ({...props}) => {
  const translation = useContext(TranslationContext);
  
  return (
    <div>
        {/* (1) Text   (2)from(Module)*/}
        {translation("Salam", "hello")}
    </div>
  );
}`,
  loading: `import { LoadingContext } from "~/app/Context";
import Styles from "./context.module.scss";

const Component = ({...props}) => {
  const setLoading = useContext(LoadingContext);
  
  const ajaxLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  }
  
  return (
    <div>
        <button onClick={ajaxLoad} className={Styles.blue}>
          Click Me
        </button>
    </div>
  );
}`,
  device: `import { useContext } from "react";
import { DeviceView } from "~/app/Context";
import Desktop from "./desktop";
import Mobile from "./mobile";

export default function Table({ ...props }) {
  const isDesktop = useContext(DeviceView);

  return isDesktop ? <Desktop {...props} /> : <Mobile {...props} />;
}`,
};
