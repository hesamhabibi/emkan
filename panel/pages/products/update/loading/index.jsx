import Styles from "./loading.module.scss"
import {useContext} from "react"
import {TranslationContext} from "~/app/Context"




const Loading = () => {
  const translation = useContext(TranslationContext)

  return (
    <div className={Styles.container}>
      <h3>
        <i className="fab fa-react fa-2x ml-4"/>
        {translation("loading extra javascript")}
      </h3>
      <div>
        <hr/>
      </div>
    </div>
  )

}


export default Loading