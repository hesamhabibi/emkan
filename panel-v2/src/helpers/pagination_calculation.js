const page_calculation_from = (page_number, limit_per_page) => {
  if (page_number === 1) {
    return 1;
  }
  return (page_number - 1) * limit_per_page + 1;
};

const page_calculation_to = (total_data, page_number, limit_per_page) => {
  const last_count_items_per_page = page_number * limit_per_page
  if (total_data < last_count_items_per_page) {
    return total_data;
  } else {
    return last_count_items_per_page;
  }
};

export { page_calculation_from, page_calculation_to };
