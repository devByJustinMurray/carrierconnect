import React from 'react'
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center bg-[rgb(15,41,60)] absolute top-0'>
        <img src={assets.miniLogo} alt="Mini Logo" className="w-50 sm: w-32 ml-2" />
        <button className='text-white text-lg gap-2 font-semibold px-10 py-2 rounded-md hover:bg-[rgb(15,41,60)] hover:text-gray-400'> Login</button>
    </div>
  )
}

export default Navbar
