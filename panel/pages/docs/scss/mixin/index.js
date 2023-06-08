import AdminLayout from "@admin/Layout";
import Styles from "../index.module.scss";
import code from "./code";
import { CodeBlock, dracula } from "react-code-blocks";

export default function Tutorial() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>استفاده از Mixin در پروژه</h3>
        <p className={Styles.muted}>
          فایل mixin.scss با آدرس styles/components/mixin/mixin.scss شامل توابع
          آماده می باشد که استفاده از آن موجب رعایت Compatibility در مرورگر های
          مختلف می باشد.
        </p>
        <CodeBlock
          language="scss"
          theme={dracula}
          text={"@import 'styles/components/mixin/mixin'"}
        />
        <section className="mt-4">
          <h5>توابع این فایل</h5>
          <h6 className="mt-4">rounded</h6>
          <p>این تابع استایل border-radius کلاس را تنظیم می کند.</p>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.rounded} />
          </div>
          <h6 className="mt-4">box-shadow</h6>
          <p>به کلاس سایه می دهد</p>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.shadow} />
          </div>
          <h6 className="mt-4">transition</h6>
          <p>می توانید مانند transition در استایل ها به تابع ورودی بدهید.</p>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.transition} />
          </div>
          <h6 className="mt-4">transform</h6>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.transform} />
          </div>

          <h6 className="mt-4">color</h6>
          <p>رنگ مورد نظر را اعمال می کند ورودی ها به ترتیب</p>
          <ol className="mr-2 mb-2">
            <li>Target: Background, color</li>
            <li>Color: Ex #fff</li>
            <li>[Optional] Function: lighten, darken</li>
            <li>[Optional] Percent: 0 - 100%</li>
          </ol>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.color} />
          </div>

          <h6 className="mt-4">grid</h6>
          <ol className="mr-2 mb-2">
            <li>Display: block, flex</li>
            <li>[Optional] direction:row, column</li>
          </ol>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.grid} />
          </div>

          <h6 className="mt-4">Hover, Active, Focus</h6>
          <div>
            <CodeBlock language="scss" theme={dracula} text={code.hover} />
          </div>
        </section>
        <p>برای توضیحات بیشتر می توانید به فایل مراجعه فرمایید</p>
      </div>
    </AdminLayout>
  );
}
