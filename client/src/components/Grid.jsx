import { useState } from 'react';

const carrierDetails = {
  CarrierX: {
    dispatch: { name: 'Tasha Reynolds', phone: '555-134-9821', email: 'dispatch@carrierx.com' },
    driver: { name: 'Miguel Torres', phone: '555-285-4021', email: 'miguel@carrierx.com' },
  },
  CarrierY: {
    dispatch: { name: 'Ron Patel', phone: '555-829-7104', email: 'dispatch@carriery.com' },
    driver: { name: 'Kara Smith', phone: '555-601-2339', email: 'kara@carriery.com' },
  },
  CarrierZ: {
    dispatch: { name: 'Laura Chen', phone: '555-478-3156', email: 'dispatch@carrierz.com' },
    driver: { name: 'Jake Freeman', phone: '555-998-7742', email: 'jake@carrierz.com' },
  },
};

const headers = [
  'Shipment ID', 'On-Time %', 'Distance', 'Revenue',
  'Origin', 'Destination', 'Equipment', 'Transit Time',
  'Carrier', 'Status'
];

const headerMap = {
  'Shipment ID': 'id', 'On-Time %': 'onTime', 'Distance': 'distance',
  'Revenue': 'revenue', 'Origin': 'origin', 'Destination': 'destination',
  'Equipment': 'equipment', 'Transit Time': 'transitTime',
  'Carrier': 'carrier', 'Status': 'status',
};

const data = Array.from({ length: 20 }).map((_, i) => ({
  id: `${1000 + i}`,
  onTime: `${Math.floor(Math.random() * 100)}%`,
  distance: `${(Math.random() * 500).toFixed(1)} mi`,
  revenue: `$${(Math.random() * 2000).toFixed(2)}`,
  origin: ['TX', 'CA', 'AR', 'FL', 'IL'][i % 5],
  destination: ['NY', 'WA', 'AZ', 'GA', 'CO'][i % 5],
  equipment: ['Refrigerated', 'Flatbed', 'Dry Van'][i % 3],
  transitTime: `${Math.floor(Math.random() * 5) + 1} days`,
  carrier: ['CarrierX', 'CarrierY', 'CarrierZ'][i % 3],
  status: ['Delivered', 'In Transit', 'Delayed'][i % 3],
}));

export default function Grid() {
  const [filters, setFilters] = useState(Object.fromEntries(headers.map(h => [h, ''])));
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleFilter = (header, value) => {
    setFilters(prev => ({ ...prev, [header]: value }));
  };

  const filteredData = data.filter(row =>
    headers.every(h => {
      const key = headerMap[h];
      return filters[h] === '' || row[key].toLowerCase().includes(filters[h].toLowerCase());
    })
  );

  return (
    <div className="p-4 bg-gray-100 overflow-x-auto rounded relative ">
      {/* Filter Row */}
      <div className="grid grid-cols-10 gap-2 mb-2 text-xs ">
        {headers.map((header, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Filter ${header}`}
            value={filters[header]}
            onChange={e => handleFilter(header, e.target.value)}
            className="px-2 py-1 border rounded text-center"
          />
        ))}
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-10 gap-2 mb-2 text-xs font-bold text-gray-700">
        {headers.map((header, i) => (
          <div key={i} className="text-center bg-gray-200 py-2 rounded shadow-sm">{header}</div>
        ))}
      </div>

      {/* Data Rows */}
      {filteredData.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-10 gap-2 mb-1 text-xs font-medium">
          {headers.map((header, colIndex) => {
            const key = headerMap[header];
            const value = row[key];
            const isCarrier = header === 'Carrier';
            return (
              <div
                key={colIndex}
                className={`text-center bg-white border border-gray-300 rounded p-1 shadow-sm relative ${
                  isCarrier ? 'hover:bg-blue-50 cursor-pointer' : ''
                }`}
                onMouseEnter={() => isCarrier && setHoveredIndex(rowIndex)}
                onMouseLeave={() => isCarrier && setHoveredIndex(null)}
              >
                {value}

                {/* Tooltip */}
                {isCarrier && hoveredIndex === rowIndex && (
                  <div className="absolute z-10 left-1/2 top-full transform -translate-x-1/2 mt-2 w-64 bg-white border border-gray-300 shadow-lg rounded p-3 text-xs animate-fade-in">
                    <div className="font-bold text-blue-700 mb-1">Dispatch Contact</div>
                    <div>{carrierDetails[value].dispatch.name}</div>
                    <div>{carrierDetails[value].dispatch.phone}</div>
                    <div>{carrierDetails[value].dispatch.email}</div>
                    <hr className="my-2" />
                    <div className="font-bold text-blue-700 mb-1">Driver Contact</div>
                    <div>{carrierDetails[value].driver.name}</div>
                    <div>{carrierDetails[value].driver.phone}</div>
                    <div>{carrierDetails[value].driver.email}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      {/* Tailwind animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}