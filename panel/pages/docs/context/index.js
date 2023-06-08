import { useContext } from "react";
import AdminLayout from "@admin/Layout";
import Styles from "~/pages/docs/scss/index.module.scss";
import { CopyBlock, dracula } from "react-code-blocks";
import codes from "./code";

import { LoadingContext } from "~/app/Context";
import Button from "@admin/Button";

const Component = ({ ...props }) => {
  const setLoading = useContext(LoadingContext);

  const ajaxLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };
  return (
    <div>
      <Button onClick={ajaxLoad} type="primary">
        Click Me
      </Button>
    </div>
  );
};

export default function Context() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>استفاده از استایل در پروژه</h3>
        <p className={Styles.muted}>
          هدف از ساخت کلاس های گلوبال، میانبر و ساده تر بودن زمان دولوپ می باشد
          و استفاده از این کلاس ها پرفرمنس بهتری خواهد داشت
        </p>
        <section>
          <h5>
            <i className="far fa-language ml-2" />
            ترجمه متون
          </h5>
          <p>
            پنل ادمین دارای دو زبان فارسی و انگلیسی می باشد. اما در وب زبان های
            بیشتری می تواند موجود باشد
          </p>
          <CopyBlock text={codes.translation} language="jsx" theme={dracula} />
          <h3 className="mt-3">چگونه یک ماژول ترجمه برای خود بسازیم</h3>
          <p>
            برای ساخت یک ماژول برای ترجمه در پوشه ای که میخواهید یک پوشه با نام
            lang بسازید. در آن پوشه فایل های fa.json و en.json را بسازید در هر
            کدام ترجمه های خود را بنویسید
          </p>
          <div className="d-flex justify-content-around">
            <img src="/panel-img/tutorials/trans.png" alt="@admin/Input/Date" />
            <img src="/panel-img/tutorials/trans2.png" alt="@admin/Input/Date" />
          </div>
          <p>
            سپس فایل app/Translation/en و فایل app/Translation/fa بروید و در
            هرکدام فایل های json خود را ایمپورت کنید. حال با گزاشتن یک key:
            value در export default فایل های ترجمه ماژول خود را به سیستم ترجمه
            وصل نموده اید.
          </p>
          <img src="/panel-img/tutorials/trans3.png" alt="~/app/Translation/fa" />{" "}
        </section>
        <section>
          <h5>
            <i className="fas fa-spinner ml-2" />
            لودینگ در صفحه
          </h5>
          <p>معمولا از لودینگ برای زمان ajax ها استفاده می شود</p>
          <CopyBlock text={codes.loading} theme={dracula} language="jsx" />
          <div className="mt-4">
            <Component />
          </div>
        </section>
        <section>
          <h5>
            <i className="fal fa-phone-laptop ml-2" />
            شناسایی اندازه صفحه (ریسپانسیو)
          </h5>
          <p>
            پنل وب بصورت عادی دو layout برای وب و موبایل دارد. بیشتر کامپوننت ها
            بصورت خودکار layout مناسب را انتخاب می کنند. برای ساخت یک کامپوننت
            یا یک صفحه دلخواه می بایست دو صفحه موبایل و دسکتاپ بسازید.
          </p>
          <img src="/panel-img/tutorials/device.png" alt="-" />
          <p>توجه کنید فایل های با پسوند .jsx در nextjs ایندکس نخواهد شد.</p>

          <div>
            <CopyBlock text={codes.device} language="jsx" theme={dracula} />
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
