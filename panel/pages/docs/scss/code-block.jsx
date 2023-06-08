export default {
  marginBlock: `export default function Main() {
  return (
    <div className={"mt-3 mr-3 mb-3 ml-3 my-3 mx-3 m-3"}>
      <span className={"p-5"}>
        I have Padding
      </span>
      I have margin
    </div>
  )
}`,
  textBlock: `<p className={"text-center font-weight-bold"}>Center Bold</p>
<p className="text-right font-weight-bolder">Right BOLDER</p>
<p className="text-left font-weight-lighter">Left lighter</p>
<h1 className="text-center font-weight-normal">Center normal</h1>
<hr />`,
  display: `<div>
  <div className={"d-flex justify-content-between"}>
    <span>Justify</span>
    <span>Content</span>
    <span>Between</span>  
  </div>
  <div className="d-none">
    Im Hidden
  </div>
  <span className="d-block">
    Span but block
  </span>
  
</div>`,
};
