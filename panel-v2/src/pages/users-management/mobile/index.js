import React, { useEffect } from "react";
import Footer from "./footer";
import { useFooterComponentContext } from "../../../contexts/FooterComponentContext";
import { useHeaderComponentContext } from "../../../contexts/HeaderComponentContext";
import LoadingCard from "./loading-card";
import Card from "./card";

const Index = ({
  form,
  write_form,
  submit_user,
  edit_mode,
  loading,
//   roles,
accesses
}) => {
  const { breadcrumbs } = useHeaderComponentContext();
  const { footer_component, set_footer_component } =
    useFooterComponentContext();

  useEffect(() => {
    set_footer_component(
      <Footer
        {...{
          submit_user,
          edit_mode,
        }}
      />
    );
  }, [form]);

  const user_management_layout_position = (theme) => {
    if (breadcrumbs?.length > 0 && footer_component) {
      return "calc(100vh - 235px)";
    } else if (breadcrumbs?.length > 0 && !footer_component) {
      return "calc(100vh - 190px)";
    } else if (footer_component && breadcrumbs?.length === 0) {
      return "calc(100vh - 220px)";
    } else if (breadcrumbs?.length === 0 && !footer_component) {
      return "calc(100vh - 175px)";
    }
  };

  return (
    <>
      {loading ? (
        <LoadingCard
          {...{
            user_management_layout_position,
          }}
        />
      ) : (
        <Card
          {...{
            user_management_layout_position,
            form,
            write_form,
            // roles,
            accesses
          }}
        />
      )}
    </>
  );
};

export default Index;
