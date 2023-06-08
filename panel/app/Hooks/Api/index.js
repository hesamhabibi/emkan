import { useRouter } from "next/router"
import { useContext } from "react"
import { ToastContext, TranslationContext } from "~/app/Context"
import { QueryError } from "~/app/Helpers/ErrorHandler"
import client from "~/app/apollo-client"

const is_empty = (field) => !field && field !== false && field !== 0

/**
 * Converts inputs to graphql Regex syntax..
 *
 * @param { Object } fields
 * @param { Object[] } ignoreFields
 * @param { Object } exactFields
 * @returns { Object }
 */
export function filterFields(fields, ignoreFields, exactFields) {
  const filter = {}
  Object.keys(fields)
    .filter((key) => !ignoreFields.includes(key))
    .forEach((key) => {
      if (fields[key]) {
        filter[key] = [
          {
            operator: exactFields.includes(key) ? "Equal" : "Regex",
            value: fields[key],
          },
        ]
      }
    })
  return filter
}

export const sanitize = (data) => {
  let result

  if (data === null) return data

  if (Array.isArray(data)) {
    result = data.filter((item) => !is_empty(item))
  } else if (typeof data === "object") {
    result = {}
    Object.keys(data).map((key) => {
      if (typeof data[key] === "string" || typeof data[key] === "number") {
        if (!is_empty(data[key])) {
          result[key] = data[key]
        } else {
          result[key] = null
        }
      } else {
        result[key] = sanitize(data[key])
      }
    })
  } else {
    return data
  }
  return result
}

/**
 * Gets a query for a page wih filters.
 * @param { Number } pageNo
 * @param { Number } limit
 * @param { Object[] } fields
 * @param { gql } query
 * @param { String[] } exactFields
 * @param { String[] } ignoreFields
 * @param { Object } params
 * @param function toast
 * @returns {Promise<*[]|any>}
 */
export async function getPage({
  pageNo = 1,
  limit = 15,
  fields,
  query,
  exactFields = null,
  ignoreFields = null,
  params = null,
  toast,
}) {
  if (ignoreFields === null) ignoreFields = []
  if (exactFields === null) exactFields = []
  if (params === null) params = {}

  const filter = filterFields(fields, ignoreFields, exactFields)
  try {
    const query = await client.query({
      query,
      variables: { page: parseInt(pageNo, 10), limit, filter, ...params },
    })

    return query.data
  } catch (e) {
    QueryError(e, toast)
    return []
  }
}

export const setErrors = (errors, setError) => {
  if (!errors?.errors) return {}
  Object.keys(errors.errors || {}).forEach((item) => {
    setError(item, errors.errors[item])
  })
}

export function useApolloClient() {
  const router = useRouter()
  const translation = useContext(TranslationContext)
  const fireToast = useContext(ToastContext)

  const query = async ({ ...props }) => {
    try {
      return await client.query(props)
    } catch (e) {
      QueryError(e, fireToast)
      throw e
    }
  }

  const mutate = async (data, mutation) => {
    const result = { errors: {}, status: true }

    const variables = sanitize(data)
    try {
      result.res = await client.mutate({
        mutation,
        variables,
      })
    } catch (e) {
      if (e.networkError?.statusCode === "500") {
        fireToast(translation("server fault"))
        await router.push(`/500?url=${router.asPath}`)
      }
      if (e.networkError?.result) {
        fireToast(e.networkError.result.errors[0].message, { status: "error" })
      }
      if (e.graphQLErrors?.length) {
        if (e.graphQLErrors.find((item) => item.code === "401")) {
          await router.push(`/login?redirect=${router.pathname}`)
        } else if (e.graphQLErrors.find((item) => item.code === 422)) {
        } else {
          fireToast(e.graphQLErrors[0].message, { status: "error" })
        }
      }

      if (e.graphQLErrors) result.errors = e.graphQLErrors[0]

      result.status = false
    }
    return result
  }

  /**
   * Gets a query for a page wih filters.
   * @param { Number } pageNo
   * @param { Number } limit
   * @param { Object[] } fields
   * @param { gql } query
   * @param { String[] } exactFields
   * @param { String[] } ignoreFields
   * @param { Object } params
   * @returns {Promise<*[]|any>}
   */
  const getPage = async ({
    page,
    limit,
    fields,
    query,
    exactFields = null,
    ignoreFields = null,
    params = null,
  }) => {
    const $q = query
    if (ignoreFields === null) ignoreFields = []
    if (exactFields === null) exactFields = []
    if (params === null) params = {}

    const filter = filterFields(fields, ignoreFields, exactFields)
    try {
      const query = await client.query({
        query: $q,
        variables: { page: parseInt(page, 10), limit, filter, ...params },
      })

      return query.data
    } catch (e) {
      // console.log(e)
      if (
        e.graphQLErrors &&
        e.graphQLErrors.find((item) => item.code === "401")
      ) {
        await router.push(`/auth/login?redirect=${router.pathname}`)
      }
      console.warn("~ Couldn't get query from server", e)
      return []
    }
  }

  return { query, mutate, getPage, setErrors }
}
