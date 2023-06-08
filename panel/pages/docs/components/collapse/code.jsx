export default `import { useDispatch } from "react-redux";
import Collapse from "@admin/Collapse";
import { toggle, open, close } from "~/app/State/collapse";

const Section = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        className="p-2 mt-4 w-100"
        onClick={() => dispatch(toggle("collapsed"))}
        type="warning"
        disabled={false}
        options={{ ref: (ref) => console.log(ref) }}
      >
        فیلتر جستجو
      </Button>
      <Collapse id="collapsed">
        <div style={{ background: "white", padding: 20 }}>
          salam salam salam
        </div>
      </Collapse>
    </>
  );
};`;
