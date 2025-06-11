import { useMemo } from "react";

export const usePaginatedData = (data = [], page = 1, itemsPerPage = 15) => {
  const filteredData = useMemo(() => data, [data]);
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = page * itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, page, itemsPerPage]);

  return { paginatedData, totalItems, totalPages };
};
