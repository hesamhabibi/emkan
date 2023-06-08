import Styles from "./loading.module.scss"
import {useContext, useEffect} from "react"
import {LoadingContext, TranslationContext} from "~/app/Context"




const Loading = () => {
  const setLoading = useContext(LoadingContext)

  useEffect(() => {
    setLoading(true)

    return () => {
      setLoading(false)
    }
  }, [])

  return null

}


export default Loading