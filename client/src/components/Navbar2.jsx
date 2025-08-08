import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Navbar2 = () => {
  const { userData, backendUrl, SetUserData, setIsLoggedIn } = useContext(AppContent);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 pr-90 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="bg-yellow-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-900 font-bold">
          CC
        </div>
        <span className="text-xl font-semibold">Carrier Connect</span>
      </Link>

      {/* Navigation Links */}
      <div className="space-x-6 text-md font-medium flex items-center">
        <Link to="/customers" className="hover:text-yellow-300 transition">Customers</Link>
        <Link to="/carriers" className="hover:text-yellow-300 transition">Carriers</Link>
        <Link to="/sites" className="hover:text-yellow-300 transition">Sites</Link>
        <Link to="/loadboard" className="hover:text-yellow-300 transition">Loadboard</Link>
        <Link to="/reports" className="hover:text-yellow-300 transition">Intermodal</Link>
        <Link to="/reports" className="hover:text-yellow-300 transition">Bardge</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">AP</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">AR</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">Reports</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">EDI</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">Tracking</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">Trailer Managment</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">Inventory</Link>
        <Link to="/admin" className="hover:text-yellow-300 transition">Admin</Link>

        {/* User Info or Login Link */}
        {userData ? (
          <div className="ml-4 bg-yellow-300 text-gray-900 px-3 py-1 rounded-full font-bold">
            {userData.name[0].toUpperCase()}
          </div>
        ) : (
          <Link to="/login" className="ml-4 hover:text-yellow-300 transition">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar2;