export default `import Table from "@admin/Table";

const data =  [
  {
    name: "علی",
    last_name: "مکتبی",
    phone_number: "0933xxxxxxx",
    national_code: "228213128392",
  },
  {
    name: "تست",
    last_name: "تست",
    phone_number: "09323xxxxxxx",
    national_code: "498573475934",
  },
  {
    name: "میلاد",
    last_name: "محمدی",
    phone_number: "0923xxxxxxxx",
    national_code: "23509382059",
  }
];

const table = (
  <span className="w-100">
    <Table
      fields={[
        { title: "name" },
        { title: "last_name" },
        { title: "phone_number" },
        { title: "national_code" },
      ]}
      actions={[
        {
          onClick: (rows) => console.log(rows),
          icon: "fa-edit",
        },
        {
          onClick: (rows) => console.log(rows),
          icon: "fa-trash-alt",
        },
      ]}
      data={data}
    />
  </span>
);
`;
