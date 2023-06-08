import Styles from "./register.module.scss";
import Input from "@admin/Input";
import Button from "@admin/Button";
import Link from "next/link";
import Alert from "@admin/Alert";
import { useContext } from "react";
import { TranslationContext } from "~/app/Context/Translation";

export default function Desktop({ callback, loading, control }) {
  const translation = useContext(TranslationContext);
  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <form onSubmit={callback}>
          <i className="fad fa-globe-europe fa-3x" />
          <h4>آسان تکمیل</h4>
          <div className={Styles.body}>
            <h5>{translation("register to panel", "auth")}</h5>
            <Input
              name="name"
              control={control}
              size="lg"
              placeholder={translation("name", "auth")}
            />
            <Input
              name="last_name"
              control={control}
              size="lg"
              placeholder={translation("last_name", "auth")}
            />
            <Input
              control={control}
              name="username"
              size="lg"
              placeholder={translation("username", "auth")}
            />
            <Input
              control={control}
              name="email"
              size="lg"
              placeholder={translation("email", "auth")}
            />
            <Input
              control={control}
              name="mobile"
              size="lg"
              options={register("mobile")}
              placeholder={translation("phone_number", "auth")}
            />
            <Input
              control={control}
              name="password"
              type="password"
              size="lg"
              placeholder={translation("password", "auth")}
            />
            <Input
              control={control}
              name="password_confirmation"
              type="password"
              size="lg"
              placeholder={translation("password_confirmation", "auth")}
            />
            <Button
              submit
              loading={loading}
              type="primary"
              className={Styles.submit}
            >
              {translation("register", "auth")}
            </Button>
            <Link href="/auth/login">
              <a>{translation("have account? login", "auth")}</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
