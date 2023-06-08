import parseBoolean from "./parseBoolean";

const init_string_format = (str , default_value) => (str && str?.length > 0) ? str : default_value || '';
const init_int_format = (int , default_value) => (int && parseInt(int) > 0) ? parseInt(int) : default_value;
const init_boolean_format = (boolean , default_value) => (boolean && parseBoolean(boolean) > 0) ? parseBoolean(boolean) : default_value;
const init_date_format = date => (date !== 'null' && date !== null) ? new Date(date) : null;

export {
    init_string_format,
    init_int_format,
    init_date_format,
    init_boolean_format
}