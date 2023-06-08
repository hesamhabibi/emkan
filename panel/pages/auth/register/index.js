import { useContext, useState } from "react";
import client from "~/app/apollo-client";
import queries from "./queries";
import Mobile from "./Mobile";
import Desktop from "./Desktop";
import { DeviceView } from "~/app/Context/Device";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const isMobile = useContext(DeviceView);

  const {
    clearErrors,
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const attemptRegister = async (data) => {
    clearErrors();
    setLoading(true);
    try {
      const res = await client.query({
        query: queries.register,
        variables: { input: data },
      });
      document.cookie = `token=${res.data.panelRegister.token}`;
      localStorage.setItem("user", JSON.stringify(res.data.panelRegister));
      await router.push("/");
    } catch (e) {
      const error = e.graphQLErrors[0];
      if (error.code === "422") {
        Object.keys(error.errors).forEach((key) => {
          setError(key, error.errors[key]);
        });
      }
    }
    setLoading(false);
  };

  return (
    <>
      {!isMobile ? (
        <Mobile
          error={errors}
          control={control}
          loading={loading}
          callback={handleSubmit(attemptRegister)}
        />
      ) : (
        <Desktop
          error={errors}
          control={control}
          loading={loading}
          callback={handleSubmit(attemptRegister)}
        />
      )}
    </>
  );
}
