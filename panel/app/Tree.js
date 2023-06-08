export const make_tree = (
  flat = null,
  child_name = "children",
  parent_name = "parent_id",
  parent_root = null
) => {
  if (flat === null) flat = [];
  const map = {};
  let node;
  const arr = JSON.parse(
    JSON.stringify(
      parent_root ? flat.filter((row) => row.id !== parent_root) : flat
    )
  );
  const res = [];
  let i;
  for (i = 0; i < arr.length; i += 1) {
    map[arr[i].id] = i;
    if (arr[i]) {
      arr[i][child_name] = [];
    } else {
    }
  }
  for (i = 0; i < arr.length; i += 1) {
    node = arr[i];
    if (node[parent_name] !== parent_root && arr[map[node[parent_name]]]) {
      arr[map[node[parent_name]]][child_name].push(node);
    } else {
      res.push(node);
    }
  }
  return res;
};

export const flat_tree = (
  data,
  flat_list = null,
  parent_id = null,
  start_sort = 1
) => {
  if (flat_list === null) flat_list = [];
  // const item = [...list];
  let start = start_sort;

  if (Array.isArray(data)) {
    data.forEach((arr) => flat_tree(arr, flat_list, parent_id, start++));
  } else if (typeof data === "object") {
    data.parent_id = parent_id;
    data["sort"] = start++;
    if (data.children.length > 0) {
      let start_children = 1;
      data.children.forEach((child) =>
        flat_tree(child, flat_list, data.id, start_children++)
      );
    }

    flat_list.push(data);
    return flat_list;
  }

  return flat_list;
};

export const array_pluck = (arr, keys) => {
  const result = [];
  for (let data of arr) {
    const row = {};
    keys.forEach((value) => {
      row[value] = data[value];
    });
    result.push(row);
  }
  return result;
};

// const flatten_item = (item, parent_id = null) => {
//     // const item = [...list];
//     if (item.children.length > 0) {
//         item.children.forEach(child => flatten_item(child, item.id))
//
//     }
//     item.parent_id = parent_id;
//
//     return flat_list.push(item);
// };
//
// export const flat_tree = (tree) => {
//     const result = [];
//
//     tree.forEach((value) => flat_tree(value));
//
//     return result;
// }
