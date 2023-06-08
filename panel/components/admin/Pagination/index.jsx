import { useContext, useEffect, useState } from "react"
import Styles from "./pagination.module.scss"
import { DeviceView } from "~/app/Context"
import { Grid, GridContainer } from "@admin/Grid"
import Button from "@admin/Button"

export default function Pagination({ page, getPage, pages }) {
  const isDesktop = useContext(DeviceView)

  const [customPage, setCustomPage] = useState(1)

  const changePage = (e) => {
    e.preventDefault()
    getPage(customPage)
  }

  const previousPage = () => {
    getPage(page - 1)
  }

  const nextPage = () => {
    getPage(page + 1)
  }

  const changeInput = (e) => {
    const targetPage = e.target.value
    if (targetPage <= pages && targetPage >= 1) setCustomPage(targetPage)
  }

  useEffect(() => {
    setCustomPage(page)
  }, [page])

  return (
    <div>
      {isDesktop ? (
        <GridContainer className={Styles.paginate}>
          <Grid size={5} className={"mr-5"}>
            {page > 1 ? (
              <Button onClick={() => getPage(page - 1)} type="primary">
                <i className="fas fa-angle-right ml-2" />
                صفحه قبلی
              </Button>
            ) : null}
          </Grid>
          <Grid size={5}>
            <form onSubmit={changePage}>
              {pages > 1 ? (
                <>
                  صفحه
                  <input
                    type="text"
                    onChange={changeInput}
                    className={Styles.pagination}
                    value={customPage || ""}
                  />
                  از {pages}
                </>
              ) : null}
            </form>
          </Grid>

          <Grid size={2} className={"ml-5"}>
            {page < pages ? (
              <Button onClick={() => getPage(page + 1)} type="primary">
                صفحه بعدی
                <i className="fas fa-angle-left mr-2" />
              </Button>
            ) : null}
          </Grid>
        </GridContainer>
      ) : (
        <GridContainer>
          <Grid size={12}>
            {page > 1 ? (
              <Button onClick={previousPage} className={Styles.previous_btn + ' w-100'} type="primarySm">
                <i className="fas fa-angle-right ml-2" />
                صفحه قبلی
              </Button>
            ) : null}
          </Grid>
          <Grid size={12} className="text-center">
            {pages > 1 ? (
              <>
                صفحه
                <input
                  type="text"
                  onChange={changeInput}
                  className={Styles.paginationMobile}
                  value={customPage}
                />
                از {pages}
              </>
            ) : null}
          </Grid>
          <Grid size={12} style={{ marginBottom: "75px" }}>
            {page < pages ? (
              <Button onClick={nextPage} type="primary" mobile>
                صفحه بعدی
                <i className="fas fa-angle-left mr-2" />
              </Button>
            ) : null}
          </Grid>
        </GridContainer>
      )}
    </div>
  )
}
