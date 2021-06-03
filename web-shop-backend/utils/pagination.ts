export const pagination = (query_page: any, data_array_length: number) => {
  const page =
    typeof query_page !== "undefined" ? parseInt(query_page.toString()) : 1;

  const limit = 15;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const take = limit;
  const skip = startIndex;

  const pagination_data: any = {
    current: {
      page: page,
      limit: limit,
    },
  };

  if (startIndex > 0) {
    pagination_data.previous = { page: page - 1, limit: limit };
  }

  if (endIndex < data_array_length) {
    pagination_data.next = { page: page + 1, limit: limit };
  }

  return [pagination_data, take, skip];
};
