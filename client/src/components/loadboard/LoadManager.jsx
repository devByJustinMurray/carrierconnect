import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadForm from './LoadForm';

const LoadManager = () => {
  const [loads, setLoads] = useState([]);
  const [editingLoad, setEditingLoad] = useState(null);

  const fetchLoads = async () => {
    const res = await axios.get('/api/loads');
    setLoads(res.data);
  };

  const getNextLoadNumber = () => {
    const max = Math.max(...loads.map(l => l.loadNumber || 0));
    return max + 1;
  };

  const handleSave = async (data) => {
    if (data._id) {
      await axios.put(`/api/loads/${data._id}`, data);
    } else {
      await axios.post('/api/loads', data);
    }
    fetchLoads();
    setEditingLoad(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/loads/${id}`);
    fetchLoads();
  };

  useEffect(() => {
    fetchLoads();
  }, []);

  return (
    <div className="space-y-12">
      <LoadForm
        initialData={editingLoad || {}}
        onSave={handleSave}
        nextLoadNumber={getNextLoadNumber()}
      />

      <div className="max-w-7xl mx-auto bg-gray-900 text-white p-6 rounded-xl shadow-xl">
        <h2 className="text-xl font-semibold text-yellow-300 mb-4">All Loads</h2>
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="text-yellow-300 border-b border-gray-700">
              <th className="py-2">Load #</th>
              <th>Customer</th>
              <th>Status</th>
              <th>ETA Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loads.map(load => (
              <tr key={load._id} className="border-t border-gray-700">
                <td className="py-2">{load.loadNumber}</td>
                <td>{load.customer}</td>
                <td>{load.status}</td>
                <td>{load.etaStatus}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setEditingLoad(load)}
                    className="text-teal-400 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(load._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoadManager;