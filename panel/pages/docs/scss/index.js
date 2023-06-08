import { CopyBlock, dracula } from "react-code-blocks";
import Styles from "./index.module.scss";
import codes from "./code-block";
import AdminLayout from "@admin/Layout";

export default function Scss() {
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
            <i className="fad fa-line-height ml-2" />
            Margin & Padding
          </h5>
          <p>
            - کلاس های margin و padding مانند بوت استرپ قابل دسترس و از نسبت 1
            تا 5 موجود می باشد.
          </p>
          <CopyBlock text={codes.marginBlock} language="jsx" theme={dracula} />
        </section>
        <section>
          <h5 className="mb-3">
            <i className="fad fa-square-full ml-2" />
            Text Alignment, Weight
          </h5>
          <CopyBlock text={codes.textBlock} theme={dracula} language="jsx" />
        </section>
        <section>
          <h5 className="mb-3">
            <i className="fad fa-tv-alt ml-2" />
            Display
          </h5>
          <CopyBlock text={codes.display} theme={dracula} language="jsx" />

          <p>استفاده از این کلاس باعث کارکرد در مرورگر های مختلف می شود</p>
          <p>کلاس های موجود برای کلاس d-flex</p>
          <div className="d-flex justify-content-between">
            <ul>
              <li>justify-content-center</li>
              <li>justify-content-between</li>
              <li>justify-content-start</li>
              <li>justify-content-left</li>
              <li>justify-content-around</li>
            </ul>
            <ul>
              <li>align-items-end</li>
              <li>align-items-center</li>
              <li>align-items-baseline</li>
              <li>align-items-stretch</li>
            </ul>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
