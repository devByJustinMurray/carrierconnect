import React, { useEffect, useState, useMemo } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useFilters,
} from 'react-table';
import { ColumnFilter } from '../ColumnFilter.jsx';

const LoadGrid = () => {
  const [loads, setLoads] = useState([]);

  useEffect(() => {
    fetch('/api/loads')
      .then(res => res.json())
      .then(data => setLoads(data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const data = useMemo(() => loads, [loads]);

  const columns = useMemo(() => [
    {
      Header: 'Load #',
      accessor: 'loadNumber',
      Filter: ColumnFilter,
    },
    {
      Header: 'Shipment',
      accessor: 'shipmentNumber',
      Filter: ColumnFilter,
    },
    {
      Header: 'Origin',
      accessor: row => `${row.shipperCity}, ${row.shipperState}`,
      id: 'origin',
      Filter: ColumnFilter,
    },
    {
      Header: 'Destination',
      accessor: row => `${row.consigneeCity}, ${row.consigneeState}`,
      id: 'destination',
      Filter: ColumnFilter,
    },
    {
      Header: 'Pickup Date',
      accessor: 'loadPickupDate',
      Filter: ColumnFilter,
    },
    {
      Header: 'Delivery Date',
      accessor: 'loadDeliveryDate',
      Filter: ColumnFilter,
    },
    
    {
      Header: 'Status',
      accessor: 'status',
      Filter: ColumnFilter,
    },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    setGlobalFilter,
    state,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">📦 Truckload Dashboard</h2>
<div className='mb-2 pr-350'>
      <input
        type="text"
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="🔍 Reference Search..."
        className="mb-4 p-2 border rounded w-full "
      />
</div>
      <table {...getTableProps()} className="min-w-full table-auto border-collapse">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-100">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="border px-4 py-2">
                  <div className="flex flex-col">
                    <span>
                      {column.render('Header')}
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-50">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="border px-4 py-2">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className="px-3 py-1 bg-blue-200 rounded">Prev</button>
        <span>Page {pageIndex + 1} of {pageOptions.length}</span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className="px-3 py-1 bg-blue-200 rounded">Next</button>
      </div>
    </div>
  );
};

export default LoadGrid;