import AnimateHeight from "react-animate-height";
import { useSelector } from "react-redux";

const Collapse = ({ children, id, className }) => {
  const collapsed = useSelector((state) => state.collapse.value[id]);

  return (
    <AnimateHeight duration={500} height={collapsed ? "auto" : 0}>
      {children}
    </AnimateHeight>
  );
};

export default Collapse;
