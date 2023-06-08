const storage_set = (key, value) => localStorage.setItem(key, value);
const storage_get = (key) => localStorage.getItem(key);
const storage_remove = (key) => localStorage.removeItem(key);

const mode_color_key = "_mode_color";
const get_mode_color = () => storage_get(mode_color_key);
const set_mode_color = (mode) => storage_set(mode_color_key, mode);
const delete_mode_color = () => storage_remove(mode_color_key);

const direction_key = "_direction";
const get_direction = () => storage_get(direction_key);
const set_direction = (dir) => storage_set(direction_key, dir);
const delete_direction = () => storage_remove(direction_key);

const language_key = "_language";
const get_language = () => storage_get(language_key);
const set_language = (lang) => storage_set(language_key, lang);
const delete_language = () => storage_remove(language_key);

const error_key = "_error";
const get_error = () => JSON.parse(storage_get(error_key)) || {};
const set_error = (error) => storage_set(error_key, JSON.stringify(error));
const delete_error = () => storage_remove(error_key);

const user_key = "_user";
const get_user = () => JSON.parse(storage_get(user_key)) || undefined;
const set_user = (user) => storage_set(user_key, JSON.stringify(user));
const delete_user = () => storage_remove(user_key);

const token_key = "_token";
const get_token = () => storage_get(token_key) || undefined;
const set_token = (token) => storage_set(token_key, token);
const delete_token = () => storage_remove(token_key);


export {
  storage_set,
  storage_get,
  storage_remove,
  // mode color handler functions
  get_mode_color,
  set_mode_color,
  delete_mode_color,
  // direction storage handler functions
  get_direction,
  set_direction,
  delete_direction,
  // language storage handler functions
  get_language,
  set_language,
  delete_language,
  // error storage handler functions
  get_error,
  set_error,
  delete_error,

  // token storage handler functions
  get_token,
  set_token,
  delete_token,

  // user storage handler functions
  get_user,
  set_user,
  delete_user,

};
