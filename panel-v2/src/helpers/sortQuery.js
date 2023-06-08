const sortQuery = (key, value) => {
  return {
    field: key,
    type: value.length > 0 ? value?.toUpperCase() : null,
  };
};

export default sortQuery;
