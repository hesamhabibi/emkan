import fetch_api from "../helpers/api";

const prefix = "roles/"

export const roles_service = async (data) => await fetch_api('roles', data, 'POST');
export const create_roles_service = async (data) => await fetch_api(`${prefix}create`, data, 'POST');
export const edit_roles_service = async (data) => await fetch_api(`${prefix}edit`, data, 'POST');
export const single_role_service = async (data) => await fetch_api(`${prefix}get-single`, data, 'POST');
export const delete_roles_service = async (data) => await fetch_api(`${prefix}delete`, data, 'POST');