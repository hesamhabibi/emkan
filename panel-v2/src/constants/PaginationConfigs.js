const rows_limit_list = [15, 25, 50, 100];

const limit_options = [
  { title: 15, value: 15 },
  { title: 25, value: 25 },
  { title: 50, value: 50 },
  { title: 100, value: 100 },
];

const default_rows_limit = rows_limit_list[0];

const asc_sort = "asc";

export { default_rows_limit, rows_limit_list, asc_sort, limit_options };
