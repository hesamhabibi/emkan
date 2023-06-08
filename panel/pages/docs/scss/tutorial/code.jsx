export default {
  jsx: `
import AdminLayout from "@admin/Layout";
import Styles from "../index.module.scss";

export default function Tutorial() {
  return ( 
    <AdminLayout title="داکیومنت"> {/* Admin Component */}
      <div className={Styles.container}>
        <h3>ساخت استایل های یک صفحه</h3>
        <p className={Styles.muted}>
          رعایت ساختار کد زنی در پروژه بسیار مهم می باشد و پروژه را یک دست می
          کند.
        </p>
        <p>در اینجا به یکی از صفحه های پروژه به عنوان مثال می پردازیم: </p>
        <section className="mt-4">
          <h5>استایل صفحه این داکیومنت</h5>
          <h6 className="mt-4">- JSX</h6>
        </section>
      </div>
    </AdminLayout>
  );
},
`,
  scss: `
@import "styles/variables";
@import "styles/components/mixin/mixin";

.container {
  padding: 20px;

  > .muted {
    font-weight: lighter;
    color: gray;
  }

  p {
    margin: 10px 0;
  }

  > section {
    margin-top: 10px;
    padding: 10px;

    > div {
      direction: ltr;
      text-align: left;
    }

    @include rounded(8px);
    @include generate-color(background, #f5f5f5);
  }

  @include generate-color(background, $white);
}
`,
};
