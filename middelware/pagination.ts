export function dataPagination(page: string, pageSize: string, array: any[]) {
  const p = parseInt(page);
  const ps = parseInt(pageSize);
  const offset = (p-1) * ps;
  const limit = (p * ps);
  const data = array.slice(offset, limit);
  const totalPages = Math.ceil(array.length / ps);
  return { products: data, totalPages};
}
