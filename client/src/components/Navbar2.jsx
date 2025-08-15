import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar2 = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, SetUserData, setIsLoggedIn } = useContext(AppContent);

  const logout = async () => {
    try {
        axios.defaults.withCredentials = true; 
        const { data } = await axios.post(backendUrl + 'api/auth/logout');
        data.sucess && setIsLoggedIn(false);  
        data.sucess && setIsLoggedIn(false);   
        navigate('/'); 

    } catch (error) {
      toast.error(error.message);
    }
  }

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

<div>
    {userData?
    <div className='w-8 h-8 flex justify-center items-center rounded-full bg-yellow-300 text-black semi-bold cursor-pointer relative group'> 
      {userData.name[0].toUpperCase()}
    <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
      <ul className='bg-yellow-300 text-black p-2rounded shadow-lg '>      
        <li onClick={logout} className='list-none  m-3 p-4 bg-yellow-300 text-sm pr-5'>Logout</li>
      </ul>
    </div>
    </div>
    : 
    <Link to="/login" className="text-white text-lg gap-2 font-semibold px-10 py-2 rounded-md hover:bg-[rgb(15,41,60)] hover:text-gray-400">Login</Link>
    }
</div>
      </div>
    </nav>
  );
};

export default Navbar2;