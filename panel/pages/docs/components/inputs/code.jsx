export default {
  text: `import Input from "@admin/Input";
import { useForm } from "react-hook-form"
  
function Main() {
  const { handleSubmit, control, setError } = useForm();

  return (
    <form className="mt-3" onSubmit={handleSubmit((data) => console.log(data))}>
      <Input
        label="نام"
        control={control}
        name="name"
        placeholder="نام خود را وارد کنید"
      />
    </form>
  );
}
`,
  select: `import {useForm} from "react-hook-form";
import Button from "@admin/Button";
import Input from "@admin/Input";
import { Grid, GridContainer } from "@admin/Grid";

function Select() {
  const data = [
    { id: "1", name: "مرد" },
    { id: "2", name: "زن" },
  ];

  const tagsData = [
    { id: "1", name: "تگ سوم" },
    { id: "2", name: "تگ دوم" },
    { id: "3", name: "تگ اول" },
  ];

  const categoryData = [
    { id: 2, name: "موبایل" },
    { id: 3, name: "کامپیوتر" },
    { id: 1, name: "ساعت" },
  ];

  const { handleSubmit, control, setError } = useForm();

  const VALIDATE_DATA = (data) => {
    if (!data.gender)
      setError("gender", {
        message: "این فیلد الزامی است",
        type: "required",
      });
    if (!data.tags)
      setError("tags", {
        message: "این فیلد الزامی است",
        type: "required",
      });
    if (!data.category)
      setError("category", {
        message: "این فیلد الزامی است",
        type: "required",
      });
  };
  
  return (
    <form
      className="mt-3"
      onSubmit={handleSubmit(VALIDATE_DATA)}
    >
      <GridContainer gap="Lg">
        <Grid size={6}>
          <Input
            type="select"
            label="جنسیت"
            control={control}
            data={data}
            name="gender"
          />
        </Grid>
        <Grid size={6}>
          <Input
            type="select-multiple"
            label="تگ ها"
            control={control}
            data={tagsData}
            name="tags"
          />
        </Grid>
        <Grid size={6}>
          <Input
            type="select-searchable"
            control={control}
            data={categoryData}
            name="category"
            label="دسته بندی ها"
          />
        </Grid>
        <Grid size={6}>
          <Input
            label="دسته بندی 2"
            type="toggle"
            control={control}
            data={categoryData}
            name="salam"
          />
        </Grid>
      </GridContainer>
      <Button type="success" className="w-100 mt-2" submit>
        ثبت
      </Button>
    </form>
  );
}
`,
  textEditor: `function TextEditor() {
  const { control, setError } = useForm();

  return (
    <>
      <div className="mt-3">
        <Input
          label="مقاله"
          type="text-editor"
          control={control}
          name="content"
        />
      </div>
      <section>
        <span>
          <Input
            label="توضیحات"
            control={control}
            name="description"
            type="textarea"
          />
        </span>
      </section>
    </>
  );
}`,
  images: `function Image() {
  const { control } = useForm();

  return (
    <form>
      <Input
        label="انتخاب تصویر"
        type="image"
        url="/api/upload-image"
        control={control}
        name="image"
      />
      <Input
        label="گالری تصاویر"
        type="image-gallery"
        url="/api/upload-gallery"
        control={control}
        name="images"
      />
    </form>
  );
}
`,
  date: `function DateTime() {
  const { control } = useForm();
  return (
    <section>
      <h4>تاریخ و زمان ها</h4>
      <CodeBlock language="jsx" theme={dracula} text={code.date} />
      <span>
        <GridContainer gap="Md">
          <Grid size={6}>
            <Input
              type="date"
              // locale="en"
              control={control}
              name="date"
              label="تاریخ"
            />
          </Grid>
          <Grid size={6}>
            <Input
              type="time"
              // locale="en"
              control={control}
              name="time"
              label="زمان"
            />
          </Grid>
        </GridContainer>
      </span>
    </section>
  );
}`,
  prepend: `const Main = (
      <span>
        <GridContainer>
          <Grid size={6}>
            <span className="d-block mt-5">
              <div>نام</div>
              <Prepend
                control={control}
                input_name="value"
                select_name="lang"
                input_size={8}
                select_size={4}
                parent_name="title"
                select_placeholder="انتخاب زبان"
                select_data={[
                  {
                    id: 1,
                    name: "فارسی",
                  },
                  {
                    id: 2,
                    name: "انگلیسی",
                  },
                ]}
              />
            </span>
          </Grid>
        </GridContainer>
      </span>
    )`,
  multi: `function MultiText() {
  const { control, handleSubmit } = useForm();

  const langData = [
    {
      code: "fa",
      name: "Persian",
      name_fa: "فارسی",
      direction: "rtl",
    },
    {
      code: "fi",
      name: "Finnish",
      name_fa: "فنلاندی",
      direction: "ltr",
    },
    {
      code: "en",
      name: "English",
      name_fa: "انگلیسی",
      direction: "ltr",
    },
  ];

  return (
    <section>
      <span>
        <GridContainer gap="Lg" className="mb-2">
          <Input
            tag={Grid}
            tag_props={{ size: 6 }}
            label="عنوان"
            data={langData}
            type="text-editor-multiple"
            control={control}
            name="عنوان"
          />
        </GridContainer>
        <Button
          className="w-100"
          type="primary"
          onClick={handleSubmit((data) => console.log(data))}
        >
          ثبت
        </Button>
      </span>
    </section>
  );
}`,
};
