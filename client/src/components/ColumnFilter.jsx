// src/components/ColumnFilter.jsx
export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Search ${column.Header}`}
      className="p-1 border rounded w-full"
    />
  );
};
