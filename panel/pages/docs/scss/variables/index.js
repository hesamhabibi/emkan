import Styles from "../index.module.scss";
import AdminLayout from "@admin/Layout";
import Button from "@admin/Button";

export default function Variables() {
  return (
    <AdminLayout title="داکیومنت">
      <div className={Styles.container}>
        <h3>متغیر های استایلینگ</h3>
        <p className={Styles.muted}>
          استفاده از متغیر ها موجب راحت تر شدن فرایند ادیت، منظم بودن رنگ ها و
          خوانایی بهتر کد می شود. در پروژه بیشتر رنگ ها با متغیر های گلوبال
          تعریف می شود و قابل ایمپورت با آدرس: "~/styles/variables" می باشد
        </p>
        <p>در آینده تم دارک هم وارد پروژه خواهد شد.</p>
        <section className="mt-4">
          <h5>استایل های موجود در variables</h5>

          <div className="d-flex justify-content-between mt-3">
            <Button className="mx-2" type="primary">
              رنگ های استفاده شده در پروژه
            </Button>
            <Button className="mx-2" type="success">
              Shadow های استفاده شده
            </Button>
            <Button className="mx-2" type="orange">
              تم پروژه و رنگ کامپوننت ها
            </Button>
          </div>
        </section>
      </div>
    </AdminLayout>
  );
}
