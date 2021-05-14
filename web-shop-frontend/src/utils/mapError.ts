export const mapError = (error) => {
  const map: Record<string, string> = {};

  map[error.field] = error.message;
  console.log(map);

  return map;
};
