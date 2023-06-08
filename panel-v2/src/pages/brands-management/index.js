import React, { useEffect, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Desktop from "./desktop";
import Mobile from "./mobile";
import { useHeaderComponentContext } from "../../contexts/HeaderComponentContext";
import {
  CREATE_BRAND,
  UPDATE_BRAND,
} from "../../services/brandsService/mutations";
import { upload_media_service } from "../../services/brandsService/uploadMediaService";
import { GET_BRAND } from "../../services/brandsService/queries";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { init_string_format } from "../../helpers/init_formats";
import useGraphql from "../../hooks/graphql";

export default function Index() {
  const { set_title_page, set_breadcrumbs } = useHeaderComponentContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const { queryGraphql, mutationGraphql } = useGraphql();
  const [search_params, set_search_params] = useSearchParams();
  const get_global_query_params = () => ({
    title: init_string_format(search_params.get("title.fa")),
  });

  const [form, set_form] = useState(() => {
    const _get_global_query_params = get_global_query_params();
    return {
      title: _get_global_query_params["title.fa"],
      // errors: {},
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
        url: "/slug/////////////////",
        canonical_url: "/url/",
        redirect_url_301: "/url/",
        redirect_url_404: "/url/",
        robots_status: 1,
      },
    };
  });

  const [mode, set_mode] = useState("Create");

  const write_form = (e) => {
    console.log(e.target)
    const { name, value } = e.target;
    set_form((prev) => ({ ...prev, [name]: value }));

    if (value?.toString()?.length > 0) {
      search_params.set(name, value);
      set_search_params(search_params, { replace: true });
    } else {
      if (search_params.has(name)) {
        search_params.delete(name);
        set_search_params(search_params, { replace: true });
      }
    }
  };

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

  const get_brand = async () => {
    if (id) {
      const result = await queryGraphql(
        GET_BRAND,
        { id },
        {
          fetchPolicy: "network-only",
        }
      );
      console.log(result);
      if (result.status) {
        set_form((prev) => ({
          ...prev,
          title: {
            fa: prev?.title?.fa || result?.data?.title?.fa,
            en: prev?.title?.en || result?.data?.title?.en,
          },
          description: {
            fa: prev?.description?.fa || result?.data?.description?.fa,
            en: prev?.description?.en || result?.data?.description?.en,
          },
          show_in_menu: prev?.show_in_menu || result?.data?.show_in_menu,
          media: { ...prev?.media },
        }));
      }
    }
  };

  useEffect(() => {
    if (id) {
      get_brand();
    }
  }, [id]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  const submit_brand = async () => {
    let result;
    const input = { ...form };
    if (id) {
      result = await mutationGraphql(
        UPDATE_BRAND,
        { id, input }
        // name: form?.name
      );
    } else {
      result = await mutationGraphql(
        CREATE_BRAND,
        { input: { ...form } }
        // name: form?.name,
      );
    }
    if (result?.status) {
      navigate(-1);
    } else {
      set_form((prev) => ({
        ...prev,
        errors: result?.errors,
      }));
    }
  };

  useEffect(() => {
    set_title_page("brands.new_brand");
    set_breadcrumbs([
      {
        title: "brands.brands",
        link: "/roles",
      },
      {
        title: "brands.new_brand",
        link: "/roles-management",
      },
    ]);
  }, []);

  return (
    <>
      <MobileView>
        <Mobile
          {...{
            form,
            set_form,
            write_form,
            submit_brand,
            edit_mode: !!id,
            upload_media,

            // createBrandHandler,
          }}
        />
      </MobileView>
      <BrowserView>
        <Desktop
          {...{
            form,
            set_form,
            write_form,
            submit_brand,
            edit_mode: !!id,
            upload_media,

            // createBrandHandler,
          }}
        />
      </BrowserView>
    </>
  );
}
