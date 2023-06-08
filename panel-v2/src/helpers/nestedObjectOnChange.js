import { generate_nested_object_with_keys } from "./obj";

const nested_object_onChange = (names, value, state, event) => {
  const main_object_name = names[0];
  const other_names = names?.filter((item) => item !== main_object_name);
  console.log("main_object_name", main_object_name, other_names);
  return {
    ...event,
    target: {
      name: main_object_name,
      value: generate_nested_object_with_keys(
        state[main_object_name] || {},
        other_names,
        value
      ),
    },
  };
};
export default nested_object_onChange;
