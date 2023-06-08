import { useContext } from "react";
import { TranslationContext } from "~/app/Context/Translation";
import Styles from "./register.module.scss";
import Input from "@admin/Input";
import Button from "@admin/Button";
import Link from "next/link";

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
              size="lg"
              control={control}
              name="name"
              placeholder={translation("name", "auth")}
            />
            <Input
              size="lg"
              name="last_name"
              control={control}
              placeholder={translation("last_name", "auth")}
            />
            <Input
              size="lg"
              name="username"
              control={control}
              placeholder={translation("username", "auth")}
            />
            <Input
              size="lg"
              name="email"
              control={control}
              placeholder={translation("email", "auth")}
            />
            <Input
              name="mobile"
              control={control}
              size="lg"
              placeholder={translation("phone_number", "auth")}
            />
            <Input
              name="password"
              control={control}
              type="password"
              size="lg"
              placeholder={translation("password", "auth")}
            />
            <Input
              name="password_confirmation"
              control={control}
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
