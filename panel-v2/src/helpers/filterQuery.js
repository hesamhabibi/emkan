import { useDateField } from "@mui/x-date-pickers/DateField/useDateField";
import { convert_date_to_timestamp } from "./date";

const filterMultiLangQuery = (value) => {
  if (value && value?.length > 0) {
    return [
      {
        operator: "Regex",
        value: {
          fields: ["all"],
          value: value,
        },
      },
    ];
  }
  return undefined;
};

const filterRegexQuery = (value) => {
  if (value && value?.length > 0) {
    return [
      {
        operator: "Regex",
        value: value,
      },
    ];
  }
  return undefined;
};

const filterEqualQuery = (value) => {
  if (value && value?.length > 0 && value !== null) {
    return [
      {
        operator: "Equal",
        value: value,
      },
    ];
  }
  return undefined;
};

const filterMoreThanOrEqualQuery = (value) => {
  if (value && value?.length > 0 && value !== null) {
    return [
      {
        operator: "MoreThanOrEqual",
        value: value,
      },
    ];
  }
  return undefined;
};

const filterLessThanOrEqualQuery = (value) => {
  if (value && value?.length > 0 && value !== null) {
    return [
      {
        operator: "LessThanOrEqual",
        value: value,
      },
    ];
  }
  return undefined;
};

const filterLessThanOrEqualDateQuery = (value) => {
  if (value !== null && value !== undefined) {
    return filterLessThanOrEqualQuery(convert_date_to_timestamp(value));
  }
  return undefined;
};

const filterMoreThanOrEqualDateQuery = (value) => {
  if (value !== null && value !== undefined) {
    return filterMoreThanOrEqualQuery(convert_date_to_timestamp(value));
  }
  return undefined;
};

const filterEqualDateQuery = (value) => {
  return filterEqualQuery(convert_date_to_timestamp(value));
};

export {
  filterMultiLangQuery,
  filterEqualQuery,
  filterMoreThanOrEqualQuery,
  filterLessThanOrEqualQuery,
  filterLessThanOrEqualDateQuery,
  filterMoreThanOrEqualDateQuery,
  filterEqualDateQuery,
  filterRegexQuery,
};
