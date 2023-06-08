import { useEffect, useState } from "react";
import { useHeaderComponentContext } from "../../contexts/HeaderComponentContext";
import { useTranslation } from "react-i18next";
import { upload_media_service } from "../../services/brandsService/uploadMediaService";
import { useMutation } from "@apollo/client";
import {
  CREATE_BRAND,
  DELETE_BRAND,
  UPDATE_BRAND,
} from "../../services/brandsService/mutations";
import { useQuery } from "@apollo/client";
import { GET_ALL_BRANDS } from "../../services/brandsService/queries";
import Input from "./Input";
import CheckboxInput from "./ChecboxInput";

const Index = () => {
  const [form, set_form] = useState({
    active: true,
    show_in_menu: true,
    seo: {
      title: {
        fa: "seo title",
        en: "",
      },
      description: {
        fa: "seo description",
        en: "",
      },
      keywords: {
        fa: "seo keywords",
        en: "",
      },
      url: "slug",
      canonical_url: "/url/",
      redirect_url_301: "/url/",
      redirect_url_404: "/url/",
      robots_status: 1,
    },
  });

  const [mode, set_mode] = useState("Create");

  const { t } = useTranslation();
  const { set_title_page, set_breadcrumbs } = useHeaderComponentContext();

  const langs = ["en", "fa"];

  const write_form = (e) => {
    const { value, name } = e?.target;

    set_form((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    set_title_page("brands.brands");
    set_breadcrumbs([]);
  }, []);

  const [CreateBrand, { error }] = useMutation(CREATE_BRAND, {
    refetchQueries: [GET_ALL_BRANDS, "getAllBrands"],
    onCompleted: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [DeleteBrand] = useMutation(DELETE_BRAND, {
    refetchQueries: [GET_ALL_BRANDS, "getAllBrands"],
    onCompleted: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const [UpdateBrand] = useMutation(UPDATE_BRAND, {
    refetchQueries: [GET_ALL_BRANDS, "getAllBrands"],
    onCompleted: (data) => {
      console.log(data, "success");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data } = useQuery(GET_ALL_BRANDS);

  const upload_media = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("file", e.target?.files[0]);
    form_data.append("alt", "alt text");
    // form_data.append("url", "/url");
    const data = await upload_media_service(form_data);
    set_form((prev) => ({
      ...prev,
      media: {
        ...prev?.media,
        media_id: data?.data?.id,
        alt: data?.data?.alt,
        url: data?.data?.url,
      },
    }));
  };

  const createBrandHandler = async (e) => {
    e.preventDefault();
    if (mode === "Update") {
      const id = form?.id;
      const input = { ...form };
      delete input["id"];
      delete input["media"];
      console.log({ id, input });
      await UpdateBrand({ variables: { id, input } });
    } else {
      const data = await CreateBrand({ variables: { input: { ...form } } });
    }
  };

  const deleteBrandHandler = async (e, id) => {
    e.preventDefault();
    await DeleteBrand({
      variables: { id },
    });
  };

  const editBrandHandler = async (e, brand) => {
    e.preventDefault();
    set_mode("Update");
    set_form({
      id: brand?.id,
      title: {
        fa: brand?.title?.fa || "",
        en: brand?.title?.en || "",
      },
      description: {
        fa: brand?.description?.fa || "",
        en: brand?.description?.en || "",
      },
      show_in_menu: brand?.show_in_menu || false,
      media: { ...brand?.media },
    });
  };

  return (
    <main>
      <form>
        <h2>{t("brands.createBrand")}</h2>
        {langs.map((lang) => {
          return (
            <Input
              key={lang}
              lang={lang}
              label={"common.title"}
              form={form}
              name={`title.${lang}`}
              onChange={write_form}
              value={
                form && form?.title && form?.title[lang]
                  ? form?.title[lang]
                  : ""
              }
            />
          );
        })}
        {langs.map((lang) => {
          return (
            <Input
              key={lang}
              lang={lang}
              label={"common.description"}
              form={form}
              name={`description.${lang}`}
              onChange={write_form}
              value={
                form && form?.description && form?.description[lang]
                  ? form?.description[lang]
                  : ""
              }
            />
          );
        })}

        <CheckboxInput
          label={"brands.showInMenu"}
          name="show_in_menu"
          onChange={write_form}
          form={form}
          value={form?.show_in_menu || false}
        />
        {mode === "Update" && (
          <>
            <img
              // src={`${process.env.REACT_APP_BACKEND_ENDPOINT_URL}/${form?.media?.url}`}
              src={`${
                process.env.REACT_APP_BACKEND_ENDPOINT_URL
              }${form?.media?.url?.replace("lic", "")}`}
              alt=""
            />
          </>
        )}
        <section>
          <h4>{t("brands.uploadImgTitle")}</h4>
          <input type="file" name="media" onChange={upload_media} />
        </section>
        <br />
        <button onClick={createBrandHandler}>{mode}</button>
        {/* {newBrand ? <p>Brand Created</p> : <p>{error.message}</p>} */}
      </form>
      <section>
        <h2>{t("brands.brands")}</h2>
        <ul>
          {data &&
            data?.result?.map((brand) => {
              return (
                <div key={brand?.id}>
                  <li>{brand?.title?.fa}</li>
                  <button onClick={(e) => editBrandHandler(e, brand)}>
                    Edit
                  </button>
                  <button onClick={(e) => deleteBrandHandler(e, brand?.id)}>
                    delete
                  </button>
                </div>
              );
            })}
        </ul>
      </section>
    </main>
  );
};

export default Index;
