import { useContext } from "react";
import { useRouter } from "next/router";
import { TranslationContext } from "~/app/Context";
import Image from "next/image";
import Button from "@admin/Button";
import Styles from "./404.module.scss";

export default function E404() {
  const translation = useContext(TranslationContext);

  const router = useRouter();

  return (
    <div className={`text-center ${Styles.center}`}>
      <Image
        src="/images/errors.png"
        width={300}
        height={300}
        alt="404 picture"
      />

      <h3>{translation("404 Mode")} !</h3>
      <div className="mt-3">
        {translation("The page you are looking for is not found")}
      </div>
      <Button
        type="white"
        className={"text-center w-100 mt-3"}
        onClick={() => {
          router.push("/");
        }}
      >
        {translation("Home")}
      </Button>
    </div>
  );
}
