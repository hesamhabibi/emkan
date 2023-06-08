import Styles from "./loading.module.scss"
import {useContext, useEffect} from "react"
import {LoadingContext, TranslationContext} from "~/app/Context"




const Loading = ({...props}) => {
  const translation = useContext(TranslationContext)

  const setLoading = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)

    return () => {
      setLoading(false)
    }
  }, [])

  return null

  // return (
  //   <div className={Styles.container}>
  //     <h3>
  //       <i className="fab fa-react fa-2x ml-4"/>
  //       {translation("loading extra javascript")}
  //     </h3>
  //     <div>
  //       <hr/>
  //     </div>
  //   </div>
  // )

}


export default Loading