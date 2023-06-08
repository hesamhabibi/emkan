import Styles from "./devtool.module.scss"
import { useController } from "react-hook-form"
import { Fragment, useState } from "react"
import Collapse from "@admin/Collapse"
import { useDispatch } from "react-redux"
import { toggle } from "~/app/State/collapse"

const renderable = [
  "string",
  "number",
  "undefined",
  "bigint",
  "boolean",
  "bigint",
  "null",
]


const renderValues = (value, indent = 0) => {
  if (!value) return `${value}`
  if (typeof value in renderable) {
    return (
      value.toString() || (
        <>
          {" "}
          {Array.from(Array(indent).keys()).map((key) => (
            <Fragment key={key}>{"  "}</Fragment>
          ))}
          ""
        </>
      )
    )
  } else if (Array.isArray(value)) {
    return (
      <>
        <span className={Styles.bracket}>{"[\n"}</span>
        {value.map((item) => (
          <>
            {Array.from(Array(indent).keys()).map((key) => (
              <Fragment key={key}>{"  "}</Fragment>
            ))}
            {"  "}
            {renderValues(item, indent + 1)},{"\n"}
          </>
        ))}
        <span className={Styles.bracket}>
          {Array.from(Array(indent).keys()).map((key) => (
            <Fragment key={key}>{"  "}</Fragment>
          ))}
          {"]"}
        </span>
      </>
    )
  } else if (typeof value === "object") {
    return (
      <>
        <span className={Styles.bracket}> {"{\n"}</span>
        {Object.keys(value).map((key) => (
          <>
            {Array.from(Array(indent).keys()).map((key) => (
              <Fragment key={key}>{"  "}</Fragment>
            ))}
            {"  "}"{key}":{renderValues(value[key], indent + 1)}
            <span className={Styles.bracket}>,</span>
            {"\n"}
          </>
        ))}
        <span className={Styles.bracket}>
          {" "}
          {Array.from(Array(indent).keys()).map((key) => (
            <Fragment key={key}>{"  "}</Fragment>
          ))}
          {"}"}
        </span>
      </>
    )
  } else {
    return <>"{value}"</>
  }
}

const DevTool = ({ control, getValues }) => {

  const [collapse, setCollapse] = useState(true)

  const dispatch = useDispatch()

  return (
    <>
      <button
        onClick={setCollapse.bind(this, !collapse)}
        className={Styles.button}
      >
        <i className="fas fa-bars" />
      </button>
      {
        collapse && (
          <div className={`${Styles.container}`}>
          Form Debug
          <hr />
          <h6
            className="text-left my-3"
            onClick={dispatch.bind(null, toggle("debugger-values"))}
          >
            Values
          </h6>
          <Collapse id="debugger-values">
            <pre className={Styles.code}>{renderValues(getValues())}</pre>
          </Collapse>
          {/* <div className={Styles.errors}>
            <h6>Errors</h6>
            <pre>{JSON.stringify(errors)}</pre>
          </div> */}
        </div>   
        )
      }
    </>
  )
}

export default DevTool
