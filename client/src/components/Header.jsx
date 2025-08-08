import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Header = () => {


  return (
    <nav className="bg-gray-900 text-white px-6 py-4 pr-90 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <div className="bg-yellow-300 rounded-full w-10 h-10 flex items-center justify-center text-gray-900 font-bold">
          CC
        </div>
        <span className="text-xl font-semibold">Carrier Connect</span>
      </Link>
    </nav>
  )
}
export default Header