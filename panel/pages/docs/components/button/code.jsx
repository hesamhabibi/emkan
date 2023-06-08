export default `import Button from "@admin/Button";

const section = (
  <Button
    className="p-2"
    loading={true}
    type="success"
    disabled={false}
    options={{ ref: (ref) => console.log(ref) }}
  >
    Button
  </Button>
)`;
