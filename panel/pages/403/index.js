import { useContext } from "react";
import Image from "next/image";
import Styles from "./403.module.scss";
import { useRouter } from "next/router";
import { TranslationContext } from "~/app/Context";
import Button from "@admin/Button";

export default function E403() {
  const translation = useContext(TranslationContext);

  const router = useRouter();

  const { url } = router.query;

  return (
    <div className={`text-center ${Styles.center}`}>
      <Image src="/images/403.png" width={250} height={250} alt="500 picture" />

      <h3>{translation("403 Mode")} !</h3>
      <div className="mt-3">{translation("Caught you")}</div>
      <Button
        className={"text-center w-50 mx-auto mt-3"}
        onClick={() => {
          router.push("/");
        }}
      >
        {translation("Home")}
      </Button>
    </div>
  );
}
