const check_has_object_values = (obj = {}) => {
  return (
    Object.values(obj).filter(
      (value) => value !== null && value !== undefined && value?.length > 0
    )?.length > 0
  );
};

const generate_nested_object_with_keys = (obj, keys, v) => {
  if (keys.length === 1) {
    obj[keys[0]] = v;
  } else {
    var key = keys.shift();
    obj[key] = generate_nested_object_with_keys(
      typeof obj[key] === "undefined" ? {} : obj[key],
      keys,
      v
    );
  }
  return obj;
};

const remove_undefined_value_in_object = (obj) => {
  const new_obj = {};
  const obj_keys = Object.keys(obj);
  obj_keys?.forEach((key) => {
    if (obj[key]) {
      new_obj[key] = obj[key];
    }
  });

  return new_obj;
};

export {
  check_has_object_values,
  generate_nested_object_with_keys,
  remove_undefined_value_in_object,
};
