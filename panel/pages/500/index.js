import { useContext } from "react";
import Image from "next/image";
import Styles from "./500.module.scss";
import { useRouter } from "next/router";
import { TranslationContext } from "~/app/Context";
import Button from "@admin/Button";

export default function E500() {
  const translation = useContext(TranslationContext);

  const router = useRouter();

  return (
    <div className={`text-center ${Styles.center}`}>
      <Image src="/images/500.png" width={250} height={250} alt="500 picture" />

      <h3>{translation("500 Mode")} !</h3>
      <div className="mt-3">
        {translation("There was a problem during your actions")}
      </div>
      <Button
        type="primary"
        className={"text-center w-50 mx-auto mt-3"}
        onClick={() => router.push("/")}
      >
        {translation("Home")}
      </Button>
    </div>
  );
}
