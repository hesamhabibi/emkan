import { useContext } from "react"
import { LoadingContext } from "~/app/Context/Loadings"
import { sanitize, setErrors } from "./Api"
import { useRouter } from "next/router"
import { ToastContext, TranslationContext } from "~/app/Context"
import { HandleApiError } from "~/app/Helpers/MutationHandler"
import client from "~/app/apollo-client"
import { useDispatch } from "react-redux"
import { closeModal } from "~/app/State/modal"
import { closePopup } from "~/app/State/popups"
import {switchTab} from "~/app/State/tabs"

async function query(query, variables) {}

export function useAPI() {
  const setLoading = useContext(LoadingContext)
}

export function useMutation({
  setError,
  setData,
  setLoading,
  id,
  clearErrors,
}) {
  const router = useRouter()
  const translation = useContext(TranslationContext)
  const fireToast = useContext(ToastContext)
  const dispatch = useDispatch()

  const mutate = async ({ mutation, variables, action }) => {
    clearErrors()
    setLoading(true)

    let result = { errors: {}, status: true }

    try {
      result.res = await client.mutate({
        mutation,
        variables: sanitize(variables),
      })
    } catch (e) {
      result = (await HandleApiError(e, fireToast, router, translation)) || {
        errors: {},
        status: false,
      }
    }
    setErrors(result.errors, setError)
    setLoading(false)

    if (result.status) {
      fireToast(translation("Operation Completed Successfully"), {
        status: "success",
      })
      dispatch(closeModal(id))
      dispatch(switchTab({ id: "editForms-tab", data: 0 }))
      switch (action) {
        case "create":
          setData((prev) => {
            if (Array.isArray(prev)) {
              return [...prev, result.res?.data?.result]
            }
            prev?.data?.push(result.res?.data?.result)
            return { ...prev }
          })
          return result

        case "edit":
          setData((prev) => {
            if (Array.isArray(prev)) {
              const index = prev.findIndex(
                (item) => item.id === result.res?.data?.result.id
              )
              prev[index] = result.res?.data?.result
              return [...prev]
            }
            if (!prev?.data) return

            const index = prev.data.findIndex(
              (item) => item.id === result.res?.data?.result.id
            )

            prev.data[index] = result.res?.data?.result
            return { ...prev }
          })
          return result
        case "delete":
          dispatch(closePopup("delete-action"))
          setData((prev) => {
            if (Array.isArray(prev)) {
              const index = prev.findIndex((item) => item.id === variables.id)
              prev.splice(index, 1)
              return [...prev]
            }
            if (!prev?.data) return
            const index = prev.data.findIndex(
              (item) => item.id === variables.id
            )
            prev.data.splice(index, 1)
            return { ...prev }
          })
      }
    }
    return result
  }

  return { mutate }
}
