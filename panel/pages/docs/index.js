import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "~/app/State/collapse";
import AdminLayout from "@admin/Layout";
import Styles from "./docs.module.scss";
import Button from "@admin/Button";
import { Grid, GridContainer } from "@admin/Grid";
import Collapse from "@admin/Collapse";

export default function Docs() {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState({});

  function toggleSection(id, e) {
    e.stopPropagation();
    e.preventDefault();
    setCollapsed((prevState) => {
      prevState[id] = prevState[id] !== undefined ? !prevState[id] : true;

      return { ...prevState };
    });
    dispatch(toggle(id));
  }

  return (
    <AdminLayout>
      <div className={Styles.container}>
        <h4>داکیومنت کامپوننت های وبسایت</h4>
        <p className="text-right mt-3">
          شامل کد های آماده استفاده می باشد که موجب راحتی تیم دولوپمنت می باشد.
          برای استفاده از بالا به پایین سکشن ها را مطالعه فرمایید.
        </p>
        {/* -- Global Stylesheets section -- */}
        <section onClick={toggleSection.bind(this, "scss")}>
          <h5 className="text-right d-flex align-items-center">
            <i
              className={`fas fa-angle-left ml-2 ${
                collapsed.scss ? "fa-rotate-90" : ""
              }`}
            />
            استفاده از استایل ها
          </h5>
          <Collapse id="scss">
            <GridContainer gap="Lg">
              <Grid size={3} className="mt-4">
                <Link href="/docs/scss">
                  <a>
                    <Button className="w-100 py-3" type="primary">
                      استایل های عمومی
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3} className="mt-4">
                <Link href="/docs/scss/variables">
                  <a>
                    <Button className="w-100 py-3" type="orange">
                      متغیر ها
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3} className="mt-4">
                <Link href="/docs/scss/tutorial">
                  <a>
                    <Button className="w-100 py-3" type="white">
                      ساخت استایل یک صفحه
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3} className="mt-4">
                <Link href="/docs/scss/mixin">
                  <a>
                    <Button className="w-100 py-3" type="success">
                      استفاده از Mixin ها
                    </Button>
                  </a>
                </Link>
              </Grid>
            </GridContainer>
          </Collapse>
        </section>
        {/* !- Global Stylesheets section -! */}

        {/* -- Admin Components section -- */}
        <section onClick={toggleSection.bind(this, "components")}>
          <h5 className="text-right">
            <i
              className={`fas fa-angle-left ml-2 ${
                collapsed.components ? "fa-rotate-90" : ""
              }`}
            />
            کامپوننت ها
          </h5>
          <Collapse id="components">
            <GridContainer gap="Md">
              <Grid size={3} className="mt-4">
                <Link href="/docs/components/grid">
                  <a>
                    <Button className="w-100 py-3" type="primary">
                      گرید ها
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3} className="mt-4">
                <Link href="/docs/components/button">
                  <a>
                    <Button className="w-100 py-3" type="orange">
                      دکمه
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3} className="mt-4">
                <Link href="/docs/components/toast">
                  <a>
                    <Button className="w-100 py-3" type="white">
                      تُست ها
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3} className="mt-4">
                <Link href="/docs/components/collapse">
                  <a>
                    <Button className="w-100 py-3" type="warning">
                      Collapses
                    </Button>
                  </a>
                </Link>
              </Grid>
              <Grid size={3}>
                <Link href="/docs/components/inputs">
                  <a>
                    <Button className="w-100 py-3" type="success">
                      استفاده از اینپوت
                    </Button>
                  </a>
                </Link>
              </Grid>
            </GridContainer>
          </Collapse>
        </section>
        {/* !- Admin Components section -! */}
      </div>
    </AdminLayout>
  );
}
