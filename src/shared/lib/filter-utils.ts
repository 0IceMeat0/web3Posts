/** Filter items by title match */
export const filterByTitle = <T extends { title: string }>(
  items: T[],
  query: string
): T[] => {
  if (!query) {
    return items;
  }
  const q = query.toLowerCase();
  return items.filter((item) => item.title.toLowerCase().includes(q));
};

/** Get a page slice from an array */
export const paginate = <T>(
  items: T[],
  page: number,
  perPage: number
): T[] => {
  const start = (page - 1) * perPage;
  return items.slice(start, start + perPage);
};
