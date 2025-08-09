import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const headers = [
  'Load Number', 'Shipment Number', 'Customer', 'Branch',
  'Origin (City, State)', 'Pick Date & Time',
  'Destination (City, State)', 'Delivery Date & Time',
  'Carrier', 'Operator', 'Status'
];

export default function LoadGrid() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 20;

  useEffect(() => {
    const fetchExcel = async () => {
      const res = await fetch('/Test data report.xlsx');
      const blob = await res.arrayBuffer();
      const workbook = XLSX.read(blob, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(sheet);

      const cleanedData = rawData.map((row) => ({
        'Load Number': row[' Load Number'],
        'Shipment Number': row[' Shipment Number'],
        'Customer': row[' Customer'],
        'Branch': row[' Branch'],
        'Origin (City, State)': `${row[' Shipper City']}, ${row[' Shipper State']}`,
        'Pick Date & Time': `${row[' Load Pickup Date']} ${row[' Load Pickup Time1']} - ${row[' Load Pickup Time2']}`,
        'Destination (City, State)': `${row[' Consignee City']}, ${row[' Consignee State']}`,
        'Delivery Date & Time': `${row[' Load Delivery Date']} ${row[' Load Delivery Time1']} - ${row[' Load Delivery Time2']}`,
        'Carrier': row[' Carrier'],
        'Operator': row[' Operator'],
        'Status': row[' Status'],
      }));

      setData(cleanedData);
      setFilters(Object.fromEntries(headers.map(h => [h, ''])));
    };

    fetchExcel();
  }, []);

  const handleFilterChange = (header, value) => {
    setFilters(prev => ({ ...prev, [header]: value }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredData = data.filter(row =>
    headers.every(h => {
      const filter = filters[h].toLowerCase();
      return filter === '' || (row[h] && row[h].toString().toLowerCase().includes(filter));
    }) &&
    (searchTerm === '' || Object.values(row).some(val =>
      val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key] || '';
    const valB = b[sortConfig.key] || '';
    return sortConfig.direction === 'asc'
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="p-4 bg-gray-200 overflow-x-auto rounded max-h-screen">
      {/* Search Bar */}
      <div className="mb-4 grid grid-cols-3  ">
        <input
          type="text"
          placeholder="Search all columns..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded  bg-gray-100 shadow-sm"
        />
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-11 gap-2 mb-2 text-xs">
        {headers.map((header, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Filter ${header}`}
            value={filters[header]}
            onChange={e => handleFilterChange(header, e.target.value)}
            className="px-2 py-1 border rounded  bg-gray-100 text-center"
          />
        ))}
      </div>

      {/* Header Row with Sorting */}
      <div className="grid grid-cols-11 gap-2 mb-2 text-xs font-bold text-gray-700">
        {headers.map((header, i) => (
          <button
            key={i}
            onClick={() => handleSort(header)}
            className="text-center bg-gray-100 py-2 rounded shadow-sm hover:bg-gray-300"
          >
            {header}
            {sortConfig.key === header && (
              <span className="ml-1">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
            )}
          </button>
        ))}
      </div>

      {/* Data Rows */}
      {paginatedData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-11 gap-2 mb-1 text-xs font-medium">
          {headers.map((header, colIndex) => (
            <div
              key={colIndex}
              className="text-center bg-white border border-gray-300 rounded p-1 shadow-sm"
            >
              {row[header]}
            </div>
          ))}
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-sm pb-17">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
1