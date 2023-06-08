import fetch_api from "../helpers/api";

const userPrefix = "users/"

export const get_users_service = async (data) => fetch_api(`users`, data,'GET')
export const get_user_service = async (data) => fetch_api(`${userPrefix}get-single`, data)